<template>
  <div class="bg-black container">
    <div>
      <div class="box bounce-5">
        <h1>LOG IN BELOW</h1>
      </div>
      <b-form @submit="onSubmit" @reset="onReset" >
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
          <b-form-input
            type="password"
            id="input-2"
            v-model="form.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-button id="submitLogin" type="submit">Submit</b-button>
        <b-button id="resetButton" type="reset" variant="danger">Reset</b-button>
      </b-form>

    </div>
  </div>
</template>

<script>

import axios from 'axios'
import swal from 'sweetalert'

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
      axios({
        method: 'POST',
        url: this.$store.state.baseUrl + '/login',
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
        .then((res) => {
          localStorage.setItem('access_token', res.data.access_token)
          this.$store.commit('SET_ISLOGIN', true)
          this.$router.push({ path: '/' })
        })
        .catch((err) => {
          console.log(err)
          swal('Tet Tot!', 'Wrong email or password!', 'error')
        })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');

.bg-black {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 95vw;
  color: #c0ccd4;
  font-family: 'Cardo', serif;
}

h1 {
  color:#ffce00;
  font-family: 'Oswald', sans-serif;
  font-size: 50px;
}

h1:hover {
  color: #EEF1E6;
  cursor: pointer;
}

#submitLogin {
  background-color: #DEF3FD;
  color: black;
  margin-right: 5px;
}

#submitLogin:hover {
  background-color: #FFDFD3;
  color: #799FCB;
}

#resetButton {
  background-color: #FE6B64;
  color: #FDFD98;
}

#resetButton:hover {
  background-color: #FEC9C9;
  color: #F9665E;
}

.box {
    align-self: flex-end;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    height: 100px;
    margin: 0 auto 0 auto;
    transform-origin: bottom;
    width: 30vw;
}
.bounce-5 {
    animation-name: bounce-5;
    animation-timing-function: ease;
}
@keyframes bounce-5 {
    0%   { transform: scale(1,1)    translateY(0); }
    10%  { transform: scale(1.1,.9) translateY(0); }
    30%  { transform: scale(.9,1.1) translateY(-100px); }
    50%  { transform: scale(1,1)    translateY(0); }
    57%  { transform: scale(1,1)    translateY(-7px); }
    64%  { transform: scale(1,1)    translateY(0); }
    100% { transform: scale(1,1)    translateY(0); }
}

</style>
