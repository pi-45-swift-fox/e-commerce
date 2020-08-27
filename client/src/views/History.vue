<template>
<div class="bg-color">
  <h1>History Transactions</h1>
    <div class="container color">

      <table class="table table-hover">

        <thead>
          <tr id="totalPrice">
            <th scope="row">#</th>
            <td colspan="3" style="font-size:30px;">Total Price</td>
            <td colspan="2" style="font-size:30px;">IDR {{ $store.state.totalPrice.toLocaleString() }}</td>
            <td scope="col" >
              <button class="btn btn-success" @click.prevent="paymentCart" style="font-size:25px">
                Payment
              </button>
            </td>
         </tr>
          <tr>
            <th scope="col">#</th>
            <!-- <th scope="col">Checkout?</th> -->
            <th scope="col">Price</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Image</th>
            <th scope="col">Quantity</th>
            <th scope="col">Delete?</th>
          </tr>
        </thead>
        <tbody>

          <CartTable v-for="(cart, index) in carts" :key="cart.id" :cart="cart" :index="index"></CartTable>
        </tbody>
      </table>
    </div>
</div>
</template>

<script>
import CartTable from '../components/CartTable.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Cart',
  data () {
    return {
      totalPrice: ''
    }
  },
  computed: {
    ...mapState([
      'carts'
    ])
  },
  components: {
    CartTable
  },
  methods: {
    ...mapActions([
      'updateStatusCart'
    ]),
    paymentCart () {
      this.updateStatusCart()
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
      .then(data => {
        console.log(data)
      })
  }
}
</script>

<style scoped>
.bg-color {
  height: auto;
  width: 95vw;
  color: white;
}

h1 {
  color:#ffce00;
  font-family: 'Oswald', sans-serif;
  font-size: 80px;
  cursor: pointer;
  text-shadow: 2px 2px 4px darkgoldenrod;
  margin-bottom: 35px;
}

h1:hover {
  text-shadow: 2px 2px 4px #000000;
}

.color {
  background-color: #BEC7B4;
}

img {
  height: 100px;
  width: auto;
}
</style>
