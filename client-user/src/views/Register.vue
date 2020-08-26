<template>
<div>
  <div>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
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

      <b-form-group id="input-group-2" label="Your password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

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
    ...mapActions([
      'registerUser'
    ]),
    onSubmit () {
      this.registerUser(this.form)
      this.$router.push('/')
    },
    onReset () {
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
    }
  }
}
</script>
