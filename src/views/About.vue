<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>composition 组合避免横跳，便于维护</h2>
    <input type="text" v-model="val" @keyup.enter="addTodo">
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{todo.title}}</li>
    </ul>
    <div>
      <h1 @click="add">点击进行累加，LSP－－{{count}}－－号 double is  {{double}}</h1>
    </div>
    <div>
      <h1>X为－－{{x}}－－号 double is  {{doubleX}}</h1>
    </div>
  </div>
</template>

<script>
// import Counter from '../components/counter/counter.ts';
// import Postion from '../components/counter/position.ts';
//vue2下的option式的声明，通过mixins来进行代码抽离
// export default {
//   mixins:[Counter,Postion], //抽离mixins.分拆逻辑代码(会出现命名级冲突)
//   data(){
//     return{
//       val:'',
//       todos:[
//         {id:0, title:'吃饭', done:false},
//         {id:1, title:'睡觉', done:false},
//         {id:2, title:'lsp', done:false},
//       ]
//     }
//   },
//   methods:{
//     addTodo(){
//       this.todos.push({
//         id:this.todos.length,
//         title:this.val,
//         done:false
//       });
//       this.val = ''
//     },
//   }
// }


//composition  通过组合的方式，把零散在各个data，methods的代码，重新组合
import {reactive, ref, toRefs} from 'vue'
import useCounter from "../components/counter/counter";
import usePosition from "../components/counter/position";
export default{
  setup(){
    //下面这部分的todo也可以抽象出一个组件
    const val = ref(''),todos =reactive([
        {id:0, title:'吃饭', done:false},
        {id:1, title:'睡觉', done:false},
        {id:2, title:'lsp', done:false},
      ]);

    const {count,double,add} = useCounter();
    const {x,double:doubleX} = usePosition();

    function addTodo(){
      todos.push({
        id:todos.length,
        title:val,
        done:false
      });
      val.value = ''; //ref响应式的独特赋值
    }

    return {
      val,todos,addTodo,
      count,double,add,
      x, doubleX
    }
  }
}
</script>
