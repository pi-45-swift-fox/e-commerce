<template lang="html">
  <div id="nav">
    <b-navbar variant="faded" type="light" class="navbar">
      <b-navbar-brand tag="h1" class="mb-1" style="color: #FBF7ED;">E-Commerce</b-navbar-brand>
      <div class="left-nav">
        <router-link to="/user/cart"><b-icon-cart4 class="shadow icon" font-scale="2"></b-icon-cart4></router-link>
        <b-button v-if="access === undefined" @click="signin" size="md" class="my-2 my-sm-0 button shadow ml-3" type="submit" variant="success">Sign in</b-button>
        <b-button v-else @click="logout" size="md" class="my-2 my-sm-0 button shadow ml-3" type="submit" variant="success">Log out</b-button>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      access: ''
    }
  },
  methods: {
    signin () {
      this.$router.push({ name: 'Login' })
    },
    logout () {
      localStorage.clear()
      this.access = ''
      this.$router.push({ name: 'Login' })
    }
  },
  created () {
    this.access = localStorage.access_token
  }
}
</script>

<style lang="css" scoped>
#nav {
  padding: 15px;
  background-color: #004C3F;
  color: #FBF7ED;
  margin-bottom: 50px;
}

#nav a {
  font-weight: bold;
  color: #FBF7ED;
}

#nav a.router-link-exact-active {
  color: #FBF7ED;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: 'Alata', sans-serif;
}

.left-nav {
  display: flex;
  align-items: center;
}

.icon {
  color: #FBF7ED;
}

.icon:hover {
  color: #dBd7cD;
}
</style>
