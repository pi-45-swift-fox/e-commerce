<template>
    <div>
        <div class="col-3 my-2 ml-1">
            <div class="card" style="width: 12rem; height: 20rem;">
                <img height="170"
                :src="product.image_url"
                class="card-img-top"
                alt="image">
                <div
                class="card-body d-flex flex-column justify-content-around">
                    <a @click="detailProduct(product.id)"
                    class="detailProduct"
                    role="button">
                    <span
                    class="card-text text-truncate font-weight-bold">
                    {{product.name}}</span></a>
                    <span class="card-text text-wrap">Stock: {{product.stock}}</span>
                    <span class="card-text text-wrap">{{price}}</span>
                    <span class="card-text text-truncate">{{product.category}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Products',
  props: ['product'],
  computed: {
    price() {
      return this.product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    },
  },
  methods: {
    detailProduct(id) {
      this.$store.dispatch('findProduct', id);
    },
  },
};
</script>

<style>

</style>
