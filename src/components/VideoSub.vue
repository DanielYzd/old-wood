<template>
  <div class="vediosub">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">平台提供的可订阅STEM课程</div>
    </div>
    <div class="testdddd">
      <div class="suscribetitle">
        <img src="../assets/dy1.png" alt>
        <div class="suspro">可订阅项目</div>
      </div>

      <el-card :body-style="{ padding: '0px' }" class="card" v-for="item in data " :key="item.id">
        <img src="../assets/example.png" class="image">
        <div class="detail">
          <span style="font-size:18px;weight:bold;color:#2B4A7E">{{item.title}}</span>
          <div class="time">
            <img src="../assets/shijian1@2x.png" alt>
            <span style="font-size:12px;font-weight:bold;color:#666666">{{item.timeLength}}</span>
            <div class="love">
              <div :class="item" v-for="item in item.score" :key="item.id"></div>
            </div>
          </div>

          <el-button type="text" @click="material(item.courseId)">材料</el-button>
          <el-button type="text" @click="view(item.courseId)">预览</el-button>
          <el-button type="text" @click="subscribe(item.courseId)">订阅</el-button>
        </div>
      </el-card>
      <!-- //播放器弹框 -->
      <div class="vediodialog">
        <el-dialog
          :visible.sync="dialogVisible"
          width="60%"
          custom-class="dialog"
          :close-on-click-modal="false"
          top="7vh"
          :beforeClose="playerclose"
        >
          <Video ref="player" :url="vedioUrl" v-if="palyerReset"></Video>
        </el-dialog>
      </div>
      <!-- 视频列表弹框 -->
      <div class="moviedialog">
        <el-dialog
          :visible.sync="moviedialogVisible"
          width="80%"
          custom-class="dialog"
          :close-on-click-modal="false"
          top="7vh"
          title="视频列表"
          :modal-append-to-body="false"
          :append-to-body="false"
          :modal="true"
        >
          <el-table
            :data="moviedata"
            border
            style="width:100%"
            :row-style="{'color':'#333333','font-size':'16px'}"
            :header-cell-style="{'color':'#666666','font-size':'16px'}"
          >
            <el-table-column type="index" label="序号" width="150"></el-table-column>
            <el-table-column prop="vedioUrl" label="视频地址"></el-table-column>
            <el-table-column label="预览" width="250">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-view" @click="watch(scope.row.vedioUrl)">预览</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
      <!-- 材料列表弹框 -->
      <div class="materialdialog">
        <el-dialog
          :visible.sync="materialdialogVisible"
          width="80%"
          custom-class="dialog"
          :close-on-click-modal="false"
          top="7vh"
          title="材料列表"
          :modal-append-to-body="false"
          :append-to-body="false"
          :modal="true"
          :beforeClose="close"
        >
          <el-table
            v-if="hackReset"
            :data="materialData"
            border
            style="width:100%"
            :row-style="{'color':'#333333','font-size':'16px'}"
            :header-cell-style="{'color':'#666666','font-size':'16px'}"
          >
            <el-table-column type="index" label="序号" width="150"></el-table-column>
            <el-table-column prop="title" label="材料"></el-table-column>
            <el-table-column prop="picUrl" label="图片地址"></el-table-column>
            <el-table-column label="预览" width="250">
              <template slot-scope="scope">
                <!-- <el-button size="mini" @click="handlePrew(scope.$index, scope.row)">预览</el-button> -->
                <div>
                  <img
                    :preview="scope.row.courseId"
                    :preview-text="scope.row.title"
                    :src="(dapi + (scope.row.picUrl).substring(0, (scope.row.picUrl).length - 1))"
                    style="width:50px;height:50px"
                    @click="imgclick"
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import Video from "./Video.vue";
export default {
  components: {
    Video
  },
  data() {
    return {
      currentDate: new Date(),
      dialogVisible: false,
      materialdialogVisible: false,
      moviedialogVisible: false,
      hackReset: false,
      palyerReset: false,
      vedioUrl:'',
      data: [],
      materialData: [],
      moviedata: [],
      dapi: "http://ldzwh.oss-cn-hangzhou.aliyuncs.com/"
    };
  },
  mounted() {
    this.getSubscriptionList();
  },
  methods: {
    subscribe(courseId){
      let body = {
        courseId: courseId
      };
      this.http(this.api.addSubscriptionCourse,body).then(res=>{
        if(res.data.code=="0000"){
          this.$message({
            type:'success',
            message:'订阅成功！'
          })
          this.getSubscriptionList();
        }
      })
    },
    getSubscriptionList() {
      this.http(this.api.getSubscriptionList).then(res => {
        console.log(res);
        if (res.data.code == "0000") {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            console.log(data[i].score);
            if (data[i].score == "0") {
              data[i].score = ["empty", "empty", "empty", "empty", "empty"];
            } else if (data[i].score == "1") {
              data[i].score = ["full", "empty", "empty", "empty", "empty"];
            } else if (data[i].score == "2") {
              data[i].score = ["full", "full", "empty", "empty", "empty"];
            } else if (data[i].score == "3") {
              data[i].score = ["full", "full", "full", "empty", "empty"];
            } else if (data[i].score == "4") {
              data[i].score = ["full", "full", "full", "full", "empty"];
            } else if (data[i].score == "5") {
              data[i].score = ["full", "full", "full", "full", "full"];
            }
          }
          this.data = data;
        }
      });
    },
    imgclick() {
      console.log("img click");
    },
    view(courseId) {
      let body = {
        courseId: courseId
      };
      this.http(this.api.getCourseVedioList, body).then(res => {
        if (res.data.code == "0000") {
          this.moviedialogVisible = true;
          this.moviedata = res.data.data;
        }
      });
    },
    watch(url){
      this.vedioUrl=url;
      //this.$router.push("/video");
      // console.log(this.$refs.player);
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.palyerReset = true; //重建组件
      });
    },
    material(courseId) {
      let body = {
        courseId: courseId
      };
      this.http(this.api.getCourseMeterialList, body).then(res => {
        if (res.data.code == "0000") {
          this.materialdialogVisible = true;
          this.$nextTick(() => {
            this.hackReset = true; //重建组件
            this.materialData = res.data.data;
          });
        }
      });
    },
    close() {
      this.hackReset = false;
      this.materialdialogVisible = false;
    },
    playerclose() {
      this.palyerReset = false;
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="less">
.vediosub {
  width: 100%;

  .testdddd {
    // width: 100%;
    height: calc(100% - 51px);
    background-color: #ffffff;
    padding: 0 20px 30px 20px;
    overflow: auto;
    box-sizing: border-box;
    .suscribetitle {
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
          img {
            vertical-align: middle;
          }
          span {
            height: 100%;
            vertical-align: middle;
            display: inline-block;
          }
          .love {
            display: inline;
            padding-left: 30px;
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
  }
}
</style>

