<template>
  <div class="login">
    <img class="logo" src="@/assets/icon/logo.png" alt="" />
    <h3 class="company-name">充电站设备智能管理平台</h3>

    <div class="wrap">
      <img class="company" src="@/assets/img/company.png" alt="" />
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title">
          用户登录
          <img class="touxiang" src="@/assets/icon/touxiang.png" alt="" />
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item prop="yanzheng">
          <span class="svg-container">
            <svg-icon icon-class="yanzhengma" />
          </span>
          <el-input
            class="two"
            ref="yanzheng"
            v-model="loginForm.yanzheng"
            placeholder="验证码"
            name="yanzheng"
            type="text"
            tabindex="1"
            auto-complete="on"
          ></el-input>
          <el-input class="yanzhengma" v-model="yanzhengma" :disabled="true"></el-input>
        </el-form-item>

        <el-button class="btn" :loading="loading" @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form>
    </div>

    <div class="footer">
      <div>
        &copy; 2016-2020 All Rights Reserved.
        <a href="http://www.bldxny.com/">倍来电</a> <br />
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      const s = validUsername(value);
      if (s == null) {
        callback();
      } else {
        callback(new Error(s));
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validateYanzheng = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        yanzheng: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername,
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
        yanzheng: [
          {
            required: true,
            trigger: "blur",
            validator: validateYanzheng,
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      yanzhengma: "",
    };
  },
  mounted() {
    let Num1 = Math.floor(Math.random() * 10);
    let Num2 = Math.floor(Math.random() * 10);
    let Num3 = Math.floor(Math.random() * 10);
    let Num4 = Math.floor(Math.random() * 10);
    this.yanzhengma = Num1 + " " + Num2 + " " + Num3 + " " + Num4;
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((res) => {
              console.log(res);
              if (!res.success) {
                this.$message({
                  type: "warning",
                  message: res.message,
                });
              }
              console.log("登陆成功");
              this.$router.push({
                path: this.redirect || "/",
              });
              this.loading = false;
            })
            .catch((e) => {
              console.log("错误", e);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-icon {
  color: #ffffff !important;
}
.el-input__inner {
  background-color: rgb(23, 30, 36) !important;
}

.login {
  position: relative;
  height: 100%;
  width: 100%;
  background: url("../../icons/jpg/bg.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;

  .logo {
    width: 375px;
    height: 120px;
    position: absolute;
    left: 60px;
    top: 40px;
  }

  .company-name {
    margin: 0;
    position: absolute;
    left: 60px;
    top: 190px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    color: #ffffff;
  }

  .wrap {
    position: absolute;
    right: 100px;
    bottom: 100px;
    display: flex;
    .company {
      width: 660px;
      height: 513px;
      vertical-align: middle;
    }
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      background: #318e79;
      .title {
        height: 74px;
        line-height: 74px;
        background: #006f68;
        color: #ffffff;
        font-size: 24px;
        text-indent: 30px;
        position: relative;
        margin-bottom: 80px;
        .touxiang {
          width: 140px;
          height: 140px;
          position: absolute;
          right: 50px;
          top: -35px;
        }
      }
      .el-form-item {
        margin-bottom: 36px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        .el-form-item__content {
          .svg-container {
            padding: 6px 15px 6px 15px;
            color: #889aa4;
            vertical-align: middle;
            width: 40px;
            display: inline-block;
          }
          .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
            &.two {
              width: 64%;
            }
            &.yanzhengma {
              width: 18%;
              margin-left: 3%;
            }

            input {
              background-color: rgb(14, 19, 22) !important;
              border: 0px;
              -webkit-appearance: none;
              border-radius: 0px;
              padding: 12px 5px 12px 15px;
              color: #ffffff;
              height: 47px;
              caret-color: #ffffff;
            }
            .el-input__inner {
              background-color: transparent !important;
            }
          }
        }
      }
      .btn {
        width: 90%;
        font-size: 18px;
        margin: 0 5% 30px 5%;
        background: #23918a;
        border: 1px solid #23918a;
        color: #ffffff;
        &:hover {
          box-shadow: #889aa4 1px 1px 0px;
        }
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
}

.footer {
  display: flex;
  justify-content: center;
  & > div {
    display: flex;
    justify-content: center;
    color: #ffffff;
    font-size: 13px;
    position: fixed;
    bottom: 20px;
  }
}
</style>
