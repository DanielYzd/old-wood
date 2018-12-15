<template>
  <div class="EvenTesting">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">关于书签制作的知识检测，以小组为单位答题</div>
    </div>
    <div class="mainbody">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="title">
              <img src="../../assets/test.png" alt>
              <span>检测题1</span>
               <el-button icon="el-icon-edit">编辑</el-button>
               <el-button icon="el-icon-document">布置</el-button>

            </div>
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="title">
              <img src="../../assets/test.png" alt>
              <span>检测题1</span>
               <el-button icon="el-icon-edit">编辑</el-button>
               <el-button icon="el-icon-document">布置</el-button>

            </div>
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
       <el-collapse-item name="3">
          <template slot="title">
            <div class="title">
              <img src="../../assets/test.png" alt>
              <span>检测题1</span>
               <el-button icon="el-icon-edit">编辑</el-button>
               <el-button icon="el-icon-document">布置</el-button>

            </div>
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
       <el-collapse-item name="4">
          <template slot="title">
            <div class="title">
              <img src="../../assets/test.png" alt>
              <span>检测题1</span>
               <el-button icon="el-icon-edit">编辑</el-button>
               <el-button icon="el-icon-document">布置</el-button>

            </div>
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1"]
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="less" scoped>
.EvenTesting {
  width: 100%;
  .mainbody {
    height: calc(100% - 51px);
    // background-color: #ffffff;
    // padding: 0 20px 30px 20px;
    overflow: auto;
    box-sizing: border-box;
    .title {
        width:100%;
      vertical-align: middle;
      font-size: 16px;
      margin-left: 20px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);

      img {
        vertical-align: middle;
      }
      span {
        height: 100%;
        vertical-align: middle;
        display: inline-block;
      }
      .el-button {
          float: right;
          margin:15px 40px 0 0;
        width: 83px;
        padding: 0 4px;
        height: 26px;
        font-size: 14px;
        font-family: PingFang-SC-Regular;
        font-weight: bold;
        color: rgba(138, 138, 138, 1);
      }
    }
    .el-collapse-item {
      margin-bottom: 8px;
    }
  }
}
</style>
