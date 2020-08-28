import Vue from 'vue'
import Vuex from 'vuex'
const baseUrl = 'http://localhost:3000'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    set_login(state,param){
      state.isLogin = param
    }
  },
  actions: {
    login({ commit }, data) {
      let send = new FormData();
      send.append("json", JSON.stringify(data));
      fetch(`${baseUrl}/login`, {
        method: "POST",
        body: send
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          console.log(data)
          commit('set_login',true) 
        })
        .catch((error) => { console.error('Error:', error); })
    }
  },
  modules: {
  }
})
