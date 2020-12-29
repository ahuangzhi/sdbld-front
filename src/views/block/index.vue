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
        <el-table :data="table_data" style="width: 100%">
            <el-table-column label="时间戳" prop="createdTime" :formatter="formatDate"></el-table-column>
            <el-table-column label="实体类型" prop="entityId.entityType" :formatter="formatEntityType"></el-table-column>
            <el-table-column label="实体名称" prop="entityName"></el-table-column>
            <el-table-column label="用户" prop="userName"></el-table-column>
            <el-table-column label="类型" prop="actionType"></el-table-column>
            <el-table-column label="状态" prop="actionStatus" min-width="150" :formatter="formatActionStatus"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button class="round_button" @click="history_transfer(scope.row)" title="详情">
                        <svg-icon class="bld_icon" icon-class="history_transfer" class-name="card-panel-icon" />
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10,20,50,100,200]" :page-size="search.limit" layout="total, sizes, prev, pager, next, jumper" :total="search.total"></el-pagination>

    </el-main>

    <!--历史转账记录-->
    <el-drawer size="70%" title="转账记录列表" custom-class="drawer_class" :direction="direction" :visible.sync="block_transfer_drawer">
        <div class="assets_show_list">
            <el-table :data="show_table_data" style="width: 100%">
                <el-table-column label="转账时间" prop="addTime"></el-table-column>
                <el-table-column label="出款地址" prop="fromWallet" min-width="125"></el-table-column>
                <el-table-column label="转账金额" prop="money"></el-table-column>
                <el-table-column label="txHash" min-width="125">
                    <el-link :underline="false" slot-scope="scope" @click="show_block_info(scope.row.hash)">{{ scope.row.hash }}</el-link>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="search2.pageNum" :page-sizes="[10,20,50,100,200]" :page-size="search2.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="search2.total"></el-pagination>
        </div>
    </el-drawer>

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
                pageNum: 1,
                limit: 10,
                search: '',
                //对应的是结束时间
                textOffset:'1609225430185',
                //对应的是开始时间
                idOffset:'1609139030185',
                total: 0,
            },
            search2: {
                pageNum: 1,
                pageSize: 10,
                search: '',
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
            hzGetLog(this.search).then(res => {
                if (res.success) {
                    // let time = parseInt(data.createdTime, 16);
                    // let date = date_format(time * 1000);
                    // console.log(date);
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
        search_block_query() {
            this.search.pageNum = 1;
            this.hzGetLog();
        },
        history_transfer(row) {
            this.chipId = row.chipId;
            search_block_hash(row.chipId, this.search2.pageNum, this.search2.pageSize).then(res => {
                if (res.success) {
                    this.show_table_data = res.data
                    this.search2.total = res.total;
                    this.block_transfer_drawer = true;
                } else {
                    this.$message({
                        type: 'info',
                        message: res.message
                    });
                }
            })
        },
        show_block_info(hash) {
            this.block_info_drawer = true;
            this.block_loading = true;
            block_hash_info(hash).then(res => {
                console.log(res)
                if (res.success) {
                    let data = res.data.result;
                    let blockNum = parseInt(data.blockNumber, 16);
                    let time = parseInt(data.timestamp, 16);
                    let date = date_format(time * 1000);
                    let number = parseInt(data.gas, 16);
                    let dpUsed = number + "m/s";
                    let nonce = parseInt(data.nonce, 16);
                    let gasPrice = parseInt(data.gasPrice, 16);
                    let allUsed = number * gasPrice;
                    let newBlockNum = parseInt(data.newBlockNum.substring(2), 16);

                    var resultStr = [];
                    let s = data.input.substring(2);
                    let l = s.length;
                    for (var i = 0; i < l; i += 2) {
                        let curCharCode = parseInt(s.substr(i, 2), 16);
                        resultStr.push(String.fromCharCode(curCharCode));
                    }
                    let content = resultStr.join("");
                    this.block_info_table = [{
                            "name": "hash",
                            "v": res.data.result.hash
                        },
                        {
                            "name": "出款地址",
                            "v": res.data.result.from
                        }, {
                            "name": "收款地址",
                            "v": res.data.result.to
                        },
                        {
                            "name": "区块hash",
                            "v": res.data.result.blockHash
                        }, {
                            "name": "交易时间",
                            "v": date
                        },
                        {
                            "name": "交易区块",
                            "v": blockNum
                        }, {
                            "name": "DP使用",
                            "v": dpUsed
                        },
                        {
                            "name": "Gas单价",
                            "v": block_dp(gasPrice)
                        }, {
                            "name": "交易确认",
                            "v": newBlockNum - blockNum
                        },
                        {
                            "name": "出资地址历史交易次数",
                            "v": nonce
                        }, {
                            "name": "交易总消耗",
                            "v": block_dp(allUsed)
                        },
                        {
                            "name": "数据",
                            "v": res.data.result.input
                        }, {
                            "name": "数据翻译",
                            "v": content
                        }
                    ]
                } else {
                    this.$message({
                        type: 'info',
                        message: res.message
                    });
                }
                this.block_loading = false;
            }).catch(e => {
                this.block_loading = false;
            })
        },
        handleSizeChange(val) {
            this.search.limit = val;
            this.hzGetLog();
        },
        handleCurrentChange(val) {
            //alert("当前页变了");
            this.search.pageNum = val;
            this.hzGetLog();
        },
        handleSizeChange2(val) {
            this.search2.pageSize = val;
            let j = new Object();
            j.chipId = this.chipId;
            this.history_transfer(j);
        },
        handleCurrentChange2(val) {
            this.search2.pageNum = val;
            let j1 = new Object();
            j1.chipId = this.chipId;
            this.history_transfer(j1);
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
            console.log(row.actionType);
            switch(row.actionType){
                case 'DELETED':
                  return '删除'
                case 'LOGOUT':
                  return '退出'
                case 'ADDED':
                  return '添加'
                case 'UPDATED':
                  return '修改'
                case 'ASSIGNED_TO_CUSTOMER':
                  return '分配给客户'
                default:
                  return '其他'
	            }
          }
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
