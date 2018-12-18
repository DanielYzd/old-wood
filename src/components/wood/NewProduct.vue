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
      </div>
      <el-card
        :body-style="{ padding: '0px' }"
        class="card"
        v-for="(item,index) in data"
        :key="index"
      >
        <img src="../../assets/example.png" class="image">
        <div class="detail">
          <div class="time">
            <span style="font-size:18px;weight:bold;color:#2B4A7E">{{item.simpleTitle}}</span>
            <div style="font-size:12px;font-weight:bold;color:#666666;">班级：{{item.className}}</div>
          </div>
          <el-button type="text" @click="watch(item.popularizeId)">查看</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.getPopularizeList();
  },
  methods: {
    getPopularizeList() {
      let body = {
        courseId: window.localStorage.getItem("courseId")
      };
      this.http(this.api.getPopularizeList, body).then(res => {
        if (res.data.code == "0000") {
          this.data = res.data.data;
        }
      });
    },
    watch(id) {
      this.$router.push({
        path: `/NewProductDetail/${id}`
      });
    }
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
