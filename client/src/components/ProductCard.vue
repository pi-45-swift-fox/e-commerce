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
      <button type="submit" class="btn btn-primary mb-2" >Add To Cart </button>
  </div>
</template>

<script>
export default {
  props: ['product']
}
</script>

<style>

</style>
