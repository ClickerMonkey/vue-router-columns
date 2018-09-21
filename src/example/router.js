import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Todo from './Todo'
import TodoList from './TodoList'
import TodoLists from './TodoLists'
import Settings from './Settings'

// import { RouterColumn } from '../RouterColumn'

export const router = new VueRouter({
  routes: [
    { path: '/', component: TodoLists, props: true, children: [
      { path: 'list/:listId', component: TodoList, props: true, children: [
        { path: 'todo/:todoId', component: Todo, props: true, children: [
          { path: 'settings', component: Settings, props: true, meta: { columnsWide: 2 } }
        ]},
        { path: 'settings', component: Settings, props: true, meta: { columnsWide: 2 } }
      ]}
    ]}
  ]
});

export default router;