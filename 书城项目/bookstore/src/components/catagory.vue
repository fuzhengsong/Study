<template>
    <div id="catagory">
        <!--<div id="catagory_header">-->
            <!--<a @click="back"><img src="../assets/img/back.png" alt=""></a>-->
            <!--<span>分类</span>-->
        <!--</div>-->
        <div id="catagory_content">
            <div class="catagory_tags">
                <p>网文男频</p>
            </div>
            <ul>
                <router-link tag="li" to="" v-for="items in bookList.male" :key="items">
                    <img :src='items.new_image' alt="">
                    <div class="catagory_title">
                        <p >{{items.label}}</p>
                        <p>{{items.fiction_count}}</p>
                    </div>
                </router-link>
            </ul>
            <div class="catagory_tags">
                <p>网文女频</p>
            </div>
            <ul>
                <router-link tag="li" to="" v-for="items in bookList.female" :key="items">
                    <img :src='items.new_image' alt="">
                    <div class="catagory_title">
                        <p>{{items.label}}</p>
                        <p>{{items.fiction_count}}</p>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                bookList:{}
            }
        },
        mounted(){
            var _this=this;
            $.get('../../mock/category.json',function (data) {
                _this.bookList=data;
                console.log(data.male)
            })
        },
        methods:{
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style>
    #catagory{
        padding-top:50px
    }
    /*#catagory_header{*/
        /*height: 50px;*/
        /*width:100%;*/
        /*position: fixed;*/
        /*top:0;*/
        /*background:#EFEEF0;*/
        /*line-height: 50px;*/
        /*z-index:9999*/
    /*}*/
    /*#catagory_header a img{*/
        /*width:10px;*/
        /*height: 16px;*/
        /*margin-left:20px;*/
        /*vertical-align: middle;*/
    /*}*/
    /*#catagory_header span{*/
        /*font-size: 16px;*/
        /*margin-left:10px;*/
    /*}*/
    #catagory_content{
        padding:5px;
    }
    #catagory .catagory_tags{
        height:50px;
        width:100%;
        border-bottom: 1px solid gainsboro;
        line-height: 50px;

    }
    #catagory .catagory_tags p{
        margin-left:20px;
    }
    #catagory_content  ul li{
        position: relative;
        margin-top: 10px;
    }
    #catagory_content  ul li img{
         width:350px;
         height:65px;
     }
    #catagory_content .catagory_title{
        position: absolute;
        top:10px;
        left:20px
    }
    #catagory_content .catagory_title p:first-child{
        font-weight: bold;
    }
</style>