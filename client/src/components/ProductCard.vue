<template>
  <div class="mt-4">
      <div class="card col-sm-10" style="width: 17rem;">
        <img :src="product.image_url" class="card-img-top" alt="">
        <div class="card-body">
          <h3 class="card-title">{{product.name}}</h3>
          <h5>Rp. {{product.price.toLocaleString()}}</h5>
          <h5>stock: {{product.stock}}</h5>
          <div>
            <button @click.prevent="addToCart()" type="button" class="btn btn-outline-dark">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'ProductCard',
  data () {
    return {
      duplicate: false,
      cartId: 0
    }
  },
  props: ['product'],
  methods: {
    ...mapActions([
      'addCart',
      'cartQuantityIncrement'
    ]),
    addToCart () {
      if (!this.duplicate) {
        this.addCart(this.product.id)
      } else if (this.duplicate) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You already have this item on your cart!'
        })
      }
    }
  },
  mounted () {
  },
  created () {
    this.$store.dispatch('fetchCarts')
    const data = this.$store.state.carts
    for (let i = 0; i < data.length; i++) {
      if (data[i].ProductId === +this.product.id) {
        this.duplicate = true
        this.cartId = data[i].id
      }
    }
  }
}
</script>

<style scoped>
img {
  height: 150px;
  width: auto;
}
.card-title {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-title:hover {
  overflow:visible;
  white-space: normal;
}

.card-title:hover span {
  background-color: white;
  box-shadow: 0 0 4px 0 black;
  border-radius: 2px;
  z-index: 10;
}
</style>
