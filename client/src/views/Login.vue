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
          <div>
            <button type="submit" class="btn btn-lg btn-dark">Login</button>
          </div>
          <div>
            <button type="button" class="btn btn-primary mt-4" data-toggle="modal" data-target="#exampleModal">
              No account? Register Here
            </button>
          </div>
        </form>
      </div>
    </div>
    <div>
      <!-- modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Register</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <img src="../assets/gundam-logo.jpg" alt="">
                <form>
                  <div class="form-group">
                    <label for="exampleInputEmail">Email address</label>
                    <input v-model="regEmail" type="email" class="form-control" id="exampleInputEmail"
                      aria-describedby="emailHelp">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword">Password</label>
                    <input v-model="regPassword" type="password" class="form-control" id="exampleInputPassword">
                  </div>
                  <div class="modal-footer">
                    <button @click.prevent="register({ regEmail, regPassword })"  type="submit" class="btn btn-primary" data-dismiss="modal">Register</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      regEmail: '',
      regPassword: ''
    }
  },
  methods: {
    ...mapActions([
      'login',
      'register'
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
