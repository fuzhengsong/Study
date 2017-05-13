<template>
  <div id='ratings' ref="ratings">
    <div class="rating_wrapper">
      <div class="scores">
        <div class="score_left">
          <p class="scoreAll">{{seller.score}}</p>
          <p class="desc">综合评分</p>
          <p class="desc2">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="score_right">
          <div class="wrapper">
            <div class="serviceScore">
              <span>服务态度</span>
              <div class="star">
                <v-star :score="seller.serviceScore"
                        :size="36"></v-star>
              </div>
            </div>
            <div class="serviceScore">
              <span>描述相符</span>
              <div class="star">
                <v-star :score="seller.foodScore"
                        :size="36"></v-star>
              </div>
            </div>
            <div class="deliveryTime serviceScore">
              <span>送达时间</span><span>{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
      </div>
      <div class="seller_ratings">
        <v-tag :ratings="ratings" ref="tag"></v-tag>
      </div>
      <div class="ratings_wrapper">
        <div class="ratings">
          <div class="noratings" v-if="!this.ratings">暂无评价</div>
          <ul>
            <li v-for="items in ratingList" class="items">
              <div class="avatar">
                <img :src="items.avatar" alt="custom">
              </div>
              <div class="rating_info">
                <p class="name">{{items.username}}</p>
                <div class="star_time">
                  <v-star :score="items.score" :size="24" class="star"></v-star>
                  <span class="time">{{items.deliveryTime}}分钟送达</span>
                </div>
                <p class="content">{{items.text}}</p>
                <div class="zan_f">
                  <div class="zan">
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
                  <div class="recommend">
                    <ul>
                      <li v-for="item in items.recommend">
                        {{item}}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from '../star/star.vue';
  import Tag from '../tags/tag.vue';
  import Bscroll from 'better-scroll';
  let ERR_OK = 0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        ratingList: []
      };
    },
    created() {
      this.$http.get('api/ratings').then((res) => {
        res = res.data;
        if (res.errno === ERR_OK) {
          this.ratings = res.data;
        }
      }).catch((err) => {
        throw err;
      });
//      var that = this;
      this.$nextTick(() => {
          this.initScroll();
      });
//      setTimeout(function () {
//        that.initScroll();
//      }, 50);
    },
    updated() {
      if (this.ratingScroll) {
        this.ratingScroll.refresh();
      }
    },
    methods: {
      initScroll() {
        this.ratingScroll = new Bscroll(this.$refs.ratings, {
          click: true
        });
      }
    },
    components: {
      'v-star': Star,
      'v-tag': Tag
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/mixin.less';

  #ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    width: 100%;
    background: #fff;
    overflow: hidden;
    .scores {
      position: relative;
      padding: 18px 24px;
      display: flex;
      background: #fff;
      .score_left {
        flex: 1.3;
        text-align: center;
        padding-right: 24px;
        border-right: 1px solid rgba(147, 153, 159, 0.3);
        .scoreAll {
          font-size: 24px;
          color: @starColor;
          line-height: 28px;
          margin-bottom: 6px;
        }
        .desc {
          font-size: 14px;
          color: @blackColor;
          line-height: 14px;
        }
        .desc2 {
          font-size: 10px;
          color: @grayColor;
          line-height: 12px;
          margin: 8px 0 6px 0;
        }
      }
      .score_right {
        flex: 2;
        padding-left: 24px;
        /*text-align: center;*/
        display: flex;
        justify-content: center;
        .wrapper {
          .serviceScore {
            font-size: 0;
            margin-bottom: 8px;
            span {
              font-size: 14px;
              line-height: 18px;
              color: @blackColor;
              margin-right: 12px;
            }
            .star {
              display: inline-block;
              vertical-align: -2px;
            }
          }
          .deliveryTime {
            span:nth-child(2) {
              font-size: 14px;
              color: @grayColor;
              line-height: 18px;
            }
          }
        }
      }
    }
    .seller_ratings {
      position: relative;
      border-top: 18px solid #f3f5f7;
      background: #fff;
      padding: 18px 18px 0 18px;
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
    }
    .ratings_wrapper {
      position: relative;
      .ratings {
        padding: 0 18px 0 18px;
        border-top: 1px solid rgba(7, 17, 27, 0.2);
        background: #fff;
        overflow: hidden;
        .noratings {
          padding: 12px 0 30px 0;
          color: rgb(143, 157, 156)
        }
        ul .items {
          padding: 18px 0;
          .border-1px(rgba(7, 17, 27, 0.1));
          display: flex;
          &:last-child{
            .border-none();
          }
          .avatar {
            margin-right: 12px;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }
          .rating_info {
            flex: 1;
            .name {
              font-size: 12px;
              color: @blackColor;
              line-height: 14px;
              margin-bottom: 2px;
            }
            .star_time {
              margin-bottom: 6px;
              .star {
                display: inline-block;
                margin-right: 6px;
              }
              .time {
                font-size: 10px;
                color: @grayColor;
                line-height: 14px;
                vertical-align: top;
              }
            }
            .content {
              font-size: 14px;
              color: @blackColor;
              line-height: 18px;
              margin-bottom: 8px;
            }
            .zan_f {
              display: flex;
              .zan {
                margin-right: 8px;
              }
              .recommend {
                flex:1;
                ul li {
                  float: left;
                  border:1px solid rgba(1,17,27,0.1);
                  border-radius: 2px;
                  font-size: 12px;
                  color: @grayColor;
                  line-height: 16px;
                  padding:0 8px;
                  margin:0 8px 8px 0;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
