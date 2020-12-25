<!-- 价格展示 -->
<template>
  <div class="PriceCards">
    <div class="title">
      {{ titleMsg }}
      <span @click="check">编辑>></span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="stage" label="阶段" width="180"> </el-table-column>
      <el-table-column prop="time" label="时间" width="180"> </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  searchTableData,
  deleteOperation,
  selectBasicsEq1uipmentList,
  insertOperation,
  updateOperation,
} from "../basics_sectional_tariff";
export default {
  name: "PriceCards",
  props: {
    titleMsg: {
      type: String,
    },
  },
  data() {
    return {
      tableData: [
        {
          stage: "高峰",
          time: "19:00-22:00",
          price: "5元",
        },
        {
          stage: "高峰",
          time: "19:00-22:00",
          price: "5元",
        },
        {
          stage: "高峰",
          time: "19:00-22:00",
          price: "5元",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    check() {
      this.$emit("isStatus");
    },
  },
};
</script>

<style lang="scss" scoped>
.PriceCards {
  height: 370px;
  margin: 0 20px;
  .title {
    height: 64px;
    line-height: 64px;
    font-size: 18px;
    font-weight: bold;
    position: relative;
    vertical-align: middle;
    span {
      position: absolute;
      right: 0;
      font-size: 14px;
      color: #409eff;
      font-family: "微软雅黑";
      cursor: pointer;
    }
  }
}
</style>
