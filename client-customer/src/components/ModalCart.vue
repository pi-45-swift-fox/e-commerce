<template>
  <div
    class="modal fade"
    id="CartModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center" id="exampleModalLabel">Cart</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="list-group">
            <li class="list-group-item list-group-item-action d-flex row bg-light">
    <div class="col-4">
      <p class="text-center m-auto">Nama</p>
    </div>
    <div class="col-2">
      <p class="text-center m-auto">Harga</p>
    </div>
    <div class="col-2">
      <p class="text-center m-auto">Quantitiy</p>
    </div>
    <div class="col-2">
      <p class="text-center m-auto"> Total</p>
    </div>
    <div class="col-2">
      <p class="text-center m-auto">Action</p>
    </div>
  </li>
  <!-- <ModalCartItem /> -->
          <ModalCartItem v-for="(cart,i) in $store.state.carts" :key="i" :cart="cart" />
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary m-auto">ChekOut</button>
          <button type="button" class="btn btn-secondary m-auto" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalCartItem from "./ModalCartItem";
export default {
  name: "ModalCart",
  components: {
    ModalCartItem,
  },  
};
</script>

<style>
</style>