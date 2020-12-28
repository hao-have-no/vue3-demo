// 滑动的具体计算逻辑及方法
// 抽取useTouch函数，接收卡片属性和回调函数等
// 响应数据就是上面的left，top这些
// 控制它们的逻辑是touchStart这些
// 组织在一起并导出供外界使用，日后还能复用在其他项目

import { onMounted, reactive, toRefs } from "vue";

//勾股定理－－获取方向值
function getDistance(x1, y1, x2, y2) {
  const _x = Math.abs(x1 - x2);
  const _y = Math.abs(y1 - y2);
  return Math.sqrt(_x * _x + _y * _y);
}

//初始化状态－响应式
const otherCardsState=reactive({
  left2:0,
  top2:0,
  width2:0,
  height2:0,

  left3:0,
  top3:0,
  width3:0,
  height3:0,

  left:0,
  top4:0,
  width4:0,
  height4:0
});


//使用具体的方法
function useTouch(props, {
  onDragStart,
  onThrowStart,
  // 分别是拖动时，拖动结束，飞卡结束，飞卡失败（回位）
  onDragMove,
  onDragStop,
  onThrowDone,
  onThrowFail,
}){
  //reactive响应式
  const cardOneState=({
    left:0,
    top:0,
    startLeft:0,
    startTop: 0,
    isDrag: false,//是否可拖动
    isThrow: false,//是否可甩出去
    needBack: false,//是否可返回
    isAnimating: false,//是否在运动中
  });

  //开始移动
  function touchStart(e) {
    if (cardOneState.isAnimating) return;
    cardOneState.isDrag = true;
    cardOneState.needBack = false;
    cardOneState.isThrow = false;
    const curTouch=e.touches[0];
    //获取开始的位置
    cardOneState.startLeft = curTouch.clientX - curTouch.left;
    cardOneState.startTop = curTouch.clientY - curTouch.top;

    onDragStart();
  }

  //移动中
  function touchMove(e){
    if (cardOneState.isAnimating) return;

    const curTouch = e.touches[0];
    
    if (
      //判断移动的模式
      props.dragDirection === 'all'||props.dragDirection === 'horizontal'
    ){
      cardOneState.left = curTouch.clientX - cardOneState.startLeft; //判断偏移位置
    }

    if (
      //垂直移动
      props.dragDirection === 'all'||props.dragDirection === "vertical"
    ){
      cardOneState.top = curTouch.clientY - cardOneState.startTop; //判断数值偏移位置
    }

     //计算拖动距离
    const distance = getDistance(0,0,cardOneState.left,cardOneState.top);

    onDragMove({
      left:cardOneState.left,
      top: cardOneState.top,
      distance:distance
    });
  }

//初始化所有的状态
  function resetAllCardDown(){
    cardOneState.left = 0;
    cardOneState.top = 0;

    otherCardsState.width2 = props.cardWidth - props.leftPad * 2;
    otherCardsState.height2 = props.cardHeight - props.topPad * 2;
    otherCardsState.left2 = props.leftPad;
    otherCardsState.top2 = props.topPad * 3;

    otherCardsState.width3 = props.cardWidth - props.leftPad * 4;
    otherCardsState.height3 = props.cardHeight - props.topPad * 4;
    otherCardsState.left3 = props.leftPad * 2;
    otherCardsState.top3 = props.topPad * 6;

    otherCardsState.width4 = props.cardWidth - props.leftPad * 6;
    otherCardsState.height4 = props.cardHeight - props.topPad * 6;
    otherCardsState.left4 = props.leftPad * 3;
    otherCardsState.top4 = props.topPad * 9;
    otherCardsState.opacity4 = 0;
  }

  //重置所有状态
  function resetAllCard() {
    resetAllCardDown();
  }

  //卡片飞出去
  function makeCardThrow(){
    cardOneState.isThrow = true;
    cardOneState.needBack = false;

    const angle = Math.atan2(cardOneState.top-0,cardOneState.left-0);
    //勾股定理计算卡片的位置
    // 计算卡片当前拖拽的坐标和起始坐标的夹角
    cardOneState.left = Math.cos(angle)*props.throwDistance;
    cardOneState.top = Math.sin(angle)*props.throwDistance;

    //第一张卡片甩出去后，后边的卡片前进一位
    otherCardsState.width2 = props.cardWidth;
    otherCardsState.height2 = props.cardHeight;
    otherCardsState.top2 = 0;
    otherCardsState.left2 = 0;

    otherCardsState.width3 = props.cardWidth - props.leftPad * 2;
    otherCardsState.height3 = props.cardHeight - props.topPad * 2;
    otherCardsState.left3 = props.leftPad;
    otherCardsState.top3 = props.topPad * 3;

    otherCardsState.width4 = props.cardWidth - props.leftPad * 4;
    otherCardsState.height4 = props.cardHeight - props.topPad * 4;
    otherCardsState.left4 = props.leftPad * 2;
    otherCardsState.top4 = props.topPad * 6;
    otherCardsState.opacity4 = 1;

    //移动中,开启交互效果
    cardOneState.isAnimating = true;

    onThrowStart();

    setTimeout(function () {
      cardOneState.isThrow = false;
      cardOneState.isAnimating = false;
      onThrowDone();
      resetAllCard();
    }, 400);
  }

  //卡片收回来
  function makeCardBack(){
    cardOneState.isThrow = false;
    cardOneState.needBack = true;

    if (cardOneState.needBack){
      cardOneState.left = 0;
      cardOneState.top = 0;
    }

    cardOneState.isAnimating = true;

    setTimeout(function(){
      onThrowFail();
      cardOneState.isAnimating = false;
      cardOneState.needBack = true;
    },600);
  }

  //移动完成
  function touchCancel(e){
    const distance = getDistance(0,0,cardOneState.left,cardOneState.top);

    cardOneState.isDrag = false; //是否还能拖动

    onDragStop({
      left:cardOneState.left,
      top: cardOneState.top,
      distance:distance
    });
    
    if (cardOneState.isAnimating)return;

    if (distance > props.throwDistance){
      //移动的距离超过设定的参数
      makeCardThrow();
    }else{
      makeCardBack();
    }
  }

  onMounted(()=>{
    resetAllCard();
  });

  return {
    ...toRefs(cardOneState),
    ...toRefs(otherCardsState),
    touchStart,
    touchMove,
    touchCancel,
  }

}

export default useTouch;
