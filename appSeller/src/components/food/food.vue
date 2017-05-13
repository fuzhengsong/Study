<template>
  <transition name="foodSlide">
    <div id="checkedFood" ref="food">
      <div class="checkedFood_wrapper">
        <div class="icon_back" @click="emitHidden">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-back"></use>
          </svg>
        </div>
        <div class="big_picture">
          <img :src="checkedFood.image" alt="image">
        </div>
        <div class="food_info">
          <p class="food_name">{{checkedFood.name}}</p>
          <p class="f_sales"><span>月售{{checkedFood.sellCount}}</span><span
            class="f_ratings">好评率{{checkedFood.rating}}%</span>
          </p>
          <p class="f_price">￥<span class="nowPrice">{{checkedFood.price}}</span><span class="oldPrice"
                                                                                       v-if="checkedFood.oldPrice">￥{{checkedFood.oldPrice}}</span>
          </p>
          <div class="cartControl">
            <div class="cartText" v-show="!checkedFood.count"
                 @click="changeCount"><p>加入购物车</p></div>
            <cart-control :food="checkedFood"
                          v-show="checkedFood.count"
                          @drop="drop"></cart-control>
          </div>
        </div>
        <div class="food_description" v-if="checkedFood.info">
          <h3 class="f_header">商品介绍</h3>
          <p>{{checkedFood.info}}</p>
        </div>
        <div class="food_ratings">
          <h3 class="f_header">商品评价</h3>
          <v-tag :ratings="checkedFood.ratings"></v-tag>
        </div>
        <div class="ratings">
          <div class="noratings" v-if="!this.checkedFood.ratings">暂无评价</div>
          <ul>
            <li v-for="items in ratingList">
              <div class="row1">
                <div class="time">{{items.rateTime | normalTime}}</div>
                <div class="custom_info">
                  <span>{{items.username}}</span>
                  <img :src="items.avatar" alt="custom">
                </div>
              </div>
              <div class="row2">
                <div class="icons">
                  <div class="icon1" v-if="items.rateType===0">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-zan"></use>
                    </svg>
                  </div>
                  <div class="icon2" v-if="items.rateType===1">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-cai"></use>
                    </svg>
                  </div>
                </div>
                <div class="text">{{items.text}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import cartControl from '../cartControl/cartControl.vue';
  import BScroll from 'better-scroll';
  import Tags from '../tags/tag.vue';
  import Vue from 'vue';
  export default{
    props: {
      checkedFood: {
        type: Object
      }
    },
    data() {
      return {
        foodsShow: Boolean,
        currentIndex: 1,
        isactive: true,
        listTag: '',
        ratingList: []
      };
    },
    components: {
      'cart-control': cartControl,
      'v-tag': Tags
    },
    updated() {
      this.$nextTick(() => {
        this.foodScroll.refresh();
      });
    },
    methods: {
      drop(target) {
        this.$parent.drop(target);
      },
      initScroll() {
        this.foodScroll = new BScroll(this.$refs.food, {
          click: true
        });
      },
      emitHidden() {
        this.$parent.foodsShow = false;
      },
      changeCount() {
        Vue.set(this.checkedFood, 'count', 1);
      }
    }
  }
  ;
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/mixin.less';

  #checkedFood {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 46px;
    background: #f3f5f7;
    z-index: 9;
    width: 100%;
    transform: translate3d(0, 0, 0);
    &.foodSlide-enter, &.foodSlide-leave-active {
      transform: translate3d(100%, 0, 0);
    }
    &.foodSlide-enter-active, &.foodSlide-leave-active {
      transition: all 0.5s ease;
    }
    .checkedFood_wrapper {
      overflow: hidden;
      .icon_back {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 30;
        .icon {
          font-size: 25px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
      .big_picture {
        width: 100%;
        position: relative;
        padding-bottom: 100%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .food_info {
        position: relative;
        padding: 18px;
        background: #fff;
        margin-bottom: 16px;
        .border-1px(rgba(7, 17, 27, 0.2));
        .food_name {
          font-size: 16px;
          font-weight: 700;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
        }
        .f_sales {
          font-size: 12px;
          color: rgb(147, 153, 159);
          margin-bottom: 18px;
          .f_ratings {
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
        .cartControl {
          position: absolute;
          right: 10px;
          bottom: 20px;
          .cartText {
            width: 84px;
            height: 30px;
            background: rgb(0, 160, 200);
            border-radius: 15px;
            text-align: center;
            line-height: 30px;
            color: rgb(255, 255, 255);
            font-size: 10px;
          }
        }
      }
      .food_description {
        padding: 18px;
        background: #fff;
        margin-bottom: 16px;
        .border-1px(rgba(7, 17, 27, 0.2));
        .f_header {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 6px;
        }
        p {
          padding: 0 8px;
          font-size: 12px;
          font-weight: 200;
          color: rgb(77, 85, 93);
          line-height: 24px;
        }
      }
      .food_ratings {
        padding: 18px 18px 0 18px;
        background: #fff;
        .f_header {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 6px;
        }
        .tags {
          padding: 12px 0 18px 0;
          overflow: hidden;
          .border-1px(rgba(7, 17, 27, 0.1));
          ul li {
            float: left;
            margin-right: 8px;
            a {
              display: block;
              padding: 8px 12px;
              border-radius: 2px;
              font-size: 16px;
              line-height: 18px;
              box-sizing: border-box;
              &.active {
                border: 1px solid rgba(160, 160, 100, 0.5);
              }
              span {
                font-size: 12px;
              }
            }
            &.all a {
              background: rgb(0, 160, 220);
              color: #fff;
            }
            &.good a {
              background: rgba(0, 160, 220, 0.2);
              color: rgb(77, 85, 93);
            }
            &.bad a {
              background: rgba(77, 85, 93, 0.2);
              color: rgb(77, 85, 93);
            }
          }
        }
      }
      .choose {
        padding: 12px 0;
        .icon {
          font-size: 24px;
          color: rgb(147, 153, 159);
          margin-right: 4px;
          line-height: 24px;
          &.active {
            color: #1afa29;
          }
        }
        span {
          font-size: 12px;
          color: rgb(147, 153, 159);
          line-height: 24px;
          vertical-align: top;
        }
      }
      .ratings {
        padding: 0 18px 0 18px;
        border-top: 1px solid rgba(7, 17, 27, 0.2);
        background: #fff;
        .noratings{
          padding:12px 0 30px 0 ;
          color:rgb(143,157,156)
        }
        ul li {
          padding: 16px 0;
          .border-1px(rgba(7, 17, 27, 0.1));
          &:last-child{
            .border-none();
          }
          .row1 {
            overflow: hidden;
            width: 100%;
            margin-bottom: 6px;
            .time {
              float: left;
              font-size: 12px;
              color: rgb(147, 153, 159);
              line-height: 14px;
            }
            .custom_info {
              float: right;
              span {
                font-size: 12px;
                color: rgb(147, 153, 159);
                line-height: 14px;
                margin-right: 12px;
              }
              img {
                width: 12px;
                height: 12px;
                border-radius: 50%;
              }
            }
          }
          .row2 {
            overflow: hidden;
            .icons {
              float: left;
              font-size: 12px;
              line-height: 24px;
              margin-right: 10px;
            }
            .text {
              font-size: 12px;
              color: rgb(7, 17, 27);
              line-height: 24px;
            }
          }
        }
      }
    }

  }
</style>
