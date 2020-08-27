<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
      <a class="navbar-brand" href="#">HacktivGram</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#" @click.prevent="showMyCart">My Cart <span class="sr-only">(current)</span></a>
        </li>
        <!-- <li class="nav-item active">
          <a class="nav-link" href="#" @click.prevent="addPhoto">Add Post <span class="sr-only">(current)</span></a>
        </li> -->
      </ul>
      <form class="form-inline" @submit.prevent="logout">
        <button type="submit" class="btn btn-primary mb-2" >Logout </button>
      </form>
    </div>
  </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout', {})
    },
    showMyCart () {
      this.$store.dispatch('showCart', {})
    }
  }
}
</script>

<style>

</style>
