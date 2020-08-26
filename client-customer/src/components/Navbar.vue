<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Toko Kepepet</a>
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
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
            
            <li class="nav-item">
              <div class="dropdown">
                <button
                  class="btn btn-info"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="far fa-user-circle fa-lg"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                  <span class="dropdown-header bg-info text-light">
                    <strong>{{status}}</strong>
                  </span>
                  <button type="button" class="btn btn-light dropdown-item" data-target="#LoginOrRegister"
                data-toggle="modal" @click="RegisterEvent()">Login</button>
                  <button type="button" class="btn btn-light dropdown-item" data-target="#LoginOrRegister"
                data-toggle="modal" @click="loginEvent()">Register</button>
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
  </div>
</template>

<script>
import Modal from "./Modal";
export default {
  name: "Navbar",
  components: {
    Modal,
  },
  data() {
    return {
      event:false
    };
  },
  methods: {
    loginEvent(){
      this.event = false
    },
    RegisterEvent(){
      this.event = true
    }
  },
  computed:{
    status(){
      return this.$store.state.user ? this.$store.state.user : 'Selamat Datang'
    }
  }
};
</script>

<style>
</style>
