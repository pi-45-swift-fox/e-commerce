<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-info fixed-top">
      <div class="container">
        <h1 class="navbar-brand" ><strong>Book's Store</strong></h1>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">            
            <li class="nav-item" data-toggle="tooltip" data-placement="bottom" title="Check Carts!">
              <button class="btn btn-info"
                  type="button" data-target="#CartModal"
                data-toggle="modal" v-if="$store.state.isLogin"><i class="fas fa-shopping-cart"></i></button>
            </li>

            <li class="nav-item ">
              <div class="dropdown">
                <button
                  class="btn btn-info"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                > Account
                  <i class="far fa-user-circle fa-lg"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right mt-0" aria-labelledby="dropdownMenuButton">
                  <span class="dropdown-header bg-info text-light d-flex justify-content-between">
                   <h3> <strong>{{status}}</strong></h3>
                    <button class="btn btn-danger " v-if="$store.state.isLogin" @click="$store.commit('set_logout')">Log Out</button>
                  </span>
                
                  <button type="button" class="btn btn-light dropdown-item" data-target="#LoginOrRegister"
                data-toggle="modal" @click="RegisterEvent()" v-if="!$store.state.isLogin">Login</button>
                  <button type="button" class="btn btn-light dropdown-item" data-target="#LoginOrRegister"
                data-toggle="modal" @click="loginEvent()" v-if="!$store.state.isLogin">Register</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      </div>-->
    </nav>
    <Modal :event="event"/>
    <ModalCart />
  </div>
</template>

<script>
import ModalCart from './ModalCart'
import Modal from './Modal'
export default {
  name: 'Navbar',
  components: {
    Modal,
    ModalCart
  },
  data () {
    return {
      event: false
    }
  },
  methods: {
    loginEvent () {
      this.event = false
    },
    RegisterEvent () {
      this.event = true
    }
  },
  computed: {
    status () {
      return this.$store.state.user ? this.$store.state.user : 'Selamat Datang'
    }
  }
}
</script>

<style>
.dropdown:hover>.dropdown-menu {
      display: block;
    }
</style>
