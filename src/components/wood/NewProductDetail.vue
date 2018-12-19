<template>
  <div class="NewProductDetail">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">以全班为对象，对小组的作品进行评比和推广</div>
      <div class="back">
        <el-button icon="el-icon-back" size="mini" @click="back">返回</el-button>
      </div>
    </div>
    <div class="mainbody">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="title">
              <img src="../../assets/new.png" alt>
              <span>新品推广会</span>
              <!-- <span style="font-size:16px;color:#999999;margin-left:10px;">{{simpleTitle}}</span> -->
              <el-button icon="el-icon-edit" @click.stop="edit()">编辑</el-button>
            </div>
          </template>
          <div v-html="requires" class="content"></div>
          <div class="type">
            <span>推广方式</span>
            <el-select v-model="value" size="mini" placeholder="请选择">
              <el-option
                disabled
                v-for="(item,index) in select"
                :label="item.label"
                :key="index"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="title">
              <img src="../../assets/new.png" alt>
              <span>老师点评</span>
            </div>
          </template>
          <div class="content">
            <el-card
              :body-style="{ padding: '0px' }"
              class="card"
              v-for="item in data "
              :key="item.id"
            >
              <img src="../../assets/example.png" class="image">
              <div class="detail">
                <div class="group">{{item.groupName}}</div>

                <div class="love">
                  <div :class="item" v-for="item in item.score" :key="item.id"></div>
                  <el-button style="float:right" type="text">查看</el-button>
                </div>
              </div>
            </el-card>
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
    </div>
  </div>
</template>
<script>
import ue from "../UeNewProduct.vue";
export default {
  components: {
    ue
  },
  data() {
    return {
      data: [],
      activeNames: ["1", "2"],
      requires: "",
      simpleTitle: "",
      dialogVisible: false,
      childcont: "",
      hackReset: false,
      value: "",
      select: [
        { value: "A", label: "商品交易" },
        { value: "B", label: "海报" },
        { value: "C", label: "其他" }
      ]
    };
  },
  mounted() {
    this.getPopularize();
  },
  methods: {
    setFieldByID(fieldName, data) {
      let body = {
        tableName: "tbl_school_popularize",
        fieldName: fieldName,
        // courseId: window.localStorage.getItem("courseId"),
        idName: "popularizeId",
        idValue: this.$route.params.id,
        data: data
      };
      this.http(this.api.setFieldByID, body).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.getPopularize();
        }
      });
    },
    childByValue: function(childValue) {
      // childValue就是子组件传过来的值
      // this.content = childValue;
      switch (this.tag) {
        case 1:
          this.requires = childValue;
          this.setFieldByID("requires", childValue);
          break;
      }
      this.hackReset = false;
      this.dialogVisible = false;
    },
    edit() {
      this.childcontent = this.requires;
      this.dialogVisible = true;
      this.tag = 1;
      this.$nextTick(() => {
        this.hackReset = true; //重建组件
      });
    },
    close() {
      this.hackReset = false;
      this.dialogVisible = false;
    },
    getPopularize() {
      let body = {
        popularizeId: this.$route.params.id
      };
      this.http(this.api.getPopularize, body).then(res => {
        console.log(res);
        this.requires = res.data.data.requires;
        this.simpleTitle = res.data.data.simpleTitle;
        this.value = res.data.data.popularizeType;
        let data = res.data.data.detailList;
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].score);
          if (data[i].score == "0") {
            data[i].score = ["empty", "empty", "empty", "empty", "empty"];
          } else if (data[i].score == "1") {
            data[i].score = ["full", "empty", "empty", "empty", "empty"];
          } else if (data[i].score == "2") {
            data[i].score = ["full", "full", "empty", "empty", "empty"];
          } else if (data[i].score == "3") {
            data[i].score = ["full", "full", "full", "empty", "empty"];
          } else if (data[i].score == "4") {
            data[i].score = ["full", "full", "full", "full", "empty"];
          } else if (data[i].score == "5") {
            data[i].score = ["full", "full", "full", "full", "full"];
          }
        }
        this.data = data;
      });
    },
    back() {
      this.$router.push("/NewProduct");
    }
  }
};
</script>
<style lang="less" scoped>
.NewProductDetail {
  width: 100%;
  .mainbody {
    height: calc(100% - 51px);
    overflow: auto;
    box-sizing: border-box;

    .el-collapse-item {
      margin-bottom: 8px;
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
      .type {
        margin: 45px;
        border-top: 1px solid #dcdcdc;
        .el-select {
          margin-top: 20px;
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
          display: flex;
          flex-direction: column;
          .group {
            flex: 1;
            font-size: 18px;
            font-weight: bold;
            color: #2b4a7e;
            margin: 0 10px;
            padding: 10px 0;
            border-bottom: 1px solid #e5e5e5;
          }
          .love {
            flex: 1;
            margin: 10px;
            .el-button {
              font-size: 16px;
              color: #40a9b0;
              font-weight: bold;
              float: right;
              padding: 0;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
