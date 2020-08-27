<template>
  <section>
    <div id="loginPage">
        <div id="loginForm">
          <i class="fa fa-cubes" aria-hidden="true"></i>
          <form @submit.prevent="processLogin" class="mb-2">
            <h4 style="font-family: 'Bungee', cursive;">Login Page</h4>
            <hr>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input
              v-model="email"
              type="email"
              class="form-control"
              id="email" placeholder="email@example.com">
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
              v-model="password"
              type="password"
              class="form-control" id="password" placeholder="*****">
            </div>
            <div class="form-group form-check">
              <input @click="togglePassword('password')"
              type="checkbox" class="form-check-input">
              <label class="form-check-label">
                Show Password
              </label>
            </div>
            <button
            style="background: #F1D302; width: 120px; font-family: 'Bungee', cursive;"
            type="submit" class="btn rounded-pill font-weight-bold">Login</button>
          </form>
          <small>Don't have account? Register
              <router-link :to="{name: 'Register'}" id="loginSmall"
              role="button">here.</router-link>
              </small>
        </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    processLogin() {
      const data = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('processLogin', data);
    },
    togglePassword(id) {
      const x = document.getElementById(id);
      if (x.type === 'password') {
        x.type = 'text';
      } else {
        x.type = 'password';
      }
    },
  },
};
</script>

<style>

</style>
