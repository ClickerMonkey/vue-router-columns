<template>
  <router-column>
    <router-link :to="`/list/${listId}/settings`" style="float:right; padding: 1em">
      View settings
    </router-link>
    <div class="todos">
      <router-link to="/" v-if="columnVisibleIndex === 0">
        &lt; Lists
      </router-link>
      <router-link
        class="todo"
        tag="div"
        v-for="todo in todos"
        v-html="todo.name"
        :key="todo.id"
        :to="`/list/${listId}/todo/${todo.id}`"
      ></router-link>
    </div>
  </router-column>
</template>

<script>
export default {
  props: ['listId'],
  beforeRouteUpdate(to, from, next) {
    this.todos = this.getTodos(to.params.listId)
    next()
  },
  data() {
    return {
      columnVisibleIndex: 0,
      todos: this.getTodos(this.listId)
    }
  },
  methods: {
    getTodos(listId) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(id => ({
        id: id,
        name: 'Todo #' + id + ' for list ' + listId
      }));
    }
  }
}
</script>

<style lang="scss" scoped>

.todos {
  margin: 1em;

  .todo {
    padding: 0.5em;

    &:hover {
      background-color: rgba(0,0,0,0.05);
    }

    &.router-link-active {
      background-color: rgba(0,0,0,0.1);
      position: relative;

      &::after {
        content: '\203a';
        position: absolute;
        right: 0.5em;
        font-weight: bold;
      }
    }
  }
}

</style>