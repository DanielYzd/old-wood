<template>
  <div class="GeneralReading">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">{{title}}</div>
    </div>
    <div class="mainbody">
      <div class="top">
        <div class="suscribetitle">
          <img src="../../assets/reading.png" alt>
          <div class="suspro">全科阅读</div>
        </div>
        <el-card :body-style="{ padding: '0px' }" class="card" v-for="item in data" :key="item.id">
          <img src="../../assets/1111.png" class="image">
          <div class="detail">
            <span>{{item.simpleTitle}}</span>
            <el-button icon="el-icon-edit" @click="view(item.refernenceId)">编辑</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      title:''
    };
  },
  mounted() {
    this.getRefernenceList();
  },
   created(){
     let body = {
      functionId: "0102006"
    };
    this.http(this.api.getFunctionDesc, body).then(res => {
      this.title = res.data.data;
    });
  },
  methods: {
    view(id) {
      this.$router.push({
        path: `/GeneralReadingDetail/${id}`
      });
    },
    getRefernenceList() {
      let body = {
        courseId: window.localStorage.getItem("courseId")
      };
      this.http(this.api.getRefernenceList, body).then(res => {
        console.log(res);
        if (res.data.code == "0000") {
          this.data = res.data.data.RefernenceList;
          console.log(this.data);
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

    .top {
      flex: 1;
      box-sizing: border-box;
      padding: 0 20px 30px 20px;
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
  }
}
</style>
