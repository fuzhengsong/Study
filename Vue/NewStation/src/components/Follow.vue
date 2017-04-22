<template>
    <div  class="newsList">
        <ul>
            <li v-for="(value,index) in arrlist" >
                    <h2><span>{{index+1}}.</span>{{value.title}}</h2>
                    <p>{{value.detail}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
    import { Indicator } from 'mint-ui';
    export default{
        data(){
            return {
                arrlist:[]
            }
        },
        mounted(){
            this.frechData()
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route'(to){
                if(to.path==='/follow'){
                    this.frechData()
                }
            }
        },
        methods:{
            frechData:function () {
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var _this=this;
                this.$http.get('src/data/follow.data').then(res=>{
                    _this.arrlist=res.data;
                    Indicator.close();
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
    }
</script>
<style>
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