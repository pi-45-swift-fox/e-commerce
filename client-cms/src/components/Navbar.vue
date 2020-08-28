<template>
  <div class="navbar navbar-dark bg-dark">
    <span class="navbar-brand">ADMIN</span>
    <div >
      <!-- <button  v-if="!checkLogin" class="btn btn-primary">Login</button> -->
      <button v-if="checkLogin" class="btn btn-danger">LogOut</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    checkLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>
</style>
