<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import CountButton from './components/countButton.vue'
import Snake from './components/snake.vue'
import { mainStore } from './store/initState'
import { storeToRefs } from 'pinia'
const store = mainStore();
// store 结构赋值 需要重新建立响应式 
const {hello,count,phoneHidden} = storeToRefs(store);

</script>

<template>
  <div>
    <snake></snake>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <div>firstStore:----->{{store.hello}}</div>
    <div>firstCount:----->{{store.count}}</div>
    <div>phone:----->{{store.phone}}</div>
    <hr/>
    <div>Store:----->{{hello}}</div>
    <div>Count:----->{{count}}</div>
    <div>phone:----->{{phoneHidden}}</div>
    <count-button></count-button>
    <HelloWorld msg="Vite + Vue" />
  </div>
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
