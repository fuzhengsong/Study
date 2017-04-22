<template>
    <div>
        <slide></slide>
        <div  class="newsList">
            <ul>
                <li v-for="(value,index) in arrlist" >
                    <router-link :to="'./article/'+value.id">
                        <h2><span>{{index+1}}.</span>{{value.title}}</h2>
                        <p>{{value.detail}}</p>
                    </router-link>

                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import slide from './Slide.vue'
    import { Indicator } from 'mint-ui';
    export default{
        components:{
            slide
        },
        data(){
            return {
             arrList:[]
            }
        },
        computed:{
            arrlist:function () {
                for (var keys in this.arrList){
                    this.arrList[keys].detail=this.arrList[keys].detail.slice(0,80)+"...";
                }
                return this.arrList
            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route'(to){
                if(to.path==='/home'){
                    this.fetchData()
                }
            }
        },
        methods:{
            fetchData:function(){

                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var _this=this;

                this.$http.get('src/data/index.data').then(function (res) {
                    _this.arrList=res.data;
                    console.log(_this.$Indicator);
                    Indicator.close();
                }).catch(error=>{
                    console.log(error)
                })
            }
        },
        mounted:function () {
            this.fetchData()
        }
    }
</script>
<style scoped>
    .newsList{
        margin:0.6rem auto 0.8rem auto;
    }
    .newsList ul{
        padding:0 0.4rem;
    }
    .newsList ul li{
        color: #494d4d;
        padding: 0.2rem 0;
        border-bottom: 1px dashed #ccc;
    }
    .newsList ul li h2 {
        max-height: 0.9rem;
        font-size: 0.33rem;
        /*overflow: hidden;*/
    }
    .newsList ul li p {
        max-height: 1.8rem;
        margin-top: 0.05rem;
        /*overflow: hidden;*/
    }
</style>