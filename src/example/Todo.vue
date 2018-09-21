<template>
  <router-column>
    <router-link :to="`/list/${listId}/todo/${todoId}/settings`" style="float:right; padding: 1em">
      View settings
    </router-link>
    <div class="todo">
      <router-link :to="`/list/${listId}`" v-if="columnVisibleIndex === 0">
        &lt; List {{ listId }}
      </router-link>
      <div>
        <label>ID</label>
        <input type="text" :value="todo.id" readonly>
      </div>
      <div>
        <label>List</label>
        <input type="text" :value="todo.listId" readonly>
      </div>
      <div>
        <label>Name</label>
        <input type="text" :value="todo.name" readonly>
      </div>
      <div>
        <label>Column Index</label>
        <input type="text" :value="columnIndex" readonly>
      </div>
      <div>
        <label>Visible Column Index</label>
        <input type="text" :value="columnVisibleIndex" readonly>
      </div>
      <div>
        <label>First Visible View Index</label>
        <input type="text" :value="columns.start" readonly>
      </div>
      <div>
        <label># of Views</label>
        <input type="text" :value="columns.views" readonly>
      </div>
      <div>
        <label># of Visible Views</label>
        <input type="text" :value="columns.visible" readonly>
      </div>
      <div>
        <label># of Columns</label>
        <input type="text" :value="columns.count" readonly>
      </div>
    </div>
  </router-column>
</template>

<script>
export default {
  props: ['listId', 'todoId'],
  beforeRouteUpdate(to, from, next) {
    this.todo = this.getTodo(to.params.listId, to.params.todoId)
    next()
  },
  data() {
    return {
      columnIndex: 0,
      columnVisibleIndex: 0,
      columns: {},
      todo: this.getTodo(this.listId, this.todoId)
    };
  },
  methods: {
    getTodo(listId, todoId) {
      return {
        id: todoId,
        listId, listId,
        name: 'Todo #' + todoId + ' for list ' + listId
      };
    }
  }
}
</script>

<style lang="scss" scoped>

.todo {
  margin: 1em;

  > div {
    padding: 0.5em;

    label {
      font-weight: bold;
      display: block;
    }

    input {
      padding: 0.5em;
    }
  }
}

</style>