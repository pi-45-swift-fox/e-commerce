<template>
  <div id="app">
    <Navbar sticky="true"></Navbar>
    <b-navbar sticky="true" variant="light" class="mt-0 justify-content-center" v-if="isLogin === true">
      <NavbarCategory sticky="true"></NavbarCategory>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Navbar from './components/Navbar'
import NavbarCategory from './components/NavbarCategory'

export default {
  name: 'App',
  components: {
    Navbar,
    NavbarCategory
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_ISLOGIN'
    ])
  },
  created () {
    this.$store.dispatch('getProducts')
    if (localStorage.getItem('access_token')) {
      this.SET_ISLOGIN(true)
    } else {
      this.SET_ISLOGIN(false)
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
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

.btn-outline {
  border-color: #a3d2ca;
  background-color: white;
  color: #5eaaa8;
}

.btn-outline:hover {
  background-color: #a3d2ca;
  color: white;
}
</style>
