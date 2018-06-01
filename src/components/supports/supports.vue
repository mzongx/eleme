<template>
  <div class="supports-wrapper" v-if="seller">
    <ul class="supports">
      <li v-for="(support, index) in seller.supports" :key="index" class="supports-item border-1px">
        <i class="icon" :class="classMap[support.type]"></i>
        <span class="text">{{ support.description }}</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    seller: Object
  },
  data() {
    return {

    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {

  }
}
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .supports
    margin 0 auto
    .supports-item
      padding 16px 12px
      font-size 12px
      font-weight 200
      border-1px(rgba(7,17,27,.1))
      &:last-child
        border-none()
      .text
        line-height 16px
      .icon
        width 16px
        height 16px
        display inline-block
        margin-right 6px
        vertical-align top
        background-size 16px 16px
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
</style>
