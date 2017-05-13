<template>
  <div id="goods">
    <div class="left" ref="species">
      <ul>
        <li v-for="(items,index) in goods" :class="{active:index === currentIndex}" @click="toHeight(index,$event)">
          <div class="g_item">
            <div class="g_item_wrapper">
              <span v-if="items.type!==-1" :class="classMap[items.type]" class="icon"></span>
              <span class="text">{{items.name}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="right" ref="foods">
      <ul>
        <li v-for="(items,index) in goods " ref="foodList" :key="items">
          <div class="title">{{items.name}}</div>
          <ul class="foodList">
            <li v-for="foods in items.foods" class="m_food" @click="checkFood(foods)">
              <div class="food_wrapper">
                <div class="food_avatar"><img :src="foods.icon" alt="img"></div>
                <div class="food_info">
                  <p class="f_name">{{foods.name}}</p>
                  <p class="f_species" v-if="foods.description">{{foods.description}}</p>
                  <p class="f_sales"><span>月售{{foods.sellCount}}</span><span class="ratings">好评率{{foods.rating}}%</span>
                  </p>
                  <p class="f_price">￥<span class="nowPrice">{{foods.price}}</span><span class="oldPrice"
                                                                                         v-if="foods.oldPrice">￥{{foods.oldPrice}}</span>
                  </p>
                </div>
              </div>
              <cart-control :food="foods" class="cartControl"
                            v-on:drop="drop"></cart-control>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="f_left" @click="PanelShow">
        <div class="icon_cart">
          <div :class="icon_wrapper" class="icon_wrapper">
            <svg class="icon" aria-hidden="true" :class="icon">
              <use xlink:href="#icon-cart"></use>
            </svg>
          </div>
        </div>
        <div class="total_price">
          <span :style="{color:priceColor}">￥{{totalPrice}}</span>
        </div>
        <div class="deliveryPrice">
          <span>另需配送费{{seller.deliveryPrice}}元</span>
        </div>
      </div>
      <div class="f_right" :class="f_right">
        <span>{{deliveryText}}</span>
      </div>
      <div class="count_tag" v-show="foodsCount>0">
        <span>{{foodsCount}}</span>
      </div>
      <!--小球-->
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <!--购物车面板-->
      <cart-panel :selectedFoods="selectedFoods" v-show="showPanel&&foodsCount!==0" ref="panel"></cart-panel>
    </div>
    <transition name="screen">
      <div class="screen" v-show="showPanel&&foodsCount!==0" @click="PanelShow"></div>
    </transition>
    <food :checkedFood="checkedFood" v-if="foodsShow" ref="food"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartControl from '../cartControl/cartControl.vue';
  import cartPanel from '../cartPanel/cartPanel.vue';
  import food from '../food/food.vue';
  const ERR_OK = 0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        priceColor: '',
        f_right: 'f_right_off',
        ScrollY: 0,
        showPanel: false,
        foodListHeight: [],
        dropBalls: [],
        foodsShow: false,
        checkedFood: {},
        // 定义5个隐藏的小球
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ]
      };
    },
    components: {
      'cart-control': cartControl,
      'cart-panel': cartPanel,
      'food': food
    },
    computed: {
      icon_wrapper() {
        if (this.foodsCount > 0) {
          this.priceColor = '#fff';
          return 'icon_wrapper_on';
        } else {
          this.priceColor = 'rgba(255, 255, 255, 0.4)';
          return 'icon_wrapper_off';
        }
      },
      // 计算选中商品
      selectedFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      },
      icon() {
        if (this.foodsCount > 0) {
          return 'icon_on';
        } else {
          return 'icon_off';
        }
      },
      totalPrice() {
        let price = 0;
        this.selectedFoods.forEach((food) => {
          price += food.count * food.price;
        });
        return price;
      },
      foodsCount() {
        let count = 0;
        this.selectedFoods.forEach((food) => {
          count += food.count;
        });
        if (count === 0) {
          this.showPanel = false;
        }
        return count;
      },
      deliveryText() {
        if (this.totalPrice === 0) {
          this.f_right = 'f_right_off';
          return '￥20元起送';
        } else if (this.totalPrice < 20) {
          this.f_right = 'f_right_off';
          return '还差' + (20 - this.totalPrice) + '元起送';
        } else {
          this.f_right = 'f_right_on';
          return '去结算';
        }
      },
      currentIndex() {
        for (let i = 0; i < this.foodListHeight.length; i++) {
          let height1 = this.foodListHeight[i];
          let height2 = this.foodListHeight[i + 1];
          if (this.ScrollY >= height1 && (this.ScrollY < height2 || !height2)) {
            return i;
          }
        }
      }
    },
    created() {
      this.$http.get('api/goods').then(res => {
        res = res.data;
        if (res.errno === ERR_OK) {
          this.goods = res.data;
          this.$nextTick(function () {
            this._initScroll();
            this._calFoodListHeight();
          });
        }
      }).catch(err => {
        throw err;
      });
    },
    methods: {
      // 初始化better-scroll
      _initScroll() {
        let species = this.$refs.species;
        let foods = this.$refs.foods;
        this.sepciesScroll = new BScroll(species, {
          // BScroll本身会屏蔽点击事件 click:true触发点击
          click: true
        });
        this.foodsScroll = new BScroll(foods, {
          click: true,
          // 该属性是调节在scroll事件触发中探针的活跃度或者频率
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.ScrollY = Math.abs(Math.round(pos.y));
        });
      },
      // 计算每个元素的高度，推入数组中
      _calFoodListHeight() {
        var height = 0;
        let foodsItem = this.$refs.foodList;
        let length = foodsItem.length;
        this.foodListHeight.push(height);
        for (let i = 0; i < length; i++) {
          height += foodsItem[i].clientHeight;
          this.foodListHeight.push(height);
        }
      },
      // 点击后对应滑动到某高度 event需要在html中传入
      toHeight(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodsItem = this.$refs.foodList;
        let el = foodsItem[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      PanelShow() {
        if (this.foodsCount === 0) {
          return false;
        } else {
          this.showPanel = !this.showPanel;
        }
        if (this.showPanel && this.foodsCount !== 0) {
          this.$nextTick(() => {
            this.$refs.panel.initPanelScroll();
          });
        }
      },
      drop(event) {
        for (let i = 0; i < this.balls.length; i++) {
          if (this.balls[i].show === false) {
            this.balls[i].el = event;
            this.balls[i].show = true;
            this.dropBalls.push(this.balls[i]);
            return;
          }
        }
      },
      checkFood(foods) {
          this.checkedFood = foods;
          this.foodsShow = true;
          this.$nextTick(() => {
            this.$refs.food.initScroll();
          });
      },
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/mixin.less';

  #goods {
    position: absolute;
    display: flex;
    top: 174px;
    bottom: 46px;
    width: 100%;
    background: #f3f5f7;
    overflow: hidden;
    .left {
      position: relative;
      width: 80px;
      box-sizing: border-box;
      ul li {
        padding: 0 12px;
        height: 54px;
        .g_item {
          text-align: center;
          vertical-align: middle;
          font-size: 47px;
          height: 100%;
          .border-1px(rgba(7, 17, 27, 0.1));
          .g_item_wrapper {
            display: inline-block;
            vertical-align: middle;
            font-size: 0;
          }
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            background-size: contain;
            border-radius: 2px;
            vertical-align: top;
            margin-right: 2px;
          }
          .decrease {
            .background-image('../../components/goods/decrease_3')
          }
          .discount {
            .background-image('../../components/goods/discount_3')
          }
          .special {
            .background-image('../../components/goods/special_3')
          }
          .invoice {
            .background-image('../../components/goods/invoice_3')
          }
          .guarantee {
            .background-image('../../components/goods/guarantee_3')
          }
          .text {
            font-size: 12px;
            font-weight: 200;
            color: #000;
          }
        }
        &.active {
          background: #fff;
          .g_item {
            .border-none();
            .text {
              font-weight: 700;
            }
          }
        }
      }
    }
    .right {
      flex: 1;
      .title {
        height: 26px;
        background: #f3f5f7;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        line-height: 26px;
        color: rgb(147, 153, 159);
        padding-left: 14px;
      }
      .foodList {
        .m_food {
          position: relative;
          background: #fff;
          padding: 18px 18px 0 18px;
          .food_wrapper {
            display: flex;
            padding-bottom: 18px;
            .border-1px(rgba(7, 17, 27, 0.1));
            .food_avatar {
              width: 65px;
              margin-right: 10px;
              img {
                width: 65px;
                height: 65px;
                border-radius: 3px;
              }
            }
            .food_info {
              flex: 1;
              .f_name {
                font-size: 14px;
                color: rgb(7, 17, 27);
                line-height: 14px;
                margin: 2px 0 8px 0;
              }
              .f_species, .f_sales {
                font-size: 10px;
                color: rgb(147, 153, 159);
                line-height: 12px;
              }
              .f_sales {
                margin: 8px 0;
                .ratings {
                  margin-left: 12px;
                }
              }
              .f_price {
                font-size: 10px;
                color: rgb(240, 10, 10);
                font-weight: normal;
                line-height: 16px;
                .nowPrice {
                  font-size: 16px;
                  font-weight: 700;
                  margin-right: 6px;
                }
                .oldPrice {
                  position: relative;
                  left: -2px;
                  top: -2px;
                  font-size: 8px;
                  color: rgb(147, 153, 159);
                  text-decoration: line-through;
                }
              }
            }
          }
          .cartControl {
            position: absolute;
            right: 30px;
            bottom: 15px;
          }
        }
      }
    }
    .footer {
      position: fixed;
      display: flex;
      left: 0;
      bottom: 0;
      height: 46px;
      width: 100%;
      background: #141D27;
      box-sizing: border-box;
      z-index: 10;
      .f_left {
        flex: 1;
        display: flex;
        background: #141D27;
        .icon_cart {
          position: relative;
          margin-left: 12px;
          left: 0px;
          top: -12px;
          border-radius: 29px;
          width: 58px;
          height: 58px;
          background: #141D27;
          padding: 6px;
          box-sizing: border-box;
          .icon_wrapper {
            width: 44px;
            height: 44px;
            border-radius: 22px;
            text-align: center;
            font-size: 31.4px;
            vertical-align: middle;
            &.icon_wrapper_off {
              background: #2B343C;
            }
            &.icon_wrapper_on {
              background: rgb(0, 160, 220);
            }
            .icon {
              font-size: 24px;
              &.icon_on {
                color: rgb(255, 255, 255)
              }
              &.icon_off {
                color: rgba(255, 255, 255, 0.4)
              }
            }
          }
        }
        .total_price {
          margin: 12px;
          padding-right: 12px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          line-height: 24px;
          span {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.4);
            font-weight: 700;
          }
        }
        .deliveryPrice {
          flex: 1;
          margin-top: 12px;
          span {
            font-size: 12px;
            font-weight: 200;
            line-height: 24px;
            color: rgba(255, 255, 255, 0.4);
          }
        }
      }
      .f_right {
        width: 105px;
        height: 46px;
        text-align: center;
        line-height: 46px;
        &.f_right_on {
          background: #00B43C;
          span {
            color: #fff;
          }
        }
        &.f_right_off {
          background: #2B343C;
          span {
            color: rgba(255, 255, 255, 0.4);
          }
        }
        span {
          font-size: 12px;
          font-weight: 700;
        }
      }
      .count_tag {
        position: absolute;
        left: 45px;
        top: -13px;
        background: rgb(240, 20, 20);
        min-width: 12px;
        padding: 0 6px;
        border-radius: 9px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        text-align: center;
        line-height: 16px;
        span {
          color: rgb(255, 255, 255);
          font-size: 9px;
          font-weight: 700;
        }
      }
      .ball-container {
        .ball {
          position: fixed;
          left: 32px;
          bottom: 22px;
          z-index: 200;
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
          .inner {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: rgb(0, 160, 220);
            transition: all 0.4s linear;
          }
        }
      }
    }
    .screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      z-index: 9
    }
    .screen-enter, .screen-leave-active {
      opacity: 0;
    }
    .screen-enter-active, .screen-leave-active {
      transition: all 0.4s ease;
    }
  }
</style>
