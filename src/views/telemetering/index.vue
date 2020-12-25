<template>
  <div class="telemetering">
    <div>
      <div class="title">
        遥测数据查看
        <span @click="goBack">返回</span>
      </div>
      <!-- <el-table
      ref="multipleTable"
      :data="telemetry"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selection_change"
      >-->
      <el-table :data="telemetry" style="width: 100%">
        <!-- <el-table-column type="selection" width="55px"></el-table-column> -->
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="v" label="数值"></el-table-column>
      </el-table>
      <!-- <div v-if="selection.length > 0">
      <el-button @click="c">在部件上显示</el-button>
      <el-button @click="clear_selection">取消选择</el-button>
      </div>-->
    </div>

    <div style="margin: 1rem 0">
      <div class="title">上链数据查看</div>
      <el-table :data="telemetry_hash" style="width: 100%">
        <el-table-column label="txHash" min-width="125">
          <el-link @click="show_block_info(scope.row.txhash)" :underline="false" slot-scope="scope">{{ scope.row.txhash }}</el-link>
        </el-table-column>
        <el-table-column prop="time" label="时间" align="center"></el-table-column>
      </el-table>
    </div>

    <div>
      <div class="title">变化统计图</div>
      <div class="chart">
        <div>
          <span>电量</span>
          <div id="device_en" class="chart_main"></div>
        </div>
        <div>
          <span>电流</span>
          <div id="device_ia" class="chart_main"></div>
        </div>
      </div>
      <div class="chart">
        <div>
          <span>电压</span>
          <div id="device_ua" class="chart_main"></div>
        </div>
        <div>
          <span>功率</span>
          <div id="device_pt" class="chart_main"></div>
        </div>
      </div>
      <div class="chart">
        <div>
          <span>信号强度</span>
          <div id="device_rssi" class="chart_main"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { device_telemetry } from "@/api/device";
import { date_format } from "@/utils/functions";

let en_dom, ia_dom, pt_dom, ua_dom, rssi_dom, interval;
let websocket;
export default {
  name: "telemetering",
  data() {
    return {
      deviceID: "", //设备id
      telemetry: [],
      selection: "",
      telemetry_hash: [],
      charts_data: {},
      frist: 0,
    };
  },
  mounted() {
    this.deviceID = this.$route.query.id;
    this.telemetry_chart("absorbEN,sendEN,IA,PT,UA,RSSI,Txhash", this.deviceID);
    interval = setInterval(() => {
      this.telemetry_chart("absorbEN,sendEN,IA,PT,UA,RSSI,Txhash", this.deviceID);
    }, 30000);
  },
  beforeDestroy() {
    window.clearInterval(interval);
  },
  destroyed() {
    window.clearInterval(interval);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    show_block_info(hash) {
      this.$router.push({
        path: "/transferDetails",
        query: {
          id: hash,
        },
      });
    },
    // 获取遥测数据
    telemetry_chart(keys, deviceId) {
      const that = this;
      device_telemetry(keys, deviceId).then((res) => {
        console.log(res.data);
        that.telemetry = [];
        if (res.success && res.data) {
          let th = res.data.Txhash;
          var keys = Object.keys(res.data);
          let arr = [];
          for (let key in keys) {
            arr[key] = keys[key];
          }
          //定义遥测数据
          for (var i = 0; i < arr.length; i++) {
            let v = res.data[arr[i]];
            that.telemetry.push({
              name: arr[i],
              v: v[0].value,
              time: date_format(v[0].ts),
            });
          }

          if (th && th.length > 0) {
            let list = [];
            for (let i = 0; i < th.length && i < 5; i++) {
              list.push({
                txhash: th[i].value,
                time: date_format(th[i].ts),
                ts: th[i].ts,
              });
            }
            if (!that.telemetry_hash || that.telemetry_hash.length < 1) {
              that.telemetry_hash = list;
            } else {
              list = list.reverse();
              let ll = list.length;
              let old_list = that.telemetry_hash.reverse();
              let ol = old_list.length;
              for (let i = 0; i < ll; i++) {
                if (list[i].ts > old_list[ol - 1].ts) {
                  old_list.shift();
                  old_list.push(list[i]);
                }
              }
              that.telemetry_hash = old_list.reverse();
            }
          }
          if (res.data.PT && (res.data.PT != '0') & (res.data.PT != '0.0')) {
            that.charts_data.sendEN = that.charts_data_update(res.data.sendEN, that.charts_data.sendEN);
            that.charts_data.sendPT = that.charts_data_update(res.data.PT, that.charts_data.sendPT);
          } else {
            that.charts_data.sendEN = that.charts_data_update(res.data.absorbEN, that.charts_data.sendEN);
            that.charts_data.sendPT = that.charts_data_update(res.data.PT, that.charts_data.sendPT);
          }
          // if (res.data.sendPT && (res.data.sendPT != '0') & (res.data.sendPT != '0.0')) {
          //   that.charts_data.sendEN = that.charts_data_update(res.data.sendEN, that.charts_data.sendEN);
          //   that.charts_data.sendPT = that.charts_data_update(res.data.sendPT, that.charts_data.sendPT);
          // } else {
          //   that.charts_data.sendEN = that.charts_data_update(res.data.absorbEN, that.charts_data.sendEN);
          //   that.charts_data.sendPT = that.charts_data_update(res.data.absorbPT, that.charts_data.sendPT);
          // }
          // that.charts_data.sendEN = that.charts_data_update(res.data.sendEN, that.charts_data.sendEN);
          // that.charts_data.sendPT = that.charts_data_update(res.data.sendPT, that.charts_data.sendPT);
          that.charts_data.IA = that.charts_data_update(res.data.IA, that.charts_data.IA);
          that.charts_data.UA = that.charts_data_update(res.data.UA, that.charts_data.UA);
          that.charts_data.RSSI = that.charts_data_update(res.data.RSSI, that.charts_data.RSSI);

          en_dom = en_dom ? en_dom : that.$echarts.init(document.getElementById("device_en"));
          pt_dom = pt_dom ? pt_dom : that.$echarts.init(document.getElementById("device_pt"));
          ia_dom = ia_dom ? ia_dom : that.$echarts.init(document.getElementById("device_ia"));
          ua_dom = ua_dom ? ua_dom : that.$echarts.init(document.getElementById("device_ua"));
          rssi_dom = rssi_dom ? rssi_dom : that.$echarts.init(document.getElementById("device_rssi"));

          that.charts_option_update(en_dom, that.charts_data.sendEN);
          that.charts_option_update(pt_dom, that.charts_data.sendPT);
          that.charts_option_update(ia_dom, that.charts_data.IA);
          that.charts_option_update(ua_dom, that.charts_data.UA);
          that.charts_option_update(rssi_dom, that.charts_data.RSSI);
        }
      });
    },
    charts_option_update(dom, data) {
      let option = {
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            return params[0].value[0] + " : " + params[0].value[1];
          },
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "模拟数据",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data: data,
          },
        ],
      };
      dom.setOption(option);
    },
    charts_data_update(ens, old_data) {
      ens = ens.reverse();
      if (!old_data || old_data.length < 1) {
        old_data = [];
        for (let i = 0, l = ens.length; i < l; i++) {
          let en = ens[i];
          old_data[old_data.length] = {
            ts: en.ts,
            value: [date_format(en.ts), en.value],
          };
        }
      } else {
        let ol = old_data.length;
        let last = old_data[ol - 1];
        for (let i = 0, l = ens.length; i < l; i++) {
          let en = ens[i];
          if (en.ts > last.ts) {
            if (ol > 99) {
              old_data.shift();
            }
            old_data.push({
              ts: en.ts,
              value: [date_format(en.ts), en.value],
            });
          }
        }
      }
      return old_data;
    }
  },
  mounted() {
    let that = this;
    that.deviceID = that.$route.query.id;
    that.telemetry_chart("absorbEN,sendEN,IA,PT,UA,RSSI,Txhash", that.deviceID);
    interval = setInterval(() => {
      //absorbEN,sendEN,IA,sendPT,absorbPT,UA,RSSI,Txhash
      that.telemetry_chart("absorbEN,sendEN,IA,bPT,UA,RSSI,Txhash", that.deviceID);
    }, 30000);
  },
  beforeDestroy() {
    window.clearInterval(interval);
  },
  destroyed() {
    window.clearInterval(interval);
  }
};
</script>
<style lang="scss" scoped>
.telemetering {
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
  .close_button {
    float: right;
    border: none;
    z-index: 1000;
    height: 0.918rem;
    border-radius: 0;
    position: relative;
    border-bottom: 0.038rem solid #e4e7ed;
  }

  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }

  .chart {
    display: flex;

    div {
      display: flex;
      flex-direction: column;
      width: 49.9%;

      span {
        font-weight: bold;
        font-size: 24px;
        display: flex;
        justify-content: center;
      }
    }
  }

  .chart > div > .chart_main {
    width: 600px;
    height: 400px;
    display: inline-block;
  }
}
</style>
