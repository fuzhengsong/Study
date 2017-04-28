<template>
    <div id="home_hot">
        <div id="content">
            <div class="header">
                <p>本周最火</p>
            </div>
            <div class="book_list">
                <ul>
                    <router-link :to="{name:'book',params:{id:items.fiction_id}}" tag="li" v-for="(items,index) in bookList" class="picture_li"  :key="items">
                        <div class="img">
                            <img :src="items.cover" alt="">
                            <p class="finish">完结</p>
                        </div>
                        <div class="book_info">
                            <p class="title">{{items.title}}</p>
                            <p class="authors">{{items.authors}}</p>
                            <p class="summary">{{items.summary}}</p>
                            <p class="tags">
                                <span v-for="item in items.tags">{{item}}</span>
                            </p>
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
            return{
                bookList:[]
            }
        },
        mounted(){
            var _this=this;
            $.get('../../mock/home_hot.json',function (data) {
                _this.bookList=data.data.data;
            })
        }
    }
</script>

<style>
    #content{
        border-top:5px solid gainsboro;
        background: #fff;
    }
    #content .header{
        width:100%;
        height: 40px;
        border-bottom: 1px solid gainsboro;
        line-height: 40px;
        padding-left:15px;
    }
    #content .header p{
        font-size: 14px;
        font-weight: bold;
    }
    #content .book_list .picture_li{
        cursor: pointer;
        box-sizing: border-box;
        padding: 15px;
        height:170px;
        border-bottom: 1px solid gainsboro;
    }
    #content .book_list .picture_li .img{
        height: 140px;
        margin-right: 15px;
        float:left;
    }
    #content .book_list .picture_li img{
        width:85px;
        height:115px;
    }
    #content .book_list .picture_li .img .finish{
        font-size: 14px;
        color:#fff;
        margin:-28px 0 0 5px;
    }
    #content .book_list .picture_li .book_info{
        margin-left:100px;
        height: 115px;
        position: relative;
    }
    #content .book_list .picture_li .book_info p{
        margin-bottom:5px;
    }
    #content .book_list .picture_li .book_info .title{
        font-size: 16px;
        font-weight: bold;
    }
    #content .book_list .picture_li .book_info .summary{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    #content .book_list .picture_li .book_info .tags{
        position: absolute;
        top:85px;
        left:15px;
    }
    #content .book_list .picture_li .book_info .tags span{
        display:inline-block;
        min-width:60px;
        height: 16px;
        border:1px solid #58BD9C;
        border-radius: 3px;
        color: #58BD9C;
        text-align: center;
        line-height: 16px;
        font-size: 12px;
        margin-right: 2px;
    }
</style>