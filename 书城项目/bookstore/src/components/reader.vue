<template>
    <div id="reader" :style="{background:backgroundColor}" >
        <div id="nav_header" v-show="istouch">
            <div id="nav_header_touch" @click="returnBack">
                <div id="nav_header_icon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-back"></use>
                    </svg>
                </div>
                <div id="nav_header_text">返回书架</div>
            </div>
        </div>
        <div id="article_content" @click="showPanels">
            <h4 class="content_title" :style="{color:contentColor}">{{article.t}}</h4>
            <div  :style="{color:contentColor} " :class="[fontSizeActive,normal]">
                <p v-for="items in article.p" :key="items">
                    {{items}}
                </p>
            </div>
            <div class="content_footer" v-show="buttonShow">
                <ul>
                    <li><a :style="{borderColor:buttonBorderColor}"
                           class="button"
                           @click="toPrvChapter">上一章</a></li>
                    <li><a :style="{borderColor:buttonBorderColor}"
                           class="button"
                           @click="toNextChapter">下一章</a></li>
                </ul>
            </div>
        </div>
        <div class="loading" v-show="loadingShow">
            <img src="../assets/img/loading.gif" alt="">
        </div>
        <div id="footer_panel" v-show="istouch">
            <div class="footer_panel_icon">
                <svg class="icon icon_chapter" aria-hidden="true">
                    <use xlink:href="#icon-git45"></use>
                </svg>
                <p>目录</p>
            </div>
            <div class="footer_panel_icon">
                <div class="touchArea"  @click="showFontPanel">
                    <svg class="icon icon_font" aria-hidden="true" v-show="fontShow" >
                        <use xlink:href="#icon-icon-yxj-font"></use>
                    </svg>
                    <svg class="icon icon_fontActive" aria-hidden="true" v-show="!fontShow">
                        <use xlink:href="#icon-icon-yxj-font-copy"></use>
                    </svg>
                    <p :style="{color:font_iconActive}">字体</p>
                </div>
            </div>
            <div class="footer_panel_icon" >
                <div class="touchArea" @click="changeLight">
                    <div class="icon_night" v-show="!light" >
                        <svg class="icon " aria-hidden="true" >
                            <use xlink:href="#icon-yueliang"></use>
                        </svg>
                        <p>夜间</p>
                    </div>
                    <div class="icon_sun" v-show="light">
                        <svg class="icon icon_sun" aria-hidden="true" >
                            <use xlink:href="#icon-taiyang"></use>
                        </svg>
                        <p>白天</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="fontPanel" v-show="!fontShow">
            <div id="fontSize">
                <span class="fontPanel_des">字号</span>
                <a v-for="(item,index) in fontSize "
                   class="fontSize"
                   @click="changeFontSize(index)"
                >{{item}}</a>
            </div>
            <div id="bgColor">
                <span class="fontPanel_des">背景颜色</span>
                <a class="default_font"  @click="changBgColor('#E9DDC9')">默认</a>
                <a v-for="(item,index) in bgColor "
                   @click="changBgColor(item)"
                   class="bgColor"
                   :style="{backgroundColor:item}">
                </a>
            </div>
            <div id="fontColor">
                <span class="fontPanel_des">字体颜色</span>
                <a class="default_font"  @click="changeFontColor('#000')">默认</a>
                <a v-for="(item,index) in fontColor "
                   @click="changeFontColor(item)"
                   class="fontColor"
                   :style="{backgroundColor:item}">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import Ajax from '../assets/js/ajax'
    export default {
        name: 'reader',
        data () {
            return {
                loadingShow:false,
                buttonShow:false,
                istouch: false,
                fontShow: true,
                font_iconActive: '#fff',
                light: true,
                backgroundColor: '',
                backgroundColor_copy: '',
                contentColor: '',
                contentColor_copy: '',
                buttonBorderColor: '',
                fontSize: ['大', '中', '小'],
                bgColor: ['#6B8E23', '#778899', '#fff', '#FFA07A'],
                fontColor: ['#C71585', '#191970', '#FFFAFA', '#FFDEAD'],
                fontSizeActive: '',
                normal: 'content_body',
                article: {},
                ChapterID:0,
                ChapterLength:0
            }
        },
        mounted(){
            //获取本地存储数据
            this.backgroundColor = Storage.getStorage('bgColor') === null ? '#E9DDC9' : Storage.getStorage('bgColor');
            this.contentColor = Storage.getStorage('font_color') === null ? '#000' : Storage.getStorage('font_color');
            this.fontSizeActive = Storage.getStorage('font_size') === null ? "font_size_middle" : Storage.getStorage('font_size');
            this.buttonBorderColor = Storage.getStorage('buttonBorderColor') === null ? "#000" : Storage.getStorage('buttonBorderColor');
            this.light = Storage.getStorage('light')!=='false';
            var _this = this;
            //监听滚动事件
            window.addEventListener("scroll", function () {
                _this.istouch = false;
                _this.fontShow = true;
                _this.font_iconActive = '#fff';
            });
            this.ChapterID= Storage.getStorage('Chapter_ID') === null ? 1 : parseInt(Storage.getStorage('Chapter_ID'));
            this.getData(this.ChapterID);
        },
        methods: {
            //获取文章内容
            getData(ChapterID){
                var _this=this;
                _this.loadingShow=true;
                Ajax(function (data,length) {
                    _this.article = JSON.parse(data);
                    _this.buttonShow = true;
                    _this.loadingShow=false;
                    _this.ChapterLength=length;
                    Storage.setStorage('Chapter_ID', _this.ChapterID);
                    window.scrollTo(0,0);
                },ChapterID);
            },
            //点击获取上一章
            toPrvChapter(){
                this.ChapterID-=1;
                if(this.ChapterID<=0){
                    this.ChapterID=1;
                    return false
                }else{
                    this.getData(this.ChapterID)
                }
            },

            //点击获取下一章数据
            toNextChapter(){
                this.ChapterID+=1;
                if(this.ChapterID===this.ChapterLength){
                    return false
                }else{
                    this.getData(this.ChapterID)
                }
            },
            //显示隐藏控制字体大小颜色的面板
            showFontPanel(){
                this.fontShow = !this.fontShow;
                if(this.fontShow){
                    this.font_iconActive='#fff'
                }else{
                    this.font_iconActive='#E96E01'
                }
            },

            //白天夜间模式切换
            changeLight(){
                if (this.light) {
                    this.backgroundColor_copy = this.backgroundColor;
                    this.contentColor_copy = this.contentColor;
                    this.backgroundColor = '#000';
                    this.contentColor = '#B0C4DE';
                    this.buttonBorderColor = '#fff';
                } else {
                    this.backgroundColor = this.backgroundColor_copy;
                    this.contentColor = this.contentColor_copy;
                    this.buttonBorderColor = '#000';
                }
                this.light = !this.light;
                Storage.setStorage('font_color', this.contentColor);
                Storage.setStorage('bgColor', this.backgroundColor);
                Storage.setStorage('buttonBorderColor', this.buttonBorderColor);
                Storage.setStorage('light',this.light);
            },

            //字体大小改变
            changeFontSize(index){
                this.fontSizeActive = index === 0 ? 'font_size_big' : index === 1 ? 'font_size_middle' : 'font_size_small';
                Storage.setStorage('font_size', this.fontSizeActive);
            },

            //背景颜色改变
            changBgColor(item){
                if (!this.light) {
                    return
                }
                this.backgroundColor = item;
                Storage.setStorage('bgColor', this.backgroundColor);

            },

            //字体颜色改变
            changeFontColor(item){
                if (!this.light) {
                    return
                }
                this.contentColor = item;
                Storage.setStorage('font_color', this.contentColor);
            },

            //上下栏的显示隐藏
            showPanels(event){
                if (event.target.getAttribute('class') === 'button') {
                    return
                }
                this.istouch = !this.istouch;
                if (this.fontShow === false) {
                    this.fontShow = true;
                    this.font_iconActive='#fff'
                }
            },
            returnBack(){
                this.$router.push({path:'/bookStore'})
            }
        }
    }
</script>

<style scoped>
    #reader{
        padding:20px 0 60px 0;
        overflow-x: hidden;
        min-height: 670px;
    }
    #reader .loading img{
        z-index:10001;
        position: fixed;
        top:45%;
        left:45%;
        width:50px;
        height: 50px;
    }
    #nav_header{
        position: fixed;
        top:0;
        height: 40px;
        background: #000;
        opacity: 0.8;
        width:100%;
        line-height: 40px;
        z-index:9999
    }
    #nav_header #nav_header_icon{
        position: absolute;
        font-weight: bold;
        font-size: 20px;
        left:5px;
        color:orange;
    }
    #nav_header #nav_header_text{
        font-size: 14px;
        text-indent: 35px;
        color:#fff;
    }
    #article_content{
        max-width:1240px;
        height: auto;
        margin:0 auto;
        padding:0 15px;
    }
    #article_content .content_title{
        font-size: 20px;
        font-weight: bold;
        border-bottom: 1px solid beige;
        text-align: left;
        height: 35px;
        line-height: 35px;
        letter-spacing: 3px;
    }
    #article_content .content_footer{
        width:80%;
        max-width: 800px;
        margin:20px auto;
        height: 30px;
    }
    #article_content .content_footer ul li{
        float:left;
        width:50%;
    }
    #article_content .content_footer ul li a{
        opacity: 0.8;
        display: inline-block;
        border-radius: 8px;
        width:80%;
        background:#000;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color:#fff;
        text-align: center;
        border:1px solid #000;
    }
    #article_content .content_footer ul li:nth-child(2) a{
        float:right;
    }
    .font_size_small{
        font-size:14px;
        letter-spacing: 2px;
        line-height: 16px;
    }
    .font_size_middle{
        font-size:16px;
        letter-spacing: 2px;
        line-height: 20px;
    }
    .font_size_big{
        font-size:20px;
        letter-spacing: 4px;
        line-height: 24px;
    }
    #article_content .content_body{
        text-indent: 2em;
        margin-top:10px;
    }
    #footer_panel{
        position: fixed;
        bottom:0;
        height: 60px;
        background: #000;
        opacity: 0.8;
        width:100%;
        z-index: 9999;
    }
    #footer_panel .footer_panel_icon{
        float:left;
        width:33%;
        position: relative;
        text-align: center;
        margin-top: 10px;
    }
    #footer_panel .icon{
        font-size: 20px;
    }
    #footer_panel .footer_panel_icon p{
        font-size: 10px;
        color:#fff;
    }
    #footer_panel .touchArea{
        width:40px;
        height: auto;
        margin:auto
    }
    #fontPanel{
        position: fixed;
        bottom:60px;
        left:0;
        padding:10px  15px;
        height: 150px;
        background: #000;
        opacity: 0.8;
        z-index: 9999;
        color:#fff;
        width:100%;
        box-sizing: border-box;
        border-bottom: 1px solid ghostwhite;
    }

    #fontPanel>div{
        height: 40px;
        margin:5px 5px;
    }
    #fontPanel .fontPanel_des{
        font-size: 14px;
        letter-spacing: 0.3em;
        margin-right: 3px;
        vertical-align: middle;
    }
    #fontPanel .fontSize,#fontPanel .default_font{
        display: inline-block;
        text-align: center;
        line-height: 25px;
        height: 25px;
        width:50px;
        border-radius: 12px;
        border:1px solid #fff;
        margin:auto 8px;
        vertical-align: middle;
        color:#fff;
    }
    #fontPanel .bgColor,#fontPanel .fontColor{
        display: inline-block;
        width:25px;
        height: 25px;
        margin:auto 6px;
        vertical-align: middle;
        border-radius:12.5px;
    }

</style>
