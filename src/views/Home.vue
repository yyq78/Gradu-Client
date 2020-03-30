<template>
  <div class="home">
    主页
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    test() {
      this.$axios.get('/test').then(res => {

      })
    }
  },
  created() {
    this.test();
  }
}
</script>
<style lang="stylus" scoped>

</style>
