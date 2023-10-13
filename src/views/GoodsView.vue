<template>
  <div class="headertext">
    <el-row :gutter="20">
      <el-col class="text" :span="2"><span>商品名称</span></el-col>
      <el-col :span="6">
        <el-input
          placeholder="请输入关键字"
          class="input-with-select"
          v-model="searchroot"
        >
          <template #append>
            <el-button />
            <el-icon><Edit /> </el-icon>
            <i class="iconfont icon-sousuo"></i>
          </template>
        </el-input>
      </el-col>
      <el-col :span="2" class="text"><span>商品ID</span></el-col>
      <el-col :span="6">
        <el-input placeholder="请输入关键字" class="input-with-select">
          <template #append>
            <el-button />
            <i class="iconfont icon-danlieliebiao1"></i>
          </template>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" @click="Search">搜索</el-button>
      </el-col>
    </el-row>
  </div>
  <!-- 表格区域 -->
  <div class="table">
    <el-table :data="dataList.comlist" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="商品名称" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>
  </div>
  <div class="bottom">
    <el-pagination
      @current-change="currentChange"
      @size-change="sizeChange"
      background
      layout="prev, pager, next"
      :total="data.selectData.count * 2"
    />
  </div>
</template>

<script setup lang="ts">
import { goods } from "../request/api";
import { reactive, onMounted, computed, ref, watch } from "vue";
import { InitData, ListInt } from "../type/goods";

//定义一个默认数据
const data = reactive(new InitData());
const getGoods = async () => {
  const res = await goods();
  data.list = res.data;
  data.selectData.count = res.data.length;
};
onMounted(() => {
  getGoods();
});
const dataList = reactive({
  comlist: computed(() => {
    return data.list.slice(
      (data.selectData.page - 1) * data.selectData.pagesize,
      data.selectData.page * data.selectData.pagesize
    );
  }),
});
//分页功能的实现
const currentChange = (page: number) => {
  data.selectData.page = page;
};
const sizeChange = (pagesize: number) => {
  data.selectData.pagesize = pagesize;
};
//搜索功能
const searchroot = ref();
const Search = () => {
  // console.log(searchroot.value);
  let arr: ListInt[] = []; //定义数组，用来接受查询过后要展示的数据
  if (searchroot.value) {
    arr = data.list.filter((value) => {
      return value.title.indexOf(searchroot.value) !== -1;
    });
  } else {
    arr = data.list;
  }
  data.list = arr;
  // data.selectData.count = arr.length
};
//监听输入框的变换
watch(searchroot, (value) => {
  if (value == "") {
    getGoods();
  }
});
</script>

<style scoped>
.headertext {
  .text {
    display: inline-block;
    margin-top: 2px;
    margin-bottom: 30px;
  }
}
.bottom {
  margin-top: 20px;
}
</style>
