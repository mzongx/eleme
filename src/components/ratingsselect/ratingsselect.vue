<template>
  <div class="ratings-select">
    <div class="ratings-type border-1px">
      <span class="types all" :class="{'on': selectType === 2}" @click="select(2)">{{ ratingsType.all }}<i>{{ ratings.length }}</i></span>
      <span class="types positive" :class="{'on': selectType === 0}" @click="select(0)">{{ ratingsType.positive }}<i>{{ negation.length }}</i></span>
      <span class="types negative" :class="{'on': selectType === 1}" @click="select(1)">{{ ratingsType.negative }}<i>{{ positive.length }}</i></span>
    </div>
    <div class="only-content">
      <label :class="{'on': onlyContent}" @click="toggleContent"><i class="icon-check_circle"></i><span class="text">只看有内容的评价</span></label>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const ALL = 2
// const POSITIVE = 2
// const NEGATIVE = 0
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    ratingsType: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // selectType: 1
    }
  },
  methods: {
    toggleContent() {
      // 子组件不能修改props，所以通知父组件来修改
      this.$emit('toggle')
    },
    select(type) {
      this.$emit('select', type)
    }
  },
  computed: {
    negation() {
      return this.ratings.filter((v, i) => {
        return v.rateType === 0
      })
    },
    positive() {
      return this.ratings.filter((v, i) => {
        return v.rateType === 1
      })
    }
  }
}
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .ratings-select
    .ratings-type
      border-1px(rgba(7,17,27,.1))
      margin 0 18px
      padding-bottom 18px
      font-size 0
      .types
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        display inline-block
        font-size 12px
        color rgb(77,85,93)
        i
          margin-left 5px
          font-size 10px
          font-style normal
          display inline-block
        &.all
          background-color rgba(0,160,220,.2)
        &.positive
          background-color rgba(0,160,220,.2)
        &.negative
          background-color rgba(77,85,93,.2)
        &.on
          color #fff
          &.all,&.positive
            background-color rgb(0,160,220)
          &.negative
            background-color rgb(77,85,93)
    .only-content
      color rgb(147,153,159)
      padding 12px 18px
      font-size 0
      border-bottom 1px solid rgba(7,17,27,.1)
      i
        font-size 24px
        line-height 24px
        vertical-align middle
      .text
        margin-left 8px
        display inline-block
        font-size 12px
        line-height 24px
        vertical-align middle
      .on
        i
          color #00c850
</style>
