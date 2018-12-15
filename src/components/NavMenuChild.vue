<template>
  <div class="nav">
    <div class="logo">
      <img src="../assets/nav_logo.png" alt>
    </div>
    <div class="zhuye" @click="back">
      <img src="/static/zhuye1.png" onmouseover="this.src=('/static/zhuye2.png')"
                    onmouseout="this.src=('/static/zhuye1.png')" alt>
      <span>书签的制作...</span>
    </div>
    <el-menu
      router
      :default-active="defaultactive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/ProjectIntroduction">
        <span slot="title">项目简介</span>
      </el-menu-item>
      <el-menu-item index="/ImitationProduction">
        <span slot="title">模仿制作</span>
      </el-menu-item>
      <el-menu-item index="/CreativeDesign">
        <span slot="title">创意设计</span>
      </el-menu-item>
      <el-menu-item index="/KnowledgeHint">
        <span slot="title">知识点提示</span>
      </el-menu-item>
      <el-menu-item index="/EnginExperiment">
        <span slot="title">工程实验</span>
      </el-menu-item>
      <el-menu-item index="/GeneralReading">
        <span slot="title">全科阅读</span>
      </el-menu-item>
      <el-menu-item index="/IntelligentEnhancement">
        <span slot="title">智能加强</span>
      </el-menu-item>
      <el-menu-item index="/DreamWorks">
        <span slot="title">梦工厂</span>
      </el-menu-item>
      <el-menu-item index="/EvenTesting">
        <span slot="title">即时检测</span>
      </el-menu-item>
      <el-menu-item index="/GroupReview">
        <span slot="title">小组评评评</span>
      </el-menu-item>
      <el-menu-item index="/NewProduct">
        <span slot="title">新品推广会</span>
      </el-menu-item>
      <el-menu-item index="/BrainOpen">
        <span slot="title">脑洞开开开</span>
      </el-menu-item>
      <el-menu-item index="/">
        <span slot="title">教学讨论</span>
      </el-menu-item>
      <el-menu-item index="/">
        <span slot="title">教学示范</span>
      </el-menu-item>
      <el-menu-item index="/">
        <span slot="title">优秀作品展示</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "NavMenu",
  data() {
    return {
      defaultactive: ""
    };
  },
  mounted() {
    console.log(this.$router);
    let name = this.$router.history.current.name;
    console.log(name);
    switch (name) {
      case "ProjectIntroduction":
        this.defaultactive = "/ProjectIntroduction";
        break;
      case "ImitationProduction":
        this.defaultactive = "/ImitationProduction";
        break;
      case "CreativeDesign":
        this.defaultactive = "/CreativeDesign";
        break;
      case "KnowledgeHint":
        this.defaultactive = "/KnowledgeHint";
        break;
      case "EnginExperiment":
        this.defaultactive = "/EnginExperiment";
        break;
      case "GeneralReading":
        this.defaultactive = "/GeneralReading";
        break;
      case "IntelligentEnhancement":
        this.defaultactive = "/IntelligentEnhancement";
        break;
      case "DreamWorks":
        this.defaultactive = "/DreamWorks";
        break;
      case "EvenTesting":
        this.defaultactive = "/EvenTesting";
        break;
      case "GroupReview":
        this.defaultactive = "/GroupReview";
        break;
      case "NewProduct":
        this.defaultactive = "/NewProduct";
        break;
      case "BrainOpen":
        this.defaultactive = "/BrainOpen";
        break;
    }
  },
  methods: {
    back() {
      this.$router.push("/WoodProject");
    },
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
    height: 60px;
    padding-top: 8px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .zhuye {
    vertical-align: middle;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    img {    
      width:30px;
      height: 30px;
      margin-left: 10px;
       vertical-align: middle;
    }
    span {
      margin-top: 5px;
      height: 100%;
      margin-left: 10px;
      vertical-align: middle;
      display: inline-block;
      font-size: 16px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
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
    height: 52px !important;
    line-height: 52px;
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


