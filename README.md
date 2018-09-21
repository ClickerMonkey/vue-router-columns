# vue-router-columns

A component to render nested router views in columns depending on screen width.

[Click here for an example](https://clickermonkey.github.io/vue-router-columns/example/)

**Features**
- Set desired column width `(default: 320px)`
- Set maximum columns to display at once `(default: 3)`
- Set minimum columns to display, adding empty columns for smoother experience `(default: 1)`
- A view can take up any number of columns `(default: 1)`
- Wraps `router-view` so all `vue-router` functionality works like normal

## Usage

Install with `npm install --save vue-router-columns`

## Example Code

#### Router.js
```js
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueRouterColumns from 'vue-router-columns';

Vue.use(VueRouter);
Vue.use(VueRouterColumns);

import { TodoLists, TodoList, Todo, Permissions } from '...'

// meta: {columnsWide: ?} can be specified on any route (default: 1)
export const router = new VueRouter({
  routes: [
    // /todos
    { path: '/todos', component: TodoLists, children: [
      // /todos/:listId
      { path: ':listId', component: TodoList, props: true, children: [
        // /todos/:listId/permissions
        { path: 'permissions', component: Permissions, meta: {columnsWide: 2} },
        // /todos/:listId/todo/:todoId
        { path: 'todo/:todoId', component: Todo, props: true }
      ]}
    ]}
  ]
});
```

#### App.vue
```vue
<template>
  <!-- default prop values -->
  <!-- depth: how many router-views this is inside -->
  <!-- passive: when scrolling is done, false for re-rendering while scrolling -->
  <router-column-view
    :min-columns="1"
    :max-columns="3"
    :column-width="320"
    :depth="0"
    :passive="true">

    <!-- The columns are placed in here -->

    <template slot="empty">
      If your min-columns > 1 you could have empty columns placed on the right.
      This will be the contents of that empty column.
    </template>

  </router-column-view>
</template>
<script>
import { router } from './Router'

export default {
  router
}
</script>
```

#### TodoLists.vue
```vue
<template>
  <router-column><!-- required as root element in a component which can be a column -->
    This is a page with todo lists and links to them.
    You don't need to add router-view, it's dynamically added.
  </router-column>
</template>
<script>
  export default {}
</script>
```

#### TodoList.vue
```vue
<template>
  <router-column>
    This is a list of todos for the list {{ listId }}.
  </router-column>
</template>
<script>
  export default {
    props: ['listId']
  }
</script>
```

#### Todo.vue
```vue
<template>
  <router-column>
    This is a page for editing the todo {{ todoId }} in list {{ listId }}.
  </router-column>
</template>
<script>
  export default {
    props: ['listId', 'todoId'],
    // These values are available on all router columns, but to make them
    // reactive you can add them to data.
    data: vm => ({
      columnIndex: 0, // based on routes above, this will always be 2
      columnVisibleIndex: 0, // 0 to max-columns (0 = first visible column)
      columns: {} // { views, count, start, desired, visible, empty }
    })
  }
</script>
```

#### Permissions.vue
```vue
<template>
  <router-column>
    This is a page for permissions on some object. I am 2 columns wide.
  </router-column>
</template>
<script>
  export default {}
</script>
```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
