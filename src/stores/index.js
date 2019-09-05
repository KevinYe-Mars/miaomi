import Vue from 'vue'
import Vuex from 'vuex'
//引入状态管理
import city from './city'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules : {
    city,user
  }
})
