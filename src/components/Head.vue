<template>
  <div class="header">
    <span>校本STEM课程(木艺)自主生成系统</span>
    <div class="loginout" @click="logout"></div>
    <div class="username">{{userName}}</div>
    <div class="touxiang"></div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      userName: window.localStorage.getItem("userName")
    };
  },
  methods: {
    logout() {
      console.log("logout!");
      this.$router.push("/");
      window.localStorage.removeItem("sessionId");
      window.localStorage.removeItem("courseId");
      window.localStorage.removeItem("userName");
      this.http(this.api.loginOut).then(res => {});
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  height: 70px;
  padding-top: 20px;
  background-color: #ffffff;
  box-sizing: border-box;

  span {
    font-size: 24px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .loginout {
    cursor: pointer;
    height: 30px;
    width: 30px;
    background: url(../assets/tuichu@2x.png) no-repeat;
    float: right;
    margin-right: 20px;
    margin-top: 8px;
  }
  .touxiang {
    float: right;
    margin-right: 20px;
    margin-top: 5px;
    height: 30px;
    width: 30px;
    background: url(../assets/touxiang.png) no-repeat;
  }
  .username {
    float: right;
    height: 16px;
    font-size: 16px;
    font-family: PingFang-SC-Regular;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 16px;
    margin-top: 10px;
    margin-right: 40px;
  }
}
</style>
