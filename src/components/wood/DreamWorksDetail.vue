<template>
  <div class="DreamWorksDetail">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">关于书签制作的学生创意的具体过程</div>
      <el-button icon="el-icon-back" size="mini" @click="back">返回</el-button>
    </div>
    <div class="mainbody">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="title">
              <img src="../../assets/dream.png" alt>
              <span>梦工厂</span>
            </div>
          </template>
          <div class="content" v-html="designModify">{{designModify}}</div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="title">
              <img src="../../assets/dream.png" alt>
              <span>完成情况</span>
            </div>
          </template>
          <div class="completionstatus">
            <div class="flex">
              <div :class="statusA?'status2':'status1'">成功</div>
            </div>
            <div class="flex">
              <div :class="statusB?'status2':'status1'">部分完成</div>
            </div>
            <div class="flex">
              <div :class="statusC?'status2':'status1'">放弃</div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="title">
              <img src="../../assets/dream.png" alt>
              <span>写写体会</span>
            </div>
          </template>
          <div class="content2" v-html="experience">{{experience}}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1"],
      statusA: false,
      statusB: false,
      statusC: false,
      experience: "",
      designModify: ""
    };
  },
  mounted() {
    this.getDream();
    console.log(this.status == "A");
  },
  methods: {
    getDream() {
      let body = {
        dreamId: this.$route.params.id
      };
      this.http(this.api.getDream, body).then(res => {
        if (res.data.code == "0000") {
          let status = res.data.data.status;
          switch (status) {
            case "A":
              this.statusA = true;
              break;
            case "B":
              this.statusB = true;
              break;
            case "C":
              this.statusC = true;
              break;
          }
          this.experience = res.data.data.experience;
          this.designModify = res.data.data.designModify;
        }
      });
    },
    handleChange(val) {
      console.log(val);
    },
    back() {
      this.$router.push("/CreativeDesign");
    }
  }
};
</script>
<style lang="less" scoped>
.DreamWorksDetail {
  width: 100%;
  .child_head {
    .el-button {
      float: right;
      margin-top: 10px;
      margin-right: 20px;
      width: 76px;
      height: 26px;
      background: rgba(141, 225, 188, 1);
      border: 1px solid rgba(89, 200, 151, 1);
      border-radius: 5px;
      color: #ffffff;
      font-size: 14px;
    }
  }
  .mainbody {
    height: calc(100% - 51px);
    // background-color: #ffffff;
    // padding: 0 20px 30px 20px;
    overflow: auto;
    box-sizing: border-box;
    .title {
      width: 100%;
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
        margin: 15px 40px 0 0;
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
      .completionstatus {
        padding: 40px 82px 30px 80px;
        display: flex;
        .flex {
          flex: 1;
          .status1 {
            flex: 1;
            width: 120px;
            height: 32px;
            background: rgba(229, 229, 229, 1);
            border: 2px solid rgba(220, 220, 220, 1);
            border-radius: 15px;
            font-size: 16px;
            text-align: center;
            line-height: 32px;
            color: #333333;
          }
          .status2 {
            flex: 1;
            width: 120px;
            height: 32px;
            background: #8de1bc;
            border: 2px solid rgba(220, 220, 220, 1);
            border-radius: 15px;
            font-size: 16px;
            text-align: center;
            line-height: 32px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
