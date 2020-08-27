<template>
    <div class="carousel-item">
        <a @click="filterProducts(banner.id)" role="button">
            <img style="height: 400px; width: 600px;"
            :src="banner.image_url"
            class="d-block w-100" alt="banner">
        </a>
    </div>
</template>

<script>
export default {
  name: 'Carousels',
  props: ['banner'],
  methods: {
    filterProducts(id) {
      this.$store.commit('FILTER_PRODUCT', id);
    },
  },
};
</script>

<style>

</style>
