<template>
  <div class="container">
    <div class="row">
      <!-- <List />      -->

      <div class="col-lg-12">
        <Banner />
        <Items />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from "@/components/Banner.vue";
// import List from '@/components/List.vue'
import Items from "@/components/Items.vue";

export default {
  name: "Home",
  components: {
    Banner,
    // List,
    Items,
  },
};
</script>
