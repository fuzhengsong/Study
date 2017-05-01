<template>
    <div id="side">
        <div class="container_m_b" v-for="(item,key,index) in jobList"  @mouseover="currentindex=index" @mouseout="currentindex=-1">
            <div class="menu_box">
                <div class="m_b_h" >
                    <h2>{{key}}</h2>
                    <a class="icon"></a>
                </div>
                <div class="m_b_b" >
                    <a href="" v-for="jobs in item.showItems">{{jobs}}</a>
                </div>
            </div>
            <div class="m_b_hide" v-show="index===currentindex">
                <dl  v-for="(value,key,index) in item.data" class="clearFloat">
                    <dt class="m_b_dt"  ><a href="">{{key}}</a></dt>
                    <dd class="m_b_dd">
                        <a href="" v-for="val in value">{{val}}</a>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                jobList:{},
                currentindex:-1
            }
        },
        mounted(){
            this.axios.get('src/assets/data/job.json').then(res=>{
                this.jobList=res.data;
                console.log(this.jobList2)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
</script>

<style>
    #side{
        width:230px;
        float:left;
        background: #fafafa;
    }
    #side .container_m_b{
        position: relative;
    }
    #side .menu_box{
        width:230px;
        box-sizing: border-box;
        padding:6px 12px;
        border:2px solid  #fafafa;
        border-right: 0;
        overflow: hidden;
        position: relative;
        z-index: 100;
    }
    #side .container_m_b:hover .menu_box{
        width: 232px;
        background: #fff;
        border:2px solid #C6C6C6;
        border-right: 0;
    }
    #side .menu_box h2{
        display: inline-block;
        font-size: 18px;
        font-weight: 500;
        padding-left:8px;
        margin:8px 0;
    }
    #side .menu_box .icon{
        float:right;
        margin:10px 5px;
        display: inline-block;
        width:13px;
        height: 14px;
        background: url(../assets/images/arr.png);
    }
    #side .menu_box .m_b_b a{
        display: inline-block;
        float:left;
        margin:0 5px 5px 0;
        padding:0 8px;
        white-space: nowrap;
    }
    #side .menu_box .m_b_b a:hover{
        color: #00b38a;
        text-decoration: underline;
    }
    #side .container_m_b .m_b_hide{
        width:540px;
        padding:15px 30px;
        position: absolute;
        left: 230px;
        top:0;
        border:2px solid #c9cbce;
        background: #fff;
        z-index: 99;
        overflow: hidden;
    }
    #side .container_m_b .m_b_hide dl{
        margin-bottom: 15px;
    }
    #side .container_m_b .m_b_hide .m_b_dt a{
        text-decoration: underline;
        color: #000;
    }
    #side .container_m_b .m_b_hide .m_b_dd{
        position: relative;
        top:-25px;
        margin:0 0 0 100px;
    }
    #side .container_m_b .m_b_hide .m_b_dd a{
        line-height: 28px;
        float:left;
        white-space: nowrap;
        padding:0 10px;
        background: url(../assets/images/arr.png) no-repeat -27px 8px;
    }
    #side .container_m_b .m_b_hide .m_b_dd a:hover,#side .container_m_b .m_b_hide .m_b_dt a:hover{
        color: #00b38a;
        text-decoration: underline;
    }
</style>