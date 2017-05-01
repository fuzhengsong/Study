<template>
  <div id="app">
      <my-header></my-header>
      <div id="lg_content">
          <div id="side_l">
              <my-side></my-side>
          </div>
          <div id="side_r">
              <my-banner></my-banner>
              <my-main></my-main>
          </div>
      </div>
  </div>
</template>

<script>
    import myHeader from './components/home_header.vue'
    import mySide from './components/home_slide.vue'
    import myBanner from './components/home_banner.vue'
    import myMain from './components/home_main.vue'
export default {
  name: 'app',
  data () {
    return {

    }
  },
  components:{
      'my-header':myHeader,
      'my-side':mySide,
      'my-banner':myBanner,
      'my-main':myMain
  }
}
</script>

<style>
#app{
    background: #fff;
}
#lg_content{
    width:1024px;
    margin:35px auto 0;
    padding-bottom: 100px;
    overflow: hidden;
}
#side_r{
    float:left;
    margin-left:40px;
    width:750px;
}
</style>
