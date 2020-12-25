<template>
  <div class="sharingPrivate">
    <div class="wrap">
      <div class="ms-b">
        <div class="msg">生成数据</div>
        <el-button type="primary" :loading="btnStatus" @click="onSubmit"
          >生成数据</el-button
        >
      </div>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="设备ID">
          <el-input v-model="form.equipmentId" style="max-width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="遥测">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="电量" name="type" :disabled="true"></el-checkbox>
            <el-checkbox label="电压" name="type"></el-checkbox>
            <el-checkbox label="电流" name="type"></el-checkbox>
            <el-checkbox label="功率" name="type"></el-checkbox>
            <el-checkbox label="报警" name="type"></el-checkbox>
            <el-checkbox label="信号强度" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="遥控">
          <el-checkbox-group v-model="form.check">
            <el-checkbox label="开关一" name="type"></el-checkbox>
            <el-checkbox label="开关二" name="type"></el-checkbox>
            <el-checkbox label="开关三" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="wrap">
      <div class="ms-b">
        <div class="msg">返回数据</div>
        <el-button type="primary" :loading="btnStatus" @click="onSubmit">提交</el-button>
      </div>
      <el-form label-width="80px">
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12">
            <el-form-item label="Token">
              <el-input v-model="token" value=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="返回Json">
              <el-input
                type="textarea"
                :autosize="{ minRows: 16, maxRows: 16 }"
                placeholder="请输入合约源码"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "sharingPrivate",
  data() {
    return {
      rules: {
        fileName: [{ required: true, message: "请填写合约名称", trigger: "blur" }],
      },
      form: {
        equipmentId: "",
        type: [],
        check: [],
      },
      btnStatus: false,
      contractCode: "",
      contractAddress: "",
      transactionHash: "",
      token: "sdfsdfsdfsd",
    };
  },
  mounted() {},
  methods: {
    onSubmit() {},
  },
};
</script>
<style lang="scss">
.sharingPrivate {
  padding: 20px;
  font-size: 14px;
  .title {
    height: 44px;
    line-height: 44px;
    font-size: 24px;
    font-weight: bold;
  }
  .wrap {
    padding: 20px;
    border-bottom: 1px solid #dcdcdc;
    .ms-b {
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .msg {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .el-row .el-col {
    min-height: 48px;
    line-height: 48px;
  }
}
</style>
