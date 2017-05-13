<template>
  <div id="myseller" ref="seller">
    <div class="seller_wrapper">
      <div class="seller_header">
        <div class="seller_name">
          <h3>{{seller.name}}</h3>
          <s-star :score="seller.score" :size="36" class="star"></s-star>
          <span class="ratingCount">({{seller.ratingCount}})</span>
          <span>月售{{seller.sellCount}}单</span>
        </div>
        <div class="sell_price">
          <div class="min_price">
            <p>起送价</p>
            <span>{{seller.minPrice}} <small>元</small></span>
          </div>
          <div class="deliveryPrice">
            <p>商家配送</p>
            <span>{{seller.deliveryPrice}}<small>元</small></span>
          </div>
          <div class="deliveryTime">
            <p>平均配送时间</p>
            <span>{{seller.deliveryTime}}<small>分钟</small></span>
          </div>
        </div>
        <div class="favourite" @click="setFavourite">
          <svg class="icon" aria-hidden="true" v-show="!isChoose">
            <use xlink:href="#icon-fav"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-show="isChoose">
            <use xlink:href="#icon-favred"></use>
          </svg>
          <p>{{favrtText}}</p>
        </div>
      </div>
      <div class="seller_active">
        <div class="bulletin">
          <h3>公告与活动</h3>
          <p>{{seller.bulletin}}</p>
        </div>
        <div class="activity">
          <ul>
            <li v-for="items in seller.supports">
              <div class="icon" :class="classMap[items.type]"></div>
              <div class="text"> {{items.description}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="seller_picture">
        <h3>商家实景</h3>
        <div class="photos">
          <ul>
            <li v-for="items in seller.pics">
              <img :src="items" alt="photo">
            </li>
          </ul>
        </div>
      </div>
      <div class="seller_info">
        <h3>商家信息</h3>
        <div class="info">
          <ul>
            <li v-for="item in seller.infos">
              <p>{{item}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Star from '../star/star.vue';
  import BScroll from 'better-scroll';
  import {setLocalStorage, getLocalStorage} from '../../assets/js/loaclStorage';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        isChoose: (() => {
          return getLocalStorage(this.seller.id, 'favourite', false);
        })()
      };
    },
    computed: {
      favrtText() {
        return this.isChoose === true ? '已收藏' : '收藏';
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
//      this.$nextTick(() => {
//        this.initScroll();
//      });
      var that = this;
      setTimeout(function () {
        that.initScroll();
      }, 10);
    },
    components: {
      's-star': Star
    },
    methods: {
      initScroll() {
        this.sellerScroll = new BScroll(this.$refs.seller, {
          click: true
        });
      },
      setFavourite() {
        if (event._constructed) {
          this.isChoose = !this.isChoose;
          setLocalStorage(this.seller.id, 'favourite', this.isChoose);
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/mixin.less';

  #myseller {
    position: absolute;
    background: #FFF;
    width: 100%;
    top: 174px;
    bottom: 0;
    overflow: hidden;
    .seller_wrapper {
      .seller_header {
        position: relative;
        padding: 18px;
        .border-1px(rgba(7, 17, 27, 0.1));
        border-bottom: 18px solid #f3f5f9;
        .seller_name {
          padding-bottom: 18px;
          .border-1px(rgba(7, 17, 27, 0.1));
          h3 {
            font-size: 16px;
            color: @blackColor;
            line-height: 16px;
            margin-bottom: 8px;
            font-weight: bold;
          }
          .star {
            display: inline-block;
            margin-right: 8px;
          }
          span {
            font-size: 12px;
            color: rgb(77, 85, 93);
            line-height: 18px;
            vertical-align: 3px;
            &.ratingCount {
              margin-right: 10px;
            }
          }
        }
        .sell_price {
          padding-top: 18px;
          display: flex;
          div {
            border-right: 1px solid rgba(7, 17, 27, 0.2);
            text-align: center;
            p {
              font-size: 14px;
              color: @grayColor;
              line-height: 14px;
              margin-bottom: 4px;
            }
            span {
              font-size: 24px;
              color: @blackColor;
              line-height: 24px;
              small {
                font-size: 12px;
              }
            }
            &:last-child {
              border: 0;
            }
          }
          .min_price {
            flex: 1;
          }
          .deliveryPrice {
            flex: 1
          }
          .deliveryTime {
            flex: 1;
          }
        }
        .favourite {
          position: absolute;
          right: 5px;
          top: 20px;
          text-align: center;
          width: 50px;
          .icon {
            font-size: 24px;
          }
          p {
            margin-top: 4px;;
            font-size: 12px;
            color: @blackColor;
          }
        }
      }
      .seller_active {
        padding: 18px 18px 0 18px;
        border-bottom: 16px solid #f3f5f7;
        .bulletin {
          .border-1px(rgba(7, 17, 27, 0.1));
          h3 {
            font-weight: bold;
            font-size: 16px;
          }
          p {
            padding: 8px 12px 16px 12px;
            font-size: 14px;
            font-weight: 200;
            color: rgb(240, 20, 20);
            line-height: 26px;
          }
        }
        .activity {
          ul li {
            padding: 16px 0 16px 16px;
            .border-1px(rgba(7, 17, 27, 0.1));
            .icon {
              width: 16px;
              height: 16px;
              background-size: contain;
              display: inline-block;
              margin-right: 6px;
              &.decrease {
                .background-image('../../components/seller/decrease_4')
              }
              &.discount {
                .background-image('../../components/seller/discount_4')
              }
              &.special {
                .background-image('../../components/seller/special_4')
              }
              &.invoice {
                .background-image('../../components/seller/invoice_4')
              }
              &.guarantee {
                .background-image('../../components/seller/guarantee_4')
              }
            }
            .text {
              display: inline-block;
              font-size: 14px;
              line-height: 18px;
              color: @blackColor;
              vertical-align: 1px;
            }
          }
        }
      }
      .seller_picture {
        padding: 18px 0 18px 18px;
        border-bottom: 18px solid #f3f5f7;
        h3 {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 12px;
        }
        .photos {
          overflow: hidden;
          ul li {
            float: left;
            margin-right: 6px;
            &:last-child {
              margin-right: 0;
            }
            img {
              width: 110px;
              height: 90px;
            }
          }
        }
      }
      .seller_info {
        padding: 18px;
        h3 {
          font-weight: bold;
          font-size: 16px;
          padding-bottom: 12px;
          .border-1px(rgba(7, 17, 27, 0.1));
        }
        .info {
          ul li {
            padding: 16px 12px;
            .border-1px(rgba(7, 17, 27, 0.1));
            &:last-child {
              .border-none();
            }
            p {
              font-size: 14px;
              line-height: 16px;
              color: @blackColor;
            }
          }
        }
      }
    }
  }
</style>
