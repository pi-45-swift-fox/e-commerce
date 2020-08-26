<template lang="html">
  <div id="nav">
    <b-navbar variant="faded" type="light" class="navbar">
      <b-navbar-brand tag="h1" class="mb-1" style="color: #FBF7ED;">E-Commerce</b-navbar-brand>
      <div>
        <b-form inline>
          <label class="sr-only" for="inline-form-input-name">Name</label>
          <b-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0 shadow-sm"
            placeholder="Start searching your dream product..."
            style="width: 400px;"
          ></b-input>

          <b-button variant="success" class="shadow"><b-icon-search></b-icon-search> Search</b-button>
        </b-form>
      </div>
      <div class="left-nav">
        <router-link to="/user/cart"><b-icon-cart4 class="shadow icon" font-scale="2"></b-icon-cart4></router-link>
        <router-link to="/user/wishlist"><b-icon-heart-fill class="shadow ml-2 icon" font-scale="1.5"></b-icon-heart-fill></router-link>
        <router-link to="/user"><b-icon-person class="shadow ml-2 icon" font-scale="2"></b-icon-person></router-link>
        <b-button @click="logout" size="md" class="my-2 my-sm-0 button shadow ml-3" type="submit" variant="success">Log out</b-button>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="css" scoped>
#nav {
  padding: 15px;
  background-color: #004C3F;
  color: #FBF7ED;
  margin-bottom: 50px;
}

#nav a {
  font-weight: bold;
  color: #FBF7ED;
}

#nav a.router-link-exact-active {
  color: #FBF7ED;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: 'Alata', sans-serif;
}

.left-nav {
  display: flex;
  align-items: center;
}

.icon {
  color: #FBF7ED;
}

.icon:hover {
  color: #dBd7cD;
}
</style>
