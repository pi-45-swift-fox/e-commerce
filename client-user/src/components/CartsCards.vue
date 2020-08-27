<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-8">
          <!-- cards -->
          <div class="card mb-3" style="max-width: 540px;">
            <div class="row">
              <div class="col-md-4">
                <h5 class="card-title">{{cart.Product.name}}</h5>
                <p class="card-text">Price : {{cart.Product.price}}</p>
                <br>
                <br>
                <p class="card-text">Current Quantity : {{cart.quantity}}</p>
              </div>
              <div class="col-md-8">
                <div class="card-img">
                  <img :src="cart.Product.image_url" alt="">
                </div>
              </div>
            </div>
          </div>
          <!-- cards -->
        </div>
        <div class="d-flex justify-content-between col-sm-4 " id="CARTS">
          <div class="my-auto justify-content-between">
            <p class="card-text"><small class="text-muted item">
                <div class="mx-auto">
                  <!-- @click.prevent='editCart(product.id)' -->
                  <!-- Modal -->
                  <div>
                    <b-button @click="show=true" size='md' class="rounded-pill" variant="outline-primary">
                      <b-icon icon="cart-plus"></b-icon>Edit Product
                    </b-button>
                    <b-modal v-model="show" title="Edit Product Here">
                      <b-container fluid>
                        <b-row class="mb-1">
                          <b-col cols="3">Name</b-col>
                          <b-col>
                            {{cart.Product.name}}
                          </b-col>
                        </b-row>
                        <b-row class="mb-1">
                          <b-col cols="3">Quantity</b-col>
                          <b-col>
                            <input type="number" v-model="quantity" name="quantity" min="1"></b-col>
                        </b-row>
                        <b-row>
                          <b-col cols="3">Status:</b-col>
                          <b-col>
                            {{cart.status}}
                          </b-col>
                        </b-row>
                      </b-container>
                      <template v-slot:modal-footer>
                        <div class="w-100">
                          <p class="float-left">Do you want to edit?</p>
                          <b-button variant="primary" size="sm" class="float-right"
                            @click.prevent='editControl'>
                            Edit
                          </b-button>
                        </div>
                      </template>
                    </b-modal>
                  </div>
                  <!-- Modal -->
                  <b-button @click.prevent='deleteCart(cart)' variant="outline-danger" size="md"
                    class=" rounded-pill">
                    <b-icon icon="cart-plus"></b-icon>Delete
                  </b-button>
                </div>
              </small></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CartCards',
  props: ['cart'],
  data () {
    return {
      show: false,
      quantity: 1
    }
  },
  methods: {
    ...mapActions([
      'editCart',
      'deleteCart'
    ]),
    showForm () {
      this.showModal = true
    },
    editControl () {
      this.editCart({ cart: this.cart, quantity: this.quantity })
      this.show = false
    }
  }
}
</script>

<style scoped>
img{
  height: 300px;
  width: 300px;
  object-fit: cover;
}
</style>
