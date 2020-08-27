<template>
  <div class="home">
    <div class="datalist">
        <Navbar class="navbar" />
        <ProductList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';
import ProductList from '@/components/ProductList.vue';
import ShowCart from './ShowCart.vue';

export default {
  name: 'Home',
  data() {
    return {
      isLogin: false,
      isProduct: false,
      isCart: false,
    };
  },
  components: {
    Navbar,
    ProductList,
  },
  methods: {
    adds() {
      this.$store.dispatch('adding');
    },
  },
  computed: {
    isAdd() {
      return this.$store.state.isAdd;
    },
    isEdit() {
      return this.$store.state.isEdit;
    },
  },
  created() {
    if (localStorage.access_token) {
      this.isLogin = true;
    }
  },
};
</script>
<style scoped>
.home{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-image: url("https://i.pinimg.com/originals/74/54/77/7454777abf653aa5a2c4b1956c3f9148.jpg");
    background-size: cover;
    height: 100vh;
    /* background-image: url("https://i.pinimg.com/originals/bb/bf/1b/bbbf1b2b68cdcce217d92e2e55f13794.jpg");
    background-size: cover; */
    /* background-image: url("https://cdn6.f-cdn.com/contestentries/1476645/23802538/5c78ce310802b_thumb900.jpg"); */
}
.add{
    z-index: 100;
    height: 100px;
    width: 200px;
}

.addbtn {
  float: left;
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.addbtn:hover{
  background-color: #3e8e41;
}
</style>
