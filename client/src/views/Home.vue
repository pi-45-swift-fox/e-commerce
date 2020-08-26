<template>
  <div class="home vh-100 overflow-auto">
    <Navbar class="shadow" />
    <b-container fluid="xl" class="">
      <b-button size="lg" variant="success" class="rounded-pill mr-2 mb-2 shadow"># Electronic</b-button>
      <b-button size="lg" variant="success" class="rounded-pill mr-2 mb-2 shadow"># Vehicle</b-button>
      <b-button size="lg" variant="success" class="rounded-pill mr-2 mb-2 shadow"># Tools</b-button>
      <b-button size="lg" variant="success" class="rounded-pill mr-2 mb-2 shadow"># Clothes</b-button>
      <b-button size="lg" variant="success" class="rounded-pill mr-2 mb-2 shadow"># Others</b-button>
    </b-container>
    <b-container fluid="xl" class="dashboard shadow-lg rounded-lg">
      <h1>Hello this is dashboard</h1>
      <div class="product-container">
        <div class="item rounded-lg shadow">
          <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/27/2065521/2065521_c2efb578-baf0-4c19-afea-7c39ebb54f03_554_554.jpg" alt="">
          <h1>Title</h1>
          <h3>price</h3>
          <h6>view details</h6>
          <h6>add to wishlist | add to cart</h6>
        </div>
        <div class="item rounded-lg shadow">
          <img src="https://www.bikin.co/konveksi-baju/wp-content/uploads/2019/11/Konveksi-Baju-Kaos-Sablon.jpg" alt="">
          <h1>Title</h1>
          <h3>price</h3>
          <h6>view details</h6>
          <h6>add to wishlist | add to cart</h6>
        </div>
        <div class="item rounded-lg shadow">
          <img src="https://images.bisnis-cdn.com/thumb/posts/2019/09/09/1146237/ferrari-f8-spider_06-min-mtb.jpg?w=744&h=465" alt="">
          <h1>Title</h1>
          <h3>price</h3>
          <h6>view details</h6>
          <h6>add to wishlist | add to cart</h6>
        </div>
        <div class="item rounded-lg shadow">
          <img src="https://images.bisnis-cdn.com/thumb/posts/2019/09/09/1146237/ferrari-f8-spider_06-min-mtb.jpg?w=744&h=465" alt="">
          <h1>Title</h1>
          <h3>price</h3>
          <h6>view details</h6>
          <h6>add to wishlist | add to cart</h6>
        </div>
        <div class="item rounded-lg shadow">
          <img src="https://images.bisnis-cdn.com/thumb/posts/2019/09/09/1146237/ferrari-f8-spider_06-min-mtb.jpg?w=744&h=465" alt="">
          <h1>Title</h1>
          <h3>price</h3>
          <h6>view details</h6>
          <h6>add to wishlist | add to cart</h6>
        </div>
        <div class="item rounded-lg shadow">
          <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/27/2065521/2065521_c2efb578-baf0-4c19-afea-7c39ebb54f03_554_554.jpg" alt="">
          <h1>Title</h1>
          <h3>price</h3>
          <h6>view details</h6>
          <h6>add to wishlist | add to cart</h6>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style media="screen" scoped>
.home {
  background-color: #FBF7ED;
  font-family: 'Alata', sans-serif;
  color: #004C3F;
}

.dashboard {
  background-color: #002E25;
  margin-top: 4rem;
  padding: 50px;
  color: #FBF7ED;
  margin-bottom: 4rem;
}

.product-container {
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.item {
  padding: 15px;
  margin: 10px;
  border: 1px solid #FBF7ED;
  background-color: #004C3F;
}

img {
  width: 200px;
  height: 60%;
}
</style>
