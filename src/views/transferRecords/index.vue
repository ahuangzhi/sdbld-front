<template>
  <div class="transferDetails">
    <div>
      <div class="title">
        记录列表
        <span @click="goBack">返回</span>
      </div>
      <el-table :data="show_table_data" style="width: 100%">
        <el-table-column label="转账时间" prop="addTime"></el-table-column>
        <el-table-column label="出款地址" prop="fromWallet" min-width="125"></el-table-column>
        <el-table-column label="转账金额" prop="money"></el-table-column>
        <el-table-column label="txHash" min-width="125">
          <el-link
            :underline="false"
            slot-scope="scope"
            @click="show_block_info(scope.row.hash)"
          >{{ scope.row.hash }}</el-link>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search.pageNum"
        :page-sizes="[10,20,50,100,200]"
        :page-size="search.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="search.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { search_block_hash } from "@/api/block";
let interval;
export default {
  name: "transferDetails",
  data() {
    return {
      search: {
        pageNum: 1,
        pageSize: 10,
        search: "",
        total: 0
      },
      show_table_data: [],
      chipId: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    history_transfer() {
      search_block_hash(
        this.chipId,
        this.search.pageNum,
        this.search.pageSize
      ).then(res => {
        if (res.success) {
          this.show_table_data = res.data;
          this.search.total = res.total;
        } else {
          this.$message({
            type: "info",
            message: res.message
          });
        }
      });
    },
    show_block_info(hash) {
      this.$router.push({
        path: "/transferDetails",
        query: {
          id: hash
        }
      });
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.history_transfer();
    },
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.history_transfer();
    }
  },
  mounted() {
    this.chipId = this.$route.query.id;
    this.history_transfer();
  }
};
</script>
<style lang="scss" scoped>
.transferDetails {
  padding: 20px;
  .title {
    height: 48px;
    line-height: 48px;
    font-size: 24px;
    text-align: left;
    position: relative;
    span {
      cursor: pointer;
      position: absolute;
      top: 12px;
      right: 20px;
      display: inline-block;
      height: 24px;
      line-height: 24px;
      text-align: center;
      width: 64px;
      font-size: 16px;
      color: #ffffff;
      background: #304156;
      border: 1px solid #304156;
      border-radius: 12px;
    }
  }
}
</style>