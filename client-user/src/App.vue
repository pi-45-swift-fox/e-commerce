<template>
  <div id="app">
    <Navbar />
    <div>
      <Carousel />
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import { mapState } from 'vuex'
import Carousel from './components/Carousel'
// import Home from './views/Home'
export default {
  name: 'Main',
  components: {
    Navbar,
    Carousel
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('NEW_LOGIN', true)
    } else {
      this.$store.commit('NEW_LOGIN', false)
    }
  },
  computed: mapState([
    'isLogin',
    'products'
  ])
}
</script>

<style>
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
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
