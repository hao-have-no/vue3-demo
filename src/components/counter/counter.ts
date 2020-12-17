/*
 * @Author: fenghao
 * @Date: 20-12-17 下午2:27
 * @LastEditors: fenghao
 * @LastEditTime: 20-12-17 下午2:27
 * @Description: 
 */

// export  default {
//   data(){
//     return {
//       count:1
//     }
//   },
//   computed:{
//     double(){
//       return this.count*2;
//     }
//   },
//
//   methods:{
//     add(){
//       this.count++;
//     }
//   }
// }

//vue3改造
import {ref,computed} from 'vue';
export default function useCounter(){
  const count = ref(1);
  function add(){
    count.value++;
  }
  const double = computed(()=>count.value*2);

  return {count,double,add}
}
