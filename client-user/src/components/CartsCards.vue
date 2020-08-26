<template>
<div>
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  <div class="container">
    <div class="row">
      <div class="col-sm-8">
        <!-- cards -->
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row no-gutters">
            <div class="col-md-4">

            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{product.name}}</h5>
                <p class="card-text">Price {{Product.price}}</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>
        <!-- cards -->
      </div>
      <div class="col-sm-4">col-sm-4</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['product']
}
</script>

<style>

</style>
