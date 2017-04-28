<template>
    <div id="rank">
        <!--<div id="rank_header">-->
            <!--<a @click="back"><img src="../assets/img/back.png" alt=""></a>-->
            <!--<span>排行</span>-->
        <!--</div>-->
        <div id="content" style="border-top:0" >
                    <div class="book_list">
                        <ul>
                            <router-link to="" tag="li" v-for="(item,index) in bookList" class="picture_li" style="height: 120px" :key="item">
                                <div class="img" style="height: 120px">
                                    <img :src="item.cover" alt="" style="width:90px;height:90px">
                                </div>
                                <div class="book_info">
                                    <p class="title">1.{{item.description.split('\n')[0]}}</p>
                                    <p class="summary">2.{{item.description.split('\n')[1]}}</p>
                                    <p class="authors">3.{{item.description.split('\n')[2]}}</p>
                                </div>
                            </router-link>
                        </ul>
                    </div>
        </div>
    </div>

</template>
<script>
    export default{
        data(){
            return {
                bookList:[]
            }
        },
        mounted(){
            var _this=this;
            $.get('../../mock/rank.json',function (data) {
                _this.bookList=data.items;
            })
        },
        methods:{
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style scoped>
    #rank{
        padding-top:50px;
    }
    /*#rank_header{*/
        /*height: 50px;*/
        /*width:100%;*/
        /*position: fixed;*/
        /*top:0;*/
        /*background:#EFEEF0;*/
        /*line-height: 50px;*/
        /*z-index:9999*/
    /*}*/
    /*#rank_header a img{*/
        /*width:10px;*/
        /*height: 16px;*/
        /*margin-left:20px;*/
        /*vertical-align: middle;*/
    /*}*/
    /*#rank_header span{*/
        /*font-size: 16px;*/
        /*margin-left:10px;*/
    /*}*/
    .book_tags{
        height: 40px;
        line-height: 40px;
        width:100%;
        border-left:8px solid #F58730;
        border-bottom: 1px solid gainsboro;
    }
    .book_tags p{
        font-size: 16px;
        margin-left:20px;
    }
    .rank_layout{
        border-bottom: 10px solid gainsboro;
    }

</style>