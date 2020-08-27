<template>
<div>
  <tr>
    <td>
      <img :src="cart.Product.image_url" style="width:100px;height:60px;" />
    </td>
    <td>{{cart.Product.name}}</td>
    <td>{{cart.quantity}}</td>
    <td>Rp {{ Number((cart.Product.price * cart.quantity).toFixed(1)).toLocaleString()}}</td>
    <td>
      <i class="far fa-edit btn py-0 px-0 mx-2" @click="showModalEdit = !showModalEdit"></i>
      <i class="far fa-trash-alt btn py-0 px-0" @click="showModalDelete = !showModalDelete"></i>
    </td>
  </tr>
    <!-- Modal Delete-->
    <div class="loadingModal" v-if="showModalDelete">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete Confirmation</h5>
              <button type="button" class="close" @click="showModalDelete = !showModalDelete">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">Delete this product ?</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="showModalDelete = !showModalDelete"
              >Close</button>
              <button type="button" class="btn btn-primary" @click="deleteProductCart">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Edit -->
    <div class="loadingModal" v-if="showModalEdit">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
              <button type="button" class="close" @click="showModalEdit = !showModalEdit">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row justify-content-center">
                <div class="col-8">
                  <form @submit.prevent="editProductCart">
                    <div class="form-group">
                      <label for="quantity">Quantity :</label>
                      <input type="number" class="form-control" v-model="quantity" id="quantity" />
                    </div>
                    <button class="btn btn-outline-primary mr-1">Update</button>
                    <button
                      class="btn btn-outline-secondary"
                      @click="showModalEdit = !showModalEdit"
                    >Close</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</div>
</template>

<script>
export default {
  name: "CartData",
  data() {
    return {
      showModalDelete: false,
      showModalEdit: false,
      quantity: ''
    }
  },
  props: ["cart", "no"],
  methods: {
    editProductCart() {
      let payload = {
        ProductId: this.cart.ProductId,
        quantity: this.quantity,
      }
      this.$store.dispatch('editProductCart', payload)
      this.showModalEdit = false
    },
    deleteProductCart() {
      this.$store.dispatch('deleteProductCart', this.cart.ProductId)
      this.showModalDelete = false
    }
  }
};
</script>

<style>

.cardData {
  color: goldenrod;
}
</style>