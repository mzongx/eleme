<template>
  <div>
    <div class="shopcart">
      <div class="shopcart-wraper">
        <div class="shopcart-icon-wraper" :class="{'active': totalPrice > 0}">
          <span class="badge" v-show="chooseFoodsCount > 0">{{ chooseFoodsCount }}</span>
          <div class="shopcart-icon" ref="shopcartIcon" :class="{'shake': shakeClass}" @click="toggleList"><i class="icon-shopping_cart"></i></div>
        </div>
        <span class="total-price" :class="{'active': totalPrice > 0}">￥{{ totalPrice }}</span>
        <span class="line"></span>
        <span class="delivery-price">另需配送费￥{{ deliveryPrice }}元</span>
      </div>
      <div class="shopcart-result" :class="{'active': resultBtn}">
        <a href="#" class="result-btn">{{ diffPrice }}</a>
      </div>
      <transition-group @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" name="drop" tag="ul">
        <li class="balls" v-for="(ball, index) in balls" :key="index" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </li>
      </transition-group>
    </div>
    <transition name="fade">
      <div class="card-mask" v-show="listShow" @click="toggleList"></div>
    </transition>
    <transition name="slideup">
      <div class="card-list" v-show="listShow">
        <div class="card-list-title border-1px">
          购物车
          <a href="javascript:;" class="clear-card" @click="clearCard">清除</a>
        </div>
        <div class="card-list-item" ref="cardList">
          <ul class="card-item-wrapper">
            <li class="card-item-food" v-for="(food, index) in selectFood" :key="index">
              <span class="name">{{ food.name }}</span>
              <div class="price">￥{{ food.price }}</div>
              <div class="cartcontrol-wrapper"><cartcontrol v-on:dorp-ball="dropBall" :food="food" /></div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import Bscroll from 'better-scroll'
  export default {
    data() {
      return {
        balls: [ // 初始化五个小球，用于连续点击的时候
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        shakeClass: false, // 小球小落抖动效果
        fold: true,
        ballsDrop: [] // 这是下落完成的小球
      }
    },
    props: {
      selectFood: { // 选择的食物
        type: Array,
        default() {
          return []
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
    methods: {
      dropBall(event) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.x = event.x
            ball.y = event.y
            this.ballsDrop.push(ball)
            return
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length
        while (count--) {
          if (this.balls[count].show) {
            let moveX = this.ballsDrop[0].x - 32
            let moveY = -(window.innerHeight - this.ballsDrop[0].y - 22)
            el.style.webkitTransform = `translate3d(0, ${moveY}px, 0)`
            el.style.transform = `translate3d(0, ${moveY}px, 0)`
            let innerEl = el.getElementsByClassName('inner-hook')[0]
            innerEl.style.WebKittransform = `translate3d(${moveX}px, 0, 0)`
            innerEl.style.transform = `translate3d(${moveX}px, 0, 0)`
          }
        }
      },
      enter(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight // 这是重绘，相当于硬件加速
        this.$nextTick(() => {
          // 必须要加入nextTick,否则获取不到更新后的dom
          el.style.WebKittransform = 'translate3d(0, 0, 0)'
          el.style.transform = 'translate3d(0, 0, 0)'
          let innerEl = el.getElementsByClassName('inner-hook')[0]
          innerEl.style.WebKittransform = 'translate3d(0, 0, 0)'
          innerEl.style.transform = 'translate3d(0, 0, 0)'
        })
      },
      afterEnter(el) {
        // 重置balls
        let ball = this.ballsDrop.shift()
        if (ball) {
          ball.show = false
        }
        // 购物车抖动效果
        this.shakeClass = true
        setTimeout(() => {
          this.shakeClass = false
        }, 500)
      },
      toggleList() {
        if (!this.chooseFoodsCount) {
          return
        }
        this.fold = !this.fold
      },
      clearCard() {
        // 清除购物车
        this.selectFood.forEach((v, i) => {
          v.count = 0
        })
        this.toggleList()
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
      },
      resultBtn() {
        if (this.totalPrice >= this.minPrice) {
          return true
        }
        return false
      },
      chooseFoodsCount() {
        let count = 0
        this.selectFood.forEach((v, i) => {
          count += v.count
        })
        return count
      },
      listShow() {
        if (!this.chooseFoodsCount) {
          /* eslint-disable */
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.cardList = new Bscroll(this.$refs.cardList, {
            click: true
          })
        }
        return show
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .shopcart
    height 48px
    background-color #141d27
    display flex
    position fixed
    align-items center
    left 0px
    right 0px
    bottom 0px
    z-index 1
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
        .badge
          position absolute
          right 0px
          top 0px
          display inline-block
          padding .15em .4em
          min-width 8px
          border-radius 18px
          background-color #f43530
          color #fff
          line-height 1.2
          text-align center
          font-size 12px
          vertical-align middle
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
          &.shake
            animation shaking .5s 1
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
      .total-price
        &.active
          color #fff
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
      &.active
        background-color #00b43c
        .result-btn
          color #fff
      .result-btn
        font-size 12px
        line-height 48px
        font-weight 700
        display block
        color rgba(255,255,255,.4)
    .balls
      position fixed
      left 32px
      bottom 22px
      &.drop-enter-active
        transition all .3s cubic-bezier(.26,-0.45,.83,.67)
      .inner
        display inline-block
        transition all .3s linear
        width 16px
        height 16px
        background-color #00a0dc
        border-radius 50%
  .card-mask
    position fixed
    left 0px
    right 0px
    top 0px
    bottom 0px
    background rgba(7, 17, 27, 0.6)
    backdrop-filter blur(10px)
    transition all .3s ease-in
    &.fade-enter-active
      opacity 1
    &.fade-enter,&.fade-leave-to
      opacity 0
  .card-list
    position absolute
    width 100%
    left 0px
    bottom 0px
    background-color #fff
    transition all .3s linear
    &.slideup-enter-active
      transform translate3d(0,0,0)
    &.slideup-enter,&.slideup-leave-to
      transform translate3d(0,100%,0)
    .card-list-title
      height 40px
      line-height 40px
      font-size 14px
      padding 0 18px
      background-color #f3f5f7
      color rgb(7, 17, 27)
      border-1px(rgba(7, 17, 27, .1))
      .clear-card
        color rgb(0, 160, 220)
        float right
    .card-list-item
      max-height 217px
      overflow hidden
      .card-item-wrapper
        padding 0 18px
        .card-item-food
          border-1px(rgba(7,17,27,.1))
          padding 12px 0
          position relative
          font-size 14px
          line-height 24px
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color #f01414
          .cartcontrol-wrapper
            position: absolute;
            right: 0;
            top: 12px
  @keyframes shaking {// 小球下落抖动效果
    from, to {
      transform scale(1, 1)
    }
    25% {
      transform scale(0.9, 1.1)
    }
    50% {
      transform scale(1.1, 0.9)
    }
    75% {
      transform scale(0.95, 1.05)
    }
  }
</style>
