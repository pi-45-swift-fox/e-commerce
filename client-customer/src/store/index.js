import Vue from 'vue'
import Vuex from 'vuex'
const baseUrl = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:[],
    user:'',
    banners:[],
    isLogin:false
  },
  mutations: {
    set_items(state,data){
      state.items = data.product
    },
    set_banners(state,data){
      state.banners = data
    }
  },
  actions: {
    fetchItems({ commit }, data) {
      fetch(`${baseUrl}/products`, {
        method: "GET"
      })
        .then( (res)=> { return res.json(); })
        .then( (data) => { 
          console.log(data)
          commit('set_items',data)
         })
        .catch((error) => {
          console.log(error)
        });
  },
  fetchBanner({commit},data){
    fetch(`${baseUrl}/products/banners`,{
      method:"GET"
    })
    .then((res)=>{return res.json()})
    .then((data)=>{
      console.log(data)
          commit('set_banners',data)
    })
    .catch((error) => {
      console.log(error)
    });
  }
},
  modules: {
  }
})
