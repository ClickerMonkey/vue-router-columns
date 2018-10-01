
const isNumber = x => isFinite(parseInt(x))

export default {

  name: 'router-column-view',

  props:
  {
    minColumns:
    {
      validate: isNumber,
      default: 1
    },

    maxColumns:
    {
      validate: isNumber,
      default: 3
    },

    columnWidth:
    {
      validate: isNumber,
      default: 320
    },

    depth:
    {
      validate: isNumber,
      default: 0
    },

    passive:
    {
      type: Boolean,
      default: true
    }
  },

  data()
  {
    return {
      columnData: {
        columns: {
          views: 0,
          count: 0,
          start: 0,
          desired: 0,
          visible: 0,
          empty: 0,
          widths: [],
          visibles: []
        }
      }
    };
  },

  provide()
  {
    return {
      columnData: this.columnData
    }
  },

  watch:
  {
    minColumns: 'update',
    maxColumns: 'update',
    columnWidth: 'update',
    depth: 'update'
  },

  created()
  {
    this.ignoreRouter = this.$router.afterEach(this.update);

    window.addEventListener('resize', this.update, { passive: this.passive });
  },

  mounted()
  {
    this.update()
  },

  destroyed()
  {
    this.ignoreRouter();

    window.removeEventListener('resize', this.update);
  },

  methods:
  {
    getWidth ()
    {
      return this.$el.offsetWidth;
    },

    getColumnCount ()
    {
      const width = this.getWidth();
      const max = parseInt(this.maxColumns);
      const columnWidth = parseInt(this.columnWidth)

      return Math.min(max, Math.max(1, Math.floor(width / columnWidth)));
    },

    getColumnRoutes ()
    {
      const depth = parseInt(this.depth);
      const routes = depth
        ? this.$route.matched.slice(depth)
        : this.$route.matched;

      return routes;
    },

    update ()
    {
      if (this.updateColumns())
      {
        this.$forceUpdate();
      }
    },

    updateColumns ()
    {
      const routes = this.getColumnRoutes();
      const min = parseInt(this.minColumns);
      const columns = this.columnData.columns;
      const views = routes.length;
      const count = this.getColumnCount();

      let desired = 0;
      let visible = 0;
      let visibles = [];
      let widths = [];

      for (let i = routes.length - 1; i >= 0; i--)
      {
        const width = routes[i].meta.columnsWide || 1;
        const routeVisible = desired < count;

        desired += width;
        widths[ i ] = routeVisible ? desired : 1;
        visibles[ i ] = routeVisible;
        visible += routeVisible ? 1 : 0;
      }

      const empty = Math.max(0, Math.min(min, count) - desired);
      const start = views - visible;

      const updated = {
        views, count, desired, start, empty,
        visible, visibles, widths
      };

      const changed = JSON.stringify(columns) !== JSON.stringify(updated);

      if (changed)
      {
        this.columnData.columns = updated;

        this.$emit('update', updated);
      }

      return changed;
    }
  },

  render (createElement)
  {
    const columns = this.columnData.columns;
    const { empty, count } = columns;
    const children = [];

    if (count > 0)
    {
      children.push(
        createElement('div', {
          style: {
            flexGrow: count - empty,
            flexBasis: 0
          }
        }, [
          createElement('router-view')
        ])
      );

      if (empty) {
        children.push(
          createElement('div', {
            staticClass: 'vue-router-column-empty',
            style: {
              flexGrow: empty,
              flexBasis: 0
            }
          }, [
            this.$scopedSlots.empty
            ? this.$scopedSlots.empty(columns)
            : this.$slots.empty
          ])
        );
      }
    }

    // ========= TAG COMPONENT =========
    this.routerViewColumns = true
    // =================================

    return createElement('div', {
      staticClass: 'vue-router-columns',
      style: {
        display: 'flex',
        flexDirection: 'row'
      }
    }, children)
  }
}