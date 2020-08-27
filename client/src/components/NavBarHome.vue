<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
      <a class="navbar-brand" href="#">E-commerce</a>
      <form class="form-inline">
        <button class="btn btn-primary mb-2" @click.prevent="register">Register </button>
        <button class="btn btn-primary mb-2" @click.prevent="login">Login </button>
      </form>
    </div>
  </nav>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      this.$store.dispatch('showLoginForm', {})
    },
    register () {
      this.$store.dispatch('showRegisterForm', {})
    }
  }
}
</script>

<style>

</style>
