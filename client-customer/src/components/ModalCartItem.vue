<template>
  <li class="list-group-item list-group-item-action d-flex row bg-light">
    <div class="col-4">
      <p class="text-center m-auto">{{cart.Product.name}}</p>
    </div>
    <div class="col-2">
      <p class="text-center m-auto">{{cart.Product.price}}</p>
    </div>
    <div class="col-2">
      <p class="text-center m-auto">{{cart.quantitiy}}</p>
    </div>
    <div class="col-2">
      <p class="text-center m-auto">{{total}}</p>
    </div>
    <div class="col-2">
      <button
        class="btn btn-info btn-sm"
        data-toggle="tooltip"
        data-placement="bottom"
        title="PLUS!"
        @click="changeCart(1)"
      >
        <i class="far fa-plus-square"></i>
      </button>
      <button
        class="btn btn-info btn-sm"
        data-toggle="tooltip"
        data-placement="bottom"
        title="MIN!"
        @click="changeCart(-1)"
      >
        <i class="far fa-minus-square"></i>
      </button>
      <button
        class="btn btn-danger btn-sm"
        data-toggle="tooltip"
        data-placement="bottom"
        title="DELETE!"
        @click="delCart()"
      >
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "ModalCartItem",
  props: ["cart"],
  computed: {
    total() {
      const total = this.cart.quantitiy * this.cart.Product.price;
      // this.$emit("totalPeritem", this.cart.quantity * this.cart.price);
      return total;
    },
  },
  methods: {
    changeCart(plusMinus) {
      const valuez = this.cart.quantity + plusMinus;
      if (valuez > 0) {
        const data = {
          id: this.cart.id,
          status: this.cart.status,
          quantity: valuez,
        };
        this.$store.dispatch("editCart", data);
      }
    },
    delCart() {
      console.log(this.cart.id)
      this.$store.dispatch("deleteCart", this.cart.id);
    },
  },
  
};
</script>

<style>
</style>