<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(goodsItem, index) in goods" :key="index" class="menu-item">
          <span class="text border-1px"><span class="icon" v-show="goodsItem.type > 0" :class="classMap[goodsItem.type]"></span>{{ goodsItem.name }}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="(goodsItem, index) in goods" :key="index" class="goods-item">
          <div class="goods-item-title">{{ goodsItem.name }}</div>
          <ul>
            <li v-for="(foodsItem, foodIndex) in goodsItem.foods" :key="foodIndex" class="foods-item border-1px">
              <div class="icon"><img :src="foodsItem.image" class="icon-img" /></div>
              <div class="content">
                <h3 class="foods-item-title">{{ foodsItem.name }}</h3>
                <p class="foods-item-des">{{ foodsItem.description }}</p>
                <p class="foods-item-des"><span class="mr12">月售{{ foodsItem.sellCount }}份</span><span>好评率{{ foodsItem.rating }}%</span></p>
                <p><span class="foods-item-price">￥{{ foodsItem.price }}</span><span v-show="foodsItem.oldPrice">￥{{ foodsItem.oldPrice }}</span></p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      goods: []
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    let _this = this
    _this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods', {
    }).then(function (response) {
      response = response.data
      if (response.errno === 0) {
        _this.goods = response.data
      }
      console.log(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  },
  components: {

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    position absolute
    top 174px
    bottom 50px
    left 0
    right 0
    overflow hidden
    display flex
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      .menu-item
        padding 0 12px
        display table
        .text
          height 54px
          width 56px
          display table-cell
          vertical-align middle
          font-size 12px
          color #333
          font-weight 200
          line-height 14px
          border-1px(rgba(7,17,27,.1))
          .icon
            width 12px
            height 12px
            display inline-block
            margin-right 2px
            vertical-align top
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
    .foods-wrapper
      flex 1
      .goods-item-title
        line-height 26px
        padding-left 13px
        font-size 12px
        color rgb(147,153,159)
        background-color #f3f5f7
        border-left 2px solid #d9dde1
      .foods-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          margin-right 10px
          border-radius 2px
          overflow hidden
          flex 0 0 57px
          height 57px
          .icon-img
            width 100%
            height 100%
        .content
          flex 1
          .foods-item-title
            font-size 14px
            line-height 14px
            margin-top 4px
            color rgb(7,17,27)
          .foods-item-des
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
            margin 8px 0
          .foods-item-price
            font-size 14px
            line-height 14px
            font-weight bold
            color rgb(240,20,20)
          .foods-item-oldprice
            font-size 10px
            color rgb(147,153,159)
</style>
