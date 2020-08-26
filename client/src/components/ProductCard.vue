<template>
  <div class="mt-4">
      <div class="card col-sm-10" style="width: 17rem;">
        <img :src="product.image_url" class="card-img-top" alt="">
        <div class="card-body">
          <h3 class="card-title">{{product.name}}</h3>
          <h5>Rp. {{product.price.toLocaleString()}}</h5>
          <h5>stock: {{product.stock}}</h5>
          <div>
            <!-- Modal component -->
            <CartModal :product="product" />
              <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CartModal from './CartModal.vue'

export default {
  name: 'ProductCard',
  components: {
    CartModal
  },
  props: ['product'],
  data () {
    return {
      quantity: 1
    }
  },
  methods: {
    ...mapActions([
      'addCart'
    ])
  },
  computed: {

  }
}
</script>

<style scoped>
img {
  height: 150px;
  width: auto;
}
.card-title {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-title:hover {
  overflow:visible;
  white-space: normal;
}

.card-title:hover span {
  background-color: white;
  box-shadow: 0 0 4px 0 black;
  border-radius: 2px;
  z-index: 10;
}
</style>
