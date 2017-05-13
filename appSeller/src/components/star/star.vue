<template>
  <div class="stars" :class="starStyle">
    <ul>
      <li v-for="(items,index) in stars" :class="items" :key="index"></li>
    </ul>
  </div>
</template>

<script>
  export default{
    props: {
      score: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    computed: {
        // 首先判断星星的大小
      starStyle() {
        return 'star_' + this.size;
      },
      // 分数计算后，将星星的组成推入数组中
      stars() {
        let stars = [];
        let scoreOn = Math.abs(Math.floor(this.score));
        for (let i = 0; i < scoreOn; i++) {
          stars.push('one');
        }
        if (this.score % 1 > 0.5) {
          stars.push('half');
        }
        while (stars.length < 5) {
          stars.push('off');
        }
        return stars;
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/mixin.less';

  .stars {
    font-size: 0;
    ul{
      overflow: hidden;
    }
    ul li {
      float: left;
      background-repeat: no-repeat;
    }
    &.star_48 {
      li {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: contain;
        &:last-child{
          margin-right:0
        }
      }
      .one {
        .background-image('../../components/star/star48_on')
      }
      .half {
        .background-image('../../components/star/star48_half')
      }
      .off {
        .background-image('../../components/star/star48_off')
      }
    }
    &.star_36 {
      li {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: contain;
        &:last-child{
          margin-right:0
        }
      }
      .one {
        .background-image('../../components/star/star36_on')
      }
      .half {
        .background-image('../../components/star/star36_half')
      }
      .off {
        .background-image('../../components/star/star36_off')
      }
    }
    &.star_24 {
      li {
        width: 12px;
        height: 12px;
        margin-right: 3px;
        background-size: contain;
        &:last-child{
          margin-right:0
        }
      }
      .one {
        .background-image('../../components/star/star24_on')
      }
      .half {
        .background-image('../../components/star/star24_half')
      }
      .off {
        .background-image('../../components/star/star24_off')
      }
    }
  }
</style>
