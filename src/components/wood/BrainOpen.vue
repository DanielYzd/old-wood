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
          <el-button icon="el-icon-plus">新增</el-button>
        </div>
        <el-card :body-style="{ padding: '0px' }" class="card">
          <img src="../../assets/1111.png" class="image">
          <div class="detail">
            <span>思维图一</span>
            <el-button >查看</el-button>
             <el-button >编辑</el-button>
          </div>
        </el-card>
         <el-card :body-style="{ padding: '0px' }" class="card">
          <img src="../../assets/1111.png" class="image">
          <div class="detail">
            <span>思维图二</span>
            <el-button >查看</el-button>
             <el-button >编辑</el-button>
          </div>
        </el-card>
        <el-card :body-style="{ padding: '0px' }" class="card">
          <img src="../../assets/1111.png" class="image">
          <div class="detail">
            <span>思维图3</span>
            <el-button >查看</el-button>
             <el-button >编辑</el-button>
          </div>
        </el-card>
        <el-card :body-style="{ padding: '0px' }" class="card">
          <img src="../../assets/1111.png" class="image">
          <div class="detail">
            <span>思维图</span>
             <el-button >查看</el-button>
            <el-button icon="el-icon-edit">编辑</el-button>
          </div>
        </el-card>
        <el-card :body-style="{ padding: '0px' }" class="card">
          <img src="../../assets/1111.png" class="image">
          <div class="detail">
            <span>思维图一</span>
             <el-button >查看</el-button>
            <el-button icon="el-icon-edit">编辑</el-button>
          </div>
        </el-card>
      </div>
      <div class="bottom">
        <div class="suscribetitle">
          <img src="../../assets/reading.png" alt>
          <div class="suspro">脑洞开开开</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    
  },
  methods: {
    manage() {
     
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
