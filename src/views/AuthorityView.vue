<template>
    <div>
        <el-tree show-checkbox :data="data.list" node-key="roleId" :check-strictly="true"
            :default-checked-keys="data.authority" :props="{
                children: 'roleList',
                label: 'name'
            }" />
        <el-button type="primary" round>确认修改</el-button>
    </div>
</template>

<script setup lang="ts">
import { getAuthorityList } from '../request/api'
import { onMounted, reactive } from 'vue'
import { InitData } from '../type/authordity'
import { useRouter } from 'vue-router'
onMounted(() => {
    getauthority()
})

const router = useRouter()
//定义变量接受路由传过来的参数
console.log(router.currentRoute.value.query.id);
const id: any = router.currentRoute.value.query.id
const authority: any = router.currentRoute.value.query.authority
const arr = authority.split(',')
const data = reactive(new InitData(id, arr))

console.log(arr);
const getauthority = async () => {
    const res = await getAuthorityList()
    data.list = res.data
    console.log(data.list);
}

</script>
<style scoped></style>