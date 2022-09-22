import { defineStore } from "pinia";

export const nameStore = defineStore('name',{
    state:()=>{
        return{
            list:['小红','熊王','胖蛋']
        }
    }
})