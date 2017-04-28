<template>
    <div id="home_recommend">
        <div id="content">
            <div class="header">
                <p>重磅推荐</p>
            </div>
            <div class="book_list">
                <ul>
                    <router-link to="" tag="li"  class="picture_li" style="border-bottom: 0">
                        <div class="img">
                            <img :src="firstBook.cover" alt="">
                            <p class="finish">完结</p>
                        </div>
                        <div class="book_info">
                            <p class="title">{{firstBook.title}}</p>
                            <p class="authors">{{firstBook.authors}}</p>
                            <p class="summary">{{firstBook.summary}}</p>
                            <p class="tags">
                                <span v-for="item in firstBook.tags">{{item}}</span>
                            </p>
                        </div>
                    </router-link>
                    <router-link to="" tag="li" v-for="(items,index) in BookList" class="list_li" :key="items">
                        <div class="recommend_list">
                            <span class="index">0{{index+1}}</span> <span class="recommend_list_title">{{items.title}}</span>
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
        computed:{
          BookList(){
              return this.bookList.slice(1,9);
          },
          firstBook(){
              return this.bookList[0]
          }
        },
        created(){
            var _this=this;
            $.get('../../mock/recommend.json',function (data) {
                _this.bookList=data.data.data;
            })
        }
    }
</script>

<style scoped>
    #home_recommend #content .list_li .recommend_list{
        margin:0 auto;
        width:95%;
        height: 50px;
        line-height: 50px;
        border-top: 1px solid gainsboro;
    }
    #home_recommend #content .list_li .recommend_list .index{
        color:#F58730;
        margin-right: 10px;
    }
    #home_recommend #content .list_li .recommend_list .recommend_list_title{
        font-size: 14px;
        font-weight: bold;
    }
    /*#home_recommend{*/
        /*border-top:5px solid gainsboro;*/
        /*background: #fff;*/
    /*}*/
    /*#home_recommend .header{*/
        /*width:100%;*/
        /*height: 40px;*/
        /*border-bottom: 1px solid gainsboro;*/
        /*line-height: 40px;*/
        /*padding-left:15px;*/
    /*}*/
    /*#home_recommend .header p{*/
        /*font-size: 14px;*/
        /*font-weight: bold;*/
    /*}*/
    /*#home_recommend #content .book_list :nth-child(1){*/
        /*cursor: pointer;*/
        /*box-sizing: border-box;*/
        /*padding: 15px;*/
        /*height:170px;*/
    /*}*/
    /*#home_recommend .book_list li .img{*/
        /*height: 140px;*/
        /*margin-right: 15px;*/
        /*float:left;*/
    /*}*/
    /*#home_recommend .book_list li img{*/
        /*width:85px;*/
        /*height:115px;*/
    /*}*/
    /*#home_recommend .book_list li .img .finish{*/
        /*font-size: 14px;*/
        /*color:#fff;*/
        /*margin:-28px 0 0 5px;*/
    /*}*/
    /*#home_recommend .book_list .book_info{*/
        /*margin-left:100px;*/
        /*height: 115px;*/
        /*position: relative;*/
    /*}*/
    /*#home_recommend .book_list .book_info p{*/
        /*margin-bottom:5px;*/
    /*}*/
    /*#home_recommend .book_list .book_info .title{*/
        /*font-size: 16px;*/
        /*font-weight: bold;*/
    /*}*/
    /*#home_recommend .book_list .book_info .summary{*/
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*white-space: nowrap;*/
    /*}*/
    /*#home_recommend .book_list .book_info .tags{*/
        /*position: absolute;*/
        /*top:85px;*/
        /*left:15px;*/
    /*}*/
    /*#home_recommend .book_list .book_info .tags span{*/
        /*display:inline-block;*/
        /*min-width:60px;*/
        /*height: 16px;*/
        /*border:1px solid #58BD9C;*/
        /*border-radius: 3px;*/
        /*color: #58BD9C;*/
        /*text-align: center;*/
        /*line-height: 16px;*/
        /*font-size: 12px;*/
        /*margin-right: 2px;*/
    /*}*/

</style>