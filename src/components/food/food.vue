<template>
  <transition name="move">
    <div class="food" v-show="showFood" ref="foodWarpper">
      <div class="food-wrapper">
        <div class="food-pic">
          <a href="javascript:;" class="icon-arrow_lift back-ico" @click="hideFoods"></a>
          <img :src="food.image" />
        </div>
        <div class="food-content">
          <h3 class="food-name">{{ food.name }}</h3>
          <div class="food-decre">月销{{ food.sellCount }}份<span class="rating">好评率{{ food.rating }}%</span></div>
          <div class="food-option">
              <span class="price">￥{{ food.price }}</span><span class="oldprice" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
              <transition name="fade">
                <div class="card-wrapper" v-show="food.count === 0 || !food.count" @click="firstAdd">加入购物车</div>
              </transition>
              <div class="cartcontrol-wrapper"><cartcontrol @dorp-ball="dorpBall" :food="food" /></div>
          </div>
        </div>
        <split />
        <div class="info">
          <h1 class="title">商品介绍</h1>
          <p class="description">{{ food.info }}</p>
        </div>
        <split />
        <div class="ratings">
          <h1 class="title">商品评价</h1>
        </div>
        <ratingsselect @select="selected" @toggle="toggleContent" :select-type="selectType" :only-content="onlyContent" :ratings="food.ratings" />
        <div class="ratings-list">
          <ul class="ratings-wrap">
            <li class="ratings-item border-1px" v-for="(ratingsItem, index) in food.ratings" :key="index" v-show="showList(ratingsItem)">
              <div class="clearfix">
                <span class="time left">{{ showTime(ratingsItem.rateTime) }}</span>
                <span class="user right">{{ ratingsItem.username }}<img class="pic" :src="ratingsItem.avatar" /></span>
              </div>
              <div class="content"><i class="icon" :class="{'icon-thumb_down':ratingsItem.rateType==1,'icon-thumb_up':ratingsItem.rateType==0}"></i><span class="text">{{ ratingsItem.text }}</span></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import ratingsselect from '@/components/ratingsselect/ratingsselect'
  import split from '@/components/split/split'
  import Bscroll from 'better-scroll'
  import { formatDate } from '@/common/js/date'
  const ALL = 2
  export default {
    data() {
      return {
        showFood: false, // 默认不显示food组件
        selectType: ALL,
        food: {},
        onlyContent: false
      }
    },
    methods: {
      showFoods(food) {
        this.showFood = true
        this.food = food
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new Bscroll(this.$refs.foodWarpper, {
              click: true
            })
          } else {
            this.foodScroll.refresh()
          }
        })
      },
      hideFoods() {
        this.showFood = false
      },
      firstAdd(event) {
        // 第一次点击购物车
        this.$emit('dorp-ball', event)
        this.$set(this.food, 'count', 1)
      },
      dorpBall(event) {
        // 触发goods.vue中的事件
        this.$emit('dorp-ball', event)
      },
      selected(type) {
        this.selectType = type
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent
      },
      showList(item) {
        // 显示评价列表
        if (this.onlyContent && !item.text) {
          return false
        } else if (this.selectType === ALL) {
          return true
        } else {
          return this.selectType === item.rateType
        }
      },
      showTime(time) {
        let date = formatDate(time, 'YYYY-MM-DD hh:mm')
        return date
      }
    },
    components: {
      cartcontrol,
      split,
      ratingsselect
    }
  }
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .food
    position fixed
    left 0px
    right 0px
    top 0px
    bottom 48px
    background-color #fff
    transition all .3s ease
    &.move-enter-active
     transform translate3d(0,0,0)
    &.move-enter,&.move-leave-to
      transform translate3d(100%,0,0)
    .food-pic
      width 100%
      height 0
      padding-top 100% // W3C标准，padding-top的百分比会根据width计算，所以这样就保持宽高同比
      position relative
      img
        position absolute
        left 0px
        top 0px
        right 0px
        bottom 0px
        width 100%
        height 100%
      .back-ico
        position absolute
        left 12px
        top 12px
        z-index 1
        color #fff
        background-color rgba(255,255,255,.5)
        border-radius 50%
        padding 5px
    .food-content
      padding 18px
      .food-name
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
        font-weight bold
        margin-bottom 8px
      .food-decre
        font-size 10px
        line-height 10px
        margin-bottom 18px
        color rgb(147,153,159)
        .rating
          margin-left 12px
      .price
        font-size 14px
        line-height 14px
        font-weight bold
        color rgb(240,20,20)
        margin-right 12px
      .oldprice
        font-size 10px
        color rgb(147,153,159)
      .food-option
        position relative
        .card-wrapper
          position absolute
          right 0px
          bottom -4px
          width 74px
          height 24px
          line-height 24px
          border-radius 12px
          font-size 10px
          color #fff
          text-align center
          background-color rgb(0,160,200)
          z-index 1
          &.fade-enter-active
            transition all .3s linear
            opacity 1
          &.fade-enter,&.fade-leave-to
            opacity 0
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom -4px
    .info
      padding 18px
      .title
        font-size 14px
        margin-bottom 6px
      .description
        font-size 12px
        font-weight 200
        line-height 24px
        padding 0 8px
        text-align justify
        color rgb(77,85,93)
    .ratings
      .title
        padding 18px
        font-size 14px
    .ratings-list
      padding 0 18px
      .ratings-item
        padding 16px 0
        border-1px(rgba(7,17,27,.1))
        .clearfix
          font-size 10px
          line-height 12px
          color rgb(147,153,159)
          .user
            .pic
              display inline-block
              width 12px
              height 12px
              line-height 12px
              margin-left 6px
              border-radius 50%
              vertical-align top
        .content
          margin-top 6px
          font-size 12px
          .icon
            line-height 12px
            margin-right 4px
            vertical-align middle
            &.icon-thumb_down
              color rgb(147,153,159)
            &.icon-thumb_up
              color rgb(0,160,220)
          .text
            line-height 16px
            color rgb(7,17,27)
</style>
