<template>
  <div id="nav" class="navbar fixed-top" v-if="$store.state.isLogin">
      <div class="navbar-list">
        <!-- <router-link class="list-items" to="/">Home</router-link> |
        <router-link class="list-items" to="/carts">Carts </router-link> | -->
        <a href="/" id="home-btn" class="navbtn" @click.prevent="home"> Home</a>
        <a href="/carts" class="navbtn" @click.prevent="carts"> Carts</a>
        <a href="" class="navbtn" @click.prevent="logout"> Logout</a>
      </div>
    </div>
    <div v-else class="navbar fixed-top">
      <div class="navbar-list">
        <a href="/" id="home-btn" class="navbtn" @click.prevent="home"> Home</a>
        <a href="/login" class="navbtn" @click.prevent="login"> Login</a>
        <a href="/register" class="navbtn" @click.prevent="register"> Register</a>
      </div>
    </div>
</template>

<script>
import router from '../router/index.js';

export default {
  name: 'Navbar',
  methods: {
    logout() {
      this.$store.dispatch('logout');
      // this.isLogin = false;
      // this.$router.push('/login');
    },
    carts() {
      router.push({
        path: '/carts'
      })
    },
    home() {
      router.push({
        path: '/'
      })
    },
    login() {
      router.push({
        path: '/login'
      })
    },
    register() {
      router.push({
        path: '/register'
      })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    height: 30px;
    background-image: url("https://cdn6.f-cdn.com/contestentries/1476645/3722903/5c79055058298_thumb900.jpg");
    background-size: cover;
    /* margin-top: 10px; */
    /* margin-left: 10px; */
    z-index: 100;
    position: fixed;
}
#home-btn{
  position: relative;
  top: 6px;
  /* left: -10px; */
}

.navbtn {
  position: relative;
  top: 6px;
  /* background-color: #4CAF50; */
  color: black;
  padding: 6px;
  margin: 7px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  text-decoration: none;
}
.listitems {
  text-decoration: none;
}
.navbtn:hover{
  background-color: #3e8e41;
}
</style>
