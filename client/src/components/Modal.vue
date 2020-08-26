<template>
  <div>
    <button type="button" class="btn btn-outline-primary btn-lg mt-5 " data-toggle="modal" data-target="#modal1">
      {{buttonName}}
    </button>
    <!-- Modal -->
    <div class="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form @submit.prevent="addProduct" class="p-5">
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
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['buttonName'],
  data () {
    return {
      name: '',
      image_url: '',
      price: 0,
      stock: 0
    }
  }
}
</script>

<style>

</style>
