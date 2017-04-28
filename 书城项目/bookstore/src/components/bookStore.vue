<template>
    <div id="bookStore">
        <div id="content" style="border-top:0">
            <div class="book_list">
                <ul>
                    <router-link to="/reader" tag="li" v-for="(item,index) in bookList" class="picture_li" style="border-bottom:0" :key="item">
                        <div class="img">
                            <img :src="item.cover" alt="">
                        </div>
                        <div class="book_info">
                            <p class="title">{{item.title}}</p>
                            <p class="summary">{{item.content}}</p>
                            <p class="authors">{{item.authors}}</p>
                            <p class="latest">最新{{item.latest}}</p>
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
            $.get('../../mock/bookStore.json',function (data) {
                _this.bookList=data;
            })
        },
    }
</script>
<style scoped>
    #bookStore{
        padding-top:40px;
        min-height: 670px;
        background: #fff;
    }
</style>