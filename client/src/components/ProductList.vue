<template>
  <div class="list">
    <div v-if="$store.state.isLogin">
      <div class="title" v-if="$store.state.isLogin">
        <h1>
          Welcome Back, {{$store.state.username}}
        </h1>
        <h1>
          Your Balance: Rp. {{$store.state.balance}}
        </h1>
      </div>
        <div id="jdul">
          <h1>Electronic Center</h1>
        </div>
      <div class="content">
        <div class="ProductList" id="content">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
    <div v-else-if="!$store.state.isLogin" id="wo">
      <div class="content">
        <div class="ProductList" id="content">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  name: 'ProductList',
  // data() {
  //   return {
  //     isLogin: false,
  //   };
  // },
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
#wo {
  margin-top: 8%;
}
.content {
  margin: auto;
  width: 80%;
  height: 500px;
  overflow: auto;
  background-color: beige;
}
#jdul {
  margin-top: -4%;
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
.title {
    display: inline-block;
    left: 13px;
    font-size: 10px;
    margin-top: 3%;
    margin-left: 80%;
    padding: 9px;
    border: 1px solid black;
    border-radius: 10px;
}

</style>
