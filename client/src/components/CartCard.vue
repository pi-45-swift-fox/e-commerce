<template>
  <div v-if="!cart.status" class="col-sm-12">
    <div v-if="cart.id != 0" class="card mb-3 container" style="max-width: 800px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <div>
            <img :src="cart.Product.image_url" class="card-img" alt="">
          </div>
          <div class="mt-2 mb-2">
            <button @click.prevent="deleteCart()" class="btn btn-sm btn-danger">
              <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h3 class="card-title">{{cart.Product.name}}</h3>
            <h5>Rp. {{totalPricePerProduct.toLocaleString()}}</h5>
            <h5>stock: {{cart.Product.stock}}</h5>
            <div>
              <label for="">Quantity</label>
              <br>
              <button @click.prevent="subQty()" type="button" class="btn btn-light cs-btn-curve" :disabled=minusDisable>-</button>
              <button class="btn btn-primary cs-btn-curve" disabled>{{quantity}}</button>
              <button @click.prevent="addQty()" type="button" class="btn btn-light cs-btn-curve" :disabled=plusDisable>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  name: 'CartCard',
  props: ['cart'],
  data () {
    return {
      quantity: 1,
      totalPricePerProduct: 0
    }
  },
  methods: {
    addQty () {
      this.quantity++
      this.totalPricePerProduct = this.quantity * this.cart.Product.price
      this.$store.dispatch('cartQuantityIncrement', { cartId: this.cart.id, ProductId: this.cart.Product.id })
      this.$store.dispatch('fetchCarts')
    },
    subQty () {
      this.quantity--
      this.totalPricePerProduct = this.quantity * this.cart.Product.price
      this.$store.dispatch('cartQuantityDecrement', { cartId: this.cart.id, ProductId: this.cart.Product.id })
      this.$store.dispatch('fetchCarts')
    },
    deleteCart () {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This item will be removed from your cart!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('cartDelete', { cartId: this.cart.id, ProductId: this.cart.ProductId })
        }
      })
    }
  },
  computed: {
    minusDisable () {
      if (this.quantity <= 1) {
        return true
      } else {
        return false
      }
    },
    plusDisable () {
      if (this.quantity >= this.cart.Product.stock) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.quantity = this.cart.quantity
    this.totalPricePerProduct = this.quantity * this.cart.Product.price
    this.$store.dispatch('fetchCarts')
  },
  created () {
  }
}

</script>

<style scoped>
  .cs-btn-curve {
    border-radius: 50%;
    margin: 5px;
  }

  img {
    height: 180px;
    width: auto;
  }

  #cscard {
    width: 800px;
  }

</style>
