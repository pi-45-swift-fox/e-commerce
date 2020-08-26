<template>
  <div id="Cart">
    <b-container fluid class="bv-example-row mb-5">
      <h3 v-if="cartsUnpaid.length < 1" class="mt-5">No Products added to your cart</h3>
      <div v-else>
      <h4 class="mt-3 font-weight-bold">Your Products in Cart</h4>
        <table class="table table-hover rounded">
        <thead style="background-color: #a3d2ca;" class="text-black-50">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">SubTotal</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <CartTable v-for="cart in cartsUnpaid" :key="cart.id" :cart="cart" ></CartTable>
        </tbody>
      </table>
      <div class="container d-flex justify-content-between">
        <b-button class="mb-2" id="icon-pay" @click.prevent="willPay(cartSelected.id)">
          <b-icon icon="credit-card" style="color: white;" aria-hidden="true"></b-icon> &nbsp; <span>Pay Now</span>
        </b-button>
        <h5 class="font-weight-bold">
           Total : Rp. {{ total.toLocaleString() }}
        </h5>
      </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import CartTable from '../components/CartTable'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Cart',
  components: {
    CartTable
  },
  computed: {
    ...mapState([
      'carts',
      'total',
      'cartSelected'
    ]),
    cartsUnpaid () {
      return this.carts.filter(cart => {
        return cart.status === 'unpaid'
      })
    }
  },
  methods: {
    ...mapActions([
      'getCarts',
      'updateStatus'
    ]),
    setTotal (total) {
      this.total = total
    },
    willPay (id) {
      this.updateStatus(id)
    }
  },
  created () {
    this.getCarts()
  }
}
</script>

<style scooped>
#icon-pay {
  border-color: #a3d2ca;
  background-color: #5eaaa8;
  color: white;
}

#icon-pay:hover {
  border-color: #056676;
  background-color: #056676;
  color: white;
}
</style>
