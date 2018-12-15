<template>
  <div class="CreativeDesign">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">书签制作的模仿视频，一般是多个步骤。</div>
    </div>
    <div class="mainbody">
      <div class="maintitle">
        <img src="../../assets/create.png" alt>
        <div class="suspro">创意设计</div>

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
        <img :src="item.picUrl" class="image">
        <div class="detail">
          <div class="time">
            <span style="font-size:18px;weight:bold;color:#2B4A7E">{{item.simpleTitle}}</span>
            <span
              style="font-size:12px;font-weight:bold;color:#666666;margin-left:80px;"
            >作者：{{item.studentName}}</span>
          </div>
          <el-button type="text" @click="see(item.designId)">查看</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      classList: [],
      value: ""
    };
  },
  mounted() {
    this.getClassList();
  },
  methods: {
    change() {
      this.getDesignList(this.value);
    },
    getDesignList(classId) {
      let body = {
        courseId: window.localStorage.getItem("courseId"),
        classId: classId
      };
      this.http(this.api.getDesignList, body).then(res => {
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
            this.getDesignList(this.value);
          } else {
            this.$message({
              type: "warning",
              message: "获取班级列表失败！"
            });
          }
        }
      });
    },
    see(id) {
      this.$router.push({
        path: `/CreativeDesignDetail/${id}`
      });
    }
  }
};
</script>
<style lang="less" >
.CreativeDesign {
  width: 100%;
  .mainbody {
    // width: 100%;
    height: calc(100% - 51px);
    background-color: #ffffff;
    padding: 0 20px 30px 20px;
    overflow: auto;
    box-sizing: border-box;
    .maintitle {
      // display: flex;
      height: 30px;
      margin-top: 5px;
      img {
        height: 30px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .suspro {
        vertical-align: middle;
        display: inline-block;
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .class{
        float: right;
        vertical-align: middle;
        height:30px;
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
}
</style>
