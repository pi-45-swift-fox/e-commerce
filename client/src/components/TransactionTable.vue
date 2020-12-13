<template>
    <div class="card">
        <h5 class="card-header text-light"
        style="background: #1D7874; font-family: 'Bungee', cursive;">7th June 2020</h5>
        <div class="card-body">
            <table class="table table-borderless text-center" style="width: 60rem;">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <Transactions></Transactions>
                </tbody>
            </table>
        </div>
        <div class="d-flex flex-column align-items-end mr-3">
            <h5>Total</h5>
            <h4>Rp 20.000</h4>
        </div>
    </div>
</template>

<script>
import Transactions from './TransactionDatas.vue';

export default {
  name: 'TransactionTable',
  components: {
    Transactions,
  },
};
</script>

<style>

</style>
