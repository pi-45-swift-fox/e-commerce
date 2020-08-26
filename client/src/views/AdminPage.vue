<template>
  <div>
    <div class="my-3">
      <b-navbar toggleable="lg" type="dark" variant="white">
        <b-img class="my-auto" src="https://www.pngmart.com/files/11/Technology-PNG-Free-Download.png" alt="Left image"
          width="100px"></b-img>
        <b-navbar-brand class="text-dark">UniversalTechnology</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <h1 class="display-5 mx-auto">
          Welcome Admin
        </h1>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div class="mr-5">
            <button @click.prevent="logout" class="btn btn-outline-danger">
              Logout
            </button>
          </div>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div>
      <!-- modal -->
      <Modal :buttonName="'Add Product'" />
      <!-- modal -->
    </div>
    <div class="d-sm-flex justify-content-around flex-wrap mx-5 my-5">
      <Cards v-for="product in this.$store.state.data" :key='product.id' :product='product' />
    </div>
    </div>

</template>

<script>
import Cards from '../components/Cards'
import { mapMutations, mapActions } from 'vuex'
import Modal from '../components/Modal'
export default {
  name: 'Home',
  data () {
    return {
      name: '',
      image_url: '',
      price: 0,
      stock: 0
    }
  },
  components: {
    Cards,
    Modal
  },
  methods: {
    ...mapMutations([
    ]),
    ...mapActions([
      'addProducts'
    ]),
    logout () {
      localStorage.clear()
      this.$router.push('/')
    },
    addProduct () {
      this.addProducts({ name: this.name, image_url: this.image_url, price: this.price, stock: this.stock })
    }
  },

  created () {
    this.$store.dispatch('fetchProducts')
  }
}

</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.navbar{
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 100vw;
  padding: 0px;
  height: 10vh;
  border-bottom: 4px solid gray;
  color: #004d7b;
  border-color: #004d7b ;
}
</style>
