<template>
  <tr>
    <td>
      <img class="img-square" :src="cart.Product.image_url" />
    </td>
    <td class>{{ cart.Product.name }}</td>
    <td>Rp. {{ cart.Product.price.toLocaleString() }}</td>
    <td> {{ cart.quantity }} </td>
    <td>Rp. {{ (cart.quantity * cart.Product.price).toLocaleString() }} </td>
  </tr>
</template>

<script>
export default {
  props: {
    cart: Object
  },
  methods: {
    async edit() {
      await this.$store.dispatch("update_cart", {
        id: this.cart.id,
        prev_val: this.cart.quantity,
        max: this.cart.Product.stock
      });
    },
    async remove() {
      await this.$store.dispatch("remove_cart", this.cart.id);
    }
  }
};
</script>

<style>
.img-square {
  object-fit: cover;
  width: 80px;
  height: 80px;
}
</style>
