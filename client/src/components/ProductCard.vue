<template>
  <div class="col-6 col-sm-4 col-md-3">
    <b-card
        :img-src="product.image_url"
        :img-alt="product.name"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2 m-2 product-card border-0"
    >
        <b-card-text >
            <h5>{{ product.name }}</h5>
            <div class="d-flex justify-content-between">
              <p style="color: rgb(139, 219, 206)" class="font-weight-bold">Rp. {{product.price.toLocaleString()}}</p>
              <p>Stock : {{product.stock}}</p>
            </div>
        </b-card-text>

        <b-button id="btn-outline" class="mb-2 icon" @click.prevent="addToCart(product.id)">
          <b-icon icon="cart-plus" aria-hidden="true"></b-icon> <span>Add To Cart</span>
        </b-button>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  methods: {
    ...mapActions([
      'addProductToCart'
    ]),
    addToCart (id) {
      this.addProductToCart(id)
    }
  }
}
</script>

<style scooped>
.product-card {
  border-radius: 10%;
}

.card-img-top {
  width: 100%;
  height: 40vh;
  object-fit: cover;
  border-radius: 10%;
}

.card-img-top:hover {
  transform: scale(1.3);
}

#btn-outline {
  border-color: #a3d2ca;
  background-color: white;
  color: #5eaaa8;
}

#btn-outline:hover {
  background-color: #a3d2ca;
  color: white;
}

#icon-product:hover {
  color: white;
}

#span-product:hover {
  color: white;
}
</style>
