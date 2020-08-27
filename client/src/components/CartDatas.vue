<template>
    <tr>
        <td scope="row">
            <img width="50"
            :src="cart.Product.image_url"
            alt="image">
        </td>
        <td style="width: 20rem;">{{cart.Product.name}}</td>
        <td style="width: 20rem;">{{price}}</td>
        <td>{{cart.quantity}}</td>
        <td>
            <a @click="deleteCart(cart.id)" role="button" class="btn btn-danger">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </a>
        </td>
    </tr>
</template>

<script>
export default {
  name: 'CartDatas',
  props: ['cart'],
  computed: {
    price() {
      return (this.cart.Product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }));
    },
  },
  methods: {
    deleteCart(id) {
      console.log(id, 'ini id');
      this.$store.dispatch('deleteCart', id);
    },
  },
};
</script>

<style>

</style>
