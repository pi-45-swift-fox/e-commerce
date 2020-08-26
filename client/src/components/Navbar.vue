<template>
<b-navbar toggleable="lg" type="dark" style="background-color: #5eaaa8">
    <router-link class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" to="/">Serba Ada Shop</router-link>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
        <b-navbar-nav right>
            <b-nav-item href="#" v-if="isLogin === false" @click.prevent="login">Login</b-nav-item>
            <b-nav-item href="#" v-if="isLogin === false" @click.prevent="register">Register</b-nav-item>
            <b-button variant="outline-white" class="mb-2 icon" v-if="isLogin === true" @click.prevent="toHistory">
            <b-icon icon="cart-check" style="color: white;" aria-hidden="true"></b-icon> <span style="color:white">History</span>
            </b-button>
            <b-button variant="outline-white" class="mb-2 icon" v-if="isLogin === true" @click.prevent="toCart">
            <b-icon icon="cart3" style="color: white;" aria-hidden="true"></b-icon> <span style="color:white">Cart</span>
            </b-button>
            &nbsp;
            <b-button variant="outline-white" class="mb-2 icon" v-if="isLogin === true" @click.prevent="signOut">
            <b-icon icon="power" style="color: white;" aria-hidden="true"></b-icon> <span style="color:white">Logout</span>
            </b-button>
        </b-navbar-nav>
    </b-navbar-nav>
    </b-collapse>
</b-navbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapState([
      'isLogin',
      'carts'
    ]),
    cartsPaid () {
      return this.carts.filter(cart => {
        return cart.status === 'paid'
      })
    }
  },
  methods: {
    login () {
      this.$router.push({ path: '/login' })
    },
    register () {
      this.$router.push({ path: '/register' })
    },
    toCart () {
      this.$router.push({ path: '/carts' })
    },
    backTohome () {
      this.$router.push({ path: '/' })
    },
    toHistory () {
      this.$router.push({ path: '/history' })
    },
    ...mapMutations([
      'SET_ISLOGIN'
    ]),
    signOut () {
      this.SET_ISLOGIN(false)
      localStorage.clear()
      this.backTohome()
    }
  }
}
</script>

<style scooped>
.icon:hover {
  transform: scale(1.1);
}
</style>
