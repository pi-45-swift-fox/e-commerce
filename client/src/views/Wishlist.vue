<template lang="html">
  <div class="wishlist vh-100 overflow-auto">
    <Navbar class="shadow fixed-top nav" />
    <b-container fluid="xl" class="dashboard shadow-lg rounded-lg overflow-auto">
      <router-link to="/" style="color: #FBF7ED;">&lt; continue shopping</router-link>
      <div class="grid">
        <div class="grid-item-1 mt-4">
          <div>
            <img class="shadow profile-pic mr-3" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png">
          </div>
          <div class="profile mt-3">
            <h6>user email here</h6>
            <p>Total wishlist items: {{$store.getters.getProductLength}}</p>
          </div>
        </div>
      </div><hr>
      <div class="cart-items overflow-auto">
        <h1 v-if="false" class="text-center" style="font-size: 48px;">Your cart is empty</h1>
        <div v-else class="">
          <div class="product-item mb-2">
            <div class="">
              <img class="product-pic" src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/27/2065521/2065521_c2efb578-baf0-4c19-afea-7c39ebb54f03_554_554.jpg">
            </div>
            <div class="">
              <h2>Title</h2>
              <p>Rp.</p>
              <router-link to="/">Show details</router-link> | <a class="text-danger">Remove from wishlist</a><br>
            </div>
          </div>
          <div class="line-1"></div>
          <div class="product-item mb-2">
            <div class="">
              <img class="product-pic" src="https://images.bisnis-cdn.com/thumb/posts/2019/09/09/1146237/ferrari-f8-spider_06-min-mtb.jpg?w=744&h=465">
            </div>
            <div class="">
              <h2>Title</h2>
              <p>Rp.</p>
              <router-link to="/">Show details</router-link> | <a class="text-danger">Remove from wishlist</a><br>
            </div>
          </div>
          <div class="line-1"></div>
          <div class="product-item mb-2">
            <div class="">
              <img class="product-pic" src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/27/2065521/2065521_c2efb578-baf0-4c19-afea-7c39ebb54f03_554_554.jpg">
            </div>
            <div class="">
              <h2>Title</h2>
              <p>Rp.</p>
              <router-link to="/">Show details</router-link> | <a class="text-danger">Remove from wishlist</a><br>
            </div>
          </div>
          <div class="line-1"></div>
        </div>
      </div><hr>
      <div class="">
        <b-button disabled variant="danger" class="rounded-pill mr-2 mb-2 shadow"><b-icon-trash></b-icon-trash> Empty wishlist</b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Wishlist',
  components: {
    Navbar
  }
}
</script>

<style lang="css" scoped>
.wishlist {
  background-color: #FBF7ED;
  font-family: 'Alata', sans-serif;
  color: #004C3F;
}

.dashboard {
  background-color: #002E25;
  margin-top: 8.5rem;
  padding: 40px;
  color: #FBF7ED;
  margin-bottom: 4rem;
}

.grid-item-1 {
  display: flex;
  align-items: center;
}

.grid {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.profile-pic {
  width: 50px;
  border-radius: 100%;
}

.cart-items {
  height: 24rem;
  padding: 10px;
}

.product-pic {
  width: 125px;
  margin-right: 20px;
}

.product-item {
  display: flex;
}

.line-1 {
  height: 1px;
  width: 60%;
  background-color: #FBF7ED;
  margin: 1.5em auto;
}
</style>
