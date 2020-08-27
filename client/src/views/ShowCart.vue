<template>
<div class="content">
  <div class="navbar">
    <Navbar />
  </div>
  <div id="user" v-if="$store.state.isLogin">
      <h1>
        Your Balance: Rp. {{$store.state.balance}}
        <hr>
      </h1>
    </div>
  <div class="title">
    <h1>Checkout List</h1>
        <!-- <a href="/" id="home-btn" class="navbtn" @click.prevent="topup"> Top Up Balance</a> -->
  </div>
  <div class="list">
    <div class="ProductList">
        <CartsItem v-for="cart in carts" :key="cart.id" :cart="cart" />
    </div>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2';
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
  methods: {
    topup() {
      Swal.fire({
        title: 'Top Up Balance',
        icon: 'info',
        html: `
        <hr>
        name: 
        <br>
        price: 
        <br>
        total: item(s)
        <hr>
        `,
        showCancelButton: true,
        confirmButtonColor: '#3085D6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      this.$store.dispatch('topUp')
    }
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
.title {
  margin-top: -3%;
}
.ProductList{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10%;
    margin-left: 30px;
    margin-right: 30px;
}
.content {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQg9B11XyIffHOCRe7pB6ELLJ0cOGmallnBtQ&usqp=CAU");
    background-size: cover;
}
.list {
  margin: auto;
  width: 80%;
  height: 530px;
  overflow: auto;
  background-color: beige;
}
#user {
    display: inline-block;
    left: 13px;
    font-size: 10px;
    margin-top: 3%;
    margin-left: 77%;
    /* padding: 9px; */
    border: 1px solid black;
    border-radius: 10px;
}
#home-btn {
    margin-left: 77%;
    text-decoration: none;
    color: lightgreen;
}
</style>
