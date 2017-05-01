<template>
    <div id="lg_header">
        <div id="lg_bar">
            <div class="inner">
                <div class="lg_h_l">
                    <a href="https://www.lagou.com/app/download.html" class="lg_app" target="_blank">
                        拉勾APP
                    </a>
                    <a href="https://hr.lagou.com/corpCenter/bindStep1.html" target="_self" class="lg_os">
                        进入企业版
                    </a>
                </div>
                <div class="lg_h_r">
                    <ul>
                        <li ><a href="javascript: void 0;">消息</a></li>
                        <li ><a href="https://www.lagou.com/resume/myresume.html">我的简历</a></li>
                        <li ><a href="https://www.lagou.com/mycenter/delivery.html">投递箱</a></li>
                        <li ><a href="https://www.lagou.com/mycenter/collections.html">收藏夹</a></li>
                        <li class="lg_center" @mouseover="isCenterHover=true" @mouseout="isCenterHover=false"><a href="javascript: void 0;" >个人中心</a>
                        <div class="lg_center_list" v-show="isCenterHover" >
                            <ul>
                                <li><a href="">我的订阅</a></li>
                                <li><a href="">职位邀请</a></li>
                                <li><a href="">账号设置</a></li>
                                <li><a href="">去企业版</a></li>
                                <li><a href="">退出</a></li>
                            </ul>
                        </div>
                        </li>
                        <li class="lg_icon">
                           <div class="icon">

                           </div>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
        <div id="lg_nav">
            <div class="inner">
                <div class="pc_icon">
                    <a>拉勾网</a>
                </div>
                <div class="lg_nav_c">
                    <strong>杭州站</strong>
                    <span @click="showCities">[切换城市]</span>
                </div>
                <div class="nav">
                    <ul @click="checked">
                        <li><a href="javascript: void 0;" :class="{checked:check1}" :index="1">首页</a></li>
                        <li><a href="javascript: void 0;" :class="{checked:check2}" :index="2">公司</a></li>
                        <li><a href="javascript: void 0;" :class="{checked:check3}" :index="3">一拍</a></li>
                        <li><a href="javascript: void 0;" :class="{checked:check4}" :index="4">言职</a></li>
                        <li><a href="javascript: void 0;" :class="{checked:check5}" :index="5">大鲲</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
            <div id="city_box" v-show="cityShow" :style="boxStyle">
                <div class="c_b_header">
                    <h3>切换城市</h3>
                    <button class="close" @click="cityShow=screenShow=false"></button>
                </div>
                <div class="content">
                    <div class="title">
                        <h3>亲爱的用户您好:</h3>
                        <p>切换城市分站，让我们为您提供更准确的职位信息。</p>
                    </div>
                    <div class="body">
                        <p>点击进入  <a href="javascript: void 0;">杭州站</a>  or 切换到以下城市</p>
                        <div class="city_l">
                            <ul>
                                <li><a href="javascript: void 0;">全国站</a></li>
                                <li><a href="javascript: void 0;">北京站</a></li>
                                <li><a href="javascript: void 0;">广州站</a></li>
                                <li><a href="javascript: void 0;">上海站</a></li>
                                <li><a href="javascript: void 0;">深圳站</a></li>
                                <li><a href="javascript: void 0;">成都站</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer">
                        <p class="clearFloat">其他城市正在开通中，敬请期待～</p>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div id="screen" :style="screenStyle"
                         @click="screenShow=cityShow=false"
                         v-show="screenShow">

            </div>
        </transition>
    </div>
</template>

<script>
    import Center from '../assets/js/position'
export default{
    data(){
        return{
            isCenterHover:false,
            check1:true,
            check2:false,
            check3:false,
            check4:false,
            check5:false,
            boxStyle:{
                top:'',
                left:''
            },
            cityShow:false,
            screenStyle:{
                width:'',
                height:''
            },
            screenShow:false
        }
    },
    mounted(){
        var _this=this;

        window.addEventListener('resize',function () {
            if(_this.cityShow){
                _this.boxStyle.top=Center(500,480).top+'px';
                _this.boxStyle.left=Center(500,480).left+'px';
                _this.screenStyle.width=document.documentElement.offsetWidth+"px";
                _this.screenStyle.height=document.documentElement.offsetHeight+"px";
            }
        })
    },
    methods:{
        checked(event){
            this.check1=this.check2=this.check3=this.check4=this.check5=false;
            var index=event.target.getAttribute('index');
            switch(index){
                case '1':this.check1=true ;
                break;
                case '2':this.check2=true ;
                break;
                case '3':this.check3=true ;
                break;
                case '4':this.check4=true ;
                break;
                case '5':this.check5=true ;
                break;
            }
        },
        showCities(){
            this.screenShow=true;
            this.cityShow=true;
            this.screenStyle.width=document.documentElement.offsetWidth+"px";
            this.screenStyle.height=document.documentElement.offsetHeight+"px";
            this.boxStyle.top=Center(500,480).top+'px';
            this.boxStyle.left=Center(500,480).left+'px'
        }

    }

}
</script>

<style scoped>
#lg_bar{
    min-width: 1024px;
    background: #000;
    height: 30px;
}
#lg_bar .inner{
    max-width: 1308px;
    margin:0 auto
}
#lg_bar .lg_h_l{
    float:left;
    line-height: 30px;
}
#lg_bar .lg_h_l .lg_app{
    color:#08d7a2;
    background: url(../assets/images/app_icon.png) no-repeat 10px 0;
    padding:0 12px 0 27px;
}
#lg_bar .lg_h_l .lg_app:hover{
    color:#05eaaf;
}
#lg_bar .lg_h_l .lg_os{
    border-left:1px solid #5d5d5d ;
    color:#c4c3c3;
    padding:0 12px ;
}
#lg_bar .lg_h_l .lg_os:hover{
    color:#fff;
}
.lg_h_r{
    float: right;
    line-height: 30px;
}
.lg_h_r ul li{
    position: relative;
    float:left;
    margin-right: 10px;
}
.lg_h_r ul li a{
    color:#c4c3c3;
    padding:0 10px 0 0 ;
    border-right: 1px solid #5d5d5d;
}
.lg_h_r ul li:nth-last-child(2) a{
    border:0;
}
.lg_h_r ul li a:hover{
    color:#fff
}
.lg_h_r .icon{
    position: relative;
    top:13px;
    left:-16px;
    width:0;
    height: 0;
    border-width:5px;
    border-style: solid;
    border-color:#fff transparent transparent transparent;
    transition: all 0.4s ease;
}
.lg_h_r ul li:nth-last-child(2):hover + .lg_icon .icon{
    transform-origin:50% 20%;
    transform:rotate(180deg);
}
.lg_h_r .lg_center .lg_center_list{
    background: #000;
    position: absolute;
    left:-12px;
    top:30px;
    z-index: 100;
}
.lg_h_r .lg_center .lg_center_list ul li{
    float:none;
    margin:0;
}
.lg_center .lg_center_list ul li a{
    display: block;
    color:#c4c3c3;
    line-height: 30px;
    min-width: 65px;
    padding:0 12px;
}
.lg_center .lg_center_list ul li a:hover{
    background: #474747;
    color:#fff;
}
#lg_nav{
    min-width: 1024px;
    background: #fafafa;
    height: 54px;
    border-top:1px solid #d2d2d2;
    border-bottom:1px solid #e5e5e5;
}
#lg_nav .inner{
    max-width: 1024px;
    margin:0 auto;
}
#lg_nav .pc_icon{
    background: url(../assets/images/logo.png) no-repeat;
    height: 34px;
    float:left;
    width:97px;
    margin:10px 0 0 0;
    text-indent: -99em;
}
#lg_nav .lg_nav_c{
    float:left;
    margin:10px 0 0 12px;
    height: 44px;
    line-height: 44px;
}
#lg_nav .lg_nav_c strong{
    font-size: 18px;
    color:#000;
    font-weight: 400;
}
#lg_nav .lg_nav_c span{
    font-size: 10px;
    color:#999;
    cursor: pointer;
}
#lg_nav .nav{
    float:left;
    margin-left:50px;
    height: 54px;
    line-height: 54px;
}
#lg_nav .nav ul li{
    float:left;
    margin:0 16px;
}
#lg_nav .nav ul li a{
    display: block;
    font-size: 18px;
    color:#999;
    padding:0 5px;
    height: 53px;
}
#lg_nav .nav .checked{
    color:#000;
    border-bottom:2px solid #00b38a
}
#city_box{
    background: #fff;
    position: absolute;
    left:0;
    top:100px;
    width: 500px;
    height: 480px;
    border:13px solid rgba(0,0,0,0.5);
    transition: all 0.5s ease;
    z-index:9999
}
#city_box .c_b_header{
    height: 44px;
    width:100%;
    background: #00b38a;
    color:#fff;
    text-indent: 12px;
    line-height: 44px;
}
#city_box .c_b_header h3{
    display: inline-block;
    font-weight: 400;
    font-size: 18px;
}
#city_box .c_b_header .close{
    float:right;
    margin:10px 15px;
    background: url(../assets/images/close.png);
    display: inline-block;
    width:19px;
    height: 19px;
    outline: 0;
    border: 0;
}
#city_box .content{
    padding:30px 40px;
}
#city_box .content .title h3{
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: 400;

}
#city_box .content .title p{
    font-size: 16px;
    padding-bottom: 25px;
    border-bottom: 1px solid gainsboro;
}
#city_box .content .body{
    height: 225px;
}
#city_box .content .body p{
    margin:26px 0 14px;

}
#city_box .content .body p a{
    display: inline-block;
    height: 48px;
    width:98px;
    line-height: 48px;
    border:2px solid #00b38a;
    color:#000;
    text-align: center;
    font-size: 16px;
    margin:0 5px;
}
#city_box .content .body .city_l{
    padding-left:10px;

}
#city_box .content .body .city_l ul li{
    float:left;
    margin:11px 12px;
    width:100px;
    height:54px ;
    box-sizing: border-box;
}
#city_box .content .body .city_l ul li a{
    display: inline-block;
    width:96px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    border:1px solid #dce4e6;
    color:#999;
}
#city_box .content .body .city_l ul li a:hover{
    border:2px solid #00b38a;
    color:#000;
}
#city_box .content .footer{
    padding-top:10px;
}
#screen{
    z-index:9998;
    background:#000;
    opacity: 0.7;
    position: absolute;
    top:0;
    left:0;
}
.fade-enter-active{
    animation:fadeIn 0.4s ease;
}
.fade-leave-active{
    animation:fadeOut 0.4s ease
}
@keyframes fadeIn{
    0% {
        opacity: 0;
    }
    100% {
        opacity: 0.7;
    }
}
@keyframes fadeOut {
    0% {
        opacity: 0.7;
    }
    100% {
        opacity: 0;
    }
}
</style>
