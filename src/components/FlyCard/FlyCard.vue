<template>
    <div style="position: relative;height: 100%;width: 100%;padding-left: 0;">
        <div style="position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%)"
            :style="{
            width:cardWidth+'px',
            height:cardHeight+'px'
            }"
        >
            <div
             class="card"
             style="z-index:13"
             :style="{
                width:cardWidth+'px',
                height:cardHeight+'px',
                left:left+'px',
                top:top + 'px',
                borderRadius:borderRadius+'px',
                backgroundColor:cardBgColor
             }"
             :class="{
                animation:isAnimating,
                shadowEffect:hasShadow,
                borderEffect:hasBorder
             }"
             @touchstart="touchStart"
             @touchmove="touchMove"
             @touchcancel="touchCancel"
             @touchend="touchCancel"
            >
                <slot name="firstCard"></slot>
            </div>
            <div
                class="card"
                style="z-index: 12"
                :style="{
                    width:width2+'px',
                    height:height2+'px',
                    left:left2+'px',
                    top:top2 + 'px',
                    borderRadius:borderRadius+'px',
                    backgroundColor:cardBgColor
                }"
                :class="{
                    animation:isAnimating,
                    shadowEffect:hasShadow,
                    borderEffect:hasBorder
                }"
            >
                <slot name="secondCard"></slot>
            </div>
            <div
                 class="card"
                 style="z-index: 11"
                 :style="{
                    width:width3+'px',
                    height:height3+'px',
                    left:left3+'px',
                    top:top3 + 'px',
                    borderRadius:borderRadius+'px',
                    backgroundColor:cardBgColor
                }"
                 :class="{
                    animation:isAnimating,
                    shadowEffect:hasShadow,
                    borderEffect:hasBorder
                }"
            >
                <slot name="thirdCard"></slot>
            </div>
            <div
                    class="card"
                    style="z-index: 10"
                    :style="{
                      width: width4 + 'px',
                      height: height4 + 'px',
                      left: left4 + 'px',
                      top: top4 + 'px',
                      'border-radius': borderRadius + 'px',
                      backgroundColor: cardBgColor,
                      opacity: opacity4,
                    }"
                      :class="{
                      animation: isAnimating,
                      shadowEffect: hasShadow,
                      boderEffect: hasBorder,
                    }"
            ></div>
        </div>
    </div>
</template>

<script>
  import useTouch from "../../utils/use/touch";

  export default {
    name: "FlyCard",
    props:{
      cardWidth: {
        type: Number,
        default: 260,
      },
      // 正常卡片高度
      cardHeight: {
        type: Number,
        default: 300,
      },
      // 卡片层叠的横向边距
      leftPad: {
        type: Number,
        default: 10,
      },
      // 卡片层叠的纵向边距
      topPad: {
        type: Number,
        default: 6,
      },
      // 卡片背景色
      cardBgColor: {
        type: String,
        default: "#fff",
      },
      // 卡片拖拽方向
      dragDirection: {
        type: String,
        default: "all", //all,vertical,horizontal
      },
      // 卡片的圆角弧度
      borderRadius: {
        type: Number,
        default: 10,
      },
      // 卡片触发飞卡效果的距离
      throwTriggerDistance: {
        type: Number,
        default: 100,
      },
      // 飞卡的移动距离
      throwDistance: {
        type: Number,
        default: 1000,
      },
      // 是否开启卡片描边效果
      hasBorder: {
        type: Boolean,
        default: false,
      },
      // 是否开启阴影效果
      hasShadow: {
        type: Boolean,
        default: true,
      },
    },
    emits:[
      //声明回调事件，即约定相关事件
      // vue3中组件发送的自定义事件需要定义在emits选项中:
      "onDragStart",
      "onDragMove",
      "onDragStop",
      "onThrowFail",
      "onThrowStart",
      "onThrowDone",
    ],

    // setup函数是处于 生命周期函数 beforeCreate 和 Created 两个钩子函数之间的函数
    // 也就说在 setup函数中是无法 使用 data 和 methods 中的数据和方法的
    // setup函数是 Composition API（组合API）的入口
    // 在setup函数中定义的变量和方法最后都是需要 return 出去的 不然无法再模板中使用
    setup(props, { emit }){
      const touchState = useTouch(props, {
        onDragStart: () => emit("onDragStart"),
        onThrowStart: () => emit("onThrowStart"),
        onDragMove: (obj) => emit("onDragMove", obj),
        onDragStop: (obj) => emit("onDragStop", obj),
        onThrowDone: () => emit("onThrowDone"),
        onThrowFail: () => emit("onThrowFail"),
      });
      return { ...touchState };
    }
  };
</script>
<style>
    .card {
        position: absolute;
        overflow: hidden;
    }
    .card.boderEffect {
        border: 1px solid #ccc;
    }
    .card.shadowEffect {
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
    }
    .card.animation {
        transition: opacity 0.4s ease-out, left 0.4s ease-out, top 0.4s ease-out,
        width 0.4s ease-out, height 0.4s ease-out;
    }
</style>
