<template>
    <div id="productCard">
        <h1>{{product.name}}</h1>
        <img :src="product.image" alt="" height="120px" width="90px">
        <h3>Description:</h3>
        <h4>{{product.description}}</h4>
        <h3>Price:</h3>
        <h4>{{product.pricer}}</h4>
        <h3>Stock:</h3>
        <h4>{{product.stock}}</h4>
            <form v-if="$store.state.isLogin" @submit.prevent="addToCart(product.id)">
                <input type="number" min="1" v-model="quantity">
                <button type="submit">Add To Cart</button>
            </form>
						<div v-else>
							<a href="#" @click.prevent="toLogin">
								<h5 style="color:red;">Login first to Buy this Product!</h5>
							</a>
						</div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'productCard',
  props: ['product'],
  data() {
    return {
      isAdmin: false,
      quantity: 1,
    };
  },
  created() {
    if (localStorage.isAdmin) {
      this.isAdmin = true;
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login');
    },
    addToCart(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Add This Product to Cart',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085D6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it to cart!',
      })
        .then((results) => {
          if (results.value) {
            this.$store.dispatch('addToCart', { quantity: +this.quantity, id })
              .then((result) => {
                // this.$store.dispatch('fetchCarts');
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                  },
                });
                Toast.fire({
                  icon: 'success',
                  title: 'added successfully',
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$store.dispatch('addToCart', { quantity: +this.quantity, id });
    },
  },
};
</script>

<style scoped>
 #productCard {
    background: blanchedalmond;
    margin: 5px;
    width: 300px;
    height: 100%;
    border-radius: 10px;
    margin-top: -8%;
    margin-bottom: 10%;
    /* margin-left: 2%; */
 }
 h1{
     font-size: 20px;
 }
 h3{
     font-size: 14px;
 }
 h4{
     font-size: 12px;
 }
</style>
