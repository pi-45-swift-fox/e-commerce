<template>
  <div class="text-center login">
    <form class="form-signin" @submit.prevent="login">
        <img class="mb-4" src="/docs/4.5/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <input type="email" class="form-control" placeholder="Email address" v-model="email" required autofocus>
        <input type="password" class="form-control" placeholder="Password" v-model="password" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <button class="btn btn-lg btn-primary btn-block" @click="goRegister">Register</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      // console.log(this.$store.state.baseUrl + '/login')
      axios({
        method: 'post',
        url: this.$store.state.baseUrl + '/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(respon => {
          console.log('masuk login 000')
          localStorage.token = respon.data.token
          localStorage.setItem('userId', respon.data.id);
          this.$router.push({ name: 'Home' })
        })
        .catch(() => {
          swal('Opppss', 'Email or password is incorrect', {
            buttons: false
          })
        })
    },
    goRegister() {
      this.$router.push({ name: 'Register' })
    }
  }
}
</script>

<style scooped>
.login {
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
