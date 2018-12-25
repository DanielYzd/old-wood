<template>
  <div class="login">
    <div class="logo">
      <div class="system_title">校本STEM课程(木艺)自主生成系统</div>
    </div>

    <div class="form">
      <div class="form_title">
        <div class="title">账户登录</div>
      </div>
      <div class="form_user">
        <div class="first_row">
          <div class="user_title">账户名&nbsp;&nbsp;&nbsp;:</div>
          <el-input v-model="userName" placeholder="请输入账户名" class="user_input"></el-input>
        </div>
        <div class="second_row">
          <div class="user_title">账户密码:</div>
          <el-input
            v-model="userPwd"
            type="password"
            placeholder="请输入账户密码"
            class="user_input"
            @keyup.enter.native="onSubmit"
          ></el-input>
        </div>
      </div>
      <div class="form_submit">
        <el-button class="button" @click="onSubmit">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
      userPwd: ""
    };
  },
  methods: {
    onSubmit() {
      let body = {
        username: this.userName,
        password: this.userPwd
      };
      if (this.userName && this.userPwd) {
        this.http(this.api.login, body).then(res => {
          console.log(res);
          if ((res.data.code = "0000")) {
            window.localStorage.setItem("sessionId", res.data.data.sessionId);
            window.localStorage.setItem("userName", this.userName);
            console.log(res.data.data);
            this.$router.push("/VideoSub");
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "用户名密码不能为空"
        });
      }
    }
  }
};
</script>
<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/login_bg.png") no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  display: flex;
  .logo {
    margin-top: 18%;
    margin-left: 25%;
    width: 350px;
    height: 280px;
    background: url("../../assets/login_logo.png") no-repeat 50% 0%;
    .system_title {
      width: 387px;
      height: 22px;
      font-size: 22px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 10px;
      margin-top: 50%;
      margin-left: 0;
    }
  }

  .form {
    width: 300px;
    height: 280px;
    // opacity: 0.23;
    background: rgba(255, 255, 255, 0.23);
    border: 0;
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    margin-top: 18%;
    .form_title {
      flex: 1;
      .title {
        width: 58px;
        height: 20px;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        margin-top: 30px;
        margin-left: 30px;
        border-bottom: 1px solid rgba(101, 208, 227, 1);
      }
    }
    .form_user {
      flex: 1;
      //   width: 250px;
      .first_row {
        border-bottom: 1px solid #ffffff;
        margin: 0 30px;
        .user_title {
          display: inline-block;
          width: 60px;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
        .user_input {
          width: 150px;
          .el-input__inner {
            border: 0 none;
            border-radius: 0px;
            background: none;
            color: #ffffff;
          }
        }
      }
      .second_row {
        border-bottom: 1px solid #ffffff;
        margin: 0 30px;
        margin-top: 10px;
        .user_title {
          display: inline-block;
          width: 60px;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
        .user_input {
          width: 150px;
          .el-input__inner {
            border: 0 none;

            border-radius: 0px;
            background: none;
            color: #ffffff;
          }
        }
      }
    }
    .form_submit {
      flex: 1;
      .button {
        width: 232px;
        height: 35px;
        font-size: 14px;
        margin-left: 30px;
        margin-top: 30px;
        color: rgba(255, 255, 255, 1);
        background: linear-gradient(
          90deg,
          rgba(104, 234, 218, 1),
          rgba(99, 183, 236, 1)
        );
        border-radius: 15px;
        // span {
        //   width: 30px;
        //   height: 18px;
        //   font-size: 14px;
        //   font-family: PingFang-SC-Regular;
        //   font-weight: bold;
        //   color: rgba(255, 255, 255, 1);

        // }
      }
    }
  }
}
</style>
