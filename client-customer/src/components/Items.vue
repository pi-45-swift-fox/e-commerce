<template>
  <div class="row">
    <CardItem v-for="item in $store.state.items" :key="item.id" :item="item"/>
  </div>
</template>

<script>
import CardItem from './CardItem'
export default {
  name: 'Items',
  components: {
    CardItem
  }
}
</script>

<style>
</style>
