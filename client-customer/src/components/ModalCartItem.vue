<template>
  <li class="list-group-item list-group-item-action d-flex row bg-light">
    <div class="col-4">
      <p class="text-center m-auto">Nama</p>
    </div>
    <div class="col-2">
      <p class="text-center m-auto">Harga</p>
    </div>
    <div class="col-2">
      <p class="text-center m-auto">1</p>
    </div>
    <div class="col-2">
      <p class="text-center m-auto">Total</p>
    </div>
    <div class="col-2">
      <button class="btn btn-info btn-sm" data-toggle="tooltip" data-placement="bottom" title="PLUS!">
        <i class="far fa-plus-square "></i>
      </button>
      <button class="btn btn-info btn-sm" data-toggle="tooltip" data-placement="bottom" title="MIN!">
        <i class="far fa-minus-square"></i>
      </button>
      <button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="bottom" title="DELETE!">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "ModalCartItem",
  props: ["cart"],
};
</script>

<style>
</style>