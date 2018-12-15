<template>
  <div class="projecintro">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">书签制作的介绍，以及该项目在本校的教学课程分析、排课情况。对于内容在平台的基础上可以修改编辑.</div>
    </div>
    <div class="body">
      <div class="top">
        <div class="title">
          <img src="../../assets/miaoshu@2x.png" alt>
          <span>任务描述</span>
          <el-button icon="el-icon-edit" @click="edit(1)">编辑</el-button>
          <!-- <el-button icon="el-icon-date">排课信息</el-button>
          <el-button icon="el-icon-share">课程分析</el-button>-->
        </div>
        <div class="content" v-html="content1">{{content1}}</div>
      </div>
      <div class="middle">
        <div class="title">
          <img src="../../assets/miaoshu@2x.png" alt>
          <span>制作材料和工具</span>
          <el-button icon="el-icon-edit" @click="edit(2)">编辑</el-button>
        </div>
        <div class="content" v-html="content2">{{content2}}</div>
      </div>
      <div class="bottom">
        <div class="title">
          <img src="../../assets/miaoshu@2x.png" alt>
          <span>实验材料和工具</span>
          <el-button icon="el-icon-edit" @click="edit(3)">编辑</el-button>
        </div>
        <div class="content" v-html="content3">{{content3}}</div>
      </div>

      <el-dialog
        :visible.sync="dialogVisible"
        width="80%"
        custom-class="dialog"
        :close-on-click-modal="false"
        top="7vh"
        :beforeClose="close"
      >
        <ue :content="childcontent" ref="ue" v-on:childByValue="childByValue" v-if="hackReset"></ue>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import ue from "../Ue.vue";
export default {
  components: {
    ue
  },
  data() {
    return {
      content1: "",
      content2: "",
      content3: "",
      childcontent: "",
      dialogVisible: false,
      hackReset: true,
      tag: ""
    };
  },
  created() {
    this.getFieldBydescription();
    this.getFieldBymaterial();
    this.getFieldByexperiment();
  },
  methods: {
    getFieldBydescription() {
      let body = {
        tableName: "tbl_school_course",
        fieldName: "description",
        courseId: window.localStorage.getItem('courseId')
      };
      this.http(this.api.getField, body).then(res => {
        this.content1 = res.data.data;
      });
    },
    getFieldBymaterial() {
      let body = {
        tableName: "tbl_school_course",
        fieldName: "material",
         courseId: window.localStorage.getItem('courseId')
      };
      this.http(this.api.getField, body).then(res => {
        this.content2 = res.data.data;
      });
    },
    getFieldByexperiment() {
      let body = {
        tableName: "tbl_school_course",
        fieldName: "experiment",
        courseId: window.localStorage.getItem('courseId')
      };
      this.http(this.api.getField, body).then(res => {
        this.content3 = res.data.data;
      });
    },
    setField(fieldName, data) {
      let body = {
        tableName: "tbl_school_course",
        fieldName: fieldName,
        courseId: window.localStorage.getItem('courseId'),
        data: data
      };
      this.http(this.api.setField, body).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }
      });
    },
    edit(number) {
      console.log(number);
      switch (number) {
        case 1:
          this.childcontent = this.content1;
          this.tag = 1;
          break;
        case 2:
          this.childcontent = this.content2;
          this.tag = 2;
          break;
        case 3:
          this.childcontent = this.content3;
          this.tag = 3;
          break;
      }

      this.dialogVisible = true;
      this.$nextTick(() => {
        this.hackReset = true; //重建组件
      });
    },
    close() {
      this.hackReset = false;
      this.dialogVisible = false;
    },
    childByValue: function(childValue) {
      // childValue就是子组件传过来的值
      console.log(childValue);
      switch (this.tag) {
        case 1:
          this.content1 = childValue;
          this.setField("description", childValue);
          break;
        case 2:
          this.content2 = childValue;
          this.setField("material", childValue);
          break;
        case 3:
          this.content3 = childValue;
          this.setField("experiment", childValue);
          break;
      }
      // this.content1 = childValue;
      this.hackReset = false;
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.projecintro {
  width: 100%;
  .body {
    height: calc(100% - 51px);
    display: flex;
    flex-direction: column;
    overflow: auto;
    .top {
      flex: 6;
      background-color: #ffffff;
      //   padding:65px 20px 20px 55px;
      .title {
        height: 40px;
        clear: both;
        vertical-align: middle;
        padding-top: 10px;
        img {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          display: inline-block;
          font-size: 16px;
          font-family: PingFang-SC-Medium;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
        .el-button {
          float: right;
          //   width: 103px;
          padding: 0 4px;
          height: 26px;
          margin: 10px;
          font-size: 14px;
          font-family: PingFang-SC-Regular;
          font-weight: bold;
          color: rgba(138, 138, 138, 1);
        }
      }
    }
    .middle {
      flex: 7;
      background-color: #ffffff;
      margin-top: 8px;
      .title {
        height: 40px;
        clear: both;
        vertical-align: middle;
        padding-top: 10px;
        img {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          display: inline-block;
          font-size: 16px;
          font-family: PingFang-SC-Medium;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
        .el-button {
          float: right;
          //   width: 103px;
          padding: 0 4px;
          height: 26px;
          margin: 10px;
          font-size: 14px;
          font-family: PingFang-SC-Regular;
          font-weight: bold;
          color: rgba(138, 138, 138, 1);
        }
      }
    }
    .bottom {
      flex: 2;
      background-color: #ffffff;
      margin-top: 8px;
      .title {
        height: 40px;
        clear: both;
        vertical-align: middle;
        padding-top: 10px;
        img {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          display: inline-block;
          font-size: 16px;
          font-family: PingFang-SC-Medium;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
        .el-button {
          float: right;
          //   width: 103px;
          padding: 0 4px;
          height: 26px;
          margin: 10px;
          font-size: 14px;
          font-family: PingFang-SC-Regular;
          font-weight: bold;
          color: rgba(138, 138, 138, 1);
        }
      }
    }
  }
}
</style>
