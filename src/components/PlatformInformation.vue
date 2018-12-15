<template>
  <div class="PlatformInformation">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">平台注册信息</div>
    </div>
    <div class="mainbody">
      <div class="maintitle">
        <img src="../assets/pingtai@2x.png" alt>
        <div class="suspro">平台信息</div>
        <el-button class="submit" size="mini" v-show="show1" @click="submit">提交</el-button>
        <el-button class="cancle" size="mini" v-show="show1" @click="cancle">取消</el-button>
        <el-button class="edit" size="mini" v-show="show" @click="edit">编辑</el-button>

        <div class="form">
          <el-form ref="form" :model="form" label-width="90px" size="mini">
            <el-form-item label="平台名称:">{{form.schoolName}}</el-form-item>
            <el-form-item label="合作期限:">{{form.createDate}}-{{form.expireDate}}</el-form-item>
            <el-form-item label="平台账户:">
              <!-- <el-input v-model="form.name"></el-input> -->
              {{form.account}}
            </el-form-item>
            <el-form-item label="联系人:">
              <el-col :span="6">
                <el-input v-model="form.contactPerson" style="width:200px;" :disabled="disable"></el-input>
              </el-col>
              <el-col :span="9">
                <label class="el-form-item__label">联系电话:</label>
                <el-input v-model="form.contact" style="width:200px;" :disabled="disable"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="固定电话:">
              <el-col>
                <el-input v-model="form.tel" style="width:200px;" :disabled="disable"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="所属区域:">
              <el-col :span="6">
                 <el-input v-model="form.province" style="width:200px;" :disabled="disable"></el-input>
                <!-- <el-select
                  v-model="form.province"
                  placeholder="选择省/直辖市"
                  style="width:200px;"
                  :disabled="disable"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select> -->
              </el-col>
              <el-col :span="6">
                <el-input v-model="form.city" style="width:200px;" :disabled="disable"></el-input>
                <!-- <el-select
                  v-model="form.city"
                  placeholder="选择市/区"
                  style="width:200px;"
                  :disabled="disable"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select> -->
              </el-col>
            </el-form-item>
            <el-form-item label="详细地址:">
              <el-col :span="14">
                <el-input v-model="form.address" :disabled="disable"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: 1,
      show1: 0,
      disable: true,
      form: {
        schoolName: "",
        createDate: "",
        expireDate: "",
        account: "",
        contactPerson: "",
        contact: "",
        tel: "",
        province: "",
        city: "",
        address: ""
      }
    };
  },
  mounted() {
    this.getSchoolInfo();
  },
  methods: {
    submit() {
      console.log(this.form);
      this.http(this.api.setSchoolInfo, this.form).then(res => {
        console.log(res);
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "保存成功！"
          });
          this.getSchoolInfo();
          this.show = !this.show;
          this.show1 = !this.show1;
          this.disable = true;
        }
      });
    },
    edit() {
      this.show = !this.show;
      this.show1 = !this.show1;
      this.disable = false;
    },
    cancle() {
      this.show = !this.show;
      this.show1 = !this.show1;
      this.disable = true;
      this.getSchoolInfo();
    },
    getSchoolInfo() {
      this.http(this.api.getSchoolInfo).then(res => {
        console.log(res);
        this.form = res.data.data;
      });
    }
  }
};
</script>
<style lang="less">
.PlatformInformation {
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
      .el-button {
        float: right;
        width: 76px;
        height: 26px;
        margin-left: 20px;
      }
      .submit {
        background-color: #8de1bc;
      }
      .edit {
        background-color: #d2d2d2;
      }
      .cancle {
        background-color: #d2d2d2;
      }
    }
    .form {
      padding: 60px;
      .el-form {
        .el-form-item {
          .el-form-item__label {
            font-size: 16px;
            font-family: PingFang-SC-Medium;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
          }
          .el-form-item__content {
            font-size: 16px;
            font-family: PingFang-SC-Medium;
            font-weight: bold;
            color: rgba(153, 153, 153, 1);
          }
          .el-input__inner {
            font-size: 14px;
            font-family: PingFang-SC-Regular;
            font-weight: bold;
            color: rgba(138, 138, 138, 1);
          }
        }
      }
    }
  }
}
</style>
