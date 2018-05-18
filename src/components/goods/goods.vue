<template>
  <div class="goods" ref="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(goodsItem, index) in goods" :key="index" class="menu-item" @click="selectMenu(index, $event)" :class="{'current':currentIndex == index}">
          <span class="text border-1px"><span class="icon" v-show="goodsItem.type > 0" :class="classMap[goodsItem.type]"></span>{{ goodsItem.name }}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(goodsItem, index) in goods" :key="index" class="goods-item">
          <div class="goods-item-title">{{ goodsItem.name }}</div>
          <ul>
            <li v-for="(foodsItem, foodIndex) in goodsItem.foods" :key="foodIndex" class="foods-item border-1px" @click="foodDetail(foodsItem)">
              <div class="icon"><img :src="foodsItem.image" class="icon-img" /></div>
              <div class="content">
                <h3 class="foods-item-title">{{ foodsItem.name }}</h3>
                <p class="foods-item-des">{{ foodsItem.description }}</p>
                <p class="foods-item-des"><span class="mr12">月售{{ foodsItem.sellCount }}份</span><span>好评率{{ foodsItem.rating }}%</span></p>
                <p><span class="foods-item-price">￥{{ foodsItem.price }}</span><span v-show="foodsItem.oldPrice" class="foods-item-oldprice">￥{{ foodsItem.oldPrice }}</span></p>
                <div class="cartcontrol-wrapper">
                  <cartcontrol v-on:dorp-ball="_dropBall" :food="foodsItem" />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-food="selectFood"/>
    <food v-on:dorp-ball="_dropBall" ref="foodpage" />
  </div>
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll'
  import shopcart from '@/components/shopcart/shopcart'
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import food from '@/components/food/food'
  export default {
    data () {
      return {
        goods: [],
        scrollY: 0, // 右侧foods滚动的距离
        listHeight: [] // foods每个分类的高度
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      let _this = this
      _this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods', {
      }).then(function (response) {
        response = response.data
        if (response.errno === 0) {
          _this.goods = response.data
          _this.$nextTick(function() {
            _this._initScroll()
            _this._calculateHeight()
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    computed: {
      currentIndex() {
        // 滚动的距离与当前listHeight跟listHeight前一个对比
        let height = 0
        let heightNext = 0
        for (let i = 0; i < this.listHeight.length; i++) {
          height = this.listHeight[i]
          heightNext = this.listHeight[i + 1]
          if ((this.scrollY >= height && this.scrollY < heightNext) || !heightNext) {
            // 当左侧内容较多时，会随foodsList滚动而滚动
            let resScrollHeight = 0
            resScrollHeight += Math.ceil(this.rclcMenuHeight / this.listHeight.length) * i
            if (resScrollHeight >= this.rclcMenuHeight) {
              resScrollHeight = this.rclcMenuHeight
            }
            if (this.foodScroll.directionY < 0) {
              resScrollHeight *= 1
              if (resScrollHeight >= 0) {
                resScrollHeight = 0
              }
            } else {
              resScrollHeight *= -1
            }
            this.meunScroll.scrollTo(0, resScrollHeight, 300)
            return i
          }
        }
        return 0
      },
      rclcMenuHeight() {
        // 计算左侧menu高度与展示区差值，用于滚动显示底部被遮挡部分
        let menuWrapperHeight = this.$refs.menuWrapper.scrollHeight
        let goodsHeight = this.$refs.goods.offsetHeight
        let resCalc = Math.abs(menuWrapperHeight - goodsHeight)
        return resCalc
      },
      selectFood() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      foodDetail(food) {
        this.$refs.foodpage.showFoods(food) // 显示页面
      },
      selectMenu(index, event) {
        // 选中左侧菜单
        let goodsItem = document.querySelectorAll('.goods-item')
        this.foodScroll.scrollToElement(goodsItem[index], 300)
      },
      _initScroll() {
        // 初始化滚动条
        this.meunScroll = new Bscroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodScroll = new Bscroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })

        // 监听foodScroll滚动
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        // 计算每一个foods分类的高度
        let foodsEl = this.$refs.foodsWrapper.querySelectorAll('.goods-item')
        let height = 0 // 后一个foods的height==前一个height加上自己的height，以此类推，第一个就加0
        this.listHeight.push(height)
        foodsEl.forEach((v, i) => {
          height += v.offsetHeight
          this.listHeight.push(height) // offsetHeight会计算容器的border，而clientHeight不会计算border
        })
      },
      _dropBall(event) {
        this.$refs.shopcart.dropBall(event)
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    position absolute
    top 174px
    bottom 48px
    left 0
    right 0
    overflow hidden
    display flex
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      .menu-item
        padding 0 12px
        display table
        &.current
          color #000
          background-color #fff
          position relative
          top -1px;
          .text
            color #000
            &:after
              display none
        .text
          height 54px
          width 56px
          display table-cell
          vertical-align middle
          font-size 12px
          color #333
          font-weight 200
          line-height 14px
          border-1px(rgba(7,17,27,.1))
          .icon
            width 12px
            height 12px
            display inline-block
            margin-right 2px
            vertical-align top
            background-size 12px 12px
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
    .foods-wrapper
      flex 1
      .goods-item-title
        line-height 26px
        padding-left 13px
        font-size 12px
        color rgb(147,153,159)
        background-color #f3f5f7
        border-left 2px solid #d9dde1
      .foods-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          margin-right 10px
          border-radius 2px
          overflow hidden
          flex 0 0 57px
          height 57px
          .icon-img
            width 100%
            height 100%
        .content
          flex 1
          position relative
          .cartcontrol-wrapper
            position absolute
            right 0px
            bottom -4px
          .foods-item-title
            font-size 14px
            line-height 14px
            margin-top 4px
            color rgb(7,17,27)
          .foods-item-des
            font-size 10px
            line-height 12px
            color rgb(147,153,159)
            margin 8px 0
          .foods-item-price
            font-size 14px
            line-height 14px
            margin-right 12px
            font-weight bold
            color rgb(240,20,20)
          .foods-item-oldprice
            font-size 10px
            color rgb(147,153,159)
    .shop-cart
      position fixed
      bottom 0
      left 0
      right 0
      height 50px
      background-color #000
</style>
