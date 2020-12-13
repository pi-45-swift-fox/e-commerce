<template>
    <div>
        <section>
            <div id="carousel"
            class="container carousel slide my-5"
            data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <a>
                            <img style="height: 400px; width: 600px;"
                            src="https://static.dribbble.com/users/1849236/screenshots/6223889/ecommerce_1.jpg"
                            class="d-block w-100" alt="...">
                        </a>
                    </div>
                <Carousels
                v-for="(banner, idx) in $store.state.banners"
                :key="idx" :banner="banner"></Carousels>
                </div>
                <a class="carousel-control-prev"
                href="#carousel" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carousel"
                role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
                </a>
            </div>
        </section>
        <section>
            <div class="container my-3">
                <div class="row d-flex justify-content-around text-center">
                     <div class="col-4">
                    <router-link :to="{name:'AllProducts', params: {name: 'Manga'}}">
                        <button style="font-family: 'Bungee', cursive;"
                        class="contentCategory btn" href="" type="button">
                        <i class="fa fa-book" aria-hidden="true"></i>&nbsp;Manga
                        </button>
                    </router-link>
                </div>
                <div class="col-4">
                    <router-link :to="{name:'AllProducts', params: {name: 'Game'}}">
                        <button style="font-family: 'Bungee', cursive;"
                        class="contentCategory btn" href="" role="button">
                            <i class="fa fa-gamepad" aria-hidden="true"></i>&nbsp;Game
                        </button>
                    </router-link>
                </div>
                <div class="col-4">
                    <router-link :to="{name:'AllProducts', params: {name: 'Electronic&Gadget'}}">
                    <button style="font-family: 'Bungee', cursive;"
                    class="contentCategory btn" href="" role="button">
                        <i class="fa fa-laptop" aria-hidden="true">
                        </i>&nbsp;Electronic & Gadget
                    </button>
                    </router-link>
                </div>
                </div>
            </div>
        </section>
        <section class="d-flex flex-column my-3 mb-5">
            <div class="text-center my-5">
                <h1 style="font-family: 'Bungee', cursive;">Our Products</h1>
            </div>
            <div>
                <div class="container my-3">
                    <div class="row">
                        <Products
                        v-for="(product, idx) in $store.getters.filteredProducts"
                        :key="idx" :product="product">
                        </Products>
                    </div>
                </div>
            </div>
            <router-link
            class="btnCheckOut btn" :to="{name: 'AllProducts', params: {name: 'all'}}">
                More..
            </router-link>
        </section>
    </div>
</template>

<script>
import Products from '../components/Products.vue';
import Carousels from '../components/Carousels.vue';

export default {
  name: 'Homepage',
  components: {
    Products, Carousels,
  },
  created() {
    this.$store.dispatch('showProducts');
    this.$store.dispatch('showBanners');
    // console.log(this.$store.state.products, 'ini products');
  },
};
</script>

<style>

</style>
