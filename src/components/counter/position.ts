/*
 * @Author: fenghao
 * @Date: 20-12-17 下午2:46
 * @LastEditors: fenghao
 * @LastEditTime: 20-12-17 下午2:46
 * @Description: 
 */

// export default {
//   data(){
//     return {
//       x:0
//     }
//   },
//
//   methods:{
//       update(e){
//         this.x=e.pageX;
//       }
//   },
//
//   computed: {
//       double(): number {
//         return this.x*2
//       }
//   },
//
//   mounted(){
//     window.addEventListener('mousemove', this.update)
//   },
//   destroyed(){
//     window.removeEventListener('mousemove', this.update)
//   }
// }


//vue3 composition改造
import {ref, onMounted, onUnmounted, computed} from 'vue'

export default function usePosition(){
  const x = ref(0)
  function update(e){
    x.value = e.pageX
  }
  const double = computed(()=>x.value*2)
  onMounted(()=>{
    window.addEventListener('mousemove', update)
  })
  onUnmounted(()=>{
    window.removeEventListener('mousemove', update)
  })
  return {x, double}

}
