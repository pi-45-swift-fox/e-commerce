<template>
<div>
  <tr>
    <td>
      <img :src="cart.Product.image_url" style="width:100px;height:60px;" />
    </td>
    <td>{{cart.Product.name}}</td>
    <td>{{cart.quantity}}</td>
    <td>Rp {{ Number((cart.Product.price * cart.quantity).toFixed(1)).toLocaleString()}}</td>
    <td>
      <i class="far fa-edit btn py-0 px-0 mx-2" @click="showModalEdit = !showModalEdit"></i>
      <i class="far fa-trash-alt btn py-0 px-0" @click="showModalDelete = !showModalDelete"></i>
    </td>
  </tr>
</div>
</template>

<script>
export default {
  name: "CartData",
  data() {
    return {
      showModalDelete: false,
      showModalEdit: false,
      quantity: ''
    }
  },
  props: ["cart", "no"],
  methods: {
    editProductCart() {
      let payload = {
        ProductId: this.cart.ProductId,
        quantity: this.quantity,
      }
      this.$store.dispatch('editProductCart', payload)
      this.showModalEdit = false
    },
    deleteProductCart() {
      this.$store.dispatch('deleteProductCart', this.cart.ProductId)
      this.showModalDelete = false
    }
  }
};
</script>

<style>

.cardData {
  color: goldenrod;
}
</style>