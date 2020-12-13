<template>
    <section>
        <div id="registerPage">
            <div id="registerForm">
              <i class="fa fa-cubes" aria-hidden="true"></i>
              <form @submit.prevent="processRegister" class="mb-2">
                <h4 style="font-family: 'Bungee', cursive;">Register Page</h4>
                <hr>
                <div class="form-group">
                    <label for="name">Your Name</label>
                    <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    id="name" placeholder="Niall Horan">
                </div>
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
                style="background: #3a7979; width: 120px; font-family: 'Bungee', cursive;"
                type="submit"
                class="btn rounded-pill text-light font-weight-bold">Register</button>
              </form>
              <small>Already have account? Login
                  <router-link :to="{name: 'Login'}" id="registerSmall"
                  role="button">here.</router-link></small>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    processRegister() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: 'customer',
      };
      this.$store.dispatch('registerProcess', data);
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
