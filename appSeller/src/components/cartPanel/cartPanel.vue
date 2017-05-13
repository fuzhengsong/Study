<template>
  <transition name="slide">
    <div id="cartPanel">
      <div class="P_header">
        <span class="l_text">购物车</span>
        <a class="r_text" @click="clear">清空</a>
      </div>
      <div class="P_content" ref="cartPanel">
        <ul>
          <li v-for="item in selectedFoods">
            <span class="name">{{item.name}}</span>
            <div class="p_right">
              <div class="price">
                <span class="symbol">￥</span>{{item.price}}
              </div>
              <cart-control :food='item' class="control"
                            v-on:drop="drop"></cart-control>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  import cartControl from '../cartControl/cartControl.vue';
  import BScroll from 'better-scroll';
  export default{
    props: {
      selectedFoods: {
        type: Array
      }
    },
    components: {
      'cart-control': cartControl
    },
    methods: {
      initPanelScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.cartPanel, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      drop(target) {
        this.$parent.drop(target);
      },
      clear() {
        this.selectedFoods.forEach((foods) => {
          foods.count = 0;
        });
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/mixin.less';

  #cartPanel {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: -1;
    transform: translate3d(0, -100%, 0);
    &.slide-enter, &.slide-leave-active {
      transform: translate3d(0, 0, 0);
    }
    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.4s;
    }
    .P_header {
      position: relative;
      height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      .border-1px(rgba(7, 17, 27, .1));
      line-height: 40px;
      .l_text {
        font-size: 14px;
        font-weight: 200;
        color: rgb(7, 17, 27);
      }
      .r_text {
        float: right;
        font-size: 14px;
        font-weight: 200;
        color: rgb(0, 160, 220);
      }
    }
    .P_content {
      overflow:hidden;
      padding: 0 18px;
      max-height: 217px;
      ul li {
        height: 48px;
        .border-1px(rgba(7, 17, 27, 0.1));
        .name {
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 48px;
        }
        .p_right {
          position: relative;
          float: right;
          .price {
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
            margin-right: 84px;
            line-height: 48px;
            .symbol {
              font-size: 10px;
              font-weight: normal;
            }
          }
          .control {
            position: absolute;
            top: 12px;
            right: 0;
            height: 24px;
            line-height: 24px;
          }
        }
      }
    }
  }


</style>
