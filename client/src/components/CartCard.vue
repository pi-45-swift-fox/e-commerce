<template>
  <div>
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="" class="card-img" alt="">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{product.name}}</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            <div>
              <label for="">Quantity</label>
              <br>
              <button type="button" class="btn btn-light cs-btn-curve">-</button>
              <button class="btn btn-primary cs-btn-curve" disabled>{{this.quantity}}</button>
              <button type="button" class="btn btn-light cs-btn-curve">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CartCard',
  data () {
    return {
      quantity: 1
    }
  },
  props: ['product']
}

</script>

<style scoped>
.cs-btn-curve {
  border-radius: 50%;
  margin: 5px;
}
</style>
