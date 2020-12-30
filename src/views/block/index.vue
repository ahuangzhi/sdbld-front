<template>
<el-container id="device_manage" v-loading="loading">
    <el-header class="device_search">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <div>
                                <el-input class="search_input" placeholder="查找日志" v-model="search.search" clearable></el-input>
                            </div>
                        </el-col>
                        <el-col :span="1.5">
                            <el-button class="spacing20" type="primary" @click="search_block_query" icon="el-icon-search" round>查找日志</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-main>
        <!--设备列表-->
        <el-table :data="table_data" style="width: 100%" @sort-change='sortthiscolumn'>
            <el-table-column label="时间戳" prop="createdTime" :formatter="formatDate" sortable="custom"></el-table-column>
            <el-table-column label="实体类型" prop="entityId.entityType" :formatter="formatEntityType"></el-table-column>
            <el-table-column label="实体名称" prop="entityName"></el-table-column>
            <el-table-column label="用户" prop="userName"></el-table-column>
            <el-table-column label="类型" prop="actionType"></el-table-column>
            <el-table-column label="状态" prop="actionStatus" min-width="150" :formatter="formatActionStatus"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button class="round_button" @click="history_transfer(scope.row)" title="详情">
                        <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                            <path d="M828.5 886.3H238.4c-9.9 0-18-8.1-18-18v-4c0-9.9 8.1-18 18-18h590.1c9.9 0 18 8.1 18 18v4c0 9.9-8.1 18-18 18zM828.5 684.6H238.4c-9.9 0-18-8.1-18-18v-4c0-9.9 8.1-18 18-18h590.1c9.9 0 18 8.1 18 18v4c0 9.9-8.1 18-18 18zM409 449.5H230.2c-17.6 0-32-14.4-32-32V238.7c0-17.6 14.4-32 32-32H409c17.6 0 32 14.4 32 32v178.8c0 17.6-14.4 32-32 32z m-170.8-40H401V246.7H238.2v162.8zM822.4 437.5H552.9c-11 0-20-9-20-20s9-20 20-20h269.5c11 0 20 9 20 20s-9 20-20 20zM822.4 269.5H552.9c-11 0-20-9-20-20s9-20 20-20h269.5c11 0 20 9 20 20s-9 20-20 20z" fill="#888888"></path>
                            <path d="M884.4 1024H182.5c-46.3 0-83.9-37.7-83.9-83.9V91.9C98.6 45.7 136.3 8 182.5 8h701.9c46.3 0 83.9 37.7 83.9 83.9V940c0 46.3-37.7 84-83.9 84zM182.5 48c-24.2 0-43.9 19.7-43.9 43.9V940c0 24.2 19.7 43.9 43.9 43.9h701.9c24.2 0 43.9-19.7 43.9-43.9V91.9c0-24.2-19.7-43.9-43.9-43.9H182.5z" fill="#888888"></path>
                        </svg>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.page" :page-sizes="[10,20,50,100,200]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="search.total"></el-pagination>

    </el-main>


    <!--hash具体信息展示-->
    <el-drawer size="65%" title="信息展示" custom-class="drawer_class" :direction="direction" :visible.sync="block_info_drawer">
        <div class="assets_show_list" v-loading="block_loading">
            <el-table :data="block_info_table" style="width: 100%">
                <el-table-column prop="name"></el-table-column>
                <el-table-column prop="v" min-width="160"></el-table-column>
            </el-table>
        </div>
    </el-drawer>
</el-container>
</template>

<script>
import {
    search_block,
    hzGetLog,
    search_block_hash,
    block_hash_info,
    block_info
} from "@/api/block"
import {
    date_format,
    block_dp
} from "@/utils/functions";

export default {
    name: "block",
    data() {
        return {
            search: {
                page: 1,
                pageSize: 10,
                search: '',
                //对应的是结束时间
                endTime:'',
                //对应的是开始时间
                startTime:'',
                sortOrder:'DESC',
                sortProperty:'createdTime',
                total: 0,
            },
            table_data: [],
            show_table_data: [],
            isCustomer: false,
            loading: false,
            direction: 'rtl',
            block_hash_drawer: false,
            block_transfer_drawer: false,
            block_info_drawer: false,
            block_loading: false,
            block_info_table: [],
            chipId: ''
        }
    },
    methods: {
        hzGetLog() {
            this.loading = true;
            let endTime1 = new Date().getTime(); 
            let startTime1 = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getTime();
            this.search.endTime = endTime1;
            this.search.startTime = startTime1;
            hzGetLog(this.search).then(res => {
                if (res.success) {
                    this.table_data = res.data.data;
                    this.search.total = res.data.totalElements;
                } else {
                    this.$message({
                        type: 'info',
                        message: res.message
                    });
                }
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            })
        },
        sortthiscolumn (column) {   
           //自定义排序      column参数为一个对象包含需要排序的属性和排序方法
          if(column.prop == "createdTime" && column.order == "ascending"){
              this.search.sortOrder = "ASC"
              this.search.page = 1;
                this.hzGetLog();
            }else if(column.prop == "createdTime" && column.order == "descending"){
                    this.search.sortOrder = "DESC"
              this.search.page = 1;
                    this.hzGetLog();
          }
        },
        search_block_query() {
            this.search.page = 1;
            this.hzGetLog();
        },
        handleSizeChange(val) {
            this.search.pageSize = val;
            this.hzGetLog();
        },
        handleCurrentChange(val) {
            this.search.page = val;
            this.hzGetLog();
        },
        formatDate(row, column) {
              let date = new Date(row.createdTime);
              let Y = date.getFullYear() + '-';
              let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
              let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
              let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
              let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
              let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
              return Y + M + D + h + m + s;
          },
          formatEntityType(row, column){
              switch(row.entityId.entityType){
                case 'USER':
                  return '用户'
                case 'ASSET':
                  return '资产'
                case 'CUSTOMER':
                  return '客户'
                case 'DEVICE':
                  return '设备'
                default:
                  return '其他'
	            }
          },
          formatActionStatus(row, column){
            switch(row.actionStatus){
                case 'SUCCESS':
                  return '成功'
                case 'FAILURE':
                  return '失败'
                default:
                  return '其他'
	            }
          },
          history_transfer(row, column){
            let data = JSON.stringify(row.actionData);
            this.$alert(data, '日志详情', {
              confirmButtonText: '关闭',
            });
            
          },
    },
    created() {
        this.hzGetLog();
    }
}
</script>

<style scoped>
.assets_show_list {
    margin-bottom: 1rem;
}
</style>
