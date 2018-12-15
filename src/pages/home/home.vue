<template>
  <div class="home">
    <el-row>
      <el-col :span="3">
        <nav-menu></nav-menu>
      </el-col>
      <el-col :span="21">
        <Header></Header>
        <div class="main">
          <router-view/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import NavMenu from "../../components/NavMenu.vue";
import Header from "../../components/Head.vue";
export default {
  components: {
    NavMenu,
    Header
  },
  data() {
    return {};
  },
  // watch: {
  //   $route(to, from) {
  //     console.log(to.path);
  //     deep: true;
  //     let path = to.path;
  //     window.localStorage.setItem("router", path);
  //     switch (path) {
  //       case "/VideoSub":
  //         window.localStorage.setItem("title", "平台提供的可订阅STEM课程");
  //         this.title = window.localStorage.getItem("title");
  //         break;
  //       case "/WoodProject":
  //         window.localStorage.setItem("title", "学校已订阅课程");
  //         this.title = window.localStorage.getItem("title");
  //         break;
  //     }
  //   }
  // },

  methods: {}
};
</script>
<style lang="less">
.home {
  background-color: #eef2f2;

  .main {
    display: flex;
    // background-color: #ffffff;
    margin: 8px 8px 0 8px;
    height: calc(100vh - 78px);
  }
}
</style>
