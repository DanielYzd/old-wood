<template>
  <div class="IntelligentEnhancement">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">关于书签制作的增加智能性、趣味性</div>
    </div>
    <div class="mainbody">
      <div class="maintitle">
        <img src="../../assets/znjq.png" alt>
        <div class="suspro">智能加强</div>
        <el-button icon="el-icon-plus" @click="add()">新增</el-button>
      </div>
      <el-card :body-style="{ padding: '0px' }" class="card" v-for="item in data" :key="item.id">
        <img src="../../assets/example.png" class="image">
        <div class="detail">
          <span style="font-size:18px;weight:bold;color:#2B4A7E">{{item.simpleTitle}}</span>
          <div class="time">
            <!-- <img src="../../assets/shijian1@2x.png" alt> -->
            <span style="font-size:12px;font-weight:bold;color:#666666">难度系数</span>
            <div class="love">
              <div :class="item" v-for="item in item.diffDegree" :key="item.id"></div>
            </div>
          </div>

          <el-button type="text" @click="view(item.intelligentId)">查看</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.getIntelligenteList();
  },
  methods: {
    view(id) {
      this.$router.push({
        path: `/IntelligentEnhancementDetail/${id}`
      });
    },
    add() {
      let body = {
        courseId: window.localStorage.getItem("courseId")
      };
      this.http(this.api.addIntelligent, body).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.getIntelligenteList();
        }
      });
    },
    getIntelligenteList() {
      let body = {
        courseId: window.localStorage.getItem("courseId")
      };
      this.http(this.api.getIntelligenteList, body).then(res => {
        if (res.data.code == "0000") {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].diffDegree == "0") {
              data[i].diffDegree = [
                "empty",
                "empty",
                "empty",
                "empty",
                "empty"
              ];
            } else if (data[i].diffDegree == "1") {
              data[i].diffDegree = ["full", "empty", "empty", "empty", "empty"];
            } else if (data[i].diffDegree == "2") {
              data[i].diffDegree = ["full", "full", "empty", "empty", "empty"];
            } else if (data[i].diffDegree == "3") {
              data[i].diffDegree = ["full", "full", "full", "empty", "empty"];
            } else if (data[i].diffDegree == "4") {
              data[i].diffDegree = ["full", "full", "full", "full", "empty"];
            } else if (data[i].diffDegree == "5") {
              data[i].diffDegree = ["full", "full", "full", "full", "full"];
            } else if (data[i].diffDegree == null) {
              data[i].diffDegree = [
                "empty",
                "empty",
                "empty",
                "empty",
                "empty"
              ];
            }
          }
          this.data = data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.IntelligentEnhancement {
  width: 100%;
  .mainbody {
    // width: 100%;
    height: calc(100% - 51px);
    background-color: #ffffff;
    padding: 0 20px 30px 20px;
    overflow: auto;
    box-sizing: border-box;
    .maintitle {
      width: 100%;
      // display: flex;
      height: 30px;
      margin-top: 5px;
      vertical-align: middle;
      img {
        height: 30px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .suspro {
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        vertical-align: middle;
        display: inline-block;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .el-button {
        vertical-align: middle;
        width: 76px;
        height: 26px;
        // background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(220, 220, 220, 1);
        border-radius: 5px;
        font-size: 14px;
        padding: 0;
        float: right;
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
          //   margin-top: 10px;
          //   img {
          //     // margin-left: 70px;
          //     vertical-align: middle;
          //   }
          span {
            // height: 100%;
            height: 20px;
            vertical-align: middle;
            display: inline-block;
            margin-left: 8px;
          }
          .love {
            display: inline;
            vertical-align: middle;
            padding-left: 50px;
          }
        }
        .el-button {
          float: right;
          font-size: 16px;
          color: #40a9b0;
          font-weight: bold;

          // margin-left: 25px;
        }
      }
    }
  }
}
</style>
