<template>
  <div>
      <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
      <b-button type="button" @click.prevent="logout" variant="primary">Logout</b-button>
      <b-button type="button" @click.prevent="mainPage" variant="primary">Go to Main Page</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
      <b-form @submit.prevent="onSubmit" @reset="reset">
        <h2>Update Product</h2>
      <b-form-group
        id="input-group-1"
        label="Product's status:"
        label-for="input-1"
      >
        <select name="" id="" v-model="status">
            <option value="Pending" selected>Pending</option>
            <option value="Confirmed">Confirmed</option>
        </select>
      </b-form-group>

      <b-form-group id="input-group-2" label="Product's Quantity:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="quantity"
          required
          placeholder="Enter New Quantity"
          type="number"
          min = "1"
          :max = "$store.state.updatedCartProduct.stock + $store.state.updatedCart.quantity"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: '',
      quantity: 0
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('updateCart', { productId: this.$store.state.updatedCart.productId, status: this.status, quantity: this.quantity })
      this.reset()
    },
    reset () {
      this.status = ''
      this.quantity = 0
    },
    defaultValue () {
      this.status = this.$store.state.updatedCart.status
      this.quantity = this.$store.state.updatedCart.quantity
    },
    logout () {
      this.$store.dispatch('logout', {})
    },
    mainPage () {
      this.$store.commit('BACK_TO_MAIN')
    }
  },
  created () {
    this.defaultValue()
  }
}
</script>

<style>

</style>
