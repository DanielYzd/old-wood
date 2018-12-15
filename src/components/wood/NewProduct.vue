<template>
  <div class="NewProduct">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">以全班为对象，对小组的作品进行评比和推广</div>
    </div>
    <div class="mainbody">
      <div class="maintitle">
        <img src="../../assets/new.png" alt>
        <div class="suspro">新品推广会</div>
        <div class="select">
          <span>班级</span>
          <el-select v-model="value" size="mini" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <el-card :body-style="{ padding: '0px' }" class="card">
        <img src="../../assets/example.png" class="image">
        <div class="detail">
          <div class="time">
            <span style="font-size:18px;weight:bold;color:#2B4A7E">新品推广1</span>
            <div style="font-size:12px;font-weight:bold;color:#666666;">班级：201701</div>
          </div>
          <el-button type="text">查看</el-button>
        </div>
      </el-card>
      <el-card :body-style="{ padding: '0px' }" class="card">
        <img src="../../assets/example.png" class="image">
        <div class="detail">
          <div class="time">
            <span style="font-size:18px;weight:bold;color:#2B4A7E">新品推广2</span>
            <div style="font-size:12px;font-weight:bold;color:#666666;">班级：201702</div>
          </div>
          <el-button type="text">查看</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  }
};
</script>
<style lang="less" scoped>
.NewProduct {
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
      .select {
        float: right;
        vertical-align: middle;
        // display: inline-block;
        // width: 200px;
        span {
          font-size: 14px;
          font-weight: bold;
          color: rgba(138, 138, 138, 1);
          margin-right: 5px;
        }
        .el-select {
          width: 125px;
          height: 26px;
          font-size: 14px;
          padding: 0;
          .el-input__inner {
            height: 30px;
          }
        }
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
        padding: 8px;
        .time {
          clear: both;
          vertical-align: middle;
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 5px;
          margin-top: 10px;
          span {
            height: 100%;
            vertical-align: middle;
            display: inline-block;
          }
        }
        .el-button {
          font-size: 16px;
          color: #40a9b0;
          font-weight: bold;
          float: right;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
