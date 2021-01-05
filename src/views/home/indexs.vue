<template>
  <div class="home">
    <div>
      <div class="category">
        <div class="title">客户管理</div>
        <div class="content">
          <div class="item">
            <img class="img" src="@/assets/icon/kehu.png" alt="" />
            <div class="msg">客户中心</div>
          </div>
        </div>
      </div>
      <div class="category">
        <div class="title">资产管理</div>
        <div class="content">
          <div class="item">
            <img class="img" src="@/assets/icon/zichan.png" alt="" />
            <div class="msg">资产</div>
          </div>
          <div class="item">
            <img class="img" src="@/assets/icon/zichan.png" alt="" />
            <div class="msg">资产</div>
          </div>
        </div>
      </div>
      <div class="category">
        <div class="title">设备管理</div>
        <div class="content">
          <div class="item">
            <img class="img" src="@/assets/icon/shebei.png" alt="" />
            <div class="msg">设备</div>
          </div>
          <div class="item">
            <img class="img" src="@/assets/icon/shebei.png" alt="" />
            <div class="msg">设备</div>
          </div>
          <div class="item">
            <img class="img" src="@/assets/icon/shebei.png" alt="" />
            <div class="msg">设备</div>
          </div>
        </div>
      </div>
      <div class="category">
        <div class="title">日志</div>
        <div class="content">
          <div class="item">
            <img class="img" src="@/assets/icon/rizhi.png" alt="" />
            <div class="msg">日志</div>
          </div>
          <div class="item">
            <img class="img" src="@/assets/icon/rizhi.png" alt="" />
            <div class="msg">日志</div>
          </div>
          <div class="item">
            <img class="img" src="@/assets/icon/rizhi.png" alt="" />
            <div class="msg">日志</div>
          </div>
          <div class="item">
            <img class="img" src="@/assets/icon/rizhi.png" alt="" />
            <div class="msg">日志</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      number: [1, 2, 3, 4, 5],
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.home {
  // height: calc(100vh - 20px);
  background: #dcdcdc;
  & > div {
    padding: 10px;
    .category {
      background: #ffffff;
      margin-bottom: 10px;
      .title {
        height: 64px;
        line-height: 64px;
        font-size: 24px;
        text-indent: 20px;
        border-bottom: 1px solid rgba(64, 84, 178, 0.25);
      }
      .content {
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .item {
          padding: 0 40px;
          .img {
            width: 80px;
            height: 80px;
            vertical-align: middle;
          }
          .msg {
            height: 36px;
            line-height: 36px;
            font-size: 18px;
            text-align: center;
            white-space: normal;
            color: #318e79;
          }
        }
      }
    }
  }
}
</style>
