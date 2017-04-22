<template>
  <div id="app">
    <mynav v-show="headerStation"></mynav>
    <div class="content">
      <transition enter-active-class="animated fadeInLeft" >

        <keep-alive>

          <router-view>

          </router-view>

        </keep-alive>

      </transition>
      <transition enter-active-class="animated zoomIn" >

        <keep-alive>
          <!--对router-view进行命名，可以显示对应的组件-->
          <router-view name="zoomIn">

          </router-view>

        </keep-alive>

      </transition>
    </div>
    <myfooter v-show="footerStation"></myfooter>
  </div>
</template>

<script>
  import mynav from './components/header.vue'
  import myfooter from './components/footer.vue'
  import {mapGetters} from 'vuex'
export default {
    name: 'app',
    components:{
        mynav,
        myfooter
    },
//    computed:mapGetters([
//        'headerStation',
//        'footerStation'
//    ]),
    computed:{
        headerStation(){
            return this.$store.getters.headerStation
        },
        footerStation(){
            return this.$store.getters.footerStation
        }
    },

    watch:{
        $route(to){
            var path=to.path.substring(1);
            this.pageChange(path);
        }
    },
    methods:{
        pageChange(path){
            if(path==='UserInfo'||path==='user-login'||path==='user-reg'||/article/.test(path)){
                this.$store.dispatch('headerHide')
            }else{
                this.$store.dispatch('headerShow')
            }
            if(/article/.test(path)){
                this.$store.dispatch('footerHide')
            }else{
                this.$store.dispatch('footerShow')
            }
        }
    }
}
</script>

<style>
.content{
  width:375px;
  margin:auto;
}
</style>
