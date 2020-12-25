<template>
  <div class="transferDetails">
    <div>
      <div class="title">
        详细信息
        <span @click="goBack">返回</span>
      </div>
      <el-table :data="block_info_table" style="width: 100%">
        <el-table-column prop="name" />
        <el-table-column prop="v" min-width="160" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { block_hash_info } from "@/api/block";
import { date_format, block_dp } from "@/utils/functions";

export default {
  name: "transferDetails",
  data() {
    return {
      hash: "",
      block_info_table: [],
    };
  },
  mounted() {
    this.hash = this.$route.query.id;
    this.getData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getData() {
      block_hash_info(this.hash)
        .then((res) => {
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
            this.block_info_table = [
              {
                name: "hash",
                v: res.data.result.hash,
              },
              {
                name: "出款地址",
                v: res.data.result.from,
              },
              {
                name: "收款地址",
                v: res.data.result.to,
              },
              {
                name: "区块hash",
                v: res.data.result.blockHash,
              },
              {
                name: "交易时间",
                v: date,
              },
              {
                name: "交易区块",
                v: blockNum,
              },
              {
                name: "DP使用",
                v: dpUsed,
              },
              {
                name: "Gas单价",
                v: block_dp(gasPrice),
              },
              {
                name: "交易确认",
                v: newBlockNum - blockNum,
              },
              {
                name: "出资地址历史交易次数",
                v: nonce,
              },
              {
                name: "交易总消耗",
                v: block_dp(allUsed),
              },
              {
                name: "数据",
                v: res.data.result.input,
              },
              {
                name: "数据翻译",
                v: content,
              },
            ];
          } else {
            this.$message({
              type: "info",
              message: res.message,
            });
          }
        })
        .catch((e) => {});
    },
  },
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
