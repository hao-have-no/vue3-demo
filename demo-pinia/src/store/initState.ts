import { defineStore } from 'pinia';
import {nameStore} from './name'

export const mainStore = defineStore('main',{
    state:()=>{
        return {
            hello:'first hello world',
            count:0,
            phone:13121996266
        }
    },
    getters:{
        phoneHidden(state){
            return state.phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')
        }
    },
    actions:{
        changeState(){
            this.count = this.count+4
        },
        getList(){
            console.log(nameStore().list);
        }
    }
})