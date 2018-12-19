<template>
  <div class="CreativeDesignDetail">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">{{title}}</div>
      <div class="edit">
        <el-button size="mini" icon="el-icon-edit" @click="editTitle" circle></el-button>
      </div>
      <div class="back">
        <el-button icon="el-icon-back" size="mini" @click="back"   type="primary">返回</el-button>
      </div>
    </div>
    <div class="mainbody">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="title">
              <img src="../../assets/create.png" alt>
              <span>创意构图</span>
            </div>
          </template>
          <div class="content" v-html="idea">{{idea}}</div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="title">
              <img src="../../assets/create.png" alt>
              <span>创意表达</span>
            </div>
          </template>
          <div class="content" v-html="express">{{express}}</div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="title">
              <img src="../../assets/jiaoliu.png" alt>
              <span>同桌交流启示</span>
            </div>
          </template>
          <div class="content" v-html="enlightenment">{{enlightenment}}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="editTtitle">
      <el-dialog title="修改标题" :visible.sync="editvisible">
        <el-form ref="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="title2"></el-input>
          </el-form-item>
          <el-form-item label="简写标题">
            <el-input v-model="simpletitle"></el-input>
          </el-form-item>
          <el-form-item label="图片地址">
            <el-input v-model="url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="editvisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1", "2", "3"],
      idea: "",
      express: "",
      enlightenment: "",
      title: "",
      editvisible: false,
      title2: "",
      simpletitle: "",
      url: ""
    };
  },
  mounted() {
    this.getDesign();
  },
  methods: {
    editTitle() {
      this.editvisible = true;
      this.title2 = this.title;
      this.simpletitle = this.$route.params.title;
    },
    onSubmit() {
      let body = {
        idName: "designId",
        idValue: this.$route.params.id,
        picUrl: this.url,
        tableName: "tbl_school_design",
        title: this.title2,
        simpleTitle: this.simpletitle
      };
      this.http(this.api.setTitleByID, body).then(res => {
        if (res.data.code === "0000") {
          this.$message.success("操作成功");
          this.editvisible = false;
          this.getDesign();
        }
      });
    },
    getDesign() {
      let body = {
        designId: this.$route.params.id
      };
      this.http(this.api.getDesign, body).then(res => {
        console.log(res);
        if (res.data.code == "0000") {
          let data = res.data.data;
          if (data) {
            this.idea = data.idea;
            this.express = data.express;
            this.enlightenment = data.enlightenment;
            this.title = data.title;
          }
        }
      });
    },
    handleChange(val) {
      console.log(val);
    },
    back() {
      this.$router.push("/CreativeDesign");
    }
  }
};
</script>
<style lang="less" scoped>
.CreativeDesignDetail {
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
