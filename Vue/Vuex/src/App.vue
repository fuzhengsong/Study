<template>
  <div id="app">
    <input type="button" value="增加" @click="add">
    <input type="button" value="减少" @click="reduce">
    <input type="button" value="偶数时增加" @click="even">
    <input type="button" value="一秒后增加" @click="anycadd">
    <p>当前的数为：{{count}}  ||   现在的数是{{isOdd}}</p>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'

export default {
  name: 'app',
  methods:mapActions([
      'add',
      'reduce',
      'even',
      'anycadd'
  ]),
    computed:mapGetters([
        'count',
        'isOdd'
    ])
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
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
  color: #42b983;
}
</style>
