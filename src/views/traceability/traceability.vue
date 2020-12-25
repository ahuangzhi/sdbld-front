<!--  -->
<template>
<div>

  <div style="display: flex;    margin-bottom: 20px;">
    <div style="margin-left:10px;width:23%;">
      <div class="floatLeft"><img style="width:90px" src="@/assets/404_images/970c5ab7a35d27ff9f6a1d77896ce40.png"></div>
      <div class="floatLeft">
        <div class="fontSize">区块高度</div>
        <div class="fontSizetwo">{{tableData[0].lastBlock.toLocaleString()}}</div>
      </div>
    </div>
    <div style="margin-left:40px;width:23%;">
      <div class="floatLeft"><img style="width:90px" src="@/assets/404_images/067f318d1f881472195c03ed8756c66.png"></div>
      <div class="floatLeft">
        <div class="fontSize">最近出块时间</div>
        <div class="fontSizetwo">{{tableData[0].lastBlockTime}}</div>
      </div>

    </div>
    <div style="margin-left:40px;width:23%;">
      <div class="floatLeft"><img style="width:90px" src="@/assets/404_images/cfb581578f9652d5b748ecdf1c98921.png"></div>
      <div class="floatLeft">
        <div class="fontSize">平均出块时间</div>
        <div class="fontSizetwo">{{tableData[0].avgBlocktime}}</div>
      </div>

    </div>
    <div style="margin-left:40px">
      <div class="floatLeft"><img style="width:90px" src="@/assets/404_images/9e1a981384a6a4d66f75d5611da1c8a.png"></div>
      <div class="floatLeft">
        <div class="fontSize">
          平均哈希值</div>
        <div class="fontSizetwo">{{tableData[0].avgHashrate}}</div>
      </div>

    </div>
  </div>

  <div style="display: flex;    margin-bottom: 20px;">
    <div id="main" style="float:left;width: 25%;height:300px;"></div>
    <div id="main1" style="float:left;width: 25%;height:300px;"></div>
    <div id="main2" style="float:left;width: 25%;height:300px;"></div>

    <div class="mybox">
      <div style="font-size: 20px;margin-bottom: 80px;font-weight: 550;">LAST BLOCKS MINERS</div>
      <div style="font-size: 13px">{{tableData[0].lastBlockMiners1}}</div>
      <div><img src="@/assets/404_images/0fd64ad27c6d27bd549112d4a6ec0c8.png" /></div>
      <div style="font-size: 13px">{{tableData[0].lastBlockMiners2}}</div>
      <div><img src="@/assets/404_images/0fd64ad27c6d27bd549112d4a6ec0c8.png" /></div>
    </div>

  </div>
  <div style="display: flex;    margin-bottom: 20px;">
    <div id="main3" style="float:left;width: 20%;height:400px;"></div>
    <systementity style="width:75%"></systementity>
  </div>
  <el-table :data="tableData" style="width: 100% ;   margin-bottom: 20px;">
    <el-table-column prop="nodeName" label="节点名称" />
    <el-table-column prop="nodeType" label="节点类型" />
    <el-table-column prop="nodeLatency" label="节点延迟时间" />
    <el-table-column prop="nodeMining" label="node mining" />
    <el-table-column prop="nodePeers" label="node peers" />
    <el-table-column prop="lastBlock" label="last block" />
    <el-table-column prop="totalDifficulty" label="total difficulty" />
    <el-table-column prop="blockTransactions" label="block transactions" />
    <el-table-column prop="blockUncles" label="block uncles" />
    <el-table-column prop="lastBlockTime" label="last block time" />
    <el-table-column prop="propagationTime" label="propagation time" />

  </el-table>
  <!--设备列表-->
  <div>
    <el-form :inline="true" :model="tablePageReturnMoneyData" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="tablePageReturnMoneyData.search" placeholder="设备名称 | 钱包地址 | 设备token | 交易hash" style="width:340px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableMoneyData" style="width: 100%">
      <el-table-column label="设备名称" prop="chipId"></el-table-column>
      <el-table-column label="钱包地址" prop="deviceWallet"></el-table-column>
      <el-table-column label="设备token" prop="deviceToken"></el-table-column>
      <el-table-column label="交易hash" prop="hash">

      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tablePageReturnMoneyData.pageNum" :page-sizes="[10,20,50,100,200]" :page-size="tablePageReturnMoneyData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tablePageReturnMoneyData.total">
    </el-pagination>
  </div>
</div>
</template>

<script>
import {
  option
} from 'runjs';
import systementity from './systementity'
import {
  searchTableMoneyData
} from "./hzTraceability"
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
let websocket;
export default {
  name: 'app',
  //import引入的组件需要注入到对象中才能使用
  components: {
    systementity
  },
  data() {
    //这里存放数据
    return {
      tableData: [{
        nodeName: '',
        nodeType: '',
        nodeLatency: '',
        nodeMining: '',
        nodePeers: '',
        lastBlock: '',
        totalDifficulty: '',
        blockTransactions: '0',
        blockUncles: '0',
        lastBlockTime: '',
        propagationTime: '',
        lastBlockMiners1: '',
        lastBlockMiners2: '',
        avgBlocktime: '',
        avgHashrate: '',
      }],
      tableMoneyData: [],
      tablePageReturnMoneyData: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        search: '',
      },
      option: {
        title: {
          text: 'BLOCK TIME'
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          //data: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '',
          type: 'bar',
          barWidth: '60%',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }]
      },
      option1: {
        title: {
          text: 'TRANSACTIONS'
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          //data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '',
          type: 'bar',
          barWidth: '60%',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }]
      },
      option2: {
        title: {
          text: 'GAS SPENDING'
        },
        color: ['#F74B4B'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          //data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '',
          type: 'bar',
          barWidth: '60%',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }]
      },
      option3: {
        title: {
          text: 'BLOCK PROPAGATION'
        },
        tooltip: {
          trigger: 'axis'
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75, 7, 7.25, 7.5, 7.75, 8, 8.25, 8.5, 8.75, 9, 9.25, 9.5, 9.75]
        },
        yAxis: {
          type: 'value'
        },
        series: [{
            name: '',
            type: 'line',
            data: [0.9999999999999453, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },

        ]
      }

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getData() {
      setInterval(() => {
        this.tableData[0].lastBlockTime = parseInt(this.tableData[0].lastBlockTime) + 1 + "s ago";
      }, 1000);
      websocket = new WebSocket("ws://125.64.98.21:3000/primus/?_primuscb=" + new Date().getTime() + "-1");
      websocket.onopen = () => {
        websocket.send(JSON.stringify({
          "emit": ["ready"]
        }));
      };

      websocket.onmessage = e => {
        let domData = JSON.parse(e.data);
        let emit = domData.emit;
        // console.log(domData);
        if (emit && emit[0] === "init") {
          this.tableData[0].nodeName = emit[1].nodes[0].info.name;
          this.tableData[0].nodeType = emit[1].nodes[0].info.node;
          this.tableData[0].nodeLatency = emit[1].nodes[0].stats.latency + " ms";
          this.tableData[0].nodeMining = (emit[1].nodes[0].stats.mining == true ? 0 : 1) + " KH/s";
          this.tableData[0].nodePeers = emit[1].nodes[0].stats.peers;
          this.tableData[0].lastBlock = "#" + (emit[1].nodes[0].stats.block.number.toLocaleString());
          this.tableData[0].lastBlockTime = Math.round((new Date().getTime() / 1000 - emit[1].nodes[0].stats.block.timestamp)) + "s ago";

        } else {
          if (domData.action === "block") {
            this.tableData[0].lastBlock = "#" + domData.data.block.number.toLocaleString();
            this.tableData[0].totalDifficulty = parseInt(domData.data.block.totalDifficulty).toLocaleString();
            this.tableData[0].blockTransactions = domData.data.block.transactions.length;
            this.tableData[0].blockUncles = domData.data.block.uncles.length;
            this.tableData[0].lastBlockTime = "0s ago";
            this.tableData[0].propagationTime = domData.data.block.propagation + " ms";
          } else if (domData.action === "charts") {
            this.$nextTick(() => {
              if (domData.data.miners.length === 1) {
                this.tableData[0].lastBlockMiners1 = domData.data.miners[0].miner;
              }
              if (domData.data.miners.length > 1) {
                this.tableData[0].lastBlockMiners1 = domData.data.miners[0].miner;
                this.tableData[0].lastBlockMiners2 = domData.data.miners[1].miner;
              }
              if (domData.data.avgBlocktime != "" && domData.data.avgBlocktime != null) {
                this.tableData[0].avgBlocktime = domData.data.avgBlocktime.toFixed(2) + "s";
              }
              if (domData.data.avgHashrate != "" && domData.data.avgHashrate != null) {
                this.tableData[0].avgHashrate = domData.data.avgHashrate.toFixed(1) + "H/s";
              }

              this.option.xAxis[0].data = domData.data.blocktime;
              this.option.series[0].data = domData.data.blocktime;

              this.option1.xAxis[0].data = domData.data.transactions;
              this.option1.series[0].data = domData.data.transactions;

              this.option2.xAxis[0].data = domData.data.gasSpending;
              this.option2.series[0].data = domData.data.gasSpending;

              let histogramList = domData.data.propagation.histogram;
              let xList = histogramList.map(item => {
                return item.x / 1000;
              })
              let yList = histogramList.map(item => {
                return item.y;
              })
              this.option3.xAxis.data = xList;
              this.option3.series.data = yList;
            })

          } else if (domData.action === "client-ping") {
            websocket.send(JSON.stringify({
              "emit": ["client-pong", {
                "serverTime": domData.data.serverTime,
                "clientTime": new Date().getTime()
              }]
            }));
          }
        }
      }
    },
    searchTableMoneyData() {
      this.loading = true;
      searchTableMoneyData(this.tablePageReturnMoneyData).then(res => {
        if (res.success) {
          //console.log(res.data);
          this.tableMoneyData = res.data;
          this.tablePageReturnMoneyData.total = res.total;
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
    onSubmit() {
      console.log('submit!');
      this.tablePageReturnMoneyData.pageSize = 10;
      this.tablePageReturnMoneyData.pageNum = 1;
      this.searchTableMoneyData();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.tablePageReturnMoneyData.pageSize = val;
      this.searchTableMoneyData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tablePageReturnMoneyData.pageNum = val;
      this.searchTableMoneyData();
    },

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData();
    this.searchTableMoneyData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = this.$echarts.init(document.getElementById('main'));
    var myChart1 = this.$echarts.init(document.getElementById('main1'));
    var myChart2 = this.$echarts.init(document.getElementById('main2'));
    var myChart3 = this.$echarts.init(document.getElementById('main3'));
    // this.$myChart.showLoading();
    let that = this;
    var interval3 = setInterval(function () {
      myChart.setOption(that.option);
      myChart1.setOption(that.option1);
      myChart2.setOption(that.option2);
      myChart3.setOption(that.option3);
    }, 1000);

  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {

  }, //如果页面有keep-alive缓存功能，这个函数会触发
}

// 基于准备好的dom，初始化echarts实例

// 指定图表的配置项和数据

// 使用刚指定的配置项和数据显示图表。
</script>

<style>
.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: black;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 90px;
  color: blue;
  text-align: center;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.mybox {
  margin-left: 20px;
}

.floatLeft {
  float: left;
}

.fontSize {
  font-size: 20px;
  margin-top: 10px;
}

.fontSizetwo {
  font-size: 33px;
  margin-top: 10px;
}

.loading {
  position: fixed;
  width: 100%;
  height: 100%;
}

.demo-form-inline {
  padding: 10px;
  margin-left: 20px;
}
</style>
