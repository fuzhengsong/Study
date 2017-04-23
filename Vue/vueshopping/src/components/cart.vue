<template>
    <div id="cart">
        <div class="header">
            <h2>购物车</h2>
        </div>
        <div class="list">
            <ul id="store">
                <transition-group name="group1" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <li v-for="(store,index) in Stores" v-bind:key="store">
                    <div class="storeHeader">
                        <el-checkbox v-model="checkedStores" :label="store" @change="storeAllCheck(store)">
                            <span class="store">{{store}}
                            <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-more"></use>
                            </svg>
                            </span>
                        </el-checkbox>
                     <span class="edit" @click="editStation(index)" >编辑</span>
                    </div>
                    <ul id="goods">
                        <transition-group name="group2" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                        <li v-for="(items,keys,indexs) in goodList[store]" v-bind:key="items" class="clearfix">
                            <span class="checkboxForGoods">
                                <el-checkbox v-model="checkedGoods" :label="items.productId"  @change="checkGoods(items.productId,store)">{{space}}</el-checkbox>
                            </span>
                            <img :src="'../src/'+items.productImage" alt="">
                            <div class="description" v-show="!(index===currentIndex)" >
                                <p class="goodsName">{{items.productName}}</p>
                                <span class="price">￥{{items.productPrice}}</span>
                                <span class='number'>X{{items.productQuentity}}</span>
                            </div>
                            <div class="editContent" v-show="index===currentIndex" >
                                <!--<el-input-number v-model="items.productQuentity" :min="1" @change="numberChange(items,store)"></el-input-number><el-button type="danger">删除</el-button>-->
                                <el-button @click="add(items)">+</el-button>
                                <el-input v-model="items.productQuentity" ></el-input>
                                <el-button @click="reduce(items)">-</el-button>
                                <el-button type="danger" @click="del(indexs,goodList[store],Stores,index)">删除</el-button>
                            </div>
                        </li>
                        </transition-group>
                    </ul>
                </li>
                </transition-group>
            </ul>
        </div>
        <div id="footer">
            <el-checkbox v-model="allChecked" @change="AllCheck">全选</el-checkbox>
            <label class="Bill"> <el-button type="primary">结算({{count}})</el-button></label>
            <span class="count">合计:￥{{money}}</span>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                goodList: {},
                space: "",
                checkedStores: [],                        //选中店铺id会在该数组中
                checkedGoods: [],                           //选择商品id会在该数组中
                isedit: true,
                allChecked: false,
                count: 0,
                money: 0,
                currentIndex:-1
            }
        },
        computed: {
            Stores: function () {
                var arr = [];
                for (var keys in this.goodList) {
                    arr.push(keys)
                }
                return arr;
            },
        },
        mounted(){
            var _this = this;
            this.$http.get('src/data/cartData.json').then(res => {
                _this.goodList = res.data.result.list;

            }).catch(err => {
                console.log(err);
            });

        },
        methods: {
            del(indexs,goodList,stores,index){
                goodList.splice(indexs,1);
                if(goodList.length===0){
                    stores.splice(index,1)
                }
            },
            add(items,store){
                items.productQuentity++;
                if(this.checkedGoods.indexOf(items.productId)!==-1){

                    this.money+=items.productPrice
                }
            },
            reduce(items){
                items.productQuentity--;
                if(this.checkedGoods.indexOf(items.productId)!==-1){
                    items.productQuentity--;
                    this.money-=items.productPrice
                }
            },
            editStation(index){
                this.currentIndex=this.currentIndex===index?-1:index
            },
            storeAllCheck(store){
                var len = this.Stores.length;
                if (this.checkedStores.indexOf(store) !== -1) {     //如果全选控件被选中，则将商品id存入checkGood数组
                    for (var i = 0; i < len; i++) {
                        if (store === this.Stores[i]) {                 //判断选中的是哪家商店
                            for (var value of this.goodList[store]) {
                                if(this.checkedGoods.indexOf(value.productId)===-1){
                                    this.checkedGoods.push(value.productId);
                                    this.money+=value.productQuentity*value.productPrice
                                }
                            }
                        }
                        this.count = this.checkedGoods.length;          //合计数量
                    }
                } else {                                       //否则取消全选（将商品id从数组中剔除）
                    //获取存放该商店中的全部商品数组
                    let listID = [];
                    let listQuent={}
                    for (var val of this.goodList[store]) {
                        listID.push(val.productId);
                        listQuent[val.productId]=[val.productQuentity,val.productPrice]
                    }
                    //如果选中商品中有商品是该商店的，则被过滤删除,且减去其商品价值
                    this.checkedGoods = this.checkedGoods.filter(item => {
                        if(listID.indexOf(item)!==-1){
                            this.money-=listQuent[item][0]*listQuent[item][1]
                        }
                        return listID.indexOf(item) === -1
                    });
                    this.count = this.checkedGoods.length;
                }

            },
            //参数，选中的商品以及商品所在的商店
            checkGoods(goods, store){
                if (this.checkedGoods.indexOf(goods) !== -1) {        //判断该商品是否被选中
                    //获取存放该商店中的全部商品数组
                    let list = [];
                    for (let val of this.goodList[store]) {
                        if(val.productId===goods){
                            this.money+=val.productQuentity*val.productPrice
                        }
                        list.push(val.productId)
                    }
                    //如果该商店的商品都在选中商品中，则该商店全选标志为亮
                    let flag = list.every(item => {
                        return this.checkedGoods.indexOf(item) !== -1
                    });
                    if (flag) {
                        this.checkedStores.push(store);
                    } else {                             //如果该店铺商品没有都被选中，则从数组中剔除该商店
                        this.checkedStores = this.checkedStores.filter(item => {
                            return item !== store;
                        })
                    }
                    this.count = this.checkedGoods.length;
                } else {                                          //任何一个商品不选中，则将该商店剔除
                    for (let val of this.goodList[store]) {
                        if (val.productId === goods) {
                            this.money -= val.productQuentity * val.productPrice
                        }
                    }
                    this.checkedStores = this.checkedStores.filter(item => {
                        return item !== store;
                    });
                    this.count = this.checkedGoods.length;
                }
            },

            AllCheck(){
                //遍历所有的商品
                if (this.allChecked) {
                    for (var i = 0; i < this.Stores.length; i++) {
                        if (this.checkedStores.indexOf(this.Stores[i]) === -1) {
                            this.checkedStores.push(this.Stores[i]);
                        }
                        for (var values of this.goodList[this.Stores[i]]) {
                            //如果商品不在选中列表中,则加入选中列表
                            if (this.checkedGoods.indexOf(values.productId) === -1) {
                                this.checkedGoods.push(values.productId)
                            }
                        }
                    }
                    this.count = this.checkedGoods.length;
                    this.computedTotalMoney();
                }
                else {
                    this.checkedGoods = [];
                    this.checkedStores = [];
                    this.money=0;
                    this.count = this.checkedGoods.length;
                }
            },

            computedTotalMoney(){
               if(this.allChecked){
                   for (var i = 0; i < this.Stores.length; i++) {
                       for (var values of this.goodList[this.Stores[i]]) {
                           this.money+=values.productQuentity*values.productPrice
                       }
                   }
               }


            }


        }
    }
</script>
<style scoped>

    #cart{
        padding:0 0 40px 0;
        width:375px;
    }
    #cart .header {
        width:100%;
        height: 40px;
        border-bottom: 1px solid gainsboro;
        text-align: center;
        line-height: 40px;
    }
    #cart .header  h2{
        font-size: 25px;
    }
    .list ul{
        width:100%;

    }
    .list #store>transition-group>li{
        width:100%;
        background: #fff;
    }
    .list li .storeHeader{
        box-sizing: border-box;
        padding:10px;
        width:100%;
        position: relative;
    }
    .list li .storeHeader .store{
        font-weight: bold;
        font-size: 16px;
     }
    .list .edit {
        position: absolute;
        right: 10px;
    }
    .list #store #goods li{
        margin:10px 10px;
        height: 75px;
    }
    .list #store #goods img{
        float:left;
        width:75px;
        height: 75px;
        margin-right:10px;
    }
    .list #store #goods .description{
        float:right;
        width:240px;
        display: inline-block;
    }
    .list #store #goods .description .goodsName{
        font-size: 14px;
    }
    .list #store #goods .description .price{
        color:darkorange;
    }
    .list #store #goods .description .number{
       float:right;
        margin-right:5px;
    }
    .list #store #goods .checkboxForGoods{
        float:left;
        margin:30px 5px 0 0;
    }
    #footer{
        border-top:1px solid gainsboro;
        line-height: 40px;
        padding:2px 10px;
        height: 40px;
        width:100%;
        background: #fff;
        position: fixed;
        bottom:0;
        z-index: 10;
    }
    #footer .Bill{
        float:right;
        margin-right:20px;
    }
    #footer .count{
        float:right;
        margin-right: 20px;
        font-weight: bold;
        font-size: 15px;
    }
    .editContent{
        /*margin-top: 20px;*/
        height: 75px;
        padding:20px 0;
        box-sizing: border-box;

    }
    .editContent .el-input{
        width:60px;
    }
</style>