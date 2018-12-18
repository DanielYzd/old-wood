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
import NavMenu from "../../components/NavMenuChild.vue";
import Header from "../../components/Head.vue";
import ChildHeader from "../../components/ChildHead.vue";
export default {
  components: {
    NavMenu,
    Header,
    ChildHeader
  },
  data() {
    return {
    };
  },
  watch: {
    
  },
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
