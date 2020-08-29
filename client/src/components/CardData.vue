<template>
  <tr class="mx-auto">
    <td>
      <img :src="cart.Product.image_url" style="width:60px;height:60px;" />
    </td>
    <td>{{cart.Product.name}}</td>
    <td>
      <div class="container">
        <div class="row justify-content-center">
          <div class="mr-2" v-html="plusIcon" id="icon" @click.prevent="plus(cart.quantity, cart.Product.id)">  </div>
            {{cart.quantity}}
          <div class="ml-2" v-html="minusIcon" id="icon" @click.prevent="minus(cart.quantity, cart.Product.id)">  </div>
        </div>
      </div>
    </td>
    <td>Rp {{ Number((cart.Product.price * cart.quantity).toFixed(1)).toLocaleString()}}</td>
    <td>
      <button class="btn btn-outline-danger" @click.prevent="deleteItem">Delete</button>
    </td>
  </tr>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'
export default {
  name: "CartData",
  data() {
    return {
      showModalDelete: false,
      showModalEdit: false,
      plusIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>',
      minusIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z"/></svg>'
    }
  },
  props: ["cart", "no"],
  methods: {
    deleteItem() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          // console.log(this.cart)
          console.log(this.$store.state.baseUrl + '/' + localStorage.userId + '/' + this.cart.ProductId)
          axios({
            method: 'delete',
            headers: { accesstoken: localStorage.token},
            url: this.$store.state.baseUrl + '/' + localStorage.userId + '/' + this.cart.Product.id
          })
            .then(() => {
              swal('Success', 'cart deleted', 'success', {buttons: false})
              this.$store.dispatch('fetchCart')
            })
        }
      })
    },
    minus (quantity, ProductId) {
      if (+quantity - 1 === 0) {
        return swal('Can not Proceed!', 'Why must decreament if can delete it', 'error')
      }
      axios({
        url: `${this.$store.state.baseUrl}/${localStorage.userId}/${ProductId}`,
        method: 'put',
        headers: {
          accesstoken: localStorage.token
        },
        data: {
          quantity: +quantity - 1
        }
      })
        .then(() => {
          this.$store.dispatch('fetchCart')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    plus (quantity, ProductId) {
      if (this.cart.Product.stock < +quantity + 1) {
        return swal('Can not Proceed!', 'Please delete product!', 'error')
      }
      axios({
        url: `${this.$store.state.baseUrl}/${localStorage.userId}/${ProductId}`,
        method: 'put',
        headers: {
          accesstoken: localStorage.token
        },
        data: {
          quantity: +quantity + 1
        }
      })
        .then(() => {
          this.$store.dispatch('fetchCart')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
};
</script>

<style>

.cardData {
  color: goldenrod;
}
</style>