<template>
  <div class="mb-5">
    <b-navbar toggleable="lg" id="bg-color">
      <b-navbar-brand>
        <div class="container ">
          <div v-html="icon" class="mr-2 icon"></div>
          <div id="cms">NendoShop</div>
        </div>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link to="/" id="link" class="ml-1">Products</router-link>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <router-link to="/cart" class="container cart" v-b-tooltip.hover title="See Cart">
              <div v-html="cartIcon"></div>
            </router-link>
            <router-link to="/history" class="container cart" v-b-tooltip.hover title="See History Transactions">
              <div v-html="historyIcon"></div>
            </router-link>
          </b-navbar-nav>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->

            <template v-slot:button-content>
              <em id="link">{{ $store.state.userLogin }}</em>
            </template>
            <b-dropdown-item @click.prevent="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.939 0l-.939 4.971v1.098c0 1.066-.934 1.931-2 1.931s-2-.865-2-1.932v-1.097l2.996-4.971h1.943zm-3.052 0l-2.887 4.971v1.098c0 1.066-.934 1.931-2 1.931s-2-.865-2-1.932v-1.097l4.873-4.971h2.014zm17.113 6.068c0 1.067-.934 1.932-2 1.932s-2-.933-2-2v-1.098l-2.887-4.902h2.014l4.873 4.971v1.097zm-10-1.168v1.098c0 1.066-.934 2.002-2 2.002s-2-.933-2-2v-1.098l1.047-4.902h1.906l1.047 4.9zm2.004-4.9l2.994 5.002v1.098c0 1.067-.932 1.9-1.998 1.9s-2-.933-2-2v-1.098l-.939-4.902h1.943zm4.996 12v7h-18v-7h18zm2-2h-22v14h22v-14zm-13.751 6.054c0 .399-.228.734-.697.878-.267.082-.641.096-.967.01-.472-.123-.789-.469-.781-.985l.001-.078h.736v.079c0 .211.11.344.313.397.184.047.497.042.622-.114.046-.057.054-.178-.01-.241-.173-.168-.572-.181-1.005-.347-.352-.133-.565-.384-.565-.753 0-.435.304-.739.709-.849.275-.075.56-.064.813-.002.441.107.74.422.74.904v.079h-.732l-.004-.074c-.013-.179-.09-.282-.271-.319-.127-.026-.31-.033-.421.039-.121.079-.15.249.007.322.273.128.836.173 1.149.378.228.151.363.375.363.676zm1.892-.947h-.941v-1.042h-.756v2.875h.755v-1.171h.941v1.171h.756v-2.875h-.756v1.042zm3.833.406c0 .853-.549 1.487-1.414 1.487-.871 0-1.415-.642-1.415-1.487 0-.865.547-1.513 1.415-1.513.878 0 1.414.661 1.414 1.513zm-.755 0c0-.467-.192-.853-.659-.853-.471 0-.658.392-.658.853 0 .45.198.83.658.83.461 0 .659-.381.659-.83zm3.327-.498c0 .389-.179.713-.555.87-.129.053-.285.08-.464.08h-.55v.974h-.755v-2.875h1.305c.179 0 .335.027.464.081.375.156.555.479.555.87zm-1.568.328h.386l.185-.014c.184-.029.261-.136.261-.314s-.078-.284-.261-.313l-.185-.014h-.386v.655z"/></svg>',
      cartIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>',
      historyIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 12c0 6.627-5.373 12-12 12s-12-5.373-12-12h2c0 5.514 4.486 10 10 10s10-4.486 10-10-4.486-10-10-10c-2.777 0-5.287 1.141-7.099 2.977l2.061 2.061-6.962 1.354 1.305-7.013 2.179 2.18c2.172-2.196 5.182-3.559 8.516-3.559 6.627 0 12 5.373 12 12zm-13-6v8h7v-2h-5v-6h-2z"/></svg>'
    }
  },
  methods: {
    signOut () {
      localStorage.clear()
      this.$store.commit('SET_ISLOGIN', false)
      this.$store.commit('SET_USER', '')
      if (this.$route.path !== '/') this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&display=swap');

.cart {
  fill: #143109;
}

.icon {
  fill: #BEC7B4;
}

.button-add:hover {
  color: black;
}

#cms {
  color: #BEC7B4;
  text-decoration: none;
  background-image: linear-gradient(rgb(6, 39, 12), rgb(176, 251, 188)),linear-gradient(#feb2b2, #feb2b2);
  background-size: 100% 2px, 0 2px;
  background-position: 100% 100%, 0 100%;
  background-repeat: no-repeat;
  transition: background-size 2s linear;
}

#cms:hover {
  background-size: 0 2px, 100% 2px;
}

#user {
  color: #DEE2D9;
  padding: 10px;
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-style: bold;
}

#bg-color {
  background-image: linear-gradient(to right, rgba(228, 153, 153, 0), rgb(141, 162, 144));
}

#link {
  color: #DEE2D9;
  text-decoration: none;
  background-image: linear-gradient(#222b40, #222b40),
    linear-gradient(rgb(176, 251, 188), rgb(176, 251, 188)),
    linear-gradient(#feb2b2, #feb2b2);
  background-size: 20px 2px, 100% 2px, 0 2px;
  background-position: calc(20px * -1) 100%, 100% 100%, 0 100%;
  background-repeat: no-repeat;
  transition: background-size 2s linear, background-position 2s linear;
}

#link:hover {
  background-size: 20px 2px, 0 2px, 100% 2px;
  background-position: calc(100% + 20px) 100%, 100% 100%, 0 100%;
}
</style>
