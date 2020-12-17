<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    {{count}}
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  data(){
    const count = ref(0);
    return {count};
  },
  components: {
    HelloWorld
  },
  methods:{

  }
});

</script>
