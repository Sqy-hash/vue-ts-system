<template>
  <div>
    <el-row :model="data.selectData">
      <el-col class="text" :span="1"><span>姓名</span></el-col>
      <el-col :span="6">
        <el-input v-model="data.selectData.nickName" placeholder="请输入关键字" />
      </el-col>
      <el-col class="text" :span="1"><span>角色</span></el-col>
      <el-col :span="8">
        <el-select v-model="data.selectData.role" placeholder="Select" style="width: 300px">
          <el-option label="全部" :value="0" />
          <el-option v-for="item in data.roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
        </el-select>
      </el-col>
      <el-col :span="1" class="bottom">
        <el-button type="primary" @click="select">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="data.list" class="table" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="313" />
      <el-table-column prop="nickName" label="姓名" width="313" />
      <el-table-column prop="role" label="角色" width="313">
        <!-- 这里使用作用域插槽 scope接受prop的值-->
        <template #default="scope">
          <el-button v-for="item in scope.row.role" :key="item.role" size="small" type="info" round>{{ item.roleName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template #default="scope">
          <el-button @click="dialogFormVisible(scope.row)" round type="primary">
            编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog v-model="data.isShow" title="编辑信息">
      <el-form :model="data.active">
        <el-form-item label="姓名" label-width="50px">
          <el-input autocomplete="off" v-model="data.active.nickName" />
        </el-form-item>
        <el-form-item label="角色" label-width="50px" v-model="data.active.role">
          <el-select placeholder="请选择角色" style="width: 300px" v-model="data.active.role" multiple>
            <el-option v-for="item in data.roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button>取消</el-button>
          <el-button @click="Updata" type="primary"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getuserlist, getRolelist } from "../request/api";
import { onMounted, reactive, watch } from "vue";
import { InitData, ListInt } from "../type/user";

onMounted(() => {
  userlist();
  rolelist();
  select();
});
const data = reactive(new InitData());
const userlist = async () => {
  const res = await getuserlist();
  data.list = res.data;
};
const rolelist = async () => {
  const res = await getRolelist();
  data.roleList = res.data;
};
//实现查询功能
const select = () => {
  // console.log(data.selectData.nickName);
  // console.log(data.selectData.role);
  let arr: ListInt[] = []; //用来接受用户信息的列表
  if (data.selectData.nickName || data.selectData.role) {
    if (data.selectData.nickName) {
      arr = data.list.filter((value) => {
        return value.nickName.indexOf(data.selectData.nickName) !== -1;
      });
    }
    if (data.selectData.role) {
      arr = (data.selectData.nickName ? arr : data.list).filter((value) => {
        //将过滤出来数组赋值给arr
        return value.role.find((item) => item.role === data.selectData.role);
      });
    }
  } else {
    arr = data.list;
  }
  data.list = arr;
};
//进行监听输入框的变化
watch([() => data.selectData.nickName, () => data.selectData.role], () => {
  if (data.selectData.nickName == "" || data.selectData.role == 0) {
    userlist();
  }
});
// 对话框逻辑编写

const dialogFormVisible = (row: ListInt) => {
  // console.log(row);
  data.active = {
    //选中的对象
    id: row.id,
    nickName: row.nickName,
    userName: row.userName,
    role: row.role.map((value: any) => value.role || value.roleId),
  };
  data.isShow = true;
};
const Updata = () => {
  // console.log(data.active.role);
  //通过find找到id与之对应的数据，并进行赋值
  let obj: any = data.list.find((value) => value.id == data.active.id);
  obj.nickName = data.active.nickName;

  // obj.roleName = data.active.role
  obj.role = data.roleList.filter((value) => data.active.role.indexOf(value.roleId) !== -1);
  console.log(obj.role);
  //拿到数据后进行渲染
  data.list.forEach((item, i) => {
    if (item.id == obj.id) {
      data.list[i] = obj
    }
  })
  data.isShow = false
};
</script>

<style scoped>
.text {
  margin: 5px -8px 3px 34px;
}

.bottom {
  margin-left: 30px;
}

.table {
  margin-top: 20px;
}
</style>
