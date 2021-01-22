<template>
    <!--借助position和z-index叠加卡片-->
    <!--探探交友-->
    <div style="height:300px;">
        <div
                v-if="actionName != ''"
                style="
        color: #fff;
        background: rgba(0, 0, 0, 0.3);
        padding: 10px 20px;
        font-size: 24px;
        position: absolute;
        z-index: 999;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      "
        >
            {{ actionName }}
        </div>
        <!--卡片的逻辑可以提出组件-->
        <!--这里的<template #firstCard>分发内容进去，完整写法应该是<template v-slot:firstCard>-->
     <fly-card
        @onDragMove="onCardDragMove"
        @onDragStop="onCardDragStop"
        @onThrowDone="onCardThrowDone"
        :card-width="200"
        :card-height="240"
        :throwTriggerDistance ="100"
        drag-direction="horizontal"
        :has-shadow="true"
     >
         <template #firstCard style="width:100%;height:100%;">
             <div v-if="cards[0]" class="tantanCard">
                 <img :src="cards[0].img" style="width:100%;height:100%;" mode="aspectFill">
             </div>
         </template>
         <template #secondCard style="width: 100%; height: 100%">
             <div v-if="cards[1]" class="tantanCard">
                 <img
                         :src="cards[1].img"
                         style="width: 100%; height: 100%"
                         mode="aspectFill"
                 />
             </div>
         </template>
         <template #thirdCard style="width: 100%; height: 100%">
             <div v-if="cards[2]" class="tantanCard">
                 <img
                         :src="cards[2].img"
                         style="width: 100%; height: 100%"
                         mode="aspectFill"
                 />
             </div>
         </template>
     </fly-card>
    </div>
</template>

<script>

  import img1 from "../assets/image/tantan/1.jpg"
  import img2 from "../assets/image/tantan/2.jpg"
  import img3 from "../assets/image/tantan/3.jpg"
  import img4 from "../assets/image/tantan/4.jpg"
  import img5 from "../assets/image/tantan/5.jpg"
  import FlyCard from "../components/FlyCard/FlyCard";

  export default {
    name: "QuesCard",
    data(){
      return{
        actionName: "",
        cards: [
          {
            img: img1,
          },
          {
            img: img2,
          },
          {
            img: img3,
          },
          {
            img: img4,
          },
          {
            img: img5,
          },
        ],
      }
    },
    components: { FlyCard  },
    methods:{
      onCardDragMove(obj){
        if (obj.left < -10){
          this.actionName = "不喜欢";
        }else if (obj.left > 10) {
          this.actionName = "喜欢";
        }else{
          this.actionName = "";
        }
      },
      onCardDragStop(obj){
        this.actionName = "";
      },
      onCardThrowDone(obj) {
        const temp = this.cards[0];
        this.cards.push(temp);
        this.cards.splice(0, 1);
      },
    }
  };
</script>

<style scoped>
    div {
        box-sizing: border-box;
    }
    .tantanCard {
        width: 100%;
        height: 100%;
    }
</style>
