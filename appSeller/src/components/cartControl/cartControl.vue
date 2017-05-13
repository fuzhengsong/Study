<template>
  <div id="cartControl">
    <transition name="rotate">
      <div class="decrease control" @click.stop="reduce" v-show="food.count>0">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-offline"></use>
        </svg>
      </div>
    </transition>
    <div class="count control" v-show="food.count>0">{{food.count}}</div>
    <div class="increase control" @click.stop="add">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-addition"></use>
      </svg>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default{
    props: {
      food: {
        type: Object
      }
    },

    methods: {
      add(event) {
        // 如果不是BScroll触发的，则返回
        if (!event._constructed) {
          return;
        }
        if (this.food.count === undefined) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
//        this.$emit('add', this.food);
        this.$emit('drop', event.target);
      },
      reduce(event) {
        if (!event._constructed) {
          return;
        }
        this.food.count--;
//        this.$emit('reduce', this.food);
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  #cartControl {
    display: flex;
    .icon {
      font-size: 24px;
      color: rgb(0, 160, 220);
      line-height: 24px;
    }
    .control {
      width: 24px;
    }
    .count {
      text-align: center;
      width: 16px;
      height: 24px;
      font-size: 10px;
      color: rgb(157, 153, 159);
      line-height: 24px;
    }
    .rotate-enter, .rotate-leave-active {
      opacity: 0;
      transform: translate3d(20px, 0, 0) rotate(180deg);
    }
    .rotate-enter-active, .rotate-leave-active {
      transition: all 0.4s linear;
    }
  }
</style>
