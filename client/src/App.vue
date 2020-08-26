<template>
  <div id="app">
    <!-- <div id="nav" class="navbar fixed-top" v-if="$store.state.isLogin">
      <div class="navbar-list">
        <router-link class="list-items" to="/">Home</router-link> |
        <router-link class="list-items" to="/carts">Carts </router-link> |
        <a href="#" @click.prevent="logout"> Logout</a>
      </div>
    </div>
    <div v-else class="navbar fixed-top">
      <div class="navbar-list">
        <router-link class="list-items" to="/">Home </router-link> |
        <router-link class="list-items" to="/login"> Login </router-link> |
        <router-link class="list-items" to="/register">Register</router-link>
      </div>
    </div> -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      isLogin: false,
    };
  },
  created() {
    if (localStorage.access_token) {
      this.$store.commit('SET_LOGGED', {isLogin: true, username: localStorage.username, balance: localStorage.balance});
    } else {
      this.$store.commit('SET_LOGGED', false);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.isLogin = false;
      this.$router.push('/login');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* .navbar-list{
  position: relative;
  left: 0;
}
.list-items {
  justify-content: center;
  text-align: center;
  background-color: burlywood;
  align-items: center;
  align-content: center;
  margin-top: -2%;
}
.navbar {
  background-color: lightblue;
  height: 30px;
} */
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
