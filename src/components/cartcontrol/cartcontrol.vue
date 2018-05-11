<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart">
        <span class="icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
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
      selectFood: []
    }
  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('dorp-ball', event)
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
    .cart-add,.cart-decrease
      flex 1
      font-size 24px
      line-height 24px
      color #00a0dc
      vertical-align middle
      transition all linear .3s
    .cart-count
      flex 1
      font-size 10px
      margin 0 11px
      line-height 24px
      color #93999f
    .cart-decrease
      font-size 0
      .icon-remove_circle_outline
        font-size 24px
        display inline-block
        color #00a0dc
        vertical-align middle
        transition all linear .3s
        transform rotate(0)
      &.move-transition
        opacity 1
        transform translate3d(0, 0, 0)
        .icon-remove_circle_outline
          transform rotate(180deg)
      &.move-enter,&.move-leave-to
        opacity 0
        transform translate3d(24px, 0, 0)
        .icon-remove_circle_outline
          transform rotate(180deg)
</style>
