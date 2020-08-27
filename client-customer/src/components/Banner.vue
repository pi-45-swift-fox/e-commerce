<template>
  <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
      <div class="carousel-item active">
        <img
          class="d-block img-fluid"
          :src="$store.state.banners[0].image_url"
          style="width:900px;height:350px;"
          alt="First slide"
        />
        <div class="carousel-caption d-none d-md-block">
          <h1 class="bg-info">Paling Laris</h1>
        </div>
      </div>
      <div class="carousel-item" >
        <img
          class="d-block img-fluid"
          :src="$store.state.banners[1].image_url"
          style="width:900px;height:350px;"
          alt="Second slide"
        />
        <div class="carousel-caption d-none d-md-block">
          <h1 class="bg-info">Paling Laris</h1>
        </div>
      </div>
      <div class="carousel-item">
        <img
          class="d-block img-fluid"
          :src="$store.state.banners[2].image_url"
          style="width:900px;height:350px;"
          alt="Third slide"
        />
        <div class="carousel-caption d-none d-md-block">
          <h1 class="bg-info">Paling Laris</h1>
        </div>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style>
</style>
