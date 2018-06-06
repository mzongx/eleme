<template>
  <div class="ratings-wrapper" ref="ratingsBox">
    <div class="ratings-box">
      <div class="ratings-score">
        <div class="all-ratings">
          <p class="score">{{ seller.score }}</p>
          <p class="name">综合评分</p>
          <p class="des">高于周边商家{{ seller.rankRate }}%</p>
        </div>
        <div class="other-ratings">
          <div class="ratings-item">
            <span class="title">服务态度</span>
            <div class="star-wrap"><star :size="36" :score="seller.serviceScore" /></div>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="ratings-item">
            <span class="title">商品评分</span>
            <div class="star-wrap"><star :size="36" :score="seller.foodScore" /></div>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="ratings-item">
            <span class="title">送达时间</span>
            <span class="time">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <split />
      <div class="ratings-select-wrap">
        <ratingsselect @select="selected" @toggle="toggleContent" :select-type="selectType" :ratingsType="ratingsType" :only-content="onlyContent" :ratings="ratings" />
      </div>
      <ul class="ratings-list">
        <li class="ratings-item border-1px" v-for="(ratingsItem, index) in ratings" :key="index" v-show="showList(ratingsItem)">
          <div class="avatar">
            <img :src="ratingsItem.avatar" />
          </div>
          <div class="content">
            <p class="name"><span>{{ ratingsItem.username }}</span><span class="time">{{ formatTime(ratingsItem.rateTime) }}</span></p>
            <div class="star-box">
              <star :size="24" :score="ratingsItem.score" />
              <span class="delivery-time" v-show="ratingsItem.deliveryTime">{{ ratingsItem.deliveryTime }}分钟送达</span>
            </div>
            <p class="text">
              {{ ratingsItem.text }}
            </p>
            <div class="recommend">
              <i class="icon" :class="{'icon-thumb_down':ratingsItem.rateType==1,'icon-thumb_up':ratingsItem.rateType==0}"></i>
              <span class="recommend-food" v-for="(recommend, index) in ratingsItem.recommend" :key="index">{{ recommend }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '@/components/star/star'
import split from '@/components/split/split'
import ratingsselect from '@/components/ratingsselect/ratingsselect'
import Bscroll from 'better-scroll'
import { formatDate } from '@/common/js/date'
const ALL = 2
export default {
  props: {
    seller: Object
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      ratingsType: {all: '全部', positive: '满意', negative: '不满意'},
      onlyContent: false
    }
  },
  created() {
    let _this = this
    _this.$http.get('/api/ratings', {
    }).then((response) => {
      response = response.data
      if (response.errno === 0) {
        _this.ratings = response.data
        _this.$nextTick(() => {
          _this.ratingsScroll = new Bscroll(_this.$refs.ratingsBox, {
            click: true
          })
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  components: {
    star,
    split,
    ratingsselect
  },
  methods: {
    selected(type) {
      this.selectType = type
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent
    },
    formatTime(time) {
      return formatDate(time, 'YYYY-MM-DD hh:mm')
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
    }
  }
}
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .ratings-wrapper
    position absolute
    top 174px
    bottom 0
    left 0
    right 0
    overflow hidden
    .ratings-box
      .ratings-score
        padding 18px 0
        display flex
        .all-ratings
          flex 0 0 137px
          text-align center
          border-right 1px solid rgba(7, 17, 27, .1)
          .score
            line-height 28px
            font-size 24px
            color rgb(255, 153, 0)
          .name
            margin 6px 0 8px 0
            line-height 1
            font-size 12px
            color rgb(7, 17, 27)
          .des
            margin-bottom 6px
            line-height 1
            font-size 10px
            color rgb(147, 153, 159)
        .other-ratings
          padding 0 24px
          .ratings-item
            margin-bottom 8px
            &:last-child
              margin-bottom 0
            display flex
            .title
              line-height 18px
              font-size 12px
              color rgb(7, 17, 27)
            .star-wrap
              flex 1
              margin 0 12px
            .score
              line-height 18px
              font-size 12px
              color rgb(255, 153, 0)
            .time
              margin-left 12px
              line-height 18px
              font-size 12px
              color rgb(147,153,159)
      .ratings-select-wrap
        padding-top 18px
      .ratings-list
        padding 0 18px
        .ratings-item
          padding 18px 0
          border-1px(rgba(7,17,27,.1))
          display flex
          &:last-child
            border-none()
          .avatar
            margin-right 12px
            flex 0 0 28px
            img
              width 100%
              height 28px
              border-radius 50%
          .content
            flex 1
            .name
              margin-bottom 4px
              font-size 10px
              line-height 12px
              color rgb(7,17,27)
              .time
                float right
                color rgb(143,153,159)
            .star-box
              font-size 0
              .star-wrapper
                margin-right 6px
                display inline-block
                text-align left
              .delivery-time
                font-size 10px
                line-height 12px
                color rgb(147,153,159)
            .text
              margin 6px 0 8px
              font-size 12px
              line-height 18px
              color rgb(7,17,27)
            .recommend
              font-size 0
              .icon
                margin-right 8px
                font-size 12px
                &.icon-thumb_down
                  color rgb(147,153,159)
                &.icon-thumb_up
                  color rgb(0,160,220)
              .recommend-food
                display inline-block
                padding 0 6px
                margin-bottom 8px
                margin-right 8px
                line-height 16px
                border 1px solid rgba(7,17,27,.1)
                border-radius 1px
                background-color #fff
                font-size 9px
                color rgb(147,153,159)
</style>
