<template>
  <div class="KnowledgeHint">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">{{title}}</div>
    </div>
    <div class="mainbody">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="title">
              <img src="../../assets/tishi.png" alt>
              <span>知识点1</span>
              <el-button icon="el-icon-edit" @click.stop="edit(1)">编辑</el-button>
            </div>
          </template>
          <div v-html="knowledge1" class="content">{{knowledge1}}</div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="title">
              <img src="../../assets/tishi.png" alt>
              <span>知识点2</span>
              <el-button icon="el-icon-edit" @click.stop="edit(2)">编辑</el-button>
            </div>
          </template>
          <div v-html="knowledge2" class="content">{{knowledge2}}</div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="title">
              <img src="../../assets/tishi.png" alt>
              <span>知识点3</span>
              <el-button icon="el-icon-edit" @click.stop="edit(3)">编辑</el-button>
            </div>
          </template>
          <div v-html="knowledge3" class="content">{{knowledge3}}</div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <div class="title">
              <img src="../../assets/tishi.png" alt>
              <span>知识点4</span>
              <el-button icon="el-icon-edit" @click.stop="edit(4)">编辑</el-button>
            </div>
          </template>
          <div v-html="knowledge4" class="content">{{knowledge4}}</div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <div class="title">
              <img src="../../assets/tishi.png" alt>
              <span>知识点5</span>
              <el-button icon="el-icon-edit" @click.stop="edit(5)">编辑</el-button>
            </div>
          </template>
          <div v-html="knowledge5" class="content">{{knowledge5}}</div>
        </el-collapse-item>
      </el-collapse>
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
      knowledge1: "",
      knowledge2: "",
      knowledge3: "",
      knowledge4: "",
      knowledge5: "",
       activeNames: ["1","2","3","4","5"],
      childcontent: "",
      dialogVisible: false,
      hackReset: true,
      tag: "",
      title:''
    };
  },
  created() {
    this.getknowledge();
     let body = {
      functionId: "0102004"
    };
    this.http(this.api.getFunctionDesc, body).then(res => {
      this.title = res.data.data;
    });
  },
  methods: {
    getknowledge() {
      let body = {
        courseId: window.localStorage.getItem("courseId")
      };
      this.http(this.api.getknowledge, body).then(res => {
        console.log(res);
        if (res.data.code == "0000") {
          let data = res.data.data;
          if (data) {
            this.knowledge1 = data.knowledge1;
            this.knowledge2 = data.knowledge2;
            this.knowledge3 = data.knowledge3;
            this.knowledge4 = data.knowledge4;
            this.knowledge5 = data.knowledge5;
          }
        }
      });
    },
    setField(fieldName, data) {
      let body = {
        tableName: "tbl_school_knowledge",
        fieldName: fieldName,
        courseId: window.localStorage.getItem("courseId"),
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
    handleChange(val) {
      console.log(val);
    },
    edit(number) {
      console.log(number);
      switch (number) {
        case 1:
          this.childcontent = this.knowledge1;
          this.tag = 1;
          break;
        case 2:
          this.childcontent = this.knowledge2;
          this.tag = 2;
          break;
        case 3:
          this.childcontent = this.knowledge3;
          this.tag = 3;
          break;
        case 4:
          this.childcontent = this.knowledge4;
          this.tag = 4;
          break;
        case 5:
          this.childcontent = this.knowledge5;
          this.tag = 5;
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
          this.knowledge1 = childValue;
          this.setField("knowledge1", childValue);
          break;
        case 2:
          this.knowledge2 = childValue;
          this.setField("knowledge2", childValue);
          break;
        case 3:
          this.knowledge3 = childValue;
          this.setField("knowledge2", childValue);
          break;
        case 4:
          this.knowledge4 = childValue;
          this.setField("knowledge2", childValue);
          break;
        case 5:
          this.knowledge5 = childValue;
          this.setField("knowledge2", childValue);
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
.KnowledgeHint {
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
    }
    .el-collapse-item {
      margin-bottom: 8px;
    }
  }
}
</style>
