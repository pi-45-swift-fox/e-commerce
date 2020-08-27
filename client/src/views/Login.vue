<template>

<div class="d-flex align-item-center">
    <div class="container-fluid d-flex justify-content-center">
      <div class="login">
        <img src="../assets/gundam-logo.jpg" alt="">
        <form @submit.prevent="login({email, password})">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
          </div>
          <button type="submit" class="btn btn-lg btn-dark">Submit</button>
        </form>
      </div>
    </div>
</div>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'login'
    ])
  }
}

</script>

<style scoped>
.login {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
img {
  width: 250px;
}
</style>
