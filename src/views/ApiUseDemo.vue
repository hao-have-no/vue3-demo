<template>
    <div style="margin-bottom: 400px">
        <h3>reactive和ref</h3>
        <div>
            <p>使用了 ref 函数包装了一个响应式的数据对象，这里表面上看上去跟 reactive</p>
            <p>好像功能一模一样啊，确实差不多，因为 ref 就是通过 reactive 包装了一个对象 ，然后是将值传给该对象中的 value 属性</p>
        </div>
        <div>
            <p>基本类型值（String 、Nmuber 、Boolean 等）或单值对象（类似像 {count: 3} 这样只有一个属性值的对象）使用 ref</p>
            <p>引用类型值（Object 、Array）使用 reactive</p>
        </div>
        <div @click="addCount">
            reactive:{{state.count}}
        </div>
        <div>
            readOnlyAge-computed:{{readOnlyAge}}
        </div>
        <div @click="addCount1" style="margin-top: 20px">
            ref:{{state1.count}}
        </div>
        <h3>toRefs和ref</h3>
        <p>ref 的值改变会更新视图；toRef 的值改变不会更新视图(不准确)</p>
        <p>ref 是对传入数据的拷贝；toRef 是对传入数据的引用</p>
        <p>如果将obj经过reactive后再toRef(reactive(obj), 'count')，
            得到响应式后再链接，视图会正常更新。
        </p>
        <div @click="addCount3">
            <p>对响应式数据的值进行 +1 操作后，视图未发生改变，原始值改变了，响应式数据对象的值也改变了，这说明 toRef 是对原数据的一个引用，会影响到原始值，但是响应式数据对象值改变后会不会更新视图</p>
            toRefs:{{state3}}
        </div>
        <div @click="addCount4">
            <p> ref 是对原数据的一个拷贝，不会影响到原始值，同时响应式数据对象值改变后会同步更新视图</p>
            ref:{{state4}}
        </div>
        <h3>toRefs</h3>
        <p> ref 是对原数据的对象的拷贝，影响到原始值，视图不会改变</p>
        <div @click="addCount5">
            {{state5.age.value}}
            {{state5.name.value}}
        </div>
        <h3>shallowReactive</h3>
        <div>
            <p>性能优化－浅层reactive,响应式数据</p>
            <p>将 obj 作为参数传递给 reactive 生成响应式数据对象时，若 obj 的层级不止一层，那么会将每一层都用 Proxy 包装一次</p>
            <div>
                <p>{{ state6.a }}</p>
                <p>{{ state6.first.b }}</p>
                <p>{{ state6.first.second.c }}</p>
                <button @click="addCount6">改变1</button>
                <button @click="addCount7">改变2</button>
            </div>
        </div>
        <h3>shallowRef</h3>
        <div>
            <p>针对对象的value进行监听,value的改变才会引发视图的刷新</p>
            <div>
                <p>{{ state7.a }}</p>
                <p>{{ state7.first.b }}</p>
                <p>{{ state7.first.second.c }}</p>
                <button @click="addCount8">改变1</button>
                <button @click="addCount9">改变2</button>
            </div>
        </div>
        <h3>toRaw</h3>
        <div>
            <p>获取响应式的引用对象并修改</p>
        </div>
        <h3>markRaw</h3>
        <div>
            将经过reactive或者ref处理为响应式的数据，处理为非响应式的
        </div>
        <h3>provide && inject</h3>
        <div>
            <p>不同于dev2,dev3需要自己引入</p>
            <p>
                provide ：向子组件以及子孙组件传递数据。<br/>
                接收两个参数，第一个参数是 key，即数据的名称；第二个参数为 value，即数据的值<br/>
                inject ：接收父组件或祖先组件传递过来的数据。<br/>
                接收一个参数 key，即父组件或祖先组件传递的数据名称
            </p>
            <p>
                provide('info', obj)
                向子组件以及子孙组件传递名为info的数据
                inject('info')
                接收上级传递过来的数据
            </p>
        </div>
        <h3>watch && watchEffect</h3>
        <div>
            <p>watch 和 watchEffect 都是用来监视某项数据变化从而执行指定的操作的</p>
            <p>
                watch( source, cb, [options] )<br/>
                参数说明：<br/>
                source：可以是表达式或函数，用于指定监听的依赖对象<br/>
                cb：依赖对象变化后执行的回调函数<br/>
                options：可参数，可以配置的属性有 immediate（立即触发回调函数）、deep（深度监听）
            </p>
            <div>
                <p>ref:{{state8}}</p>
                reactive:{{state9.count}}
            </div>
        </div>
        <h3>computed</h3>
        <div @click="addC">
            <p>computed:</p>
        </div>
        <h3>getCurrentInstance</h3>
        <div>
            <p>Vue2的任何一个组件中想要获取当前组件的实例可以通过 this 来得到</p>
            <p>ue3中我们大量的代码都在 setup 函数中运行，并且在该函数中 this 指向的是 undefined</p>
            <p>getCurrentInstance:vue可以获取当前组件实例</p>
        </div>
        <h3>ref获取ｄｏｍ结构</h3>
        <div ref="el">div元素</div>
        <h3>vue-绑定全局属性</h3>
        <div>
            <p>vue 实例上config来配置,包含Vue应用程序全局配置的对象。</p>
            <p>const app = Vue.createApp({})<br/>

                app.config = {...}</p>
            <p>例如全局错误处理机制</p>
            <p>app.config.errorHandler = (err, vm, info) => {}</p>
            <p>通过getCurrentInstance可以获取到全局属性</p>
        </div>
    </div>
</template>

<script>
  import {reactive, ref, toRef ,toRefs,shallowReactive,
    shallowRef,triggerRef,watch,getCurrentInstance,onMounted,computed} from 'vue'

  import {useStore} from 'vuex';

  export default{
    name:'apiDemo',
    setup(){
      const state = reactive({count:1});

      const state1 = ref({count:3});

      const readOnlyAge = computed(() => state.count++)

      console.log(state);
      console.log(state1);

      const addCount=()=>{
        state.count++;
      };

      const addCount1=()=>{
        state1.value.count++;
      };


      const obj = {count: 3};
      //toRef
      // 将 obj 对象中属性count的值转化为响应式数据
      const state3 = toRef(obj, 'count');
      const state4 = ref(obj.count);

      //toRefs
      //将obj对象中的所有属性都转化为响应式数据

      const addCount3=()=>{
        state3.value++;
        console.log('原始值：', obj);
        console.log('响应式数据对象：', state3);
      };

      const addCount4=()=>{
        state4.value++;
        console.log('原始值：', obj);
        console.log('响应式数据对象：', state4);
      };

      console.log(state3);

      const mes={
        name: '前端印象',
        age: 22,
        gender: 0
      };

      const state5 = toRefs(mes);

      const addCount5=()=>{
        console.log('dd');
        state5.age.value++;
        state5.name.value=`dess${state5.age.value}`;
        console.log(mes,state5);
      };

      console.log(state5);


      //shallowReactive
      const numList={
        a: 1,
        first: {
          b: 2,
          second: {
            c: 3
          }
        }
      };

      //每一层级都有proxy代理,性能不好,diff会出现重复
      // const state6 = reactive(numList);
      // console.log(state6);
      // console.log(state6.first);
      // console.log(state6.first.second);


      //shallowReactive只代理最上层
      //只有最上层的元素发生变化时，视图的更新才会引发对下层元素的视图刷新
      const state6 = shallowReactive(numList);

      const addCount6=()=>{
        state6.a = 7
      };

      const addCount7=()=>{
        state6.first.b = 8;
        state6.first.second.c = 9;
        console.log(state6);
      };


      //shallowRef
      //shallowRef 监听 .value 的值的变化来更新视图的

      const state7= shallowRef(numList);

      const addCount8=()=>{
        // 直接将state.value重新赋值
        state7.value = {
          a: 7,
          first: {
            b: 8,
            second: {
              c: 9
            }
          }
        };
      };

      const addCount9=()=>{
        //这种方式eslint直接报错
        // state7.first.b = 8;
        // state7.first.second.c = 9;
        state7.value.first.b = 8;


        // 修改值后立即驱动视图更新
        triggerRef(state7)
        // triggerRef ，调用它就可以立马更新视图，其接收一个参数 state ，即需要更新的 ref 对象
        console.log(state7);
      };

      //toRaw 方法是用于获取 ref 或 reactive 对象的原始数据的
      //通过reactive响应式的对象，如果直接修改原对象，值变化但是视图不会更新
      //适用于想要修改值但是不想视图更新的情况

      // watch && watchEffect
      // watch

      const state8 = ref(0)
      const state9= reactive({count:0});

      watch(state8, (newValue, oldValue) => {
        console.log(`原值为state8-${oldValue}`)
        console.log(`新值为state8-${newValue}`)
      });

      watch(state9.count, (newValue, oldValue) => {
        console.log(`原值为${state9-oldValue}`)
        console.log(`新值为${state9-newValue}`)
      });



      // 1秒后将state值+1
      setTimeout(() => {
        state8.value++;
        state9.count++;
      }, 1000);

      const instance = getCurrentInstance();
      console.log(instance);

      //vuex-store使用,通过useStore

      // 获取 vuex 实例
      const store = useStore()

      console.log(store.state)


      //在Vue2中，我们获取元素都是通过给元素一个 ref 属性，然后通过 this.$refs.xx 来访问的，
      //vue3怎么获取元素
      // 创建一个DOM引用，名称必须与元素的ref属性名相同
      const el = ref(null);

      // 在挂载后才能通过 el 获取到目标元素
      onMounted(() => {
        el.value.innerHTML = '内容被修改'
      });


      return {state,state1,addCount,addCount1,state3,addCount3,
        state4,addCount4,state5,addCount5,state6,addCount6,addCount7,
        state7,addCount8,addCount9,state8,state9,el,readOnlyAge
      };
    }

  }
</script>

<style scoped>

</style>
