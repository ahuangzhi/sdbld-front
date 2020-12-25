<!-- 价格维护 -->
<template>
  <div style="padding: 20px; height: 80%">
    <el-dialog
      title="新增分段电价表"
      :visible.sync="dialogVisible"
      width="30%"
      style="text-align: center"
    >
      <div>
        <el-form
          ref="tableDataForm"
          :rules="rules"
          :model="tableDataForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="设备名称" prop="insertSelectData">
            <el-select
              v-model="tableDataForm.insertSelectData.id"
              placeholder="设备名称"
              style="width: 100%"
            >
              <el-option
                v-for="item in tableDataForm.insertSelectData.data"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收发类型" prop="electricityType">
            <el-input v-model="tableDataForm.electricityType"></el-input>
          </el-form-item>
          <el-form-item label="时段类型" prop="name">
            <el-input v-model="tableDataForm.name"></el-input>
          </el-form-item>
          <el-form-item label="时段区间" prop="timeSectional">
            <el-input v-model="tableDataForm.timeSectional"></el-input>
          </el-form-item>
          <el-form-item label="每度电价格" prop="price">
            <el-input v-model="tableDataForm.price"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            style="text-align: center; margin-left: 8%"
            @click="dialogVisible = false"
            >取 消</el-button
          >
          <el-button
            style="text-align: center"
            type="primary"
            @click="insertSave('tableDataForm')"
            >确 定</el-button
          >
        </span>
      </div>
    </el-dialog>

    <el-form :inline="true" :model="tableData" class="demo-form-inline">
      <el-form-item label="">
        <el-select
          v-model="selectData.id"
          placeholder="设备名称"
          style="width: 200px"
          size="small"
        >
          <el-option
            v-for="item in selectData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="del">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData.data"
      height="750"
      border
      style="width: 100%"
      @selection-change="changeFun"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="sectionalName"
        label="设备名称"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="electricityType"
        label="接发类型"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="name" label="时段类型" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="timeSectional"
        label="时段区间"
        width="480"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="price" label="每度电价格" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="updateClick(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="deleteClick(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.tableData.pageNum"
      :page-sizes="[10, 20, 30, 50, 100]"
      :page-size="this.tableData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.tableData.total"
    >
    </el-pagination>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  searchTableData,
  deleteOperation,
  selectBasicsEq1uipmentList,
  insertOperation,
  updateOperation,
} from "./basics_sectional_tariff";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        data: [],
      },
      ids: [],
      dialogVisible: false,
      insertType: true,
      tableDataForm: {
        name: "",
        price: "",
        electricityType: "",
        timeSectional: "",
        insertSelectData: {
          data: [],
          id: 0,
        },
      },
      selectData: [],

      rules: {
        name: [{ required: true, message: "请输入时段类型", trigger: "blur" }],
        price: [
          { required: true, message: "请输入每度电价格", trigger: "blur" },
        ],
        timeSectional: [
          { required: true, message: "请输入时段区间", trigger: "blur" },
        ],
        insertSelectData: [
          { required: true, message: "请选择设备名称", trigger: "blur" },
        ],
        electricityType: [
          { required: true, message: "请输入接发类型", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      this.tableData.pageSize = val;
      this.getData(this.selectData.id == null ? 0 : this.selectData.id);
    },
    handleCurrentChange(val) {
      this.tableData.pageNum = val;
      this.getData(this.selectData.id == null ? 0 : this.selectData.id);
    },
    getData(equipmentListType) {
      searchTableData(
        this.tableData.pageNum,
        this.tableData.pageSize,
        equipmentListType
      ).then((res) => {
        if (res.success) {
          this.tableData.data = res.data;
          this.tableData.total = res.total;
        }
      });
    },
    getSelectData() {
      selectBasicsEq1uipmentList().then((res) => {
        if (res.success) {
          var object = new Object();
          object.id = 0;
          object.name = "  ";
          res.data.unshift(object);
          this.selectData = { ...res.data };
          this.tableDataForm.insertSelectData.data = res.data;
        }
      });
    },
    query() {
      this.getData(this.selectData.id == null ? 0 : this.selectData.id);
    },
    updateClick(row) {
      this.insertType = false;
      this.dialogVisible = true;
      this.tableDataForm.timeSectional = row.timeSectional;
      this.tableDataForm.price = row.price;
      this.tableDataForm.name = row.name;
      this.tableDataForm.electricityType = row.electricityType;
      this.tableDataForm.id = row.id;
      this.tableDataForm.insertSelectData.id = row.equipmentListType;
      console.log("这是修改");
    },
    deleteClick(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = [];
          ids.push(row.id);
          deleteOperation(ids).then((res) => {
            if (res.success) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.getData(this.selectData.id == null ? 0 : this.selectData.id);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    add() {
      console.log("这是新增");
      this.insertType = true;
      this.dialogVisible = true;
      this.tableDataForm.timeSectional = "";
      this.tableDataForm.price = "";
      this.tableDataForm.name = "";
      this.tableDataForm.electricityType = "";
      this.tableDataForm.insertSelectData.id = 0;
    },
    del() {
      if (this.ids <= 0) {
        this.$message({
          message: "请选择至少一项进行删除",
          type: "error",
        });
      } else {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteOperation(this.ids).then((res) => {
              if (res.success) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.getData(
                  this.selectData.id == null ? 0 : this.selectData.id
                );
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    changeFun(val) {
      let idsCopy = [];
      val.forEach((item) => {
        idsCopy.push(item.id);
      });
      this.ids = idsCopy;
    },
    insertSave(formName) {
      if (this.insertType) {
        console.log("新增保存");
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;
            insertOperation(this.tableDataForm).then((res) => {
              if (res.success) {
                this.$message({
                  message: "新增成功",
                  type: "success",
                });
                this.getData(
                  this.selectData.id == null ? 0 : this.selectData.id
                );
              }
            });
          } else {
            this.$message({
              message: "请选择设备名称",
              type: "error",
            });
            return false;
          }
        });
      } else {
        console.log("修改保存");
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;
            updateOperation(this.tableDataForm).then((res) => {
              if (res.success) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
                this.getData(
                  this.selectData.id == null ? 0 : this.selectData.id
                );
              }
            });
          } else {
            this.$message({
              message: "请选择设备名称",
              type: "error",
            });
            return false;
          }
        });
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData(0);
    this.getSelectData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style></style>
