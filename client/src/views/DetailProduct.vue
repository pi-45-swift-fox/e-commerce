<template>
    <section>
        <div class="container">
            <h2 class="text-center my-5" style="font-family: 'Bungee', cursive;">Detail Product</h2>
            <div class="d-flex justify-content-center boxSection py-5">
                <img width="300"
                :src="$store.state.product.image_url"
                alt="image">
                <div class="ml-5">
                    <h3><b>{{$store.state.product.name}}</b></h3>
                    <div>
                        <form @submit.prevent="addCart">
                            <div class="d-flex mt-5">
                                <div class="mr-3">
                                    <h4>Price</h4>
                                    <h4 class="mb-4">Quantity</h4>
                                    <h5 class="font-weight-bold">Total</h5>
                                </div>
                                <div>
                                    <h4>{{price}}</h4>
                                    <input v-model="quantity" type="number" min="0" class="mb-3">
                                    <h5 class="font-weight-bold">{{totalInIDR}}</h5>
                                </div>
                            </div>
                            <button class="btn btnBuy mt-4" type="submit">Add to Cart</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'DetailProduct',
  data() {
    return {
      total: 0,
      quantity: 0,
    };
  },
  created() {
    this.$store.dispatch('findProduct', this.$route.params.id);
  },
  watch: {
    quantity() {
      this.total = this.quantity * this.$store.state.product.price;
    },
  },
  computed: {
    price() {
      return this.$store.state.product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    },
    totalInIDR() {
      return this.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    },
  },
  methods: {
    addCart() {
      if (!localStorage.access_token) {
        Swal.fire(
          'Please login first.',
          'We will direct you to our login page.',
          'warning',
        );
        this.$router.push({ name: 'Login' });
      } else if (this.quantity === 0) {
        Swal.fire(
          'Warning!',
          'Quantity must be more than zero!',
          'error',
        );
      } else {
        const newCart = {
          ProductId: this.$store.state.product.id,
          quantity: this.quantity,
        };
        this.$store.dispatch('addCart', newCart);
      }
    },
  },
};
</script>

<style>

</style>
