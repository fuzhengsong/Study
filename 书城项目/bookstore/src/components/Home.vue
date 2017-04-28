<template>
    <div id="home">
        <home-top></home-top>
        <home-hot></home-hot>
        <home-recommend></home-recommend>
    </div>
</template>
<script>
    import homeTop from './Home/Home_top.vue'
    import homeHot from './Home/Home_hot.vue'
    import homeRecommend from './Home/Home_recommend.vue'
    export default{
        components:{
            'home-top':homeTop,
            'home-hot':homeHot,
            'home-recommend':homeRecommend
        }
    }
</script>
<style scoped>
    #home{
        background: #fff;
        margin-top: 40px;
        padding:5px;
    }
</style>