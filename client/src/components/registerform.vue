<template>
  <div>
    <div>
      <Navbar />
    </div>
    <div class="register">
      <div class="registerform">
        <h1>Register Form</h1>
        <form>
            <label for="email">Email</label><br>
            <input type="email"
              placeholder="eg: example@mail.com" v-model="register.email" id="emailbox">
              <br><br>
            <label for="password">Password</label><br>
            <input type="password" placeholder="**********" v-model="register.password" id="passbox"><br><br>
            <input type="submit" value="Register" id="submitBtn" v-on:click.prevent="registerUser"><br><br>
            <a id="haveBtn" href="#" @click.prevent="toLogin">Have Account</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';

export default {
  name: 'Registerform',
  data() {
    return {
      register: {
        email: '',
        password: '',
      },
    };
  },
  components: {
    Navbar,
  },
  methods: {
    toLogin() {
      this.$router.push('/login');
    },
    registerUser() {
      this.$store.dispatch('register', this.register);
    },
  },
};
</script>

<style scoped>
    .register{
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      background-image: url("https://cdn2.f-cdn.com/contestentries/1476645/32188263/5c7d1750c9de4_thumb900.jpg");
      background-size: cover;
    }
    .registerform{
        background: blanchedalmond;
        width: 300px;
        height: 224px;
        border-radius: 10px;
        border: solid;
        margin-top: 19%;
    }
    #submitBtn, #emailbox, #passbox{
        width: max;
    }
</style>
