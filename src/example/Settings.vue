<template>
  <router-column>
    <div class="settings-page">
      <a href @click.prevent="$router.back" v-if="columnVisibleIndex === 0">&lt; Back</a>
      <div>
        <div v-if="todoId">
          Settings for todo {{ todoId }} in {{ listId }}
        </div>
        <div v-if="!todoId && listId">
          Settings for list {{ listId }}
        </div>
        <p>This is a settings page which should take up 2 columns, or full screen if there isn't enough space.</p>
        <p>There is a 2 second delay for this view, set in beforeRouteEnter and beforeRouteUpdate</p>
      </div>
    </div>
  </router-column>
</template>

<script>
export default {
  props: ['listId', 'todoId'],
  beforeRouteEnter(to, from, next) {
    setTimeout(next, 2000);
  },
  beforeRouteUpdate(to, from, next) {
    setTimeout(next, 2000);
  },
  data() {
    return {
      columnVisibleIndex: 0
    };
  }
}
</script>

<style lang="scss" scoped>

.settings-page {
  padding: 1em;
}

</style>