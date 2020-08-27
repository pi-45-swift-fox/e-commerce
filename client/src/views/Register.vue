<template>
  <div class="login vh-100">
    <b-container fluid="sm" class="test">
      <h1 class="font">Register here</h1>
      <p>Create new account here</p>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        class="font">
          <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Password:" label-for="input-2" class="font">
          <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
        <router-link class="font home-link" to="/">Go back to home</router-link> | <router-link class="font" to="/login">Login here</router-link><br><br>
        <b-button class="button" type="submit" variant="success" style="margin-right: 10px;">Submit</b-button>
        <b-button class="font" type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Register',
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
      this.$store.dispatch('register', this.form)
    },
    onReset (evt) {
      evt.preventDefault()

      this.resetForm()
    },
    resetForm () {
      this.form.email = ''
      this.form.password = ''
    }
  },
  created () {
    this.resetForm()
  }
}
</script>

<style scoped>
h1 {
  color: #004C3F;
  font-size: 4em;
}
.font {
  font-family: 'Alata', sans-serif;
}

.login {
  background-color: #FBF7ED;
  font-family: 'Poppins', sans-serif;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.button {
  background-color: #107C4F;
  font-family: 'Alata', sans-serif;
}

.button:hover {
  background-color: #004C3F;
}

.home-link {
  color: #004C3F;
}

.test {
  width: 30vw;
}

@media (max-width: 1024px) {
  .test {
    min-width: 70%;
  }
}
</style>
