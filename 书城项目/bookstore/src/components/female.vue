<template>
    <!--<div id="female">-->
        <!--<div id="female_header">-->
            <!--<a @click="back"><img src="../assets/img/back.png" alt=""></a>-->
            <!--<span>女生频道</span>-->
        <!--</div>-->
        <div id="content" style="border-top:0" >
            <ul>
                <li v-for="items in bookList" class="female_layout">
                    <div class="book_tags">
                        <p>{{items.ad_name}}</p>
                    </div>
                    <div class="book_list">
                        <ul>
                            <router-link to="" tag="li" v-for="(item,index) in items.data.data" class="picture_li" :key="item">
                                <div class="img">
                                    <img :src="item.cover" alt="">
                                </div>
                                <div class="book_info">
                                    <p class="title">{{item.title}}</p>
                                    <p class="summary">{{item.summary}}</p>
                                    <p class="authors">{{item.authors}}</p>
                                </div>
                            </router-link>
                        </ul>
                    </div>
                </li>
            </ul>
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
            $.get('../../mock/channel/female.json',function (data) {
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
    #female{
        padding-top:50px;
    }
    /*#female_header{*/
        /*height: 50px;*/
        /*width:100%;*/
        /*position: fixed;*/
        /*top:0;*/
        /*background:#EFEEF0;*/
        /*line-height: 50px;*/
        /*z-index:9999*/
    /*}*/
    /*#female_header a img{*/
        /*width:10px;*/
        /*height: 16px;*/
        /*margin-left:20px;*/
        /*vertical-align: middle;*/
    /*}*/
    /*#female_header span{*/
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
    .female_layout{
        border-bottom: 10px solid gainsboro;
    }

</style>