<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="rgb(139, 219, 206)"
      img-width="100%"
      img-height="60%"
      img-top
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      class="rounded"
    >

    <SlideCarousel v-for="banner in banners" :key="banner.id" :banner="banner"></SlideCarousel>
    </b-carousel>
  </div>
</template>

<script>
import SlideCarousel from './SlideCarousel'
import { mapState } from 'vuex'

export default {
  name: 'Carousel',
  components: {
    SlideCarousel
  },
  computed: {
    ...mapState([
      'banners'
    ])
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

<style scooped>
#carousel-1 {
  height: 60vh;
}
</style>
