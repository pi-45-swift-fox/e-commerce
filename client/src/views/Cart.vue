<template lang="html">
  <div class="cart vh-100 overflow-auto">
    <Navbar class="shadow fixed-top nav" />
    <b-container fluid="xl" class="dashboard shadow-lg rounded-lg overflow-auto">
      <router-link to="/" style="color: #FBF7ED;">&lt; continue shopping</router-link>
      <div class="grid">
        <div class="grid-item-1 mt-4">
          <div>
            <img class="shadow profile-pic mr-3" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png">
          </div>
          <div class="profile mt-3">
            <h6>user email here</h6>
            <p>Total cart items: {{$store.state.cart.length}}</p>
          </div>
        </div>
      </div><hr>
      <div class="cart-items overflow-auto">
        <h1 v-if="$store.state.cart.length < 1" class="text-center" style="font-size: 48px;">Your cart is empty</h1>
        <div v-else class="">
          <div class="" v-for="(cart, index) in $store.state.cart" :key="index">
            <div class="product-item mb-2">
              <div class="">
                <img class="product-pic" :src="cart.Product.image_url">
              </div>
              <div class="">
                <h2>{{cart.Product.name}}</h2>
                <h5>Qty. {{cart.quantity}}</h5>
                <p>Rp. {{cart.Product.price}}</p>
                <a @click.prevent="setProduct(cart)" v-b-modal.modal-prevent-closing href="">Add quantity</a> | <a @click.prevent="deleteItem(cart.id)" href="" class="text-danger">Remove product</a><br>
              </div>
            </div>
            <div class="line-1"></div>
          </div>
          <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Add new product"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
          >
            <form ref="form" @submit.stop.prevent="handleSubmit">
              <b-form-group
                :state="quantityState"
                label="Stock"
                label-for="stock-input"
                invalid-feedback="Quantity is required"
              >
                <b-form-input
                  id="stock-input"
                  v-model="quantity"
                  :state="quantityState"
                  required
                  type="number"
                  min="1"
                  :max="stock"
                  placeholder="enter product quantity"
                ></b-form-input>
              </b-form-group>
            </form>
          </b-modal>
        </div>
      </div><hr>
      <div class="">
        <div v-if="$store.state.cart.length < 1">
          <b-button disabled variant="danger" class="rounded-pill mr-2 mb-2 shadow"><b-icon-trash></b-icon-trash> Empty cart</b-button>
        </div>
        <div v-else>
          <b-button @click="clearCart" variant="danger" class="rounded-pill mr-2 mb-2 shadow"><b-icon-trash></b-icon-trash> Empty cart</b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Cart',
  data () {
    return {
      quantity: '',
      quantityState: null,
      cartId: '',
      stock: ''
    }
  },
  components: {
    Navbar
  },
  methods: {
    deleteItem (id) {
      this.$store.dispatch('deleteItem', id)
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()

      this.quantity ? this.quantityState = true : this.quantityState = false
      return valid
    },
    resetModal () {
      this.quantity = ''
      this.quantityState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }

      this.$store.dispatch('updateItem', {
        id: this.cartId,
        quantity: this.quantity,
        state: true
      })
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },
    setProduct (cart) {
      this.stock = cart.Product.stock
      this.cartId = cart.id
    },
    clearCart () {
      this.$store.state.cart.forEach(x => {
        this.$store.dispatch('deleteItem', x.id)
      })
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style lang="css" scoped>
.cart {
  background-color: #FBF7ED;
  font-family: 'Alata', sans-serif;
  color: #004C3F;
}

.dashboard {
  background-color: #002E25;
  margin-top: 8.5rem;
  padding: 40px;
  color: #FBF7ED;
  margin-bottom: 4rem;
}

.profile-pic {
  width: 50px;
  border-radius: 100%;
}

.grid-item-1 {
  display: flex;
  align-items: center;
}

.grid {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.cart-items {
  height: 24rem;
  padding: 10px;
}

.product-pic {
  width: 125px;
  margin-right: 20px;
}

.product-item {
  display: flex;
}

.line-1 {
  height: 1px;
  width: 60%;
  background-color: #FBF7ED;
  margin: 1.5em auto;
}
</style>
