
<template>
    <div class="slide">
        <mt-swipe :auto="3000">
            <mt-swipe-item >
                <a><img src="../assets/images/img_1.jpg"></a>
                <div class="text-box">
                    <h2>还可以降低首付款健身房11111</h2>
                    <p>刘德华11 / 文</p>
                </div>
            </mt-swipe-item>
            <mt-swipe-item >
                <a><img src="../assets/images/img_2.jpg"></a>
                <div class="text-box">
                    <h2>还可以降低首付款健身房11111</h2>
                    <p>刘德华11 / 文</p>
                </div>
            </mt-swipe-item>
            <mt-swipe-item >
                <a><img src="../assets/images/img_3.jpg"></a>
                <div class="text-box">
                    <h2>还可以降低首付款健身房11111</h2>
                    <p>刘德华11 / 文</p>
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>

</script>
<style scoped>
    .slide {
        width:375px;
        height: 250px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        margin:0 auto 20px auto;
    }
    .slide img{
        width:375px;
        height: 250px;
    }
    .slide .text-box{
        background:rgba(0,0,0,0.5);
        position: absolute;
        bottom:0;
        left:0;
        color:#fff;
        width:100%;
        box-sizing: border-box;
        padding-left:10px;
        height:1.24rem;
        text-align: left;
    }
    .slide .text-box h2{
        font-size:0.3rem;
        font-weight: normal;
        margin-top: 0.22rem;
        line-height: 100%;
        margin-bottom: 0.22rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .slide .text-box p{
        font-size:14px;

    }

</style>