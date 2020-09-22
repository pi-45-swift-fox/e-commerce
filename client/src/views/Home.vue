<template>
  <div class="home vh-100 overflow-auto">
    <Navbar class="shadow fixed-top" />
    <b-container fluid="xl" class="tags">
      <div>
        <b-alert v-if="alert" show variant="danger">
          You are unauthorized please login/register <router-link to="/login">here</router-link>
        </b-alert>
      </div>
      <h1>Start discovering products: </h1>
    </b-container>
    <b-container fluid="xl" class="dashboard shadow-lg rounded-lg overflow-auto">
      <div class="product-container">
        <div class="item rounded-lg shadow" v-for="product in $store.state.products" :key="product.id">
          <img class="image" :src="product.image_url" alt="">
          <h4>{{product.name}}</h4>
          <h6>Rp. {{product.price}}</h6>
          <div>
            <b-button size="sm" @click="addCart(product.id)" variant="success" class="rounded-pill mr-2 mb-2 shadow"><b-icon-cart></b-icon-cart> Cart</b-button>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  data () {
    return {
      alert: false
    }
  },
  methods: {
    addCart (id) {
      if (!localStorage.access_token) {
        this.alert = true
      }

      this.$store.dispatch('addCart', {
        quantity: 1,
        status: true,
        ProductId: id
      })
    }
  },
  created () {
    this.$store.dispatch('fetchData')
    this.alert = false
  }
}
</script>

<style media="screen" scoped>
.home {
  background-color: #FBF7ED;
  font-family: 'Alata', sans-serif;
  color: #004C3F;
}

.dashboard {
  background-color: #002E25;
  margin-top: 1rem;
  padding: 50px;
  color: #FBF7ED;
  margin-bottom: 4rem;
}

.tags {
  margin-top: 8rem;
}

.product-container {
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.item {
  padding: 15px;
  margin: 10px;
  border: 1px solid #FBF7ED;
  background-color: #004C3F;
  height: auto;
}

.image {
  width: 200px;
  height: 250px;
}
</style>
