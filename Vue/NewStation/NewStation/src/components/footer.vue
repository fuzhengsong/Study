<template >
    <div class="foot">
        <ul>
        <router-link tag="li" to="/home" active-class="active"><a href="javascript:;"></a></router-link>
        <router-link tag="li" to="/follow" active-class="active"><a href="javascript:;"></a></router-link>
        <router-link tag="li" to="/UserInfo" active-class="active"><a href="javascript:;"></a></router-link>

        </ul>
    </div>
</template>
<script>
    export default{

    }
</script>
<style scoped>
    .foot{
        position: fixed;
        bottom:0;
        left:0;
        height: 0.8rem;
        width:100%;
        border-top:1px solid black;
        background: #fff;
    }
    .foot ul{
        width:80%;
        font-size: 0.7rem;
        height:0.8rem;
        margin:0 auto;
    }
    .foot ul li{
        float:left;
        width:33%;
        text-align: center;
        vertical-align: middle;
    }
    .foot ul li a{
        display: inline-block;
    }
    .foot ul li:first-child a{
        background: url(../assets/img/home1.png) no-repeat ;
        background-size:26px 36px;
        width:26px;
        height: 36px;
    }
    .foot ul li:last-child a{
        background: url(../assets/img/my.png) no-repeat ;
        background-size: contain;
        width:21px;
        height: 36px;
    }
    .foot ul li:nth-child(2) a{
        background: url(../assets/img/write.png) no-repeat ;
        background-size: contain;
        width:48px;
        height: 48px;
    }
    .foot ul li:first-child.active a{
        background: url(../assets/img/home.png) no-repeat ;
        background-size:27px 37px;
        width:27px;
        height: 37px;
    }
    .foot ul li:last-child.active a{
        background: url(../assets/img/my1.png) no-repeat;
        background-size:22px 37px;
        width:22px;
        height: 37px;
    }
</style>