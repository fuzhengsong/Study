<template>
    <div id="header">
        <a @click="back"><img src="../assets/img/back.png" alt=""></a>
        <span>{{title}}</span>
        <svg class="icon icon_font" aria-hidden="true"  @click="backtoHome">
            <use xlink:href="#icon-shouye"></use>
        </svg>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                title:''
            }
        },
        watch:{
            $route(to){
                var path=to.path;
                this.routeChanges(path);
            }
        },
//        computed:{
//            name(){
//                return this.$store.gettres.title
//            }
  //      },
        methods:{
          routeChanges(path){
              if(path==='/male'){
                  this.title='男生频道'
              }
              if(path==='/female'){
                  this.title='女生频道'
              }
              if(path==='/catagory'){
                  this.title='分类'
              }
              if(path==='/rank'){
                  this.title='排行'
              }
              if(/book\/(\d)+/.test(path)){
                  this.title='书籍详情'
              }

          },
            back(){
                this.$router.push('/home');
            },
            backtoHome(){
                this.$router.push('/home');
            }
        }
    }
</script>
<style>
    #header{
        height: 50px;
        width:100%;
        position: fixed;
        top:0;
        background:#EFEEF0;
        line-height: 50px;
        z-index:9999
    }
   #header a img{
        width:10px;
        height: 16px;
        margin-left:20px;
        vertical-align: middle;
    }
   #header span{
        font-size: 16px;
        margin-left:10px;
    }
    #header .icon_font{
        float:right;
        font-size:25px;
        margin:12px 20px 0 0 ;
    }
</style>
