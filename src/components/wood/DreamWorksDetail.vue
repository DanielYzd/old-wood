<template>
  <div class="DreamWorksDetail">
    <div class="child_head">
      <span class="block"></span>
      <span class="child_title">{{title}}</span>
      <div class="edit">
        <el-button size="mini" icon="el-icon-edit" @click="editTitle" circle></el-button>
      </div>
      <div class="back">
        <el-button icon="el-icon-back" size="mini" @click="back">返回</el-button>
      </div>
    </div>
    <div class="mainbody">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="title">
              <img src="../../assets/dream.png" alt>
              <span>梦工厂</span>
            </div>
          </template>
          <div class="content" v-html="designModify">{{designModify}}</div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="title">
              <img src="../../assets/dream.png" alt>
              <span>完成情况</span>
            </div>
          </template>
          <div class="completionstatus">
            <div class="flex">
              <div :class="statusA?'status2':'status1'">成功</div>
            </div>
            <div class="flex">
              <div :class="statusB?'status2':'status1'">部分完成</div>
            </div>
            <div class="flex">
              <div :class="statusC?'status2':'status1'">放弃</div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="title">
              <img src="../../assets/dream.png" alt>
              <span>写写体会</span>
            </div>
          </template>
          <div class="content2" v-html="experience">{{experience}}</div>
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
      statusA: false,
      statusB: false,
      statusC: false,
      experience: "",
      designModify: "",
      title: "",
      title2: "",
      url: "",
      simpletitle: "",
      editvisible: false
    };
  },
  mounted() {
    this.getDream();
    console.log(this.status == "A");
  },
  methods: {
     editTitle() {
      this.editvisible = true;
      this.title2 = this.title;
      this.simpletitle = this.$route.params.title;
    },
     onSubmit() {
      let body = {
        idName: "dreamId",
        idValue: this.$route.params.id,
        picUrl: this.url,
        tableName: "tbl_school_dream",
        title: this.title2,
        simpleTitle: this.simpletitle
      };
      this.http(this.api.setTitleByID, body).then(res => {
        if (res.data.code === "0000") {
          this.$message.success("操作成功");
          this.editvisible = false;
          this.getDream();
        }
      });
    },
    getDream() {
      let body = {
        dreamId: this.$route.params.id
      };
      this.http(this.api.getDream, body).then(res => {
        if (res.data.code == "0000") {
          let status = res.data.data.status;
          switch (status) {
            case "A":
              this.statusA = true;
              break;
            case "B":
              this.statusB = true;
              break;
            case "C":
              this.statusC = true;
              break;
          }
          this.experience = res.data.data.experience;
          this.designModify = res.data.data.designModify;
          this.title=res.data.data.title;
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
.DreamWorksDetail {
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
      .completionstatus {
        padding: 40px 82px 30px 80px;
        display: flex;
        .flex {
          flex: 1;
          .status1 {
            flex: 1;
            width: 120px;
            height: 32px;
            background: rgba(229, 229, 229, 1);
            border: 2px solid rgba(220, 220, 220, 1);
            border-radius: 15px;
            font-size: 16px;
            text-align: center;
            line-height: 32px;
            color: #333333;
          }
          .status2 {
            flex: 1;
            width: 120px;
            height: 32px;
            background: #8de1bc;
            border: 2px solid rgba(220, 220, 220, 1);
            border-radius: 15px;
            font-size: 16px;
            text-align: center;
            line-height: 32px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
