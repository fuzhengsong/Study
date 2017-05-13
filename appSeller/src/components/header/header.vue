<template>
  <div class="header">
    <div class="seller_info">
      <div class="seller_avatar">
        <img class='s_img' :src="seller.avatar" alt="img">
      </div>
      <div class="seller_content">
        <div class="s_c_title">
          <div class="brand"></div>
          <div class="name">{{seller.name}}</div>
        </div>
        <div class="s_c_express">
          <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
        </div>
        <div class="s_c_Prefer" v-if="seller.supports">
          <div class="brand" :class="classMap[seller.supports[0].type]"></div>
          <div class="prefer">{{seller.supports[0].description}}</div>
          <div class="count" @click="sellerShow=!sellerShow">
            <span> {{seller.supports.length}}个</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-more"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="bg">
      <img :src="seller.avatar" alt="">
    </div>
    <div class="bulletin_wrapper" @click="sellerShow=!sellerShow">
      <span class="bulletin_icon"></span><span class="bulletin_text">{{seller.bulletin}}</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-more"></use>
      </svg>
    </div>
    <transition name="fade">
      <div class="seller_box" v-show="sellerShow">
        <div class="box_wrapper">
          <div class="s_main">
            <div class="title">
              {{seller.name}}
          </div>
            <div class="Stars">
              <v-star :score="seller.score" :size="48"></v-star>
            </div>
            <div class="prefer_info_t">
              <div class="line"></div>
              <div class="title">优惠信息</div>
              <div class="line"></div>
            </div>
            <div class="prefer_info_l">
              <ul>
                <li v-for="(items,index) in seller.supports">
                  <div class="icon" :class="classMap[items.type]"></div>
                  <div class="text">{{items.description}}</div>
                </li>
              </ul>
            </div>
            <div class="prefer_info_t">
              <div class="line"></div>
              <div class="title">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="s_close" @click="sellerShow=!sellerShow">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import star from '../star/star.vue';
  export default{
    // 父元素中传入的参数
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        sellerShow: false
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      'v-star': star
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../assets/less/mixin.less';

  .header {
    position: relative;
    overflow: hidden;
    color: #fff;
    background: rgba(7, 17, 27, 0.5);
    .seller_info {
      position: relative;
      padding: 24px 12px 18px 24px;
      overflow: hidden;
      font-size: 0;
      .seller_avatar {
        float: left;
        width: 64px;
        height: 64px;
        margin-right: 16px;
        .s_img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }
      }
      .seller_content {
        position: relative;
        .s_c_title {
          .brand {
            display: inline-block;
            width: 30px;
            height: 18px;
            .background-image('../../components/header/brand');
            background-size: contain;
            background-repeat: no-repeat;
          }
          .name {
            display: inline-block;
            font-size: 16px;
            font-weight: bold;
            line-height: 18px;
            margin-left: 6px;
            vertical-align: top;
          }
        }
        .s_c_express {
          font-size: 12px;
          line-height: 12px;
          font-weight: 200;
          margin: 8px 0 10px 0;
        }
        .s_c_Prefer {
          .brand {
            display: inline-block;
            vertical-align: -2px;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-repeat: no-repeat;
            background-size: contain;
            &.decrease {
              .background-image('../../components/header/decrease_1')
            }
            &.discount {
              .background-image('../../components/header/discount_1')
            }
            &.special {
              .background-image('../../components/header/special_1')
            }
            &.invoice {
              .background-image('../../components/header/invoice_1')
            }
            &.guarantee {
              .background-image('../../components/header/guarantee_1')
            }
          }
          .prefer {
            display: inline-block;
            font-size: 10px;
            line-height: 12px;
          }
          .count {
            position: absolute;
            right: 5px;
            bottom: -5px;
            padding: 7px 8px;
            height: 24px;
            font-size: 10px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 14px;
            box-sizing: border-box;
            text-align: center;
            .icon {
              color: #fff;
              font-size: 10px;
            }
          }
        }
      }
    }
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -10;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        filter: blur(10px)
      }
    }
    .bulletin_wrapper {
      position: relative;
      width: 100%;
      height: 28px;
      background: rgba(7, 17, 27, 0.2);
      line-height: 28px;
      padding: 0 24px 0 12px;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .bulletin_icon {
        display: inline-block;
        width: 22px;
        height: 12px;
        .background-image('../../components/header/bulletin');
        background-size: contain;
        background-repeat: no-repeat;
        margin-right: 4px;
      }
      .bulletin_text {
        vertical-align: top;
        font-size: 10px;
        font-weight: 200;
        color: rgb(255, 255, 255)
      }
      .icon {
        position: absolute;
        font-size: 10px;
        right: 12px;
        top: 8px;
      }
    }
    .seller_box {
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      z-index: 20;
      background: rgba(7, 17, 27, 0.8);
      text-align: center;
      overflow: auto;
      .box_wrapper {
        min-height: 100%;
        overflow: hidden;
        .s_main {
          margin-top: 64px;
          padding-bottom: 66px;
          .title {
            font-size: 16px;
            font-weight: 700;
            color: #fff;
            line-height: 16px;
          }
          .Stars {
            width: 188px;
            padding: 5px 0;
            margin: 16px auto 28px auto;
          }
          .prefer_info_t {
            display: flex;
            width: 80%;
            margin: 0 auto;
            .title {
              font-size: 14px;
              font-weight: 700;
              color: #fff;
              line-height: 14px;
              padding: 0 12px;
            }
            .line {
              flex: 1;
              position: relative;
              top: 6px;
              border-top: 1px solid rgba(255, 255, 255, 0.2);
            }
          }
          .prefer_info_l {
            box-sizing: border-box;
            width: 80%;
            text-align: left;
            margin: 0 auto;
            padding: 24px 12px 16px 12px;
            ul li {
              margin-bottom: 12px;
            }
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              border-radius: 3px;
              background-repeat: no-repeat;
              background-size: contain;
              vertical-align: top;
              &.decrease {
                .background-image('../../components/header/decrease_2')
              }
              &.discount {
                .background-image('../../components/header/discount_2')
              }
              &.guarantee {
                .background-image('../../components/header/guarantee_2')
              }
              &.invoice {
                .background-image('../../components/header/invoice_2')
              }
              &.special {
                .background-image('../../components/header/special_2')
              }
            }
            .text {
              vertical-align: top;
              display: inline-block;
              font-size: 12px;
              font-weight: 200;
              line-height: 12px;
            }
          }
          .bulletin {
            width: 80%;
            box-sizing: border-box;
            padding: 24px 12px 0 12px;
            margin: 0 auto;
            text-align: left;
            p {
              font-size: 12px;
              line-height: 24px;
            }
          }
        }
      }
      .s_close {
        margin-top: -60px;
        font-size: 25px;
      }
    }
  }
  .fade-enter,.fade-leave-active{
    opacity:0;
    background: rgba(7, 17, 27, 0);
  }
  .fade-enter-active,.fade-leave-active{
    transition:all 0.4s ease;
  }
</style>
