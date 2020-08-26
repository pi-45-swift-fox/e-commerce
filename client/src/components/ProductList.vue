<template>
  <div class="list">
      <div id="jdul">
        <h1>Best Gaming Laptop</h1>
      </div>
      <h1>
        Welcome Back, {{$store.state.username}}
      </h1>
    <div class="content">
      <div class="ProductList" id="content">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  name: 'ProductList',
  components: {
    ProductCard,
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  created() {
    this.$store.dispatch('fetchProducts');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
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
} */
.content {
  margin: auto;
  width: 80%;
  height: 400px;
  overflow: auto;
  background-color: beige;
}
#jdul {
  margin-top: 3%;
  margin-bottom: 1%;
}
.ProductList{
    margin-top: 10%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-left: 30px;
    margin-right: 30px;
}

</style>
