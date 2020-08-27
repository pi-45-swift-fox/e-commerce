<template>
  <div class="navbar sticky-top mt-3 bg-darkGrey">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/checkout">Checkout</router-link>
    </div>
    <b-button v-if="isLogin" class=" noOpacity" variant="danger" @click="logout">Logout</b-button>
    <b-button v-else class=" noOpacity" variant="danger" @click="login">Login</b-button>
  </div>
</template>

<script>
import swal from 'sweetalert'
export default {
  name: 'Navbar',
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    logout () {
      swal({
        title: 'Are you sure?',
        text: 'Please stay a little longer!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            localStorage.clear()
            this.$store.dispatch('fetchData')
            // this.$router.push({ name: 'Home' })
          }
        })
    },
    login() {
      this.$router.push({ name: 'Login' })
    }
  },
  created () {
    if (localStorage.token) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>

<style>

.bg-darkGrey {
  background-color: #333;
}

#nav a {
  font-weight: bold;
  color: #128043;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
