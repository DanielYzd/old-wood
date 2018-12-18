<template>
  <div class="EvenTesting">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">关于书签制作的知识检测，以小组为单位答题</div>
      <div class="buzhi">
        <el-select v-model="value" placeholder="选择班级" size="mini" @change="handlechange">
          <el-option
            v-for="item in classList"
            :key="item.classId"
            :label="item.className"
            :value="item.classId"
          ></el-option>
        </el-select>
        <el-button
          icon="el-icon-document"
          style="padding:0"
          @click="addDetectionDetail"
          :disabled="disabled"
        >布置</el-button>
      </div>
    </div>
    <div class="mainbody">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="title">
              <img src="../../assets/test.png" alt>
              <span>检测题1</span>
              <el-button icon="el-icon-edit" @click.stop="edit(1)">编辑</el-button>
            </div>
          </template>
          <div v-html="content1" class="content">{{content1}}</div>
          <div class="answer">正确答案：{{answer1}}</div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="title">
              <img src="../../assets/test.png" alt>
              <span>检测题2</span>
              <el-button icon="el-icon-edit" @click.stop="edit(2)">编辑</el-button>
            </div>
          </template>
          <div v-html="content2" class="content">{{content2}}</div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="title">
              <img src="../../assets/test.png" alt>
              <span>检测题3</span>
              <el-button icon="el-icon-edit" @click.stop="edit(3)">编辑</el-button>
            </div>
          </template>
          <div v-html="content3" class="content">{{content3}}</div>
          <div class="answer">正确答案：{{answer3}}</div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <div class="title">
              <img src="../../assets/test.png" alt>
              <span>检测题4</span>
              <el-button icon="el-icon-edit" @click.stop="edit(4)">编辑</el-button>
            </div>
          </template>
          <div v-html="content4" class="content">{{content4}}</div>
          <div class="answer">正确答案：{{answer4}}</div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <div class="title">
              <img src="../../assets/test.png" alt>
              <span>检测题5</span>
              <el-button icon="el-icon-edit" @click.stop="edit(5)">编辑</el-button>
            </div>
          </template>
          <div v-html="content5" class="content">{{content5}}</div>
          <div class="answer">正确答案：{{answer5}}</div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <div class="title">
              <img src="../../assets/test.png" alt>
              <span>检测题6</span>
              <el-button icon="el-icon-edit" @click.stop="edit(6)">编辑</el-button>
            </div>
          </template>
          <div v-html="content6" class="content">{{content6}}</div>
          <div class="answer">正确答案：{{answer6}}</div>
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
        <ue1
          :content="childcontent"
          :answer="fatheranswer"
          ref="ue"
          v-on:childByValue="childByValue"
          v-if="hackReset"
        ></ue1>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import ue1 from "../Ue1.vue";
export default {
  components: {
    ue1
  },
  data() {
    return {
      classList: [],
      value: "",
      disabled: false,
      activeNames: ["1"],
      dialogVisible: false,
      hackReset: true,
      tag: "",
      content1: "",
      content2: "",
      content3: "",
      content4: "",
      content5: "",
      content6: "",
      childcontent: "",
      fatheranswer: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      answer5: "",
      answer6: ""
    };
  },
  mounted() {
    this.getAllDetection();
    this.getClassList();
  },
  methods: {
    handlechange() {
      console.log(this.value);
    },
    getClassList() {
      this.http(this.api.getClassList).then(res => {
        if (res.data.code == "0000") {
          this.classList = res.data.data;
          if (this.classList.length > 0) {
            this.value = this.classList[0].classId;
          } else {
            this.$message({
              type: "warning",
              message: "获取班级列表失败！"
            });
          }
        }
      });
    },
    addDetectionDetail() {
      let body = {
        courseId: window.localStorage.getItem("courseId"),
        classId: this.value
      };
      this.http(this.api.addDetectionDetail, body).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "布置成功！"
          });
        }
      });
    },
    getAllDetection() {
      let body = {
        courseId: window.localStorage.getItem("courseId")
      };
      this.http(this.api.getAllDetection, body).then(res => {
        if (res.data.code == "0000") {
          let data = res.data.data;
          this.content1 = data.content1;
          this.content2 = data.content2;
          this.content3 = data.content3;
          this.content4 = data.content4;
          this.content5 = data.content5;
          this.content6 = data.content6;
          this.answer1 = data.answer1;
          this.answer2 = data.answer2;
          this.answer3 = data.answer3;
          this.answer4 = data.answer4;
          this.answer5 = data.answer5;
          this.answer6 = data.answer6;
          this.detectionId = data.detectionId;
          // let status = data.status;
          // switch (status) {
          //   case 1:
          //     this.disabled = true;
          //     break;
          //   case 0:
          //     this.disabled = false;
          //     break;
          // }
        }
      });
    },
    handleChange(val) {
      console.log(val);
    },
    close() {
      this.hackReset = false;
      this.dialogVisible = false;
    },
    setDetection(tag, answer, content) {
      let body = {
        answer: answer,
        content: content,
        detectionId: this.detectionId,
        num: tag
      };
      this.http(this.api.setDetection, body).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "操作成功"
          });
        }
      });
    },
    edit(number) {
      switch (number) {
        case 1:
          this.childcontent = this.content1;
          this.fatheranswer = this.answer1;
          this.tag = 1;
          break;
        case 2:
          this.childcontent = this.content2;
          this.fatheranswer = this.answer2;
          this.tag = 2;
          break;
        case 3:
          this.childcontent = this.content3;
          this.fatheranswer = this.answer3;
          this.tag = 3;
          break;
        case 4:
          this.childcontent = this.content4;
          this.fatheranswer = this.answer4;
          this.tag = 4;
          break;
        case 5:
          this.childcontent = this.content5;
          this.fatheranswer = this.answer5;
          this.tag = 5;
          break;
        case 6:
          this.childcontent = this.content6;
          this.fatheranswer = this.answer6;
          this.tag = 6;
          break;
      }
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.hackReset = true; //重建组件
      });
    },

    childByValue: function(childValue, answer) {
      // childValue就是子组件传过来的值
      switch (this.tag) {
        case 1:
          this.content1 = childValue;
          this.answer1 = answer;
          this.setDetection(this.tag, answer, childValue);
          this.getAllDetection();
          break;
        case 2:
          this.content2 = childValue;
          this.answer2 = answer;
          this.setDetection(this.tag, answer, childValue);
          this.getAllDetection();
          break;
        case 3:
          this.content3 = childValue;
          this.answer3 = answer;
          this.setDetection(this.tag, answer, childValue);
          this.getAllDetection();
          break;
        case 4:
          this.content4 = childValue;
          this.answer4 = answer;
          this.setDetection(this.tag, answer, childValue);
          this.getAllDetection();
          break;
        case 5:
          this.content5 = childValue;
          this.answer5 = answer;
          this.setDetection(this.tag, answer, childValue);
          this.getAllDetection();
          break;
        case 6:
          this.content5 = childValue;
          this.answer6 = answer;
          this.setDetection(this.tag, answer, childValue);
          this.getAllDetection();
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
.EvenTesting {
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
      .content {
        margin: 0 20px;
        border-bottom: 1px solid #dcdcdc;
      }
      .answer {
        margin: 20px 20px 0 20px;
        // width: 92px;
        // height: 16px;
        font-size: 16px;
        font-family: PingFang-SC-Regular;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}
</style>
