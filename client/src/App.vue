<template>
  <div id="app">
    <div id="nav" class="navbar navbar-light">
      <router-link to="/" class="navbar-brand">TokoBrand</router-link>
      <span class="inline" v-if="$store.state.login">
        <router-link to="/cart" class="btn btn-link mr-3">Cart</router-link>
        <router-link to="/history" class="btn btn-link mr-3">Transactions</router-link>
        <router-link to="/logout" class="text-secondary">Logout</router-link>
      </span>
      <span v-else>
        <router-link to="/login" class="text-secondary">Login</router-link>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    if (localStorage.access_token) {
      this.$store.commit('set_login', true);
    }
  }
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
  color: #215c41;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
