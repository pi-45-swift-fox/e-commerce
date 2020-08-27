<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
        <div class="col-8">
            <form @submit.prevent="editProduct">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="name"
                        placeholder="e.g: Harimau di Dalam Kubur">
                </div>
                <div class="form-group">
                  <label>Image URL</label>
                  <input type="text" class="form-control" v-model="image_url"
                        placeholder="The most powerful scene in a movie">
                </div>
                <div class="form-group">
                    <label>Price</label>
                    <input type="number" class="form-control" v-model="price">
                </div>
                <div class="form-group">
                    <label>Stock</label>
                    <input type="text" class="form-control" v-model="stock">
                </div>
                <button type="submit" class="btn btn-outline-success">Edit</button>
                <a class="btn btn-outline-info ml-3" @click="cancel">Cancel</a>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
export default {
  data () {
    return {
      name: this.$store.state.product.name,
      image_url: this.$store.state.product.image_url,
      price: this.$store.state.product.price,
      stock: this.$store.state.product.stock
    }
  },
  methods: {
    editProduct () {
      const updateProduct = {
        name: this.name,
        image_url: this.image_url,
        price: +this.price,
        stock: +this.stock
      }
      console.log(updateProduct)
      console.log(this.$store.state.baseUrl + '/product/' + this.$store.state.product.id)
      axios({
        method: 'put',
        url: this.$store.state.baseUrl + '/products/' + this.$store.state.product.id,
        headers: { accesstoken: localStorage.token },
        data: updateProduct
      })
        .then(() => {
          console.log('success edit')
          swal('Success', 'product success update', 'success', { buttons: false })
          this.$router.push({ name: 'Home' })
        })
        .catch(err => console.log(err.msg))
    },
    cancel () {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>

</style>
