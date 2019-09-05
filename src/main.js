import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'


Vue.prototype.axios=axios;
//vue是一个面向对象的组件库，有自己的原型构造函数，
//其他组件可以通过this.axios的方式使用
Vue.config.productionTip = false


//过滤图片地址
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg)
})


//注册全局组件
import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller)
import Loading from '@/components/Loading'
Vue.component('Loading',Loading)


//引入element.ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
