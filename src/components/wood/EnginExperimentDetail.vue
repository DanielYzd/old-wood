<template>
  <div class="EnginExperimentDetail">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">关于书签制作的实验内容和执行情况</div>
      <el-button icon="el-icon-back" size="mini" @click="back">返回</el-button>
    </div>
    <div class="mainbody">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="title">
              <img src="../../assets/set.png" alt>
              <span>工程实验</span>
              <el-button icon="el-icon-edit" @click.stop="edit()">编辑</el-button>
            </div>
          </template>
          <div v-html="content" class="content">{{content}}</div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="title">
              <img src="../../assets/set.png" alt>
              <span>学生实验列表</span>
              <!-- <el-button icon="el-icon-edit" @click.stop="edit(2)">编辑</el-button> -->
            </div>
          </template>
          <div class="table">
            <el-table
              :data="experimentList"
              border
              style="width: 100%"
              :row-style="{'color':'#333333','font-size':'16px'}"
              :header-cell-style="{'color':'#666666','font-size':'16px'}"
            >
              <el-table-column prop="className" label="班级"></el-table-column>
              <el-table-column prop="studentName" label="学生"></el-table-column>
              <el-table-column prop="groupName" label="小组"></el-table-column>
              <el-table-column prop="lastUpdateDate" label="提交时间"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <img
                    src="/static/ckgc1.png"
                    onmouseover="this.src=('/static/ckgc2.png')"
                    onmouseout="this.src=('/static/ckgc1.png')"
                    @click="record(scope.row.experimentRecord)"
                  >
                  <img
                    src="/static/cg1.png"
                    onmouseover="this.src=('/static/cg2.png')"
                    onmouseout="this.src=('/static/cg1.png')"
                    @click="result(scope.row.experimentResult)"
                  >
                  <img
                    src="/static/bj1.png"
                    onmouseover="this.src=('/static/bj2.png')"
                    onmouseout="this.src=('/static/bj1.png')"
                    @click="comment(scope.row.comment,scope.row.experimentDetailId)"
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-dialog
        :visible.sync="dialogVisible"
        width="60%"
        custom-class="dialog"
        :close-on-click-modal="false"
        top="7vh"
        :beforeClose="close"
      >
        <ue :content="childcontent" ref="ue" v-on:childByValue="childByValue" v-if="hackReset"></ue>
      </el-dialog>

      <el-dialog
        :visible.sync="showVisible"
        width="60%"
        :title="title"
        custom-class="dialog"
        :close-on-click-modal="false"
        top="15vh"
      >
        <div class="content2">{{content2}}</div>
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
      content: "",
      content2: "",
      experimentDetailId: "",
      title: "",
      experimentList: [],
      activeNames: ["1","2"],
      childcontent: "",
      dialogVisible: false,
      showVisible: false,
      hackReset: true,
      tag: ""
    };
  },
  created() {
    this.getExperiment();
    this.getExperimentDetailList();
  },
  methods: {
    record(experimentRecord) {
      this.showVisible = true;
      this.content2 = experimentRecord;
      this.title = "学生实验过程记录";
    },
    result(experimentResult) {
      this.showVisible = true;
      this.content2 = experimentResult;
      this.title = "学生实验结果";
    },
    getExperiment() {
      let body = {
        experimentId: this.$route.params.id
      };
      this.http(this.api.getExperiment, body).then(res => {
        if (res.data.code == "0000") {
          let data = res.data.data;
          this.content = data.content;
        }
      });
    },
    getExperimentDetailList() {
      let body = {
        experimentId: this.$route.params.id
      };
      this.http(this.api.getExperimentDetailList, body).then(res => {
        if (res.data.code == "0000") {
          this.experimentList = res.data.data;
        }
      });
    },
    setFieldByID(fieldName, data) {
      let body = {
        tableName: "tbl_school_experiment",
        fieldName: fieldName,
        // courseId: window.localStorage.getItem("courseId"),
        idName: "experimentId",
        idValue: this.$route.params.id,
        data: data
      };
      this.http(this.api.setFieldByID, body).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.getExperimentDetailList();
        }
      });
    },
    setFieldByID2(fieldName, data) {
      let body = {
        tableName: "tbl_school_experimentDetail",
        fieldName: fieldName,
        // courseId: window.localStorage.getItem("courseId"),
        idName: "experimentDetailId",
        idValue: this.experimentDetailId,
        data: data
      };
      this.http(this.api.setFieldByID, body).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.getExperimentDetailList();
        }
      });
    },
    // setFieldByID(fieldName, data) {
    //   let body = {
    //     data: data,
    //     fieldName: fieldName,
    //     idName: "experimentDetailId",
    //     idValue: this.experimentDetailId,
    //     tableName: "tbl_school_experimentDetail"
    //   };
    //   this.http(this.api.setFieldByID, body).then(res => {
    //     if(res.data.code=="0000"){
    //       this.$message({
    //         type:"success",
    //         message:"操作成功！"
    //       })
    //       this.getExperimentDetailList();
    //     }
    //   });
    // },
    handleChange(val) {
      console.log(val);
    },
    edit() {
      this.childcontent = this.content;
      this.dialogVisible = true;
      this.tag = 1;
      this.$nextTick(() => {
        this.hackReset = true; //重建组件
      });
    },
    comment(comment, experimentDetailId) {
      this.experimentDetailId = experimentDetailId;
      this.childcontent = comment;
      this.dialogVisible = true;
      this.tag = 2;
      this.$nextTick(() => {
        this.hackReset = true; //重建组件
      });
    },

    close() {
      this.hackReset = false;
      this.dialogVisible = false;
    },
    back() {
      this.$router.push("/EnginExperiment");
    },
    childByValue: function(childValue) {
      // childValue就是子组件传过来的值
      // this.content = childValue;
      switch (this.tag) {
        case 1:
          this.content = childValue;
          this.setFieldByID("content", childValue);
          break;
        case 2:
          this.setFieldByID2("comment", childValue);
          break;
      }
      this.hackReset = false;
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.EnginExperimentDetail {
  width: 100%;
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
      // .el-button:hover {
      //   color: #8de1bc;
      //   border-color: none;
      //   background-color: #8de1bc;
      // }
    }
    .el-collapse-item {
      margin-bottom: 8px;
      .table {
        padding: 20px;
        img {
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
    .content2 {
      min-height: 400px;
    }
  }
}
</style>
