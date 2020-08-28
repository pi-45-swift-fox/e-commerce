<template>
  <div class="login d-flex align-items-center">
    <div class="container-fluid d-flex justify-content-center">
        <b-card
            img-top
            tag="article"
            style="max-width: 30vw;"
            class="mb-2"
        >
        <img id="img-login" src="https://img.freepik.com/free-vector/active-elderly-people-illustrated_23-2148636466.jpg?size=626&ext=jpg" alt="login page">
        <h4>Login Page</h4>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
            id="input-group-1"
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

        <b-form-group id="input-group-2" label-for="input-2">
            <b-form-input
            id="input-2"
            v-model="form.password"
            required
            placeholder="Enter password"
            ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="outline-info">Login</b-button> &nbsp;
        <b-button type="reset" variant="outline-danger">Reset</b-button>
        </b-form>
        </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$store.dispatch('login', this.form)
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scooped>
.login {
    background-color: #5eaaa8;
    height: 88vh;
}

#img-login {
  width: 100%;
}
</style>
