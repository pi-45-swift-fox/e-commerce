<template>
  <div class="homepage">
      <div id="topup" v-if="isTopUp">
          <div id="page">
                <form id="form" @submit.prevent="addbalance">
                    <input type="number" name="balance" id="balance" v-model="topupvalue">
                    <input type="submit" value="Top Up">
                    <button @click="endTopUp">Cancel</button>
                </form>
        </div>
      </div>
      <div id="status">
        <h3>Account Balance : IDR {{balance}}</h3>
        <a href="#" @click.prevent="topUp">Top up Balance</a>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Homepage',
  data() {
    return {
      balance: '',
      isTopUp: false,
      topupvalue: '',
    };
  },
  methods: {
    findOne() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/user',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          console.log(`dari findone : ${data.data.balance}`);
          this.balance += data.data.balance;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    topUp() {
      this.isTopUp = true;
    },
    endTopUp() {
      this.isTopUp = false;
    },
    addbalance() {
      const total = parseInt(this.balance) + parseInt(this.topupvalue);
      this.$store.dispatch('addbalance', total)
        .then((result) => {
          console.log(result);
          console.log('sukses topup');
          this.isTopUp = false;
        });
    },
  },
  created() {
    this.findOne();
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.homepage{
    width: 100%;
    display: flex;
}
#status{
    margin: 0;
}

#topup{
    width: 100%;
    height: 100%;
    position: fixed;
}
#page{
    margin-top: 40px;
    background: rgb(182, 164, 164);
    height: 50px;
    width: 230px;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #0c814d;
  margin: 0;
}
</style>
