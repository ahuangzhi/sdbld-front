<template>
  <div class="home-container">
    <panel-group :data="block_show_card" />
    <div class="wrap">
      <div class="tree">
        <el-button class="btn" :loading="isLoad" type="primary" @click="updatePower"
          >确认修改</el-button
        >
        <ul class="treeul">
          <li style="float: none">
            <div class="dv">
              <div class="msg">
                <div>
                  <img class="img" src="@/assets/icon/dianwang.jpg" alt="电网" />
                  <div class="name">电网</div>
                </div>
                <div class="right">
                  <div class="test">设备功率：{{ package1.PT }} kW</div>
                  <div
                    class="test poin"
                    @click="toSecond('96b72190-2b7a-11ea-b340-81a9d94af463')"
                  >
                    发送电量：{{ package1.sendEN }} kWh
                  </div>
                  <div
                    class="test poin"
                    @click="toSecond('96b72190-2b7a-11ea-b340-81a9d94af463')"
                  >
                    吸收电量：{{ package1.absorbEN }} kWh
                  </div>
                  <div class="test price" @click="toThree">余额</div>
                  <div class="test price" @click="toThree">
                    {{ package1.priceBalance }} 元
                  </div>
                  <div class="test">
                    <el-slider
                      v-model="form.gridCompanyPilePower"
                      :min="-100"
                      :max="100"
                    ></el-slider>
                  </div>
                </div>
              </div>
              <div class="jiantou bottom">
                <div class="icons">
                  <img
                    class="icons"
                    v-if="package1.PT < 0"
                    src="@/assets/icon/jiantou-shang.png"
                    alt
                  />
                  <img class="icons" v-else src="@/assets/icon/jiantou-kong.png" alt />
                </div>
                <div class="icons">
                  <img
                    class="icons"
                    v-if="package1.PT > 0"
                    src="@/assets/icon/jiantou-xia.png"
                    alt
                  />
                  <img class="icons" v-else src="@/assets/icon/jiantou-kong.png" alt />
                </div>
              </div>
            </div>
            <ul>
              <li>
                <div class="dv">
                  <div class="msg">
                    <div>
                      <img class="img" src="@/assets/icon/nibianqi.jpg" alt="逆变器" />
                      <div class="name">逆变器</div>
                    </div>
                    <div class="right">
                      <div class="test">设备功率：{{ package2.PT }} kW</div>
                      <div
                        class="test poin"
                        @click="toSecond('6bcf1780-2b7a-11ea-b340-81a9d94af463')"
                      >
                        发送电量：{{ package2.sendEN }} kWh
                      </div>
                      <div class="test price" @click="toThree">余额</div>
                      <div class="test price" @click="toThree">
                        {{ package2.priceBalance }} 元
                      </div>
                      <div class="test">
                        <el-slider
                          v-model="form.photovoltaicPower"
                          :min="0"
                          :max="30"
                        ></el-slider>
                      </div>
                    </div>
                  </div>
                  <div class="jiantou">
                    <div class="icons">
                      <img
                        class="icons"
                        v-if="package2.PT"
                        src="@/assets/icon/jiantou-shang.png"
                        alt
                      />
                      <img class="icons" src="@/assets/icon/jiantou-kong.png" alt />
                    </div>
                    <div class="icons">
                      <img class="icons" src="@/assets/icon/jiantou-kong.png" alt />
                    </div>
                  </div>
                </div>
                <ul>
                  <li>
                    <div class="dv">
                      <div class="msg">
                        <div>
                          <img class="img" src="@/assets/icon/guangfu.jpg" alt="光伏" />
                          <div class="name">光伏</div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <div class="dv">
                  <div class="msg">
                    <div>
                      <img
                        class="img"
                        src="@/assets/icon/chongdianzhuang.jpg"
                        alt="充电桩"
                      />
                      <div class="name">充电桩</div>
                    </div>
                    <div class="right">
                      <div class="test">设备功率：{{ package3.PT }} kW</div>
                      <div
                        class="test poin"
                        @click="toSecond('e1896810-2b78-11ea-b340-81a9d94af463')"
                      >
                        吸收电量：{{ package3.absorbEN }} kWh
                      </div>
                      <div class="test price" @click="toThree">余额</div>
                      <div class="test price" @click="toThree">
                        {{ package3.priceBalance }} 元
                      </div>
                      <div class="test">
                        <el-slider
                          v-model="form.chargingPilePower"
                          :min="0"
                          :max="77"
                          :format-tooltip="formatTooltip"
                        ></el-slider>
                      </div>
                    </div>
                  </div>
                  <div class="jiantou">
                    <div class="icons">
                      <img class="icons" src="@/assets/icon/jiantou-kong.png" alt />
                    </div>
                    <div class="icons">
                      <img
                        class="icons"
                        v-if="package3.PT"
                        src="@/assets/icon/jiantou-xia.png"
                        alt
                      />
                      <img
                        class="icons"
                        v-else
                        src="@/assets/icon/jiantou-kong.png"
                        alt
                      />
                    </div>
                  </div>
                </div>
                <ul>
                  <li>
                    <div class="dv">
                      <div class="msg">
                        <div>
                          <img
                            class="img"
                            src="@/assets/icon/diandongche.jpg"
                            alt="电动车"
                          />
                          <div class="name">电动车</div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <div class="dv">
                  <div class="msg">
                    <div>
                      <img class="img" src="@/assets/icon/chunengdui.jpg" alt="储能堆" />
                      <div class="name">储能堆</div>
                    </div>
                    <div class="right">
                      <div class="test">设备功率：{{ package4.PT }} kW</div>
                      <div
                        class="test poin"
                        @click="toSecond('d1cdee80-2b7a-11ea-b340-81a9d94af463')"
                      >
                        发送电量：{{ package4.sendEN }} kWh
                      </div>
                      <div
                        class="test poin"
                        @click="toSecond('d1cdee80-2b7a-11ea-b340-81a9d94af463')"
                      >
                        吸收电量：{{ package4.absorbEN }} kWh
                      </div>
                      <div class="test price" @click="toThree">余额</div>
                      <div class="test price" @click="toThree">
                        {{ package4.priceBalance }} 元
                      </div>
                      <div class="test">
                        <el-slider
                          v-model="form.energyPower"
                          :min="-50"
                          :max="50"
                        ></el-slider>
                      </div>
                    </div>
                  </div>
                  <div class="jiantou">
                    <div class="icons">
                      <img
                        class="icons"
                        v-if="package4.PT < 0"
                        src="@/assets/icon/jiantou-shang.png"
                        alt
                      />
                      <img
                        class="icons"
                        v-else
                        src="@/assets/icon/jiantou-kong.png"
                        alt
                      />
                    </div>
                    <div class="icons">
                      <img
                        class="icons"
                        v-if="package4.PT > 0"
                        src="@/assets/icon/jiantou-xia.png"
                        alt
                      />
                      <img
                        class="icons"
                        v-else
                        src="@/assets/icon/jiantou-kong.png"
                        alt
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="slider">
        <!-- <div class="title">输出显示区</div> -->
        <!-- <div class="title">运行状态</div> -->
        <div class="title">运行状态{{this.threeTimeQueryCount}}</div>
        <div class="msg_box" v-for="(item, index) of msg" :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import PanelGroup from "./PanelGroup";
import { search_map } from "@/api/map";
import { device_telemetrys } from "@/api/device";
import { updateChangePower } from "@/api/device";
let interval, websocket;

export default {
  name: "home",
  data() {
    return {
      block_show_card: [
        {
          k: "总设备",
          v: 600,
          oldV: 0,
          icon: "device",
          show: true,
        },
        {
          k: "北京设备",
          v: 20,
          oldV: 0,
          icon: "beijing",
          show: true,
        },
        {
          k: "江苏设备",
          v: 500,
          oldV: 0,
          icon: "jiangsu",
          show: true,
        },
        {
          k: "山东设备",
          v: 80,
          oldV: 0,
          icon: "shandong",
          show: true,
        },
        {
          k: "区块高度",
          v: 0,
          oldV: 0,
          icon: "blockHeight",
          show: true,
        },
        {
          k: "最近出块时间",
          v: "5s ago",
          time: 4,
          icon: "time",
          show: true,
        },
        {
          k: "平均出块时间",
          v: "12.52s",
          icon: "hourglass",
          show: true,
        },
        {
          k: "计算难度",
          v: "9.45 MH",
          icon: "diff",
          show: true,
        },
      ],
      deviceId1: "96b72190-2b7a-11ea-b340-81a9d94af463",
      deviceId2: "6bcf1780-2b7a-11ea-b340-81a9d94af463",
      deviceId3: "e1896810-2b78-11ea-b340-81a9d94af463",
      deviceId4: "d1cdee80-2b7a-11ea-b340-81a9d94af463",
      msg: "", // 输出信息
      threeTimeQueryCount: 0, //输出次数
      package1: {}, //电网
      package2: {}, //光伏
      package3: {}, //充电桩
      package4: {}, //储能堆
      form: {
        //电网功率
        gridCompanyPilePower: 0,
        //光伏功率
        photovoltaicPower: 0,
        //充电桩功率
        chargingPilePower: 0,
        //储能功率
        energyPower: 0,
      },
      isLoad: false,
    };
  },
  components: {
    PanelGroup,
  },
  beforeDestroy() {
    window.clearInterval(interval);
  },
  destroyed() {
    window.clearInterval(interval);
  },
  methods: {
    telemetry_chart(firstLoad) {
      console.log(firstLoad);
      device_telemetrys(this.deviceId1)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.msg = res.data.feeDeductionMessage;
            this.threeTimeQueryCount = res.data.threeTimeQueryCount;

            this.package1 = res.data.gridCompanyPile;
            this.package2 = res.data.photovoltaic;
            this.package3 = res.data.chargingPile;
            this.package4 = res.data.energy;
            if(firstLoad){
              this.form.gridCompanyPilePower = res.data.gridCompanyPile.PT;
              this.form.photovoltaicPower = res.data.photovoltaic.PT;
              this.form.chargingPilePower = res.data.chargingPile.PT * 10;
              this.form.energyPower = res.data.energy.PT;
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "请求失败",
          });
        });
    },
    formatTooltip(val) {
      return val / 10;
    },
    updatePower() {
      const that = this;
      that.isLoad = true;
      let changePower = {
        //电网功率
        gridCompanyPilePower: that.form.gridCompanyPilePower,
        //光伏功率
        photovoltaicPower: that.form.photovoltaicPower,
        //充电桩功率
        chargingPilePower: that.form.chargingPilePower / 10,
        //储能功率
        energyPower: that.form.energyPower,
      };
      updateChangePower(changePower)
        .then((res) => {
          that.isLoad = false;
          if (res.code == 200) {
            that.$message({
              message: "修改成功",
              type: "success",
            });
            that.telemetry_chart(true);
          }
        })
        .catch(() => {
          that.isLoad = false;
          that.$message({
            type: "info",
            message: "请求失败",
          });
        });
    },
    toSecond(k) {
      this.$router.push({
        path: "/telemetering",
        query: {
          id: k,
        },
      });
    },
    toThree() {
      this.$router.push({
        path: "/transferRecords",
        query: {
          id: "940FF6AE114C",
        },
      });
    },
  },
  created() {
    let that = this;
    that.telemetry_chart(true);
    interval = setInterval(() => {
      that.telemetry_chart(false);
    }, 10000);
    /*获取区块链信息*/
    setInterval(() => {
      that.block_show_card[5].v = that.block_show_card[5].time + "s ago";
      that.block_show_card[5].time += 1;
    }, 1000);
    websocket = new WebSocket(
      "ws://125.64.98.21:3000/primus/?_primuscb=" + new Date().getTime() + "-1"
    );
    // websocket = new WebSocket("ws://125.64.98.21:6006");
    websocket.onopen = () => {
      websocket.send(
        JSON.stringify({
          emit: ["ready"],
        })
      );
    };

    websocket.onmessage = (e) => {
      let data = JSON.parse(e.data);
      let emit = data.emit;
      /*初始化数据获取*/
      if (emit && emit[0] === "init") {
        that.block_show_card[4].v = emit[1].nodes[0].stats.block.number;
        that.block_show_card[5].time = Math.round(
          new Date().getTime() / 1000 - emit[1].nodes[0].stats.block.timestamp
        );
        that.block_show_card[7].v =
          (emit[1].nodes[0].stats.block.difficulty / 1000000).toFixed(2) + "MH";
      } else {
        if (data.action === "charts") {
          that.block_show_card[6].v = data.data.avgBlocktime.toFixed(2) + "s";
        } else if (data.action === "block") {
          let new_height = data.data.block.number;
          if (new_height > that.block_show_card[4].v) {
            that.block_show_card[4].oldV = that.block_show_card[4].v;
            that.block_show_card[4].v = new_height;
            that.block_show_card[5].time = 0;
            that.block_show_card[7].v =
              (data.data.block.difficulty / 1000000).toFixed(2) + "MH";
          }
        } else if (data.action === "client-ping") {
          websocket.send(
            JSON.stringify({
              emit: [
                "client-pong",
                {
                  serverTime: data.data.serverTime,
                  clientTime: new Date().getTime(),
                },
              ],
            })
          );
        }
      }
    };
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.wrap {
  display: flex;
  .slider {
    padding: 50px 0;
    width: 280px;
    .title {
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 24px;
    }
    .msg_box {
      font-size: 14px;
      line-height: 24px;
      text-indent: 2em;
    }
  }
  .tree {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 50px 50px 50px;
    .btn {
      position: absolute;
      bottom: 120px;
      right: 165px;
      width: 80px;
      height: 36px;
      z-index: 999;
    }
    ul {
      overflow: hidden;
      padding-top: 50px;
      position: relative;
      list-style: none;
      ul:before {
        content: "";
        position: absolute;
        left: 50%;
        top: 0;
        width: 0;
        height: 50px;
        border-left: 1px solid #ccc;
      }
      li {
        float: left;
        text-align: center;
        position: relative;
        padding: 50px 20px 0 20px;
        font-size: 0;
        list-style: none;
        &:only-child {
          padding: 0;
        }
        &:before {
          content: "";
          position: absolute;
          right: 50%;
          top: 0;
          width: 50%;
          height: 50px;
          border-top: 1px solid #ccc;
        }
        &:after {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          right: 0;
          width: 50%;
          height: 50px;
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
        }
        &:first-child {
          &:before {
            border: none;
          }
        }
        &:first-child {
          &:after {
            border-radius: 5px 0 0 0;
          }
        }
        &:last-child {
          &:after {
            border: none;
            z-index: -1;
          }
        }
        &:last-child {
          &:before {
            border-right: 1px solid #ccc;
            border-radius: 0px 5px 0 0;
          }
        }
        &:only-child {
          &:before {
            border: none;
          }
        }
        .dv {
          display: inline-block;
          font-size: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          .msg {
            width: 300px;
            height: 180px;
            display: flex;
            align-content: center;
            justify-content: center;
            border: 1px solid #ccc;
            .name {
              font-size: 24px;
              font-weight: bold;
              text-align: left;
              text-align: center;
            }
            .right {
              width: 160px;
              height: 180px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              .test {
                white-space: nowrap;
                text-align: left;
                font-size: 14px;
                &.poin {
                  cursor: pointer;
                }
                &.price {
                  color: #318e79;
                  cursor: pointer;
                }
              }
            }
          }
          .jiantou {
            position: absolute;
            left: 50%;
            top: -50px;
            width: 40px;
            height: 50px;
            margin-left: -20px;
            display: flex;
            &.bottom {
              top: 180px;
            }
            .icons {
              width: 20px;
              height: 50px;
            }
          }
          .img {
            margin: 10px;
            width: 120px;
            height: 120px;
            vertical-align: middle;
            border-radius: 20px;
          }
        }
      }
    }
  }
}
</style>
