<template>
<div class="bg-color">
  <h1>History Transactions</h1>
    <div class="container color">

      <table class="table table-hover">

        <thead>
          <tr>
            <th scope="col">#</th>
            <!-- <th scope="col">Checkout?</th> -->
            <th scope="col">Price</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Image</th>
            <th scope="col">Quantity</th>
            <th scope="col">Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          <HistoryTable v-for="(history, index) in histories" :key="history.id" :history="history" :index="index"></HistoryTable>
        </tbody>
      </table>
    </div>
</div>
</template>

<script>
import HistoryTable from '../components/HistoryTable.vue'
import { mapState } from 'vuex'
export default {
  name: 'Cart',
  data () {
    return {
      totalPrice: ''
    }
  },
  computed: {
    ...mapState([
      'histories'
    ])
  },
  components: {
    HistoryTable
  },
  created () {
    this.$store.dispatch('fetchCarts')
      .then(data => {
        console.log(data)
      })
  }
}
</script>

<style scoped>
.bg-color {
  height: auto;
  width: 95vw;
  color: white;
}

h1 {
  color:#ffce00;
  font-family: 'Oswald', sans-serif;
  font-size: 80px;
  cursor: pointer;
  text-shadow: 2px 2px 4px darkgoldenrod;
  margin-bottom: 35px;
}

h1:hover {
  text-shadow: 2px 2px 4px #000000;
}

.color {
  background-color: #BEC7B4;
}

img {
  height: 100px;
  width: auto;
}
</style>
