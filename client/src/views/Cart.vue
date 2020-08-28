<template>
  <div class="container">
    <Navbar/>
    <div class="my-5">
      <table class="table cardData">
        <thead>
          <tr>
            <!-- <th scope="col">#</th> -->
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <CartData
            v-for="(cart, idx) in carts" :key="idx"
            :cart="cart"
          ></CartData>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/navbar";
import CartData from "../components/CardData";

export default {
  name: "Cart",
  data() {
    return {
      // items: cart()
    };
  },
  components: {
    Navbar,
    CartData,
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    }
  },
  created() {
    this.$store.dispatch("fetchCart");
  }
};
</script>
<style>

.cardData {
  color: goldenrod;
}
</style>