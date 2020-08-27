<template>
  <div>
    <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="1000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide class="h-25"
      v-for="product in this.products" :key="product.id" :product="product"
        :caption="product.name"
        :text="product.price"
        :img-src="product.image_url"
        height=720
      ></b-carousel-slide>
    </b-carousel>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Carousel',
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  computed: mapState([
    'products'
  ])
}
</script>
<style scoped>

</style>
