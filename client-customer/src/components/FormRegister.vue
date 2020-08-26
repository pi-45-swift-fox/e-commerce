<template>
  <form>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" id="password">
  </div>  
  <button type="submit" class="btn btn-primary">Register</button>
</form>
</template>

<script>
export default {
name:"FormRegister"
}
</script>

<style>

</style>