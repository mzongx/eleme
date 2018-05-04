<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {

    }
  },
  methods: {
    addCart() {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart() {
      this.food.count--
    }
  },
  components: {

  }
}
</script>

<style lang="stylus" rel="stylesheets">
  .cartcontrol
    display flex
    &>*
      flex 1
    .cart-add,.cart-decrease,.cart-count
      font-size 24px
      color #00a0dc
      vertical-align middle
      transition all linear .3s
    .cart-count
      font-size 10px
      margin 0 11px
      line-height 24px
      color #93999f
    .cart-decrease
      transform rotate(0)
      &.move-transition
        opacity 1
        transform translate3d(0, 0, 0)
      &.move-enter,&.move-leave-to
        opacity 0
        transform translate3d(24px, 0, 0)
</style>
