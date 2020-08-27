<template>
<div class="col-md-3 col-sm-6 mx-3 my-5" id="CARDS">
    <b-card :img-src="product.image_url" >
      <p class="card-title"><span>
          {{product.name}}
        </span>
      </p>
      <div class="row">
        <div class="col">
          <b-card-text>
            Price: <br>
            Rp.{{product.price.toLocaleString()}}
          </b-card-text>
        </div>
        <div class="col">
          STOCK :
          <br>{{product.stock}}
        </div>
      </div>
      <br>
      <br>
      <div class="row mx-auto justify-content-around">
        <b-button @click.prevent='addToCart({id: product.id, name: product.name})' variant="outline-success" size="md" class=" rounded-pill">
        <b-icon icon="cart-plus"></b-icon>Add to cart
        </b-button>
      </div>
    </b-card>
    <div>
</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import VueSwal from 'vue-swal'
// import swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export default {
  name: 'Cards',
  props: ['product'],
  data () {
    return {
      id: ''
    }
  },
  methods: {
    ...mapActions([
      'addToCart'
    ])
  }
}
</script>

<style scoped>
img{
  height: 300px;
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
#CARDS{
  padding: 0px;
  margin: 10px;
}
#CARDS:hover{
   box-shadow: 2s 0px 0px 33px -8px rgba(0,0,0,0.79);
}

</style>
