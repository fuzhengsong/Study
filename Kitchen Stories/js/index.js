/**
 * Created by Administrator on 2017/5/1 0001.
 */
var header=new Vue({
    el:'#header',
    data:{
        c_image:'',
        isMap:false,
        iss_nav_o:true
    },
    mounted:function () {
        var _this=this;
      document.addEventListener('click',function (event) {
          if(event.target.getAttribute('class')!=='map'){
              _this.isMap=false;
          }
      })
    },
    methods:{
        chooseCountry:function (event) {
            var src='';
            if(event.target.tagName==='A'){
                src=event.target.firstChild.getAttribute('src')
            }else{
                src=event.target.getAttribute('src');
            }
            this.isMap=false;
            this.c_image='url('+src+')';
        },
        showSmallNav:function(event){
            this.iss_nav_o=!this.iss_nav_o
        }
    }
});

var contain_home = new Vue({
    el: '#contain_home',
    data: {
        mywidth:'',
        imgListPos: '0px',
        istoLeft:false,
        istoRight:true,
        width:220
    },
    mounted:function () {
        var _this=this;
        window.addEventListener('resize',function () {
            _this.mywidth=window.innerWidth + "px"
            // var ele=document.querySelector('#img_l_c');
            // var com_sty=document.defaultView.getComputedStyle(ele,null);
            //
            // _this.width=parseInt(com_sty.width);
        })
    },
    methods: {
        slideLeft: function () {
            this.imgListPos = parseInt(this.imgListPos) + this.width + 'px';
            if(parseInt(this.imgListPos)>=0){
                this.istoLeft=false;
                return false
            }
            this.istoRight=true;

        },
        slideRight:function () {
            console.log(this.width)
            this.imgListPos = parseInt(this.imgListPos) - this.width + 'px';
            if( parseInt(this.imgListPos)<=-this.width*3){
                this.istoRight=false;
                return false
            }
            this.istoLeft=true;
        }
    }

});