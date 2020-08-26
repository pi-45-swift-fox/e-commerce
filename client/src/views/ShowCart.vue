<template>
<div class="content">
  <Navbar />
  <h1>Checkout List</h1>
  <div class="ProductList">
      <CartsItem v-for="cart in carts" :key="cart.id" :cart="cart" />
  </div>
</div>
</template>

<script>
import CartsItem from '@/components/CartsItem.vue';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Cart',
  components: {
    CartsItem,
    Navbar,
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
  },
  created() {
    this.$store.dispatch('fetchCarts');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
a {
  color: #42b983;
}
.ProductList{
    /* display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 7%;
    margin-left: 30px;
    margin-right: 30px; */
}
.content {
  background-image: url("https://cdn6.f-cdn.com/contestentries/1476645/23802538/5c78ce310802b_thumb900.jpg");
  background-size: cover;
}

</style>
