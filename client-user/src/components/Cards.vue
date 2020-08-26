<template>
    <div class="col-md-3 col-sm-6 my-5">
      <b-card :img-src="product.image_url">
          <p class="card-title"><span>
            {{product.name}}
            </span>
            </p>
        <b-card-text>
          Price: <br>
          Rp.{{product.price.toLocaleString()}}
        </b-card-text>
        <br>
        STOCK : {{product.stock}}
        <br>
        <br>
        <div class="row mx-auto justify-content-around">
          <b-button @click.prevent='addToCart' variant="outline-success" size="md" class="rounded-pill">Add to cart</b-button>
        </div>
      </b-card>
      <div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Cards',
  props: ['product'],
  data () {
    return {
      id: ''
    }
  },
  methods: {
    addToCart () {
      this.$store.state.cart.push(this.product)
    }
  }
}
</script>

<style scoped>
img{
  height: 200px;
  object-fit: cover;
}
.card-title{
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-title:hover{
  overflow:visible;
  white-space: normal;
}

.card-title:hover span{
  background-color: white;
  box-shadow: 0 0 4px 0 black;
  border-radius: 2px;
  z-index: 10;
}

</style>
