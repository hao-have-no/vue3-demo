<template>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>
            <el-container>
                <el-aside width="250px" v-if="menu.length">
                    <el-menu :default-openeds="[menu[0]['id']]">
                        <el-submenu :index="item.id" v-for="item in menu" :key="item.id">
                            <template v-slot:title><i class="el-icon-message"></i>{{item.name}}{{item.id}}</template>
                            <el-menu-item-group v-if="item.children.length">
                                <el-menu-item @click="goPage(btn.type)" v-for="btn in item.children" :index="btn.id" :key="btn.id">{{btn.name}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
</template>

<script lang="ts">
  import {ElContainer,ElHeader} from "element3";
  import { useRoute,useRouter } from "vue-router";
  export default {
    name: "layout",
    components: { ElContainer,ElHeader },

    setup(){
      const route = useRoute();
      const router = useRouter();

      const goPage=((type:any)=>{
        router.push({name:type})
      });

      return {goPage}
    },

    data(){
      return{
        menu:[
          {id:'1',name:'正文',children:[
              {
                id:'1-1',name:'正文1',type:'About',children:[]
              },{
                id:'1-2',name:'正文2',type:'Home',children:[]
              }
            ]},
          {id:'2',name:'实验',children:[
              {
                id:'2-1',name:'探探飞卡',type:'TanCard',children:[]
              },{
                id:'2-2',name:'知乎侧飞',type:'zhiCard',children:[]
              }, {
                id:'2-3',name:'vue3飞卡',type:'flexCard',children:[]
              }
            ]}
        ]
      }
    },
  };
</script>

<style scoped>

</style>
