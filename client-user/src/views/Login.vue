<template>
  <div class="home">
    <div class="login">
      <b-card title="Login" style="max-width: 20rem;" class="mb-2">
        <b-form @submit="onSubmit">
          <b-form-group id="input-group-1" label="Email address:" label-for="input-1"
            description="We'll never share your email with anyone else.">
            <b-form-input id="input-1" v-model="form.email" type="email" required placeholder="Enter email">
            </b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2">
            <b-form-input id="input-2" v-model="form.password" type="password" required placeholder="Enter password">
            </b-form-input>
          </b-form-group>

          <div class="py-3 my-2 flex justify-around">
          <b-button class="mx-3" size="sm" type="submit" variant="outline-primary">Login</b-button>
          <b-button @click.prevent='registerData' class="mx-3" size="sm" variant="outline-danger">Register</b-button>
          </div>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from '../api/axios.js'
import router from '../router'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post('login', {
        email: this.form.email, password: this.form.password
      })
        .then(({ data }) => {
          localStorage.token = data.token
          localStorage.email = data.email
          localStorage.id = data.id
          this.$store.commit('NEW_LOGIN', true)
          if (data.role === 'admin' || data.role === 'user') {
            router.push('/')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    registerData () {
      router.push('/Register')
    }
  }
}
</script>

<style scoped>
.home{
  background-image: url(https://www.newegg.com/insider/wp-content/uploads/2020/02/SamsungQLED-5.jpg);
  position: relative;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
}
.login{
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
