<template>
  <div class="seller" ref="sellerScroll">
    <div class="seller-wrap">
      <div class="seller-description">
        <p class="name">{{ seller.name }}</p>
        <div class="star-box border-1px">
          <star :size="36" :score="seller.score" />
          <span class="rating-count">({{ seller.ratingCount }})评价</span>
          <span class="seller-count">月售{{ seller.sellCount }}单</span>
        </div>
        <div class="favorite">
          <i class="icon-favorite icon" :class="{'active': favorite}" @click="favoriteToggle"></i>
          <p class="text">{{ favoriteText }}</p>
        </div>
        <ul class="seller-service">
          <li class="seller-service-item">
            <span class="name">起送价</span>
            <p class="text"><i class="count">{{ seller.minPrice }}</i>元</p>
          </li>
          <li class="seller-service-item">
            <span class="name">商家配送</span>
            <p class="text"><i class="count">{{ seller.deliveryPrice }}</i>元</p>
          </li>
          <li class="seller-service-item">
            <span class="name">平均配送时间</span>
            <p class="text"><i class="count">{{ seller.deliveryTime }}</i>分钟</p>
          </li>
        </ul>
      </div>
      <split />
      <div class="notice">
        <h2 class="title">公告与活动</h2>
        <p class="bulletin border-1px">{{ seller.bulletin }}</p>
        <supports :seller="seller" />
      </div>
      <split />
      <div class="seller-live">
        <h2 class="title border-1px">公告与活动</h2>
        <div ref="liveScroll">
          <ul class="live-wrap clearfix" ref="sellerWrap">
            <li class="live-action border-1px" v-for="(liveItem, index) in seller.pics" :key="index">
              <img class="live-pic" :src="liveItem" />
            </li>
          </ul>
        </div>
      </div>
      <split />
      <div class="infos">
        <h2 class="title">商家信息</h2>
        <ul class="infos-wrapper">
          <li class="infos-item" v-for="(info, index) in seller.infos" :key="index">{{ info }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '@/components/star/star'
import split from '@/components/split/split'
import supports from '@/components/supports/supports'
import Bscroll from 'better-scroll'
export default {
  props: {
    seller: Object
  },
  data () {
    return {
      favorite: false
    }
  },
  mounted() {
    this.sellerScroll = new Bscroll(this.$refs.sellerScroll, {
      click: true
    })

    if (this.seller.pics) {
      let picWidth = 120
      let margin = 6
      let width = (picWidth + margin) * this.seller.pics.length
      this.$refs.sellerWrap.style.width = width + 'px'
      this.$nextTick(() => {
        this.liveScroll = new Bscroll(this.$refs.liveScroll, {
          click: true,
          scrollX: true
        })
      })
    }
  },
  components: {
    star,
    split,
    supports
  },
  methods: {
    favoriteToggle() {
      this.favorite = !this.favorite
    }
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  }
}
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .seller
    position absolute
    top 174px
    bottom 0
    left 0
    right 0
    overflow hidden
    .seller-wrap
      .seller-description
        padding 0 18px
        position relative
        padding-top 18px
        .name
          margin-bottom 8px
          font-size 14px
          color rgb(7,17,27)
        .star-box
          padding-bottom 18px
          border-1px(rgba(7,17,27,.1))
          .star-wrapper
            display inline-block
            text-align left
          .seller-count,.rating-count
            font-size 10px
            line-height 18px
            display inline-block
            vertical-align top
            color rgb(77,85,93)
          .seller-count
            margin-left 12px
          .rating-count
            margin-left 10px
        .favorite
          width 50px
          text-align center
          position absolute
          top 18px
          right 11px
          .icon
            display inline-block
            margin-bottom 4px
            font-size 24px
            color #d4d6d9
            &.active
              color rgb(240,20,20)
          .text
            font-size 10px
            color rgb(77,85,93)
        .seller-service
          display flex
          .seller-service-item
            border-right 1px solid rgba(7,17,27,.1)
            margin 18px 0
            text-align center
            font-size 10px
            flex 1
            &:last-child
              border-right none
            .name
              display inline-block
              margin-bottom 4px
              color rgb(143,153,159)
            .text
              line-height 24px
              color rgb(7,17,27)
              .count
                font-weight 200
                font-size 24px
                font-style normal
      .notice
        padding 18px 18px 0
        .title
          margin-bottom 8px
          font-size 14px
          color rgb(7,17,27)
        .bulletin
          padding 0 12px 16px
          line-height 24px
          color rgb(240,20,20)
          font-size 12px
          text-align justify
          border-1px(rgba(7,17,27,.1))
      .seller-live
        padding 18px 0 0 18px
        .title
          margin-bottom 12px
          font-size 14px
          color rgb(7,17,27)
        .live-wrap
          margin-bottom 18px
          overflow hidden
          .live-action
            width 120px
            height 90px
            margin-right 6px
            float left
            .live-pic
              width 100%
              height 100%
      .infos
        padding 18px 18px 0
        .title
          padding-bottom 12px
          font-size 14px
          color rgb(7,17,27)
          border-1px(rgba(7,17,27,.1))
        .infos-wrapper
          .infos-item
            padding 16px 12px
            line-height 16px
            font-size 12px
            color rbg(7,17,27)
            border-1px(rgba(7,17,27,.1))
            &:last-child
              border-none()
</style>
