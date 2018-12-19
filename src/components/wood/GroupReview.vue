<template>
  <div class="GroupReview">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">{{title}}</div>
    </div>
    <div class="mainbody">
      <div class="maintitle">
        <img src="../../assets/group.png" alt>
        <div class="suspro">学生评评评</div>
        <el-select
          class="select"
          v-model="value"
          placeholder="请选择班级"
          size="mini"
          @change="change()"
        >
          <el-option
            v-for="item in classList"
            :key="item.classId"
            :label="item.className"
            :value="item.classId"
          ></el-option>
        </el-select>
        <span class="class">班级</span>
      </div>
      <el-card :body-style="{ padding: '0px' }" class="card" v-for="item in data" :key="item.id">
        <img src="../../assets/example.png" class="image">
        <div class="detail">
          <div class="time">
            <span style="font-size:18px;weight:bold;color:#2B4A7E">综合评价{{item.totalScore}}</span>
            <div style="font-size:12px;font-weight:bold;color:#666666;">作者：{{item.studentName}}</div>
          </div>
          <el-button type="text" @click="watch(item.scoreId,item.totalScore,item.studentName)">查看</el-button>
        </div>
      </el-card>
    </div>
    <div class="dialog">
      <el-dialog
        :visible.sync="showVisible"
        width="70%"
        custom-class="dialog"
        :close-on-click-modal="false"
        top="15vh"
      >
        <template slot="title">
          <span
            style="font-size:18px;font-weight:bold;color:#333333;margin-right:10px;"
          >综合评价{{totalScore}}</span>
          <span style="font-size:16px;font-weight:500;color:#999999;">作者：{{studentName}}</span>
        </template>
        <el-table
          :data="scoreDetailList"
          border
          style="width: 100%"
          :row-style="{'color':'#333333','font-size':'16px'}"
          :header-cell-style="{'color':'#666666','font-size':'16px'}"
        >
          <el-table-column prop="studentName" label="评分人"></el-table-column>
          <el-table-column label="学习态度得分" width="170">
            <template slot-scope="scope">
              <!-- <star :score="scope.row.mannerScore"></star> -->
              <el-rate
                v-model="scope.row.mannerScore"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="craftScore" label="作品得分"></el-table-column> -->
          <el-table-column label="作品得分" width="170">
            <template slot-scope="scope">
              <!-- <star :score="scope.row.craftScore"></star> -->
              <el-rate
                v-model="scope.row.craftScore"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
            </template>
          </el-table-column>
          <el-table-column label="安全规范得分" width="170">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.securityScore"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
              <!-- <star :score="scope.row.securityScore"></star> -->
            </template>
          </el-table-column>
          
          <el-table-column label="总体表现得分" width="170">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.expressionScore"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
              <!-- <star :score="scope.row.expressionScore"></star> -->
            </template>
          </el-table-column>
          <el-table-column prop="lastUpdateDate" label="评价时间"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import star from "../Star.vue";
export default {
  components: {
    star
  },
  data() {
    return {
      data: [],
      classList: [],
      value: "",
      showVisible: false,
      scoreDetailList: [],
      totalScore: "",
      studentName: "",
      title:''
    };
  },
  mounted() {
    this.getClassList();
  },
   created(){
     let body = {
      functionId: "0102010"
    };
    this.http(this.api.getFunctionDesc, body).then(res => {
      this.title = res.data.data;
    });
  },
  methods: {
    change() {
      this.getScoreList(this.value);
    },
    getScoreList(classId) {
      let body = {
        courseId: window.localStorage.getItem("courseId"),
        classId: classId
      };
      this.http(this.api.getScoreList, body).then(res => {
        if (res.data.code == "0000") {
          this.data = res.data.data;
        }
      });
    },
    getClassList() {
      this.http(this.api.getClassList).then(res => {
        if (res.data.code == "0000") {
          this.classList = res.data.data;
          if (this.classList.length > 0) {
            this.value = this.classList[0].classId;
            this.getScoreList(this.value);
          } else {
            this.$message({
              type: "warning",
              message: "获取班级列表失败！"
            });
          }
        }
      });
    },
    watch(scoreId, totalScore, studentName) {
      let body = {
        scoreId: scoreId
      };
      this.totalScore = totalScore;
      this.studentName = studentName;
      this.http(this.api.getScoreDetailList, body).then(res => {
        if (res.data.code == "0000") {
          this.showVisible = true;
          this.scoreDetailList = res.data.data.scoreDetailList;
          console.log(this.scoreDetailList);
        }
      });
    }
  }
};
</script>
<style lang="less">
.GroupReview {
  width: 100%;
  .mainbody {
    // width: 100%;
    height: calc(100% - 51px);
    background-color: #ffffff;
    padding: 0 20px 30px 20px;
    overflow: auto;
    box-sizing: border-box;
    .maintitle {
      //   display: flex;
      height: 30px;
      margin-top: 5px;
      vertical-align: middle;
      img {
        height: 30px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .suspro {
        vertical-align: middle;
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }

      .class {
        float: right;
        vertical-align: middle;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(138, 138, 138, 1);
        margin-right: 10px;
        // margin-top:3px;
      }
      .el-select {
        width: 125px;
        vertical-align: middle;
        float: right;
        .el-input__inner:focus {
          border-color: #8de1bc;
        }
        .el-input.is-focus {
          .el-input__inner {
            border: 1px solid #8de1bc;
          }
        }
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
  }
  .dialog {
    .el-dialog__header {
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      margin: 0 10px;
      padding-left: 0px;
    }
    .el-dialog__body {
      padding-top: 20px;
    }
  }
}
</style>
