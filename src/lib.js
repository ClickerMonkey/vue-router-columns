
import RouterColumn from './components/RouterColumn'
import RouterColumnView from './components/RouterColumnView'

export const plugin =
{
  install (Vue, options)
  {
    Vue.component(RouterColumn.name, RouterColumn);
    Vue.component(RouterColumnView.name, RouterColumnView);
  }
}

export default plugin;

if (window.Vue)
{
  window.Vue.use(plugin);
}