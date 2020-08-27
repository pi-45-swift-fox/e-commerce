<template>
  <tr>
    <th scope="row">{{ index+1 }}</th>
    <td> IDR {{history.Product.price.toLocaleString()}} </td>
    <td style="font-size:25px;">{{ history.Product.name }}</td>
    <td> <img :src="history.Product.image_url" alt=""> </td>
      <td>
        {{history.quantity}}
      </td>
      <td>
        {{new Date(history.updatedAt).toDateString()}}
      </td>
  </tr>
</template>

<script>
export default {
  name: 'HistoryTable',
  props: ['history', 'index']
}
</script>

<style scoped>
img {
  height: 100px;
  width: auto;
}

</style>
