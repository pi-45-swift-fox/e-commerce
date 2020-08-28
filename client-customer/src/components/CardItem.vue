<template>
  <div class="col-lg-3 col-md-6 mb-4">
    <div class="card h-100">
      <img class="card-img-top" :src="item.image_url" alt />

      <div class="card-body">
        <h4 class="card-title d-flex justify-content-between">
          <span>{{item.name}}</span>
          <!-- <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small> -->
        </h4>
        <h5>{{price}}</h5>
        <h5>Terjual sebanyak : {{item.sold}}</h5>
        <!-- <p class="card-text" >Description</p> -->
      </div>
      <div class="card-footer row d-flex justify-content-between">
        <div class="col-6 m-auto">STOCK: {{item.stock}}</div>
        <button class="btn btn-primary col-4 mx-auto" v-if="cart" @click="addCart()">
          <small>Add Cart</small>
          <i class="fas fa-cart-plus fa-lg"></i>
        </button>
        <button class="btn btn-secondary col-4 m-auto" disabled v-if="!item.stock">Sold Out</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carditem",
  props: ["item"],
  computed: {
    price() {
      return `Rp. ${this.item.price.toLocaleString("id-ID")}`;
    },
    cart() {
      if (this.item.stock && this.$store.state.isLogin) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    addCart() {
      console.log(this.$store.state.carts.find((o) => o.id == this.item.id))
      if (!this.$store.state.carts.find((o) => o.id == this.item.id)) {
        const data = {
          ProductId: this.item.id,
          quantitiy: 1,
        };
        this.$store.dispatch("createCart", data);
      }
    },
  },
};
</script>

<style>
</style>
