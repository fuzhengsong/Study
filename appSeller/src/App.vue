<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tabs border-1px">
      <div class="tab-item">
        <router-link to="goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller">

      </router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import urlParse from './assets/js/util';
  const ERR_OK = 0;
  export default {
    name: 'app',
    data() {
      return {
        seller: (() => {
          return urlParse();
        })()
      };
    },
    created() {
      this.$http.get('api/seller').then((res) => {
        res = res.data;
        if (res.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, res.data);
        }
      }).catch((err) => {
        throw err;
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import './assets/less/mixin';

  .tabs {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .border-1px(rgba(7, 17, 27, 0.2));
    .tab-item {
      flex: 1;
      text-align: center;
      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active {
          color: rgb(240, 20, 20)
        }
      }
    }
  }

</style>
