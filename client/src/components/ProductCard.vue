<template>
  <div class="col-sm-12 col-md-6 col-lg-4">
    <b-card
        :title="product.name"
        :img-src="product.image_url"
        img-alt="Image"
        img-top
        tag="article"
        style="width: 20rem;"
        class="mb-2 mx-1 bg-color card-title "
    >
        <b-card-text>
          Price : Rp.{{ product.price.toLocaleString() }}
          <br>
          Stock : {{ product.stock }} pcs
        </b-card-text>
        <b-button id="addCart" @click.prevent="addCart" variant="success">Add To Cart</b-button>

    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    ...mapActions([
      'AddToCart'
    ]),
    addCart () {
      this.AddToCart(this.product.id)
    }
  }
}
</script>

<style scoped>

.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-title:hover {
  white-space: normal;
  cursor: pointer;
}

  * {
    color: #143109;
  }
  img {
    max-height: 20rem;
    min-height: 20rem;
    width: auto;
  }

  .bg-color {
    background-color: #8DA290;
    transition: transform .2s; /* Animation */
  }

  .bg-color:hover {
    box-shadow: -1px 3px 18px 4px rgba(255,255,255,1);
    transform: rotate(2deg);
    transform: scale(1.1);
  }

  #editBtn {
    background-color: #4F9EC4;
    color: #C6DDF0;
    font-size: larger;
    padding: 5px;
    width: 80px;
    margin-right: 10px;
  }

  #editBtn:hover {
    /* background-color: #02075d; */
    background-color: #C6DDF0;
    color: #4F9EC4;
    font-size: larger;
  }

  #delBtn {
    background-color: #F24333;
    color: #F2D398;
    font-size: larger;
    padding: 5px;
    width: 80px;
  }

  #delBtn:hover {
    background-color: #F2D398;
    color: #F24333;
    font-size: larger;
  }
</style>
