<template>
  <div>
    <b-button v-b-modal.modal-1 type="button">
      {{buttonName}}
    </b-button>
    <!-- Modal -->
    <b-modal id="modal-1" title="BootstrapVue">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form @submit.prevent="createData" class="p-5">
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
          </form>
        </div>
      </div>
  </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import jQuery from 'jquery'

export default {
  name: 'Modal',
  props: ['buttonName'],
  data () {
    return {
      name: '',
      image_url: '',
      price: 0,
      stock: 1,
      showModal: true
    }
  },
  methods: {
    ...mapActions([
      'addProducts',
      'fetchProducts'
    ]),
    createData () {
      console.log()
      this.addProducts({ name: this.name, image_url: this.image_url, price: this.price, stock: this.stock, modal: 'modal1' })
      // jQuery('#modal1').modal('hide')
    }
  }
}
</script>

<style>

</style>
