<template>
  <div class="nav">
    <div class="logo">
      <img src="../assets/nav_logo.png" alt>
    </div>
    <el-menu
      router
      :default-active="defaultactive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item-group>
        <template slot="title">
          <div class="menuTitle">
            <img src="../assets/shipin@2x.png" alt>
            <span style="font-size:16px;margin-left:10px;height:30px;line-height:30px;">自主课程</span>
          </div>
        </template>
        <el-menu-item index="/VideoSub">
          <span></span>
          <span slot="title">视频订阅</span>
        </el-menu-item>
        <el-menu-item index="/WoodProject">
          <span slot="title">木艺项目</span>
        </el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template slot="title">
          <div class="menuTitle">
            <img src="../assets/guanli@2x.png" alt>
            <span style="font-size:16px;margin-left:10px;height:30px;line-height:30px;">管理</span>
          </div>
        </template>
        <el-menu-item index="/PlatformInformation">
          <span slot="title">平台信息</span>
        </el-menu-item>
        <el-menu-item index="/OrganizatioManage">
          <span slot="title">组织管理</span>
        </el-menu-item>
        <!-- <el-menu-item index="6">
          <span slot="title">权限管理</span>
        </el-menu-item> -->
        <!-- <el-menu-item index="7">
          <span slot="title">排课管理</span>
        </el-menu-item> -->
      </el-menu-item-group>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "NavMenu",
  data() {
    return {
      defaultactive:''
    };
  },
   watch: {
    $route(to, from) {
      console.log(to);
      deep: true;
      }
  },
  mounted(){
    let name = this.$router.history.current.name;
    switch(name){
      case('VideoSub'):
      this.defaultactive="/VideoSub"
      break;
      case('WoodProject'):
      this.defaultactive="/WoodProject"
      break;
      case('PlatformInformation'):
      this.defaultactive="/PlatformInformation"
      break;
      case('OrganizatioManage'):
      this.defaultactive="/OrganizatioManage"
      break;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  color: #ffffff;
  // width:15%;
  // min-width: 180px;
  height: calc(100vh);
  background-color: #ffffff;
  overflow: auto;

  .logo {
    padding-left: 45px;
    height: 70px;
    padding-top: 10px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .el-menu {
    border: 0;
  }
  .menuTitle {
    display: flex;
  }
  .el-menu-item {
    font-size: 16px;
    color: #333333;
    padding-left: 60px !important;
  }
  .is-active {
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(
      14deg,
      rgba(122, 223, 205, 0.75),
      rgba(138, 233, 196, 0.75)
    );
  }
  // .el-menu-item:focus,
  // .el-menu-item:hover {
  //   outline: 0;
  //   background: linear-gradient(
  //     14deg,
  //     rgba(122, 223, 205, 0.75),
  //     rgba(138, 233, 196, 0.75)
  //   );
  // }
}
</style>


