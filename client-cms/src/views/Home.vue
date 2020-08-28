<template>
  <div class="container mt-3">
    <form @submit.prevent="$store.dispatch('login',{email,password})">
      <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="email" v-model="email"/>
        </div>
      </div>
      <div class="form-group row">
        <label for="password" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="password" v-model="password" />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Aside from "@/components/Aside";
import Content from "@/components/Content";
// @ is an alias to /src

export default {
  name: "Home",
  data(){
    return{
      email:'',
      password:''
    }
  },
  components: {
    Navbar,
    Content,
    Aside,
  },
};
</script>
