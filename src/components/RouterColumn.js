
const isNumber = x => isFinite(parseInt(x))

function getColumnIndex(instance) {
  let node = instance.$parent;
  let columnIndex = 0;

  while (node && !node.routerViewColumns)
  {
    if (node.routerColumn) columnIndex++;
    node = node.$parent;
  }

  return columnIndex;
}

export default {

  name: 'router-column',

  functional: true,

  inject: ['columnData'],

  props:
  {
    overflow:
    {
      type: String,
      default: 'scroll'
    }
  },

  render (createElement, context)
  {
    const columnData = context.injections.columnData;

    // Component is NOT being used in router-column-view
    if (!columnData)
    {
      return createElement('div', context.data, context.children);
    }

    const instance = context.parent;
    const index = getColumnIndex(instance);
    const columns = columnData.columns;
    const width = columns.widths[index];
    const visible = columns.visibles[index];

    // ========= TAG COMPONENT =========
    instance.routerColumn = true;
    // ======= UPDATE COMPONENT ========
    instance.columns = columns;
    instance.columnIndex = index;
    instance.columnVisibleIndex = index - columns.start;
    // =================================

    return createElement('div', {
      staticClass: 'vue-router-column',
      style: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: width,
        flexBasis: 0,
        height: '100%'
      }
    }, [
      !visible ? '' :
      createElement('div', {
        staticClass: 'vue-router-column-view',
        style: {
          flexGrow: 1,
          flexBasis: 0,
          overflow: context.props.overflow,
          position: 'relative'
        }
      }, context.children),
      createElement('router-view')
    ])
  }
}