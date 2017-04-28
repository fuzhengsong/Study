<template>
  <div id="app">
      <my-header v-show="headerStation"></my-header>
      <home-nav v-show="navStation"></home-nav>
      <router-view>

      </router-view>
  </div>
</template>
<script>
    import homeNav from './components/Home/Home_nav.vue'
    import Header from './components/header.vue'
  export default{
      name:'app',
      data(){
        return{
            headerStation:false,
            navStation:true
        }
      },
      watch:{
        $route(to){
            var path=to.path;
            this.routeChange(path);
        }
      },
      components:{
          'home-nav':homeNav,
          'my-header':Header
      },
      methods:{
         routeChange(path){
             if(path==='/home'||path==='/bookStore'){
                 this.navStation=true;
                 this.headerStation=false;
             }else{
                 this.navStation=false;
                 this.headerStation=true;
             }
             if(path==='/reader'){
                 this.navStation=false;
                 this.headerStation=false;
             }
         }
      }
  }
</script>
<style>
    #app{
        overflow-x: hidden;
    }
</style>