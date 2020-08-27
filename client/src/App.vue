<template>
  <div id="app" style="background-color: #484d5c;">
    <div v-if="isLoading" id="loading">
      <img src="./assets/loading.gif" alt="">
    </div>
    <div v-else>
      <div v-if="$store.state.isLogin">
        <NavBarLogin></NavBarLogin>
      </div>
      <div v-else-if="!$store.state.isLogin">
        <NavBarBfrLogin></NavBarBfrLogin>
      </div>
        <router-view/>
    </div>
  </div>
</template>

<script>
import NavBarLogin from './components/NavBarLogin.vue'
import NavBarBfrLogin from './components/NavBarBfrLogin.vue'
export default {
  name: 'App',
  data () {
    return {
      isLoading: true
    }
  },
  components: {
    NavBarLogin,
    NavBarBfrLogin
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('SET_ISLOGIN', true)
    } else {
      this.$store.commit('SET_ISLOGIN', false)
    }
  },
  mounted () {
    setTimeout(_ => {
      this.isLoading = false
    }, 500)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');

* {
  font-family: 'Quicksand', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #8DA290;
  text-decoration: none;
  background-image: linear-gradient(rgb(141, 162, 144), rgb(141, 162, 144)),
    linear-gradient(#FCF1D8, #FCF1D8);
  background-size: 100% 2px, 0 2px;
  background-position: 100% 100%, 0 100%;
  background-repeat: no-repeat;
  transition: background-size 2s linear;
}

#nav a.router-link-exact-active:hover {
    background-size: 0 2px, 100% 2px;
    color: #FCF1D8;
}

#loading {
  background-color: white;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
