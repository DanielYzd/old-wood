<template>
  <div class="GeneralReading">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">提供脑图给学生使用</div>
    </div>
    <div class="mainbody">
      <div class="top">
        <div class="suscribetitle">
          <img src="../../assets/reading.png" alt>
          <span>思维图</span>
          <el-button icon="el-icon-plus" @click="add()">新增</el-button>
        </div>
        <el-card
          :body-style="{ padding: '0px' }"
          class="card"
          v-for="(item,index) in data"
          :key="index"
        >
          <img src="../../assets/1111.png" class="image">
          <div class="detail">
            <span>{{item.simpleTitle}}</span>
            <el-button @click="watch(item.mindId,item.simpleTitle)">查看</el-button>
            <el-button @click="edit(item.mindId)">编辑</el-button>
            <el-button @click="del(item.mindId)">删除</el-button>
          </div>
        </el-card>
      </div>
      <div class="bottom">
        <div class="suscribetitle">
          <img src="../../assets/reading.png" alt>
          <div class="suspro">脑洞开开开</div>
        </div>
        <div class="table">
          <el-table
            :data="tabledata"
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
                  src="/static/view1.png"
                  onmouseover="this.src=('/static/view2.png')"
                  onmouseout="this.src=('/static/view1.png')"
                  @click="view(scope.row.studentId,scope.row.studentName)"
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-dialog
        :visible.sync="showVisible"
        width="60%"
        :title="title"
        custom-class="dialog"
        :close-on-click-modal="false"
        top="15vh"
      >
        <template slot="title">{{title}}</template>
        <div  v-html="content">{{content}}</div>
      </el-dialog>
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
      data: [],
      tabledata: [],
      showVisible: false,
      dialogVisible: false,
      childcontent: "",
      content: "",
      title: "",
      hackReset: false,
      mindId:'',
    };
  },
  mounted() {
    this.getMindList();
    this.getMindDetailList();
  },
  methods: {
    del(mindId) {
      let body = {
        mindId: mindId
      };
      this.http(this.api.delMind, body).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.getMindList();
        }
      });
    },
    manage() {
      this.getMindList();
    },
    getMindList() {
      let body = {
        courseId: window.localStorage.getItem("courseId")
      };
      this.http(this.api.getMindList, body).then(res => {
        if (res.data.code == "0000") {
          this.data = res.data.data;
        }
      });
    },
    getMindDetailList() {
      let body = {
        courseId: window.localStorage.getItem("courseId")
      };
      this.http(this.api.getMindDetailList, body).then(res => {
        if (res.data.code == "0000") {
          this.tabledata = res.data.data;
        }
      });
    },
    view(studentId, studentName) {
      this.title = studentName;
      let body = {
        studentId: studentId,
        courseId: window.localStorage.getItem("courseId")
      };
      this.http(this.api.getMindDetail, body).then(res => {
        if (res.data.code == "0000") {
          this.showVisible = true;
          this.content = res.data.data.summary;
        }
      });
    },
    edit(mindId) {
      this.mindId=mindId;
      let body = {
        mindId: mindId
      };
      this.http(this.api.getMind, body).then(res => {
        if (res.data.code == "0000") {
          this.childcontent = res.data.data.content;
          this.dialogVisible = true;
          this.tag = 1;
          this.$nextTick(() => {
            this.hackReset = true; //重建组件
          });
        }
      });
    },
    setMind(content){
      let body={
        mindId:this.mindId,
        content:content
      }
      this.http(this.api.setMind,body).then(res=>{
          if(res.data.code=="0000"){
            this.$message({
              type:'success',
              message:'操作成功！'
            })
          }
      })
    },
     childByValue: function(childValue) {
      // childValue就是子组件传过来的值
      // this.content = childValue;
      switch (this.tag) {
        case 1:
         this.setMind(childValue);
          break;
      }
      this.hackReset = false;
      this.dialogVisible = false;
    },
    close() {
      this.hackReset = false;
      this.dialogVisible = false;
    },
    add() {
      let body = {
        courseId: window.localStorage.getItem("courseId")
      };
      this.http(this.api.addMind, body).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.getMindList();
        }
      });
    },
    watch(mindId, simpleTitle) {
      let body = {
        mindId: mindId
      };
      this.title = simpleTitle;
      this.http(this.api.getMind, body).then(res => {
        if (res.data.code == "0000") {
          this.showVisible = true;
          this.content = res.data.data.content;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.GeneralReading {
  width: 100%;

  .mainbody {
    height: calc(100% - 51px);
    overflow: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    display: flex;
    .top {
      flex: 1;
      box-sizing: border-box;
      padding: 0 20px 30px 20px;
      background-color: #ffffff;
      width: 100%;
      .suscribetitle {
        height: 30px;
        margin-top: 5px;
        vertical-align: middle;
        img {
          height: 30px;
          margin-right: 10px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          font-size: 16px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
        .el-button {
          float: right;
          width: 76px;
          height: 26px;
          vertical-align: middle;
          border: 1px solid rgba(220, 220, 220, 1);
          border-radius: 5px;
          font-size: 14px;
          padding: 0;
        }
      }
      .card {
        width: 238px;
        height: 234px;
        background: rgba(255, 255, 255, 1);
        // border-radius: 5px;
        float: left;
        margin: 15px;
        span {
          display: inline-block;
          margin-left: 10px;
          font-size: 18px;
          font-family: PingFang-SC-Medium;
          font-weight: bold;
          color: rgba(43, 74, 126, 1);
        }
        .el-button {
          padding: 0;
          margin-right: 10px;
          margin-top: 5px;
          font-size: 16px;
          color: #40a9b0;
          font-weight: bold;
          float: right;
          margin-left: 8px;
          border: 0px;
        }
      }
    }
    .bottom {
      flex: 1;
      margin-top: 10px;
      padding: 0 20px 30px 20px;
      box-sizing: border-box;
      background-color: #ffffff;
      width: 100%;

      .suscribetitle {
        display: flex;
        height: 30px;
        margin-top: 5px;
        img {
          height: 30px;
          margin-right: 10px;
        }
        .suspro {
          height: 16px;
          font-size: 16px;
          font-family: PingFang-SC-Medium;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 30px;
        }
      }

      .table {
        padding: 20px;
      }
    }
  }
}
</style>
