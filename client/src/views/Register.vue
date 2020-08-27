<template>
  <div class="register d-flex align-items-center">
    <div class="container-fluid d-flex justify-content-center">
        <b-card
            img-top
            tag="article"
            style="max-width: 30vw;"
            class="mb-2"
        >
        <img id="register-img" src="https://image.freepik.com/free-vector/eyes-concept-illustration_114360-2644.jpg" alt="register page">
        <h4>Register Page</h4>
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

        <b-button type="submit" variant="outline-info">Register</b-button> &nbsp;
        <b-button type="reset" variant="outline-danger">Reset</b-button>
        </b-form>
        </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
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
      this.$store.dispatch('register', this.form)
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
.register {
  background-color: #5eaaa8;
  height: 88vh;
}

#register-img {
  width: 100%;
  height: 42vh;
}
</style>
