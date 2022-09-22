<template>
    <div>
        <button @click="handleClick">添加</button>
        <div>
            <button @click="handleClickPatch">dispatch</button>
        </div>
        <div>
            <button @click="handlePatchFunc">easy-rule</button>
        </div>
        <div>
            <button @click="handeActions">different-rule</button>
        </div>
        <div>
            <button @click="handelPhone">update-phone</button>
        </div>
        <div>
            <button @click="getList">打印</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { mainStore } from '../store/initState'
    const store = mainStore();

    const getList = () => {
        store.getList();
    };

    //1. 直接修改state
    const handleClick=()=>{
        store.count++
    }

    // 2. 通过dispatch
    const handleClickPatch=()=>{
        store.$patch({
            count: store.count+2
        })
    }

    const handelPhone=()=>{
        store.phone = 15139333999;
    }

    // 3. 通过函数，可以写入简单的规则逻辑
    const handlePatchFunc=()=>{
        store.count = store.count+3
    }

    // 4. 在store通过aciton 操作数据 适合复杂规则
    const handeActions=()=>{
        store.changeState();
    }
</script>

<style>

</style>