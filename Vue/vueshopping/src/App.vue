<template>
  <div id="app">
    <cart></cart>
  </div>
</template>

<script>
    import cart from './components/cart.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
    components:{
      cart
    }
}

</script>

<style>
  @import "./assets/css/base.css";
</style>
