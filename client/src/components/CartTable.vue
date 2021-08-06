<template>
    <tr>
        <td style="width: 30vw"><img id="img-cart" :src="cart.Product.image_url" :alt="cart.Product.name+ 'image'"></td>
        <th scope="row">{{ cart.Product.name }}</th>
        <td>Rp. {{ cart.Product.price.toLocaleString() }}</td>
        <td>
            <b-button class="mb-2 icon-cart" variant="outline-white" scale="1.1" @click.prevent="willMinus(cart.id, cart.quantity,  cart.Product.price)">
            <b-icon icon="clipboard-minus" style="color: black;" aria-hidden="true"></b-icon>
            </b-button>
            &nbsp;
            {{ cart.quantity }}
            &nbsp;
            <b-button class="mb-2 icon-cart" variant="outline-white" scale="1.1" @click.prevent="willPlus(cart.id, cart.quantity, cart.Product.price)">
              <b-icon icon="clipboard-plus" style="color: black;" aria-hidden="true"></b-icon>
            </b-button>
        </td>
        <td>Rp. {{ subtotal.toLocaleString()  }}</td>
        <td>
            <b-button class="mb-2 icon-cart" variant="white" scale="1.1" @click.prevent="willDelete(cart.id, cart.Product.price)">
              <b-icon icon="trash-fill" variant="danger" aria-hidden="true"></b-icon>
            </b-button>
        </td>
    </tr>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
  name: 'RowTable',
  props: ['cart', 'index', 'setTotal'],
  computed: {
    ...mapState([
      'total'
    ]),
    subtotal () {
      return this.cart.Product.price * this.cart.quantity
    }
  },
  methods: {
    ...mapMutations([
      'PLUS_TOTAL',
      'MINUS_TOTAL'
    ]),
    ...mapActions([
      'deleteCart',
      'updateQuantity',
      'getCarts'
    ]),
    willDelete (id, price) {
      this.deleteCart({ id: +id, price: +price })
    },
    willMinus (id, currentQuantity, price) {
      this.updateQuantity({
        id,
        quantity: +currentQuantity - 1
      })
      this.MINUS_TOTAL(price)
      this.getCarts()
    },
    willPlus (id, currentQuantity, price) {
      this.updateQuantity({
        id,
        quantity: +currentQuantity + 1
      })
      this.PLUS_TOTAL(price)
      this.getCarts()
    }
  },
  created () {
    this.getCarts()
  }
}
</script>

<style scooped>
#img-cart{
  width: 70%;
  height: 30vh;
  object-fit: cover;
}

.icon-cart:hover {
  transform: scale(1.1);
}
</style>
