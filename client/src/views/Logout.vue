<template>
  <div>
      <h1>
          Logging you out...
      </h1>
  </div>
</template>

<script>
export default {
  async created() {
      await this.$store.dispatch('logout');
      this.$router.push('/');
  }
}
</script>

<style>

</style>