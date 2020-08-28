<template>
  <div class="container-fluid">
      <!-- Text slides with image -->
      <b-carousel-slide
        :caption="banner.title"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        :img-src="banner.image_url"
        class="img-slide"
        style="background-position: center center; background-repeat: no-repeat; overflow: hidden;"
      ></b-carousel-slide>
  </div>
</template>

<script>
export default {
  name: 'BannerSlide',
  props: ['banner']
}
</script>

<style scooped>
.img-slide{
  height: 59vh;
}
</style>
