<template>
  <div class="home-container">

  </div>
</template>

<script>
import PanelGroup from './PanelGroup'
import {
  search_map
} from "@/api/map"

let websocket;

export default {
  name: 'home',
  data () {
    return {
      block_show_card: [{
        k: '总设备',
        v: 600,
        oldV: 0,
        icon: 'device',
        show: true
      }, {
        k: '北京设备',
        v: 20,
        oldV: 0,
        icon: 'beijing',
        show: true
      }, {
        k: '江苏设备',
        v: 500,
        oldV: 0,
        icon: 'jiangsu',
        show: true
      }, {
        k: '山东设备',
        v: 80,
        oldV: 0,
        icon: 'shandong',
        show: true
      }, {
        k: '区块高度',
        v: 0,
        oldV: 0,
        icon: 'blockHeight',
        show: true
      }, {
        k: '最近出块时间',
        v: '5s ago',
        time: 4,
        icon: 'time',
        show: true
      }, {
        k: '平均出块时间',
        v: '12.52s',
        icon: 'hourglass',
        show: true
      }, {
        k: '计算难度',
        v: '9.45 MH',
        icon: 'diff',
        show: true
      }],
      zoom: 4,
      center: [106.533051, 29.466567],
      markers: [],
    }
  },
  components: {
    PanelGroup
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
.home {
  &-container {
    margin: 0.6rem;
  }

  &-text {
    font-size: 0.6rem;
    line-height: 0.92rem;
  }
}

.map {
  width: 100%;
  height: 14rem;
}
</style>
<!-- <div class="bld_gps" style="text-align: center;font-size: .3rem;max-width: 2rem;display: inline-block;">
      <div style="background-color: #FFFFFF;">
        <div>ASDASDAASD</div>
        <div>地址</div>
      </div>
      <div>
        <svg style="width: .3rem;height: .3rem" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3838"><path d="M320.009338 413.474033c-0.119727 106.033965 85.739756 191.893448 191.773721 191.773721 106.033965-0.12075 192.087876-86.174662 192.208627-192.208627 0.119727-106.033965-85.739756-191.893448-191.772698-191.772698-106.034988 0.119727-192.089923 86.173638-192.20965 192.207604zM800.116977 666.441465L547.137265 977.959408c-15.791661 19.445888-44.357254 22.408359-63.803142 6.616697a45.36828 45.36828 0 0 1-6.558369-6.545066L222.017536 665.61975c-58.647725-67.375503-94.108355-155.479097-93.998861-251.928776 0.240477-212.066907 172.349323-384.175753 384.41623-384.41623 212.066907-0.240477 383.786896 171.479513 383.54642 383.546419-0.110517 97.154737-36.292578 185.922457-95.864348 253.620302z" fill="#d81e06"></path></svg>
      </div>
    </div>-->
