<template>
  <div class="row mx-auto">
    <div class="col-md-5 mx-auto">
      <div id="first">
        <div class="myform form">
          <div class="logo mb-3">
            <div class="col-md-12 text-center">
              <h1 class="text">Register</h1>
            </div>
          </div>
          <form action method="post" name="login" @submit.prevent="submit">
            <div class="form-group">
              <label for="exampleInputEmail1" class="text">Email address</label>
              <input
                type="email"
                name="email"
                class="form-control"
                v-model="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="text">Password</label>
              <input
                type="password"
                name="password"
                v-model="password"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Password"
              />
            </div>
            <br />
            <div class="col-md-12 text-center">
              <input type="submit" class="btn btn-block mybtn btn-primary tx-tfm" value="Submit" />
              <br />
              <router-link to="/login">I already have an account</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      this.$store.dispatch('register', { email: this.email, password: this.password});
    }
  },
    beforeRouteEnter(to, from, next) {
    if (localStorage.access_token) {
      next({ path: '/' });
    } else {
      next();
    }
  }
};
</script>

<style>
</style>