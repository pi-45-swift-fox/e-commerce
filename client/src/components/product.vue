<template>
  <div class="ml-4 mb-4">
    <b-card
      :title="this.product.name"
      :img-src="this.product.image_url"
      img-top
      style="max-width: 20rem;"
      class=""
      bg-variant="dark"
    >
      <b-card-text>{{`Rp. ${product.price.toLocaleString()}`}}</b-card-text>
      <b-card-text>stock : {{product.stock}}</b-card-text>

      <div class="d-flex justify-content-sm-around">
        <b-button variant="outline-secondary" @click="buyItem">Buy Item</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'

export default {
  name: 'Products',
  props: ['product'],
  data () {
    return {
      newCart: {}
    }
  },
  methods: {
    buyItem () {
      console.log('buy item')
      this.newCart = {
        ProductId: this.product.id,
        quantity: 1
      }
      console.log(this.newCart)
      console.log(`${this.$store.state.baseUrl}/${localStorage.userId}`)
      axios({
        method: 'post',
        url: `${this.$store.state.baseUrl}/${localStorage.userId}`,
        headers: { accesstoken: localStorage.token },
        data: this.newCart
      })
        .then(() => {
          console.log('succes add')
          this.$store.dispatch('fetchData')
          swal('yess', 'added to cart', 'success', {buttons: false})
        })
        .catch(err =>{
          swal('Oppss', 'you must login first', 'error')
          console.log(err, '<<<<<<')})
    }
  }
}
</script>


