<template>
    <div id="home_top">
        <el-input
                placeholder="输入作者/书名/关键字"
                icon="search"
                v-model="searchInfo"
                :on-icon-click="handleIconClick">
        </el-input>
        <div class="banner">
            <router-link to=""><img src="../../assets/img/banner.jpg" alt=""></router-link>
        </div>
        <div class="category">
            <ul>
                <router-link tag="li" to="male"><img src="../../assets/img/male.png" alt=""><p>男生</p></router-link>
                <router-link tag="li" to="female"><img src="../../assets/img/female.png" alt=""><p>女生</p></router-link>
                <router-link tag="li" to="catagory"><img src="../../assets/img/category.png" alt=""><p>分类</p></router-link>
                <router-link tag="li" to="rank"><img src="../../assets/img/rank.png" alt=""><p>排行</p></router-link>
            </ul>
        </div>
    </div>
</template>
<script>

    export default{
        data(){
            return{
                searchInfo:''
            }
        },
        methods:{
            handleIconClick(){

            }
        }

    }
</script>
<style scoped>
    #home_top{
      background: #fff;
    }
    #home_top .banner img{
        margin-top:10px;
        width:100%;
    }
    #home_top .category ul{
        padding:5px 0;
        width:100%;
        height:60px;
    }
    #home_top .category ul li{
        float:left;
        width:25%;
        text-align: center;
    }
    #home_top .category ul li img {
        width:30px;
        height: 30px;
    }
    #home_top .category ul li p{
        font-weight: bold;
    }
</style>