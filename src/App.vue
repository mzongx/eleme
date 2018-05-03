<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
       <div class="tab-item">
        <router-link to="/seller">店铺</router-link>
      </div>
    </div>
   <router-view :seller="seller"/>
  </div>
</template>

<script>
import Header from '@/components/header/header'
export default {
  name: 'App',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    let _this = this
    this.$http.get('/api/seller', {
    }).then(function (response) {
      response = response.data
      if (response.errno === 0) {
        _this.seller = response.data
      }
      console.log(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  },
  components: {Header}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl';
  #app
    .tab
      display flex
      height 40px
      line-height 40px
      text-align center
      border-1px(rgba(7, 17, 27, .1))
      .tab-item
        flex 1
        & > a
          display block
          font-size 14px
          color rgb(77, 85, 93)
          &.active
            color rgb(240, 20, 20)
</style>
