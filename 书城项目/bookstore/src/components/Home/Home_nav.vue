<template>
    <div id="header">
        <div class="header_tag ">
            <router-link to="/home"  active-class="active">书城</router-link>
        </div>
       <div class="header_tag ">
           <router-link to="/bookStore" active-class="active">书架</router-link>
       </div>
    </div>
</template>
<script>
    export default{

    }
</script>
<style scoped>
    #header{

        height: 40px;
        width:100%;
        position: fixed;
        top:0;
        background:#EFEEF0;
        line-height: 40px;
        z-index:9999
    }
    #header .header_tag{
        display: inline-block;
        font-size: 16px;
        width:49%;
        text-align: center;
    }
    #header .header_tag a{
        display: inline-block;
        cursor: pointer;
        width:40px;
        height: 40px;
        box-sizing: border-box;
    }
    #header .header_tag a.active{
        border-bottom: 3px solid black;
        color:#F58730;
    }
</style>