<template>
  <div class="shopcart">
    <div class="shopcart-wraper">
      <div class="shopcart-icon-wraper" :class="{'active': totalPrice > 0}">
        <div class="shopcart-icon"><i class="icon-shopping_cart"></i></div>
      </div>
      <span class="total-price">￥{{ totalPrice }}</span>
      <span class="line"></span>
      <span class="delivery-price">另需配送费￥{{ deliveryPrice }}元</span>
    </div>
    <div class="shopcart-result">
      <a href="#" class="result-btn">{{ diffPrice }}</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {

      }
    },
    props: {
      selectFood: { // 选择的食物
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 1
            }
          ]
        }
      },
      deliveryPrice: { // 配送费
        type: Number,
        default: 0
      },
      minPrice: { // 至少消费金额
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice() { // 总费用
        let price = 0
        this.selectFood.forEach((v, i) => {
          price += v.price * v.count
        })
        return price
      },
      diffPrice() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起配送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `差￥${diff}配送`
        } else {
          return '去结算'
        }
      }
    },
    components: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    height 48px
    background-color #141d27
    display flex
    position fixed
    align-items center
    left 0px
    right 0px
    bottom 0px
    color: rgba(255,255,255,0.4)
    .shopcart-wraper
      flex 1
      font-size 0
      .shopcart-icon-wraper
        width 56px
        height 56px
        border-radius 50%
        vertical-align middle
        position relative
        top -6px
        padding 6px
        margin 0 12px
        background-color #141d27
        box-sizing border-box
        display inline-block
        &.active
          .shopcart-icon
            background-color #00a0dc
            .icon-shopping_cart
              color #fff
        .shopcart-icon
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background-color #2c343d
          .icon-shopping_cart
            font-size 22px
            line-height 44px
            color #80858a
      .total-price,.delivery-price
        display inline-block
        font-size 16px
        font-weight 700
        line-height 48px
        vertical-align middle
      .delivery-price
        font-weight 400
        font-size 12px
        line-height normal
      .line
        width 1px
        height 48px
        margin 0 12px
        transform scaleY(.6)
        background-color rgba(255,255,255,.1)
        display inline-block
        vertical-align middle
    .shopcart-result
      height 100%
      flex 0 0 105px
      text-align center
      background-color #2b333b
      .result-btn
        font-size 12px
        line-height 48px
        font-weight 700
        display block
        color rgba(255,255,255,.4)
</style>
