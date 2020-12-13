<template>
    <section class="boxSection">
        <div class="text-center my-5">
            <h1 style="font-family: 'Bungee', cursive;">My Cart</h1>
        </div>
        <div>
            <div class="my-5 mx-5 d-flex flex-column">
                <table
                class="table table-borderless align-self-center text-center"
                style="width: 80rem;">
                    <thead>
                        <tr>
                          <th scope="col">Image</th>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                      <Carts
                      v-for="(cart, idx) in $store.state.carts"
                      :key="idx" :cart="cart"></Carts>
                    </tbody>
                </table>
                <div class="text-center">
                  <h4 class="text-center"><b>Total</b></h4>
                  <h3>{{formatTotal}}</h3>
                </div>
                <button @click="checkout" class="btnCheckOut btn">Checkout</button>
            </div>
        </div>
    </section>
</template>

<script>
import Carts from '../components/CartDatas.vue';

export default {
  name: 'Cart',
  components: {
    Carts,
  },
  created() {
    this.$store.dispatch('showCarts');
    console.log(this.$store.state.carts, 'ini semua');
  },
  computed: {
    total() {
      const { carts } = this.$store.state;
      let totalPrice = 0;
      carts.forEach((element) => {
        totalPrice += (element.quantity * element.Product.price);
      });

      return totalPrice;
    },
    formatTotal() {
      return this.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    },
  },
  methods: {
    checkout() {
      const data = {
        ProductId: '',
        quantity: '',
      };
      const { carts } = this.$store.state;
      carts.forEach((element) => {
        data.ProductId = element.ProductId;
        data.quantity = element.quantity;
        this.$store.dispatch('editProductStock', data);
        data.ProductId = '';
        data.quantity = '';
      });
      this.$store.dispatch('deleteAllCarts');
    },
  },
};
</script>

<style>

</style>
