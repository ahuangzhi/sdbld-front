<!--  -->
<template>
<div class='myclass'>
  <div id="mem" style="width: 600px;height:400px;"></div>
  <div id="bis" style="width: 600px;height:400px;"></div>
  <div id="cpu" style="width: 600px;height:400px;"></div>
  <div id="wwatchfilea" style="width: 900px;height:400px;"></div>
</div>
</template>

<script>
import {
  resetRouter
} from '@/router';

import {
  selectbues
} from "./systementityjs"
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      websock: null,
      systementity: null,
      gaugecpu: {
        title: {
          text: 'CPU使用率',
          //subtext: '单位G',
          left: 'center '
        },
        series: [{
          name: 'CPU使用率',
          type: 'gauge',
          detail: {
            formatter: '{value}%'
          },
          data: [{
            value: 50,
            name: 'CPU'
          }]
        }]
      },
      gaugemen: {
        title: {
          text: '内存使用量',
          //subtext: '单位G',
          left: 'center '
        },
        series: [{
          name: '内存使用',
          type: 'gauge',
          detail: {
            formatter: '{value}%'
          },
          data: [{
            value: 50,
            name: '内存'
          }]
        }]
      },
      bisfileoption: {
        title: {
          text: '硬盘使用量',
          subtext: '单位G',
          left: 'center '
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{

          type: 'pie',

          center: ['50%', '50%'],
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 9,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      filedata: [],
      myehartsgauge: null,
      myechartsbis: null,
      myehartscpu: null,
      watchfile: null,

      now: null,
      date: [],
      data: [],

      watchoption: {

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          boundaryGap: [0, '50%'],
          type: 'value'
        },
        series: [{
          name: '成交',
          type: 'line',
          smooth: true,
          symbol: 'none',
          stack: 'a',
          areaStyle: {
            normal: {}
          },
          data: []
        }]
      },
      //filedata: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    addData(data) {
      // this.now = new Date();
      // this.now = [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate(), this.now.getHours(), this.now.getMinutes(), this.now.getSeconds()].join('/');
      // this.date.push(this.now)
      // console.log(this.date)
      // this.data.push(data.watchFile)
      // if (this.data.length > 4) {
      //     this.date.shift()
      //     this.data.shift()
      //     this.watchfile.setOption({
      //         title: {
      //             subtext: '单位G',
      //             left: 'left'
      //         },
      //         xAxis: {
      //             type: 'category',
      //             boundaryGap: false,
      //             data: this.date
      //         },
      //         yAxis: {
      //             boundaryGap: [0, '50%'],
      //             type: 'value'
      //         },
      //         series: [{
      //             name: '成交',
      //             type: 'line',
      //             smooth: true,
      //             symbol: 'none',
      //             stack: 'a',
      //             areaStyle: {
      //                 normal: {}
      //             },
      //             data: this.data
      //         }]
      //     });
      // }
      // this.now = new Date()
      let createTime = data.map(item => {
        return item.createTime;
      })
      let fileSize = data.map(item => {
        return item.fileSize
      })
      this.watchfile.setOption({
        title: {
          text: 'besu文件',
          subtext: '单位M',
          left: 'left '
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: createTime
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: fileSize,
          type: 'line'
        }]
      })
    },

    initgauge() {

      this.myehartsgauge = this.$echarts.init(document.getElementById('mem'))
      console.log(this.myehartsgauge)
    },
    initcpu() {
      this.myehartscpu = this.$echarts.init(document.getElementById('cpu'))
    },

    initwatchfile() {
      this.watchfile = this.$echarts.init(document.getElementById('wwatchfilea'))
    },
    initwebsockt() {
      let wss = 'ws://125.64.98.21:8010/imserver/'
      this.websock = new WebSocket(wss)
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonmessage(e) {
      //console.log(e.data)
      let data = JSON.parse(e.data)
      this.systementity = data
      // console.log(data)
      this.$nextTick(() => {
        this.memuse(data)
        this.fileuse(data)
        this.cpuuse(data)
        //this.addData(data)
      })

    },
    websocketonopen() {
      console.log("链接打开")
    },
    websocketonerror() {

    },
    websocketclose() {

    },
    memuse(data) {
      //console.log(data)
      this.gaugemen.series[0].data[0].value = ((data.menUse) * 100).toFixed(2) - 0;
      //console.log(this.myehartsgauge)
      this.myehartsgauge.setOption(this.gaugemen, true)
    },
    initbis() {
      this.myechartsbis = this.$echarts.init(document.getElementById('bis'))
    },
    fileuse(data) {
      let pl = [{
        name: "使用量",
        value: data.fileUse
      }, {
        name: "未使用",
        value: data.fileFree
      }]
      this.bisfileoption.series[0].data = pl

      this.myechartsbis.setOption(this.bisfileoption)
    },
    cpuuse(data) {
      this.gaugecpu.series[0].data[0].value = ((data.cpuuse) * 100).toFixed(2) - 0;
      this.myehartscpu.setOption(this.gaugecpu, true)
    },
    //获取数据
    getlistdata() {
      this.initwatchfile()
      selectbues().then(res => {
        if (res.success) {
          this.addData(res.data)
        }
      })
    },
  }

  , //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initgauge()
    this.initbis()
    this.initcpu()
    this.getlistdata()
    let that = this
    setTimeout(function () {

      that.initwebsockt()
    }, 3000);

  },

  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    this.websock.close()
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang="less" scoped>
.myclass {
  display: -webkit-flex;
  display: flex;
}
</style>
