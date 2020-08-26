<template>
<div>
  <div class="navigation">
    <div class="d-flex justify-content-between mx-3" >
      <div class="mt-2"><img src="https://www.pngmart.com/files/11/Technology-PNG-Free-Download.png" alt=""></div>
      <div class="mx-3 mt-4">
        <p class="text-center text-uppercase mt-1">
          Welcome to the tech world
        </p>
      </div>
      <div>
        <div class="d-flex flex-row bd-highlight">
          <div v-if="!isLogin" class="p-2 bd-highlight">
            <button @click.prevent="showCart" class="bg-transparent border-0 showCart">
            <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_xYvGhX.json" mode="bounce"
              background="transparent" speed="0.5" style="width: 75px; height: 75px;" hover loop autoplay>
            </lottie-player>
            </button>
          </div>
          <div v-if="isLogin" class="p-2 bd-highlight">
            <b-button @click.prevent="loginForm" class="mr-3" pill variant="outline-success">Login</b-button>
            <b-button @click.prevent="registerForm" class="mr-3" pill variant="outline-danger">Register</b-button>
          </div>
          <div class="p-2 bd-highlight">
            <b-button v-if="!isLogin" @click.prevent="logout" class="mx-3 my-3" pill variant="outline-danger">Logout</b-button>
          </div>
        </div>
      </div>
    </div>
</div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'Navbar',
  data () {
    return {
      isLogin: true
    }
  },
  methods: {
    registerForm () {
      router.push('register')
    },
    loginForm () {
      router.push('/Login')
    },
    logout () {
      localStorage.clear()
      router.push('/Login')
    },
    showCart () {
      router.push('/Cart')
    }
  },
  created () {
    if (localStorage.token) {
      this.isLogin = false
    } else {
      router.push('/Login')
    }
  }
}
</script>

<style scoped>
.navigation{
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  border-bottom: 10px solid black;
  margin-bottom: 5vh;
}

img {
  width: 100px;
  height: auto;
}
</style>
