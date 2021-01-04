import Vue from 'vue'

import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import App from './App'
import store from './store'
import router from './router'

import '@/icons' 
import '@/permission'
/*高德地图*/
import VueAMap from 'vue-amap';
/*echarts*/
import echarts from 'echarts'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '1b33c8021712bb6e0250ab2f4f3b43be',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11' // ui版本号，也是需要写
});

Vue.prototype.$echarts = echarts;