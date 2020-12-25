<template>
  <el-container id="device_manage" v-loading="loading">
    <el-header class="device_search">
      <el-row>
        <el-col :span="24">
          <div class="grid-content">
            <el-row :gutter="20">
              <el-col :span="10">
                <div>
                  <el-input
                    class="search_input"
                    placeholder="请输入设备信息"
                    v-model="search.search"
                    clearable
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  class="spacing20"
                  type="primary"
                  @click="search_block_query"
                  icon="el-icon-search"
                  round
                >设备搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <!--设备列表-->
      <el-table :data="table_data" style="width: 100%">
        <el-table-column label="设备名称" prop="chipId"></el-table-column>
        <el-table-column label="钱包地址" prop="deviceWallet" min-width="150"></el-table-column>
        <el-table-column label="钱包余额" prop="deviceMoney"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="round_button" @click="history_transfer(scope.row)" title="查看历史转账记录">
              <svg-icon
                class="bld_icon"
                icon-class="history_transfer"
                class-name="card-panel-icon"
              />
            </el-button>
          </template>
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
    </el-main>
  </el-container>
</template>

<script>
import {
  search_block,
  search_block_hash,
  block_hash_info,
  block_info
} from "@/api/block";
import { date_format, block_dp } from "@/utils/functions";

export default {
  name: "block",
  data() {
    return {
      search: {
        pageNum: 1,
        pageSize: 10,
        search: "",
        total: 0
      },
      table_data: [],
      isCustomer: false,
      loading: false,
      direction: "rtl",
      block_hash_drawer: false,
      chipId: ""
    };
  },
  methods: {
    search_block() {
      this.loading = true;
      search_block(this.search)
        .then(res => {
          if (res.success) {
            this.table_data = res.data;
            this.search.total = res.total;
          } else {
            this.$message({
              type: "info",
              message: res.message
            });
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    search_block_query() {
      this.search.pageNum = 1;
      this.search_block();
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.search_block();
    },
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.search_block();
    },
    history_transfer(e) {
			console.log(e)
      this.$router.push({
        path: "/transferRecords",
        query: {
          id: e.chipId
        }
      });
    }
  },
  created() {
    this.search_block();
  }
};
</script>

<style scoped>
.assets_show_list {
  margin-bottom: 1rem;
}
</style>
