<template>
    <div>
     <div class="container" v-for="cart in cartsPaid" :key="cart.id">
      <h3 class="mt-5">Your history of product's shopped</h3>
      <b-card :img-src="cart.Product.image_url" img-alt="Card image" img-left class="mb-3 mt-3">
        <b-card-text>
          <h5>{{ cart.Product.name }}</h5>
          <h6>Rp. {{ cart.Product.price.toLocaleString() }}</h6>
          <h6>Quantity : {{ cart.quantity }}</h6>
          <h6>Status : {{ cart.status }}</h6>
        </b-card-text>
      </b-card>
     </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'History',
  computed: {
    ...mapState([
      'carts'
    ]),
    cartsPaid () {
      return this.carts.filter(cart => {
        return cart.status === 'paid'
      })
    }
  }
}
</script>

<style scooped>
.card-img-left {
  width: 20vw;
  height: 30vh;
  object-fit: cover;
}
</style>
