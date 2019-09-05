import Vue from 'vue'
import Router from 'vue-router'
import cinemaRouter from './cinema' //默认找到router文件夹的index.js文件
import mineRouter from './mine'
import movieRouter from './movie'
import adminRouter from './admin'
Vue.use(Router)

export default new Router({
  mode:'history',
  // base:process.env.BASE_URL,
  base:'miaomi',//基本路由路径，会在路径上加入miaomi
  routes: [
    cinemaRouter,
    mineRouter,
    movieRouter,
    adminRouter,
    {
      path:'/*',
      redirect:'/movie'//路由重定向
    }
  ],
})
