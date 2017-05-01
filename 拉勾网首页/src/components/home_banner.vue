<template>
    <div id="mybanner">
        <div id="search">
            <div class="s_up">
                <form >
                    <label for=""><input type="text" name="search" :placeholder="placeholderText" class="in" autocomplete="off" v-model="searchtext" @focus="searchFocus" @blur="searchBlur"></label>
                    <button type="button" class="sh">搜索</button>
                </form>
                <div class="s_up_list" v-show="showSearch">
                    <span >猜你要搜</span>
                    <ul>
                        <li v-for="(item,index) in checkList " @mousedown="searchCheck(index)" ><a href=" ">{{item}}</a></li>
                    </ul>
                </div>
            </div>
            <div class="s_down">
                <span>热门搜索：</span>
                <a href="">梦想合伙人</a>
                <a href="">人才峰会</a>
                <a href="">京东算法大赛</a>
                <a href="">测试架构师</a>
                <a href="">产品经理</a>
                <a href="">编辑</a>
                <a href="">html5</a>
                <a href="">拉勾APP</a>
            </div>
        </div>
        <div id="banner">
            <div class="bigBanner_container">
                <ul class="big_b" :style="{top:bn_offsetY}">
                    <li><a href=""><img src="../assets/images/banner1.jpg" alt=""></a></li>
                    <li><a href=""><img src="../assets/images/banner2.jpg" alt=""></a></li>
                    <li><a href=""><img src="../assets/images/banner3.jpg" alt=""></a></li>
                </ul>
            </div>
            <div class="smBanner_container">
                <ul>
                   <li  @mouseover="checkBanner"
                        @mouseout="autoPlay(true)"><a href="" class="od" :index=0><img src="../assets/images/od1.jpg" alt=""></a></li>
                   <li  @mouseover="checkBanner"
                        @mouseout="autoPlay(true)"><a href="" class="od" :index=1 ><img src="../assets/images/od2.jpg" alt=""></a></li>
                   <li  @mouseover="checkBanner"
                        @mouseout="autoPlay(true)"><a href="" class="od" :index=2><img src="../assets/images/od3.jpg" alt=""></a></li>
                </ul>
                <i class="border" :style="{top:od_offsetY}"><img src="../assets/images/border.png" alt=""></i>
            </div>
        </div>
        <div id="ads" @mousemove="hotInfoShow">
            <ul  >
                <li @mouseover="currentIndex=0" > <a href=""><img src="../assets/images/ad1.png" alt="">
                        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                            <div class="hot_info" v-show="currentIndex===0">
                                <h2>Wonder</h2>
                                <em></em>
                                <p>
                                    增强现实（AR）平台——回到现实之外
                                </p>
                            </div>
                        </transition>
                    </a>
                </li>
                <li    @mouseover="currentIndex=1">
                    <a href=""><img src="../assets/images/ad2.png" alt=""  >
                        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                            <div class="hot_info"  v-show="currentIndex===1" >
                                <h2>塘桥</h2>
                                <em></em>
                                <p>
                                    增强现实（AR）平台——回到现实之外
                                </p>
                            </div>
                        </transition>
                    </a>
                </li>
                <li  @mouseover="currentIndex=2">
                    <a href="" ><img src="../assets/images/ad3.jpg" alt="">
                        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                            <div class="hot_info"  v-show="currentIndex===2" >
                                <h2>酷家乐</h2>
                                <em></em>
                                <p>
                                    增强现实（AR）平台——回到现实之外
                                </p>
                            </div>
                        </transition>
                    </a>
                </li>
                <li  @mouseover="currentIndex=3">
                    <a href="" :index='3'><img src="../assets/images/ad4.png" alt="">
                        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                            <div class="hot_info"  v-show="currentIndex===3" >
                                <h2>淘粉吧</h2>
                                <em></em>
                                <p>
                                    增强现实（AR）平台——回到现实之外
                                </p>
                            </div>
                        </transition>
                    </a>
                </li>
                <li  @mouseover="currentIndex=4">
                    <a href="" :index='4'><img src="../assets/images/ad5.jpg" alt="">
                        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                            <div class="hot_info"  v-show="currentIndex===4" >
                                <h2>顺网科技</h2>
                                <em></em>
                                <p>
                                    增强现实（AR）平台——回到现实之外
                                </p>
                            </div>
                        </transition>
                    </a>
                </li>
                <li  @mouseover="currentIndex=5">
                    <a href="" :index='5'><img src="../assets/images/ad6.png" alt="">
                        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                            <div class="hot_info"  v-show="currentIndex===5" >
                                <h2>LOCKet</h2>
                                <em></em>
                                <p>
                                    增强现实（AR）平台——回到现实之外
                                </p>
                            </div>
                        </transition>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                searchtext:'',
                showSearch:false,
                placeholderText:'京东算法大赛',
                checkList:['Java','前端','运营','IOS','产品经理','Web前端','测试','Android'],
                bn_offsetY:'',
                od_offsetY:'',
                controlPlay:true,
                ind:0,
                timer:Function,
                ismouseover:false,
                currentIndex:-1
            }
        },
        mounted(){
             this.autoPlay(true);
        },
        methods:{
            searchFocus(){
                this.showSearch=true;
                this.placeholderText='搜索公司、职位或地点'
            },
            searchBlur(){
                this.showSearch=false;
                this.placeholderText='京东算法大赛'
            },
            searchCheck(index){
                this.searchtext=this.checkList[index];
                this.showSearch=false;
            },
            checkBanner(event,ind){
                if(ind===undefined){
                    this.autoPlay(false);
                    var index=parseInt(event.target.getAttribute('index'));
                }
                if(index===0||ind===0){
                    this.bn_offsetY=0+'px';
                    this.od_offsetY=0+'px';
                }if(index===1||ind===1){
                    this.bn_offsetY=-160+'px';
                    this.od_offsetY=55+'px';
                }if(index===2||ind===2){
                    this.bn_offsetY=-320+'px';
                    this.od_offsetY=110+'px';
                }
            },
            autoPlay(flag){
                var _this=this;
                if(flag){
                     _this.timer=setInterval(function () {
                        _this.checkBanner(event,_this.ind);
                        _this.ind++;
                        _this.ind=_this.ind===3?0:_this.ind;
                    },2000)
                }else{
                    clearInterval(_this.timer)
                }

            },
            hotInfoShow(event){
                var adArea=document.getElementById('ads');
                var top=adArea.getBoundingClientRect().top+window.pageYOffset;
                var left=adArea.getBoundingClientRect().left+window.pageXOffset;
                if(event.pageX<left+1||event.pageX>left+740||event.pageY<top+1||event.pageY>top+115){
                    this.currentIndex=-1
                }
            }
        }
    }
</script>
<style scoped>
    #search .s_up{
        height: 37px;
        width:740px;
        position: relative;
    }
    #search .s_up .in{
        width:570px;
        height: 23px;
        line-height: 23px;
        font-size:16px;
        padding:5px 8px 5px 10px ;
        border:2px solid #00b38a;
        border-right: 0;
    }
    #search .s_up .sh{
        height: 37px;
        width: 150px;
        color: #FFF;
        font-size: 18px;
        border: 2px solid #00b38a;
        background: #00b38a;
        float: right;
        cursor: pointer;
    }
    #search .s_up .sh:hover{
        background: #00a57f;
    }
    #search .s_up .s_up_list{
        position: absolute;
        z-index:21;
        background-color: #fff;
        border: 2px solid #00b38a;
        border-top: 0;
        width: 587px;
    }
    #search .s_up .s_up_list span{
        display: block;
        border-bottom: 1px dashed #ededed;
        font-size: 15px;
        color: #999;
        background-color: #fafafa!important;
        padding: 5px 6px;
    }
    #search .s_up .s_up_list ul li{
        font-size: 1.1em;
        color: #555;
        padding: 5px 6px;
        cursor: pointer;
    }
    #search .s_up .s_up_list ul li:hover{
        background-color: #00b38a;
    }
    #search .s_up .s_up_list ul li:hover a{
        color:#fff
    }
    #search .s_down {
        margin:8px 0 16px 0;
    }
    #search .s_down a{
        margin-right: 20px;
        color:#00b38a;
    }
    #search .s_down a:hover{
        text-decoration: underline;
    }

    #banner{
        width:744px;
        height: 160px;
        box-sizing: border-box;
        overflow: hidden;
    }
    #banner .bigBanner_container{
        float:left;
        width:612px;
        height: 160px;
        position: relative;
    }
    #banner .bigBanner_container .big_b{
        position: absolute;
        top:0;
        transition: all 0.4s ease;
    }
    #banner .bigBanner_container .big_b li{
        height: 160px;
    }
    #banner .bigBanner_container .big_b img{
        width:612px;
        height: 160px;
    }
    #banner .smBanner_container{
        margin-left: 5px;
        float:left;
        position: relative;
    }
    #banner .smBanner_container li{
        position: relative;
        padding-left:4px;
        margin-bottom:5px;
    }
    #banner .smBanner_container a{
        display: block;
        width:113px;
        height: 42px;
        border:4px solid rgba(0,0,0,0.5);
    }
    #banner .smBanner_container img{
        width:113px;
        height: 42px;
    }
    #banner .smBanner_container .border{
        position: absolute;
        left:-2px;
        top:0;
        margin:0;
        padding:0;
        display: block;
        transition: all 0.4s ease;
    }
    #banner .smBanner_container .border img{
        width:127px;
        height: 50px;
    }
    #ads{
        width:744px;
        height: 118px;
        margin:0 0 25px 0;
        position: relative;
    }
    #ads ul li{
        padding:1px;
        position: relative;
        display: inline-block;
        float:left;
        margin-right: 6px;
        border:2px solid #fafafa;
        background: #fff;
        width:113px;
        height: 113px;
        overflow: hidden;
    }
    #ad ul li a{
        display: block;
        position: relative;
    }
    #ads ul li:nth-last-child(1){
        margin-right: 0;
    }
    #ads a img{
        width:112px;
        height: 112px;
    }
    #ads a .hot_info{
        position: absolute;
        background: rgba(0,179,138,.9);
        filter: alpha(opacity=90);
        color:#fff;
        top:0;
        z-index: 20;
    }
    #ads a .hot_info h2{
        font-size: 24px;
        height: 24px;
        line-height: 24px;
        margin: 10px 8px 8px;
        font-weight: 400;
        text-align: center;
        overflow: hidden;
    }
    #ads a .hot_info em{
        display: block;
        width: 100px;
        height: 5px;
        background: rgba(255,255,255,.3);
        filter: alpha(opacity=30);
        margin: 0 6px;
    }
    #ads a .hot_info p{
        font-size: 12px;
        margin: 6px 8px;
        line-height: 18px;
    }
</style>
