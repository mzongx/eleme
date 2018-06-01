<template>
  <div class="star-wrapper" :class="starType">
    <span class="star-item" v-for="(classes, index) in classItem" :class="classes" :key="index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  props: {
    size: Number,
    score: Number
  },
  computed: {
    starType() {
      // 星星的尺寸，有24，36,48格式
      return 'star-' + this.size
    },
    classItem() {
      let starCount = 5
      let result = []
      const STAR_HALT = 'star-half'
      const STAR_ON = 'star-on'
      const STAR_OFF = 'star-off'
      let score = Math.floor(this.score * 2) / 2 // 四舍五入取整
      let hasDecimal = score % 1 !== 0 // 判断是否有小数点
      score = Math.floor(score)
      // 先判断满星的个数
      for (let i = 0; i < score; i++) {
        result.push(STAR_ON)
      }

      // 再计算半星的个数,只有一个
      if (hasDecimal) {
        result.push(STAR_HALT)
      }

      // 最后计算没有星的个数
      while (result.length < starCount) {
        result.push(STAR_OFF)
      }

      return result
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star-wrapper
    text-align center
    font-size 0
    .star-item
      display inline-block
    &.star-48
      .star-item
        width 24px
        height 24px
        background-size 24px 24px
        margin-right 20px
        &.star-off
          bg-image('star48_off')
        &.star-half
          bg-image('star48_half')
        &.star-on
          bg-image('star48_on')
    &.star-36
      .star-item
        width 15px
        height 15px
        background-size 15px 15px
        margin-right 6px
        &.star-off
          bg-image('star36_off')
        &.star-half
          bg-image('star36_half')
        &.star-on
          bg-image('star36_on')
    &.star-24
      .star-item
        width 12px
        height 12px
        background-size 12px 12px
        margin-right 2px
        &.star-off
          bg-image('star24_off')
        &.star-half
          bg-image('star24_half')
        &.star-on
          bg-image('star24_on')
    &.star-24,&.star-36,&.star-48
      .star-item
        &:last-child
          margin-right 0
</style>
