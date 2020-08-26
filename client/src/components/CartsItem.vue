<template>
  <div class="carts">
    <!-- <div class="navbar">
      <Navbar />
    </div>
    <div>
      <h1>Checkout List</h1>
    </div>
    <div>
      <h1>
        saldo: {{$store.state.balance}}
      </h1>
    </div> -->
    <div class="productCard">
        <h1>{{cart.Product.name}}</h1>
        <img :src="cart.Product.image" alt="" height="120px" width="90px">
        <h3>Description:</h3>
        <h4>{{cart.Product.description}}</h4>
        <h3>Price:</h3>
        <h4>{{cart.Product.pricer}}</h4>
        <h3>Stock:</h3>
        <h4>{{cart.quantity}}</h4>
        <button @click.prevent="buy({id: cart.id, quantity: cart.quantity, productId: cart.ProductId})" type="submit">Buy Now</button>
        <button @click.prevent="remove(cart.id)" type="submit">Remove This Item</button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Navbar from './Navbar.vue';

export default {
  name: 'Cart',
  props: ['cart'],
  components: {
    Navbar,
  },
  data() {
    return {
      isAdmin: false,
      quantity: '',
    };
  },
  created() {
    if (localStorage.isAdmin) {
      this.isAdmin = true;
    }
  },
  methods: {
    remove(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085D6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, destroy it!',
      })
        .then((results) => {
          if (results.value) {
            this.$store.dispatch('removeFromCart', id)
              .then(() => {
                this.$store.dispatch('fetchCarts');
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
                  title: 'Deleted successfully',
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    buy (payload) {
      this.$store.dispatch('buyItem', payload)
    }
  },
};
</script>

<style scoped>
 .productCard{
    background: blanchedalmond;
    margin: 5px;
    width: 300px;
    height: 100%;
    border-radius: 10px;
    margin-top: -8%;
    margin-bottom: 10%;
 }
 .carts {
  margin: auto;
  width: 80%;
  height: 400px;
  overflow: auto;
  background-color: beige;
    /* flex-direction: wrap; */
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
/* .navbar {
  margin-left: -1%;
} */
 .productCard button{
     margin: 2px;
 }
</style>
