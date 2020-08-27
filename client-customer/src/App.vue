<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <Footer />
  </div>
</template>
<script>
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  mounted () {
    this.$store.dispatch('fetchItems')
    this.$store.dispatch('fetchBanner')
    if(localStorage.getItem('access_token')){
      this.$store.commit('set_login')
    }
  }
}
</script>
<style>

</style>
