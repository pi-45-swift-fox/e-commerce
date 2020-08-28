<template>
  <div>
    <div class="mx-lg-5 my-lg-5">
      <b-card :title="product.name" :img-src="product.image_url" img-alt="Image" img-top tag="article"
        style="max-width: 20rem;" class="mb-2">
        <b-card-text> <br>
          Price: <br>
          Rp.{{product.price}}
        </b-card-text>
        <br>
        STOCK : {{product.stock}}
        <br>
        <br>
        <div class="row mx-auto justify-content-around">
          <b-button @click.prevent='showModals' size="md" class="rounded-pill">Update Product</b-button>
          <b-button @click.prevent='deleteProduct(product.id)' class="rounded-pill" variant="outline-danger">Delete
          </b-button>
        </div>
      </b-card>
      <div>
      <!-- modal -->
        <div v-if="show" style="display: block; padding-right: 15px;" class="modal fade show" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <form @submit.prevent="updateProduct(product)" class="p-5">
                <div class="form-group">
                  <label>Product Name</label> <br>
                  <input v-model="name" type="text" class="form-control" placeholder="Enter The Product Name">
                </div>
                <div class="form-group">
                  <label>Image Url</label><br>
                  <input v-model="image_url" type="text" class="form-control" placeholder="Image Url">
                </div>
                <div class="form-group">
                  <label>Price</label><br>
                  <input v-model="price" type="number" class="form-control" placeholder="Price">
                </div>
                <div class="form-group">
                  <label>Stock</label><br>
                  <input v-model="stock" type="number" class="form-control" placeholder="Stock">
                </div>
                <button type="submit" class="btn btn-outline-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <!-- modal -->
      </div>
    </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from '../components/Modal'

export default {
  name: 'Cards',
  data () {
    return {
      name: this.product.name,
      image_url: this.product.image_url,
      price: this.product.price,
      stock: this.product.stock,
      show: false
    }
  },
  components: Modal,
  props: ['product'],
  methods: {
    ...mapActions([
      'deleteProducts',
      'updateProducts'
    ]),
    deleteProduct (id) {
      this.deleteProducts(id)
    },
    showModals (id) {
      this.show = true
    },
    updateProduct (product) {
      this.updateProducts({ id: product.id, name: this.name, image_url: this.image_url, price: this.price, stock: this.stock })
      this.show = false
    }
  }
}
</script>

<style>

</style>
