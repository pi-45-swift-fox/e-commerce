<template>
    <tr>
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ cart.Product.name }}</td>
        <td><img id="img-cart" :src="cart.Product.image_url" :alt="cart.Product.name+ 'image'"></td>
        <td>Rp. {{ cart.Product.price.toLocaleString() }}</td>
        <td>
            <b-button class="mb-2 icon-cart" variant="outline-white" scale="1.1" @click.prevent="willMinus(cart.id, cart.quantity)">
            <b-icon icon="clipboard-minus" style="color: black;" aria-hidden="true"></b-icon>
            </b-button>
            &nbsp;
            {{ cart.quantity }}
            &nbsp;
            <b-button class="mb-2 icon-cart" variant="outline-white" scale="1.1" @click.prevent="willPlus(cart.id, cart.quantity)">
              <b-icon icon="clipboard-plus" style="color: black;" aria-hidden="true"></b-icon>
            </b-button>
        </td>
        <td>Rp. {{ subtotal.toLocaleString()  }}</td>
        <td>
            <b-button class="mb-2 icon-cart" variant="white" scale="1.1" @click.prevent="willDelete(cart.id)">
              <b-icon icon="trash-fill" variant="danger" aria-hidden="true"></b-icon>
            </b-button>
        </td>
    </tr>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'RowTable',
  props: ['cart', 'index', 'setTotal'],
  data () {
    return {
      subtotal: this.cart.Product.price * this.cart.quantity
    }
  },
  methods: {
    ...mapMutations([
      'SET_TOTAL'
    ]),
    ...mapActions([
      'deleteCart',
      'updateQuantity'
    ]),
    willDelete (id) {
      this.deleteCart(id)
    },
    willMinus (id, currentQuantity) {
      this.updateQuantity({
        id,
        quantity: +currentQuantity - 1
      })
    },
    willPlus (id, currentQuantity) {
      this.updateQuantity({
        id,
        quantity: +currentQuantity + 1
      })
    }
  },
  mounted () {
    this.SET_TOTAL(this.subtotal)
  }
}
</script>

<style scooped>
#img-cart{
  width: 30%;
  height: 30vh;
  object-fit: cover;
}

.icon-cart:hover {
  transform: scale(1.1);
}
</style>
