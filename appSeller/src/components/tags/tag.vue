<template>
  <div id="tags">
    <div class="tags">
      <ul>
        <li class="all"><a :class="{active:currentIndex===1}" @click="currentIndex=1">全部<span> {{countAll}}</span></a>
        </li>
        <li class="good"><a :class="{active:currentIndex===2}"
                            @click="currentIndex=2">推荐<span> {{countGood}}</span></a></li>
        <li class="bad"><a :class="{active:currentIndex===3}"
                           @click="currentIndex=3">吐槽 <span> {{countBad}}</span></a></li>
      </ul>
    </div>
    <div class="choose" @click="wacthall">
      <svg class="icon" aria-hidden="true" :class="{active:isactive}">
        <use xlink:href="#icon-gou"></use>
      </svg>
      <span>只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      ratings: {
        type: Array
      }
    },
    data() {
      return {
        currentIndex: 1,
        isactive: true,
        ratingList: []
      };
    },
    mounted() {
      this.getData(this.currentIndex, this.isactive);
    },
    watch: {
      currentIndex(num) {
        this.getData(num, this.isactive);
      },
      ratings() {
        this.getData(this.currentIndex, this.isactive);
      }
    },
    computed: {
      countAll() {
        if (this.ratings) {
          return this.ratings.length;
        } else {
          return 0;
        }
      },
      countGood() {
        let count = 0;
        if (this.ratings) {
          for (let items of this.ratings) {
            if (items.rateType === 0) {
              count += 1;
            }
          }
          return count;
        } else {
          return 0;
        }
      },
      countBad() {
        let count = 0;
        if (this.ratings) {
          for (let items of this.ratings) {
            if (items.rateType === 1) {
              count += 1;
            }
          }
          return count;
        } else {
          return 0;
        }
      }
    },
    methods: {
      initData() {
        this.getData(this.currentIndex, this.isactive);
      },
      wacthall() {
          this.isactive = !this.isactive;
          this.getData(this.currentIndex, this.isactive);
      },
      getData(num, active) {
        if (!this.ratings) {
            return;
          }
        var that = this;
        let arr = [];
        switch (num) {
          case 1:
            if (active) {
              for (let items of that.ratings) {
                if (items.text !== '') {
                  arr.push(items);
                }
              }
            } else {
              for (let items of that.ratings) {
                arr.push(items);
              }
            }
            break;
          case 2:
            if (active) {
              for (let items of that.ratings) {
                if (items.text !== '' && items.rateType === 0) {
                  arr.push(items);
                }
              }
            } else {
              for (let items of that.ratings) {
                if (items.rateType === 0) {
                  arr.push(items);
                }
              }
            }
            break;
          case 3:
            if (active) {
              for (let items of that.ratings) {
                if (items.text !== '' && items.rateType === 1) {
                  arr.push(items);
                }
              }
            } else {
              for (let items of that.ratings) {
                if (items.rateType === 1) {
                  arr.push(items);
                }
              }
            }
            break;
        }
        this.ratingList = arr;
        this.emitdata();
      },
      emitdata() {
        this.$parent.ratingList = this.ratingList;
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/mixin.less';

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
</style>
