<template>
  <div class="OrganizatioManage">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">学校STEM课程组织架构的管理，含有老师管理、学生管理、班级管理、小组管理</div>
    </div>
    <div class="mainbody">
      <div class="maintitle">
        <img src="../assets/pingtai@2x.png" alt>
        <div class="suspro">学生管理</div>
        <el-button
          icon="el-icon-plus"
          class="edit"
          size="mini"
          onMouseOver="this.style.backgroundColor='#efefef'"
        >新增</el-button>
        <el-button icon="el-icon-search" class="edit" size="mini">查询</el-button>
        <el-button class="edit" size="mini">小组</el-button>
        <el-button class="edit" size="mini" @click="getClassList">班级</el-button>
        <el-button class="edit" size="mini">老师</el-button>
        <el-button icon="el-icon-download" class="submit" size="mini" @click="dr">导入</el-button>

        <el-upload
          class="uploadfile"
          style="display:none"
          action
          :http-request="uploadFileMethod"
          :show-file-list="false"
          :before-upload="newEditorbeforeupload"
          ref="uniqueId"
          id="uniqueId"
          multiple
        ></el-upload>
      </div>
      <div class="table">
        <el-table
          :data="classData"
          border
          style="width: 100%"
          :row-style="{'color':'#333333','font-size':'16px'}"
          :header-cell-style="{'color':'#666666','font-size':'16px'}"
        >
          <el-table-column prop="classId" label="班级代码"></el-table-column>
          <el-table-column prop="className" label="班级名称"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Config from "../config/config.js";
export default {
  data() {
    return {
      classData: []
    };
  },
  mounted() {},
  methods: {
    getClassList() {
      this.http(this.api.getClassList).then(res => {
        console.log(res);
        this.classData = res.data.data;
      });
    },
    dr() {
      document.querySelector("#uniqueId input").click();
    },
    uploadFileMethod(param) {
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      this.http(this.api.uploadFile, formData).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "文件上传成功！"
          });
        }
      });
    },
    newEditorbeforeupload(file) {}
  }
};
</script>
<style lang="less">
.OrganizatioManage {
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
      .el-button {
        margin-top: 10px;
        float: right;
        width: 76px;
        height: 26px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(220, 220, 220, 1);
        border-radius: 5px;
        margin-left: 20px;
      }
      .submit {
        background-color: #8de1bc;
        color: #ffffff;
      }
    }
    .table {
      padding: 25px;
      .el-table__header {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
      }
    }
  }
}
</style>
