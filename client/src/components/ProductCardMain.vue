<template>
  <div>
      <div class="card-body d-flex flex-row">
      </div>
      <img :src="product.image_url" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text">{{product.price}}</p>
        <p class="card-text">{{product.stock}}</p>
      </div>
      <form action="">
          <label for="addQuantity">Quantity(s):</label>
          <input type="number" name="" id="addQuantity" :max="product.stock" min="1" v-model="quantity" required>
        <button type="submit" class="btn btn-primary mb-2" @click.prevent="addProductToCart">Add To Cart </button>
      </form>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      quantity: 0
    }
  },
  methods: {
    addProductToCart () {
      console.log('product.id>>>', this.product.id)
      this.$store.dispatch('addProductToCart', { id: this.product.id, quantity: this.quantity })
    }
  }
}
</script>

<style>

</style>
