<template>
  <form @submit.prevent="regis()">
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        v-model="email"
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" v-model="password" />
    </div>
    <div class="d-flex justify-content-around">
      <button type="submit" class="btn btn-primary">Register</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "FormRegister",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    regis() {
      this.$store.dispatch("register", {
        email: this.email,
        password: this.password,
      });
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style>
</style>
