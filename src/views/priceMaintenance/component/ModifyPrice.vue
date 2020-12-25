<!-- 价格修改 -->
<template>
  <div class="ModifyPrice">
    <div class="title">{{ titleMsg }}</div>
    <div class="lins">
      <div class="two">阶段</div>
      <div class="six">时间选择</div>
      <div class="two">价格</div>
      <div class="two">确定</div>
    </div>
    <div class="lins">
      <div class="two">
        <el-input v-model="form.stage" placeholder="阶段"></el-input>
      </div>
      <div class="six">
        <el-slider v-model="form.timeInterval" range show-stops :max="24">
        </el-slider>
      </div>
      <div class="two">
        <el-input v-model="form.price" placeholder="价格"></el-input>
      </div>
      <div class="two">
        <el-button type="primary" @click="add()">添加</el-button>
      </div>
    </div>
    <div class="con">
      <div class="line" v-for="(item, index) in putData" :key="index">
        <div>
          {{ item.stage }}: ({{ item.timeInterval[0] }}点 -
          {{ item.timeInterval[1] }}点),价格{{ item.price }}元
        </div>
      </div>
    </div>
    <div class="operation">
      <el-button type="primary" class="clear" @click="clear()">清除</el-button>
      <el-button type="primary" class="submit" @click="submit()"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  searchTableData,
  deleteOperation,
  selectBasicsEq1uipmentList,
  insertOperation,
  updateOperation,
} from "../basics_sectional_tariff";
export default {
  name: "forModifyPricem",
  props: {
    titleMsg: {
      type: String,
    },
  },
  data() {
    return {
      form: {
        stage: "",
        timeInterval: [0, 24],
        price: "",
      },
      putData: [],
    };
  },
  mounted() {},
  methods: {
    submit(n) {
      this.$emit("isStatus");
    },
    clear(n) {
      this.putData = [];
    },
    add(n) {
      if (this.form.stage == "") {
        return;
      }
      if (this.form.price == "") {
        return;
      }
      if (this.form.timeInterval[0] == 24 && this.form.timeInterval[1] == 24) {
        return;
      }
      let obj = {};
      obj.stage = this.form.stage;
      obj.timeInterval = this.type(this.form.timeInterval);
      obj.price = this.form.price;
      this.putData.push(obj);

      if (this.form.timeInterval[1] != 24) {
        let arr = [];
        arr[0] = this.form.timeInterval[1];
        arr[1] = 24;
        this.form.timeInterval = arr;
      } else {
        this.form.timeInterval = [24, 24];
      }
      this.form.stage = "";
      this.form.price = "";
    },
    type(arr) {
      let array = [];
      array[0] = arr[0] >= 10 ? arr[0] : "0" + arr[0];
      array[1] = arr[1] >= 10 ? arr[1] : "0" + arr[1];
      return array;
    },
  },
};
</script>

<style lang="scss" scoped>
.ModifyPrice {
  height: 370px;
  margin: 0 20px;
  .title {
    height: 64px;
    line-height: 64px;
    font-size: 18px;
    font-weight: bold;
  }
  .lins {
    height: 42px;
    display: flex;
    align-items: center;
    .two {
      margin: 0 10px;
      flex: 2;
      text-align: center;
    }
    .six {
      margin-left: 10px;
      flex: 6;
      text-align: center;
    }
  }
  .con {
    height: 160px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    .line {
      margin-top: 0px;
      width: 50%;
      height: 36px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .btn {
        margin-left: 10px;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background: #409eff;
        color: #ffffff;
        font-size: 24px;
        cursor: pointer;
      }
    }
  }
  .operation {
    height: 62px;
    position: relative;
    .clear {
      position: absolute;
      left: 0px;
      bottom: 10px;
    }
    .submit {
      position: absolute;
      right: 0px;
      bottom: 10px;
    }
  }
}
</style>
