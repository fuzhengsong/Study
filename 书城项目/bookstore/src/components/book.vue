<template>
    <div id="book">
        <div id="message" v-show="messageShow">
            <img src="../assets/img/loading.gif" alt="">
            <p>您访问的书籍不存在，正在为您跳转...</p>
        </div>
        <div id="book_header">
            <div class="header">
                <img :src="mybook.cover" alt="">
            </div>
            <div class="info">
                <p class="title">{{mybook.title}}</p>
                <p class="authors">{{mybook.authors}}</p>
                <p class="summary">{{mybook.price}}书币/签字</p>
                <p class="score_count">{{mybook.score_count}}个评价</p>
                <p class="count">字数：{{mybook.word_count}}字</p>
            </div>
        </div>
        <div class="book_button" @click="toRead">
           <input type="button" value="开始阅读">
        </div>
        <div class="summary">
            <p >{{mybook.content}}</p>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                messageShow:false,
                bookList:{}
            }
        },
        computed:{
          mybook:function () {
              return this.bookList.item
          }
        },
        mounted() {
           var id=this.$route.params.id;
           this.getData(id);
        },
        watch:{
            $route(to){
                if(/book\/(\d)+/.test(to.path)){
                    this.getData(to.params.id)
                }
            }
        },
        methods:{
            toRead(){
                this.$router.push({path:'/reader'})
            },
            getData(id){
                var _this=this;
                $.ajax({
                    url:'../mock/book/'+id+'.json',
                    dataType:'json',
                    success:function (data) {
                        _this.bookList=data;
                    },
                    error:function () {
                        alert('您访问的书籍不存在，正在为您跳转...');
                        setTimeout(function () {
                            _this.$router.push({name:'book',params:{id:18218}});
                        },2000)
                    }
                })
            }
        }

    }
</script>
<style>
    #book{
        margin-top:50px;
    }
    #book #message{
        position: absolute;
        top:268px;
        left:52px;
        width:268px;
        height: 100px;
        z-index: 9999;
        opacity: 0.8;
        text-align: center;
    }
    #book #message img{
        width:30px;
        height: 30px;
    }
    #book_header{
        padding-top:10px;
    }
    #book_header .header img{
        width:100px;
        height: 140px;
        float:left;
        margin-left:20px;
    }
    #book_header .info{
        letter-spacing: 2px;
        overflow: hidden;
        margin-left:150px;
    }
    #book_header .info p{
        margin-bottom: 5px;
    }
    #book_header .info .title{
        font-weight: bold;
        font-size: 16px;
    }
    #book_header .info .authors{
        color:#00AA88;
    }
    .book_button{
        margin-top:30px;
        text-align: center;
    }
    .book_button input{
        width:95%;
        display: inline-block;
        height:40px;
        outline: 0;
        /*border:1px solid gainsboro;*/
        border-radius: 5px;
        background:#F35D02;
        color:#fff;
    }
    .summary{
        padding:10px;
    }
</style>