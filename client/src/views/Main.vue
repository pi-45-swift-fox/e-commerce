<template>
  <div>
      <NavBar></NavBar>
  <Products></Products>
  </div>
</template>

<script>
import Products from '../components/Products'
import NavBar from '../components/NavBarMain'
export default {
  name: 'Main',
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

<style>

</style>
