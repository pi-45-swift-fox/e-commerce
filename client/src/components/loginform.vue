<template>
<div class="login">
  <navbar />
  <div class="loginform">
    <h1>Login Form</h1>
    <form>
        <label for="email">Email</label><br>
        <input style="color:#56642a;" type="email" placeholder="eg: example@mail.com" v-model="login.email" id="emailbox">
        <br><br>
        <label for="password">Password</label><br>
        <input type="password" placeholder="*******" v-model="login.password" id="passbox"><br><br>
        <input type="submit" value="Login" id="submitBtn" v-on:click.prevent="loginUser"><br><br>
        <a id="donthaveBtn" href="#" @click.prevent="toRegister" style="text-decoration:none;">Dont Have Account</a>
    </form>
  </div>
</div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  name: 'Loginform',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    };
  },
  components: {
    Navbar,
  },
  methods: {
    toRegister() {
      this.$router.push('/register');
    },
    loginUser() {
      console.log(this.login);
      this.$store.dispatch('userlogin', this.login)
        .then((result) => {
          console.log(`result ${result}`);
          localStorage.setItem('access_token', result.access_token);
          localStorage.username = result.username
          localStorage.balance = result.balance
          localStorage.countCart = 0
          this.$router.push('/');
        });
    },
  },
};
</script>

<style scoped>
.login{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-image: url("https://cdn2.f-cdn.com/contestentries/1476645/32188263/5c7d1750c9de4_thumb900.jpg");
    background-size: cover;
}
.loginform{
    background: #1ba098;
    margin-top: 11%;
    width: 300px;
    height: 276px;
    border-radius: 10px;
    border: solid;
}
#submitBtn, #emailbox, #passbox{
    width: max;
}
#submitBtn:hover{
  color: green;
}
#donthaveBtn:hover{
  color: green;
}
</style>
