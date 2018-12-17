<template>
  <div class="IntelligentEnhancementDetail">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">关于书签制作的智能加强的内容管理</div>
      <el-button icon="el-icon-back" size="mini" @click="back">返回</el-button>
    </div>
    <div class="mainbody">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="title">
              <img src="../../assets/znjq.png" alt>
              <span>智能知识提示</span>
              <el-button icon="el-icon-edit" @click.stop="edit(1)">编辑</el-button>
            </div>
          </template>
          <div v-html="comment" class="content">{{comment}}</div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="title">
              <img src="../../assets/znjq.png" alt>
              <span>操作要点</span>
              <el-button icon="el-icon-edit" @click.stop="edit(2)">编辑</el-button>
            </div>
          </template>
          <div v-html="process" class="content">{{process}}</div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="title">
              <img src="../../assets/znjq.png" alt>
              <span>注意事项</span>
              <el-button icon="el-icon-edit" @click.stop="edit(3)">编辑</el-button>
            </div>
          </template>
          <div v-html="notice" class="content">{{notice}}</div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <div class="title">
              <img src="../../assets/znjq.png" alt>
              <span>其他</span>
              <el-button icon="el-icon-edit" @click.stop="edit(4)">编辑</el-button>
            </div>
          </template>
          <div v-html="other" class="content">{{other}}</div>
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
      comment: "",
      process: "",
      notice: "",
      other: "",
      activeNames: ["1"],
      childcontent: "",
      dialogVisible: false,
      hackReset: true,
      tag: ""
    };
  },
  created() {
    this.getIntelligente();
  },
  methods: {
    getIntelligente() {
      let body = {
        intelligentId: this.$route.params.id
      };
      this.http(this.api.getIntelligente, body).then(res => {
        console.log(res);
        if (res.data.code == "0000") {
          let data = res.data.data;
          this.comment = data.comment;
          this.process = data.process;
          this.notice = data.notice;
          this.other = data.other;
        }
      });
    },

    setFieldByID(fieldName, data) {
      let body = {
        tableName: "tbl_school_intelligent",
        fieldName: fieldName,
        idName: "intelligentId",
        idValue: this.$route.params.id,
        data: data
      };
      this.http(this.api.setFieldByID, body).then(res => {
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
          this.childcontent = this.comment;
          this.tag = 1;
          break;
        case 2:
          this.childcontent = this.process;
          this.tag = 2;
          break;
        case 3:
          this.childcontent = this.notice;
          this.tag = 3;
          break;
        case 4:
          this.childcontent = this.other;
          this.tag = 4;
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
    back() {
      this.$router.push("/IntelligentEnhancement");
    },
    childByValue: function(childValue) {
      // childValue就是子组件传过来的值
      console.log(childValue);
      switch (this.tag) {
        case 1:
          this.comment = childValue;
          this.setFieldByID("comment", childValue);
          break;
        case 2:
          this.process = childValue;
          this.setFieldByID("process", childValue);
          break;
        case 3:
          this.notice = childValue;
          this.setFieldByID("notice", childValue);
          break;
        case 4:
          this.other = childValue;
          this.setFieldByID("other", childValue);
          break;
      }
      this.hackReset = false;
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.IntelligentEnhancementDetail {
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
    }
  }
}
</style>
