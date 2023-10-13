<template>
    <div>
        <el-button @click="addrole" type="primary" round>添加角色</el-button>
        <div class="table">
            <el-table :data="data.list" border style="width: 44%">
                <el-table-column prop="roleId" label="ID" width="180" />
                <el-table-column prop="roleName" label="角色" width="180" />
                <el-table-column prop="address" label="操作" width="182">
                    <template #default="scope">
                        <el-button type="info" plain @click="updaterole(scope.row)">修改权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog v-model="data.openlist" title="添加" width="30%">
            <span>请输入角色名称</span>
            <el-input v-model="data.rolename" autocomplete="off" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button>取消</el-button>
                    <el-button @click="addrolename" type="primary">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { getRolelist } from '../request/api'
import { onMounted, reactive } from 'vue'
import { InitData, ListInt } from '../type/role'
import { useRouter } from 'vue-router'
import { ElMessage } from "element-plus";

onMounted(() => {
    rolelist()
})

const data = reactive(new InitData())
const rolelist = async () => {
    const res = await getRolelist();
    data.list = res.data
    // console.log(data.list);
};
const addrole = () => {
    data.openlist = true
}
const addrolename = () => {
    // console.log(data.rolename);
    // console.log(data.list);
    if (data.rolename) {
        data.list.push({ roleId: data.list.length + 1, roleName: data.rolename, authority: [] })
    }
    data.openlist = false
    ElMessage({
        type: "success",
        message: '角色添加成功',
    });
}
const router = useRouter()
const updaterole = (row: ListInt) => {
    // console.log(row.authority);
    router.push({
        name: "authority",
        path: "authority",
        query: {
            id: row.roleId,
            authority: row.authority.join(',')
        }
    })
}

</script>

<style scoped>
.table {
    margin-top: 20px;
}

.el-input {
    width: 250px !important;
    margin-left: 20px !important;
}
</style>