import Vue from 'vue'
import Router from 'vue-router'
import cinemaRouter from './cinema'//默认找到router文件夹的index.js文件
import mineRouter from './mine'//默认找到router文件夹的index.js文件
import movieRouter from './movie'//默认找到router文件夹的index.js文件

Vue.use(Router)

export default new Router({
  mode:'history',
  base:process.env.BASE_URL,
  routes: [
    cinemaRouter,
    mineRouter,
    movieRouter
  ],
})
