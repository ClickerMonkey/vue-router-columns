<template>
  <router-column>
    <div class="todo-lists">
      <router-link
        v-for="list in todoLists"
        class="todo-list"
        tag="div"
        :key="list.id"
        :to="`/list/${list.id}`">
        {{ list.name }} ({{ list.id }})
      </router-link>
    </div>
  </router-column>
</template>

<script>
export default {
  data() {
    return {
      todoLists: [
        {id: 1, name: 'House Project'},
        {id: 2, name: 'Personal Project'},
        {id: 3, name: 'Work Project'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.todo-lists {
  margin: 1em;

  .todo-list {
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