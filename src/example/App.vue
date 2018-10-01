<template>
  <div class="example">
    <div class="header">
      <strong>Min Columns</strong>
      <select v-model.number="minColumns">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <strong>Max Columns</strong>
      <select v-model.number="maxColumns">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <strong>Column Width</strong>
      <input type="number" v-model="columnWidth">
    </div>
    <router-column-view
      :min-columns="minColumns"
      :max-columns="maxColumns"
      :column-width="columnWidth"
      @update="columnsUpdate">
      <template slot="empty" slot-scope="columns">
        <div style="padding: 1em; text-align: center; font-style: italic">
          This is an empty column.
        </div>
        <pre>{{ columns }}</pre>
      </template>
    </router-column-view>
    <div class="loader" v-if="loading">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minColumns: 1,
      maxColumns: 3,
      columnWidth: 320,
      loading: false
    }
  },
  created() {
    this.offBefore = this.$router.beforeEach((to, from, next) => {
      this.loading = true;
      next();
    });
    this.offAfter = this.$router.afterEach((to, from) => {
      this.loading = false;
    });
  },
  destroyed() {
    this.offBefore();
    this.offAfter();
  },
  mounted() {
    window.App = this
  },
  methods: {
    columnsUpdate(columns) {
      console.log('columns update', columns);
    }
  }
}
</script>

<style lang="scss">

body, html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.example {
  width: 100%;
  height: 100%;

  .header {
    position: absolute;
    height: 32px;
    background-color: rgba(0,0,0,0.1);
    left: 0;
    right: 0;
    top: 0;
    padding-left: 1em;
    line-height: 32px;
    overflow: scroll;
  }

  .vue-router-columns {
    position: absolute;
    top: 32px;
    left: 0;
    right: 0;
    bottom: 0px;
    height: auto !important;
  }

  .loader {
    background-color: rgba(0,0,0,0.8);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    line-height: 100vh;
    text-align: center;
    user-select: none;
  }
}

.vue-router-columns {

  .vue-router-column-view,
  .vue-router-empty-column {
    border-left: 1px solid rgba(0,0,0,0.1);
    box-shadow: inset -5px 0px 20px rgba(0,0,0,0.05);

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
