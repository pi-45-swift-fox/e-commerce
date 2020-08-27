<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
      <a class="navbar-brand" href="#">E-commerce</a>
      <form class="form-inline" @submit.prevent="login">
        <button type="submit" class="btn btn-primary mb-2" >Login </button>
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
    }
  }
}
</script>

<style>

</style>
