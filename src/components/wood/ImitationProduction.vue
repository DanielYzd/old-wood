<template>
  <div class="imitationproduction">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">书签制作的模仿视频，一般是多个步骤。</div>
    </div>
    <div class="mainbody">
      <div class="maintitle">
        <img src="../../assets/set.png" alt>
        <div class="suspro">模仿制作</div>
      </div>
      <el-card :body-style="{ padding: '0px' }" class="card" v-for="(item, index) in data" :key="index">
        <img src="../../assets/example.png" class="image">
        <div class="detail">
          <div class="time">
            <span style="font-size:18px;weight:bold;color:#2B4A7E">步骤{{item.sortId}}</span>
            <img src="../../assets/shijian1@2x.png" alt>
            <span style="font-size:12px;font-weight:bold;color:#666666">{{item.timeLength}}</span>
          </div>
          <el-button type="text" @click="view(item.vedioUrl)">预览</el-button>
        </div>
      </el-card>
      <div class="vediodialog">
        <el-dialog
          :visible.sync="dialogVisible"
          width="60%"
          custom-class="dialog"
          :close-on-click-modal="false"
          top="7vh"
          :beforeClose="close"
        >
          <Video ref="player" :url="vedioUrl" v-if="hackReset"></Video>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import Video from "../Video.vue";
export default {
  components: {
    Video
  },
  data() {
    return {
      data: [],
      dialogVisible: false,
      hackReset: true,
      vedioUrl: ""
    };
  },
  mounted() {
    this.getCourseStepList();
  },
  methods: {
    view(url) {
      this.vedioUrl=url;
      //this.$router.push("/video");
      console.log(this.$refs.player);
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.hackReset = true; //重建组件
      });
    },
    close() {
      this.hackReset = false;
      this.dialogVisible = false;
    },
    getCourseStepList() {
      let body = {
        courseId: window.localStorage.getItem("courseId")
      };
      this.http(this.api.getCourseStepList, body).then(res => {
        console.log(res);
        if ((res.data.code = "0000")) {
          this.data = res.data.data.courseStepList;
        }
      });
    }
  }
};
</script>
<style lang="less">
.imitationproduction {
  width: 100%;
  .mainbody {
    // width: 100%;
    height: calc(100% - 51px);
    background-color: #ffffff;
    padding: 0 20px 30px 20px;
    overflow: auto;
    box-sizing: border-box;
    .maintitle {
      display: flex;
      height: 30px;
      margin-top: 5px;
      img {
        height: 30px;
        margin-right: 10px;
      }
      .suspro {
        width: 88px;
        height: 16px;
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
      }
    }
    .card {
      width: 238px;
      height: 234px;
      background: rgba(255, 255, 255, 1);
      // border-radius: 5px;
      float: left;
      margin: 15px;
      .image {
        width: 100%;
        height: 136px;
        display: block;
      }
      .detail {
        padding: 8px;
        .time {
          clear: both;
          vertical-align: middle;
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 5px;
          margin-top: 10px;
          img {
            margin-left: 70px;
            vertical-align: middle;
          }
          span {
            height: 100%;
            vertical-align: middle;
            display: inline-block;
          }
        }
        .el-button {
          font-size: 16px;
          color: #40a9b0;
          font-weight: bold;
          float: right;
          margin-left: 10px;
        }
      }
    }
    .vediodialog {
      .el-dialog__header {
        //  height:0px;
        background-color: #000;
        height: 30px;
        padding: 0px;
        .el-dialog__headerbtn {
          font-size: 30px;
          position: absolute;
          top: 0;
          right: 20px;
        }
      }
      .el-dialog__body {
        padding: 0;
        height: 600px;
      }
    }
  }
}
</style>
