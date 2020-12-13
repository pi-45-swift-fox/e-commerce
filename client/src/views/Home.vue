<template>
  <div>
    <section>
      <nav class="d-flex justify-content-between py-2 px-3">
        <div>
          <router-link :to="{name: 'Home'}" id="logo">
          <i class="fa fa-cubes" aria-hidden="true"></i>
          <span style="font-family: 'Bungee', cursive;"> E-COMMERCE</span>
          </router-link>
        </div>
        <div v-if="$store.state.statusLogin">
          <router-link :to="{name: 'Cart'}">
            <i id="cart" class="fa fa-shopping-cart mr-3" aria-hidden="true"></i>
          </router-link>
          <div style="font-family: 'Bungee', cursive;" class="dropdown mt-1">
              <button class="dropbtn">
                  <i class="fa fa-user-circle" aria-hidden="true"></i> &nbsp;{{name}}
              </button>
              <div class="dropdown-content">
                <router-link :to="{name: 'Transaction'}">
                  <a href="#"><i class="fa fa-history" aria-hidden="true"></i> History</a>
                </router-link>
                <a @click="logout"
                id="special" role="button">
                <i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
              </div>
          </div>
        </div>
        <div v-else>
          <router-link :to="{name: 'Login'}"><button id="btnLogin"
          class="btn rounded-pill text-dark font-weight-bold btn-md mr-2">
              Login
          </button></router-link> <b>or</b>
          <router-link :to="{name: 'Register'}"><button id="btnRegister"
          class="btn rounded-pill ml-2 text-light font-weight-bold btn-md">
              Register
          </button></router-link>
        </div>
      </nav>
    </section>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {};
  },
  computed: {
    name() {
      return localStorage.name;
    },
  },
  created() {
    this.$store.commit('SET_STATUS_LOGIN');
  },
  methods: {
    logout() {
      this.$store.commit('SET_STATUS_LOGOUT', false);
      localStorage.clear();
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style scoped>
#btnLogin {
    background: #F1D302;
    width: 100px;
    font-family: 'Bungee', cursive;
    font-size: 13px;
}

#btnRegister {
    background: #3a7979;
    width: 100px;
    font-family: 'Bungee', cursive;
    font-size: 12px;
}

#special:hover {
    color: black;
}
</style>
