<template>
  <div class="home">
    <NavBar></NavBar>
    <img alt="Vue logo" src="../assets/logo.png">
    <Products></Products>
  </div>
</template>

<script>
// @ is an alias to /src
import Products from '../components/Products'
import NavBar from '../components/NavBarHome'

export default {
  name: 'Home',
  components: {
    Products,
    NavBar
  },
  methods: {
    getData () {
      this.$store.dispatch('fetchData', {})
    }
  },
  created () {
    this.getData()
  }
}
</script>
