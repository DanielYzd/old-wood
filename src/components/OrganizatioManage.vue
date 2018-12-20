<template>
  <div class="OrganizatioManage">
    <div class="child_head">
      <div class="block"></div>
      <div class="child_title">学校STEM课程组织架构的管理，含有老师管理、学生管理、班级管理、小组管理</div>
    </div>
    <div class="mainbody">
      <div class="maintitle">
        <img src="../assets/pingtai@2x.png" alt>
        <div class="suspro">学生管理</div>
        <!-- <el-button icon="el-icon-plus" class="edit" size="mini" onMouseOver="this.style.backgroundColor='#efefef'">新增</el-button> -->
        <el-button icon="el-icon-download" class="submit" size="mini" @click="dr">导入</el-button>
        <el-button icon="el-icon-search" class="edit" size="mini" @click="getList">查询</el-button>

        <el-input v-model="name" class="queryName" placeholder="请输入名称进行搜索" size="mini"></el-input>
        <el-select v-model="type" placeholder="请选择" size="mini" class="edit" @change="handlechange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-upload
          class="uploadfile"
          style="display:none"
          action
          :http-request="uploadFileMethod"
          :show-file-list="false"
          :before-upload="newEditorbeforeupload"
          ref="uniqueId"
          id="uniqueId"
          multiple
        ></el-upload>
      </div>
      <div class="noDisplay" v-bind:class="{ active: isTeacherActive}">
        <el-table
          :data="teacherData"
          border
          style="width: 100%;margin-top:20px;"
          :row-style="{'color':'#333333','font-size':'16px'}"
          :header-cell-style="{'color':'#666666','font-size':'16px'}"
        >
          <el-table-column prop="teacherId" label="老师代码"></el-table-column>
          <el-table-column prop="teacherName" label="老师名称"></el-table-column>
          <el-table-column prop="account" label="帐号"></el-table-column>
          <el-table-column prop="mobile" label="手机号码"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              &nbsp;
              <img
                src="/static/bj1.png"
                style=" cursor: pointer;"
                onmouseover="this.src=('/static/bj2.png')"
                onmouseout="this.src=('/static/bj1.png')"
                @click="edit(scope.row.teacherId,scope.row)"
              >
              &nbsp;
              <img
              style=" cursor: pointer;"
                src="/static/shanchu.png"
                @click="remove(scope.row.teacherId)"
              >
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="编辑老师信息" :visible.sync="teacherEditDialog">
          <el-form :model="form">
<!--             <el-form-item label="老师代码" :label-width="formLabelWidth">
  <el-input v-model="form.teacherId" autocomplete="off"></el-input>
</el-form-item> -->
            <el-form-item label="老师名称" :label-width="formLabelWidth">
              <el-input v-model="form.teacherName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth">
              <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="teacherEditDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitform">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="noDisplay" v-bind:class="{ active: isClassActive}">
        <el-table
          :data="classData"
          border
          style="width: 100%;margin-top:20px;"
          :row-style="{'color':'#333333','font-size':'16px'}"
          :header-cell-style="{'color':'#666666','font-size':'16px'}"
        >
          <el-table-column prop="classId" label="班级代码"></el-table-column>
          <el-table-column prop="className" label="班级名称"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              &nbsp;
              <img
                src="/static/bj1.png"
                onmouseover="this.src=('/static/bj2.png')"
                onmouseout="this.src=('/static/bj1.png')"
                @click="edit(scope.row.classId,scope.row)"
              >
              &nbsp;
              <img
                src="/static/shanchu.png"
                @click="remove(scope.row.classId)"
              >
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="编辑班级信息" :visible.sync="classEditDialog">
          <el-form :model="form">
<!--             <el-form-item label="班级代码" :label-width="formLabelWidth">
  <el-input v-model="form.classId" autocomplete="off"></el-input>
</el-form-item> -->
            <el-form-item label="班级名称" :label-width="formLabelWidth">
              <el-input v-model="form.className" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="classEditDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitform">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="noDisplay" v-bind:class="{ active: isGroupActive}">
        <el-table
          :data="groupData"
          border
          style="width: 100%;margin-top:20px;"
          :row-style="{'color':'#333333','font-size':'16px'}"
          :header-cell-style="{'color':'#666666','font-size':'16px'}"
        >
          <el-table-column prop="groupId" label="小组代码"></el-table-column>
          <el-table-column prop="groupName" label="小组名称"></el-table-column>
          <el-table-column prop="className" label="班级"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              &nbsp;
              <img
                src="/static/bj1.png"
                onmouseover="this.src=('/static/bj2.png')"
                onmouseout="this.src=('/static/bj1.png')"
                @click="edit(scope.row.groupId,scope.row)"
              >
              &nbsp;
              <img
                src="/static/shanchu.png"
                @click="remove(scope.row.groupId)"
              >
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="编辑小组信息" :visible.sync="groupEditDialog">
          <el-form :model="form">
            <el-form-item label="小组名称" :label-width="formLabelWidth">
              <el-input v-model="form.groupName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="班级" :label-width="formLabelWidth">
              <el-select v-model="form.classId" placeholder="请选择" style="width:100%" >
                <el-option
                  v-for="item in classData"
                  :key="item.classId"
                  :label="item.className"
                  :value="item.classId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="groupEditDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitform">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="noDisplay" v-bind:class="{ active: isStudentActive}">
        <el-table
          :data="studentData"
          border
          style="width: 100%;margin-top:20px;"
          :row-style="{'color':'#333333','font-size':'16px'}"
          :header-cell-style="{'color':'#666666','font-size':'16px'}"
        >
          <el-table-column prop="studentId" label="学生代码"></el-table-column>
          <el-table-column prop="studentName" label="学生名称"></el-table-column>
          <el-table-column prop="className" label="班级"></el-table-column>
          <el-table-column prop="groupName" label="小组"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              &nbsp;
              <img
                src="/static/bj1.png"
                onmouseover="this.src=('/static/bj2.png')"
                onmouseout="this.src=('/static/bj1.png')"
                @click="edit(scope.row.studentId,scope.row)"
              >
              &nbsp;
              <img
                src="/static/shanchu.png"
                @click="remove(scope.row.studentId)"
              >
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="编辑学生信息" :visible.sync="studentEditDialog">
          <el-form :model="form">
<!--             <el-form-item label="学生代码" :label-width="formLabelWidth">
  <el-input v-model="form.studentId" autocomplete="off"></el-input>
</el-form-item> -->
            <el-form-item label="学生姓名" :label-width="formLabelWidth">
              <el-input v-model="form.studentName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学生班级" :label-width="formLabelWidth">
              <!-- <el-input v-model="form.classId" autocomplete="off"></el-input> -->
              <el-select v-model="form.classId" placeholder="请选择" style="width:100%" @change="handlerClassChange">
                <el-option
                  v-for="item in classData"
                  :key="item.classId"
                  :label="item.className"
                  :value="item.classId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学生小组" :label-width="formLabelWidth">
             <!--  <el-input v-model="form.groupId" autocomplete="off"></el-input> -->
              <el-select v-model="form.groupId" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in groupData"
                  :key="item.groupId"
                  :label="item.groupName"
                  :value="item.groupId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="studentEditDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitform">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Config from "../config/config.js";
export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "老师"
        },
        {
          value: "2",
          label: "班级"
        },
        {
          value: "3",
          label: "小组"
        },
        {
          value: "4",
          label: "学生"
        }
      ],
      classData: [],
      teacherData: [],
      studentData: [],
      groupData: [],
      name: "",
      type: "1",
      isTeacherActive: false,
      isClassActive: false,
      isGroupActive: false,
      isStudentActive: false,
      studentEditDialog:false,
      classEditDialog:false,
      groupEditDialog:false,
      teacherEditDialog:false,
      form: {
          name: '',
          id: '',
          classId: '',
          groupId: ''
      },
      formLabelWidth: '100px'
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    handlechange(){
      this.getList();
    },
    handlerClassChange(val){
      this.getGroupData(val);
    },
    submitform(){
      let url;

      if (this.type == 1) {
        url = this.api.setTeacherInfo;
      } else if (this.type == 2){
        url = this.api.setClassInfo;
      }else if (this.type == 3){
        url = this.api.setGroupInfo;
      }else if (this.type == 4){
        url = this.api.setStudentInfo;
      }

      this.http(url, this.form).then(res => {
        if (res.data.code == "0000") {
          this.getList();
          this.clearDialog();
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        } else {
          this.$message({
            type: 'success',
            message: res.data.message
          });
        }
      });
    },
    clearDialog(){
      this.studentEditDialog=false;
      this.classEditDialog=false;
      this.groupEditDialog=false;
      this.teacherEditDialog=false;
    },
    clearTable(){
        (this.isTeacherActive = false),
        (this.isClassActive = false),
        (this.isGroupActive = false),
        (this.isStudentActive = false);
    },
    getClassData(){
      let body = {
        type: 2,
        pageNo: 1,
        pageSize: 9999
      };
      this.http(this.api.queryOrgList, body).then(res => {
        this.classData = res.data.data.rows;
      });
    },
    getGroupData(classId){
      let body = {
        type: 3,
        pageNo: 1,
        pageSize: 9999
      };
      this.http(this.api.queryOrgList, body).then(res => {
        let groupArray = [];
        res.data.data.rows.forEach(function(item){
          if (item.classId == classId){
            groupArray.push(item);
          }
        });
        this.form.groupId = null;
        this.groupData = groupArray;
      });
    },
    getList() {
      let body = {
        name: this.name,
        type: this.type,
        //TODO 页面需要添加分页 插件
        pageNo: 1,
        pageSize: 9999
      };

      this.http(this.api.queryOrgList, body).then(res => {
        this.clearTable();

        if (this.type == 1) {
          this.teacherData = res.data.data.rows;
          this.isTeacherActive = true;
        } else if (this.type == 2) {
          this.classData = res.data.data.rows;
          this.isClassActive = true;
        } else if (this.type == 3) {
          this.groupData = res.data.data.rows;
          this.isGroupActive = true;
        } else if (this.type == 4) {
          this.studentData = res.data.data.rows;
          this.isStudentActive = true;
        }
      });
    },
    edit(id,row){
      this.clearDialog();
      if (this.type == 1) {
        this.teacherEditDialog = true;
        this.form.teacherId = row.teacherId;
        this.form.teacherName = row.teacherName; 
      } else if (this.type == 2){
        this.classEditDialog = true;
        this.form.classId = row.classId;
        this.form.className = row.className;  
      }else if (this.type == 3){
        this.groupEditDialog = true;
        this.getClassData();
        this.form.groupId = row.groupId;
        this.form.groupName = row.groupName;
      }else if (this.type == 4){
        this.studentEditDialog = true;
        this.getClassData();
        //groupdata应该是根据classid的切换动态变化 
        this.form.studentId = row.studentId;
        this.form.studentName = row.studentName;
        this.form.classId = row.classId;
        this.form.groupId = row.groupId;
        
      }
    },
    remove(id){
      let url;
      if (this.type == 1) {
        url = this.api.deleteTeacherInfo;
      } else if (this.type == 2){
        url = this.api.deleteClassInfo;
      }else if (this.type == 3){
        url = this.api.deleteGroupInfo;
      }else if (this.type == 4){
        url = this.api.deleteStudentInfo;
      }
      let body = {
        id: id
      };
      console.log(url);
      console.log('开始删除了...');
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.http(url, body).then(res => {
            if (res.data.code == "0000") {
              this.getList();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'success',
                message: res.data.message
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    dr() {
      document.querySelector("#uniqueId input").click();
    },
    uploadFileMethod(param) {
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      this.http(this.api.uploadFile, formData).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "文件上传成功！"
          });
        }
      });
    },
    newEditorbeforeupload(file) {}
  }
};
</script>
<style lang="less">
.OrganizatioManage {
  width: 100%;

  .mainbody {
    // width: 100%;
    height: calc(100% - 51px);
    background-color: #ffffff;
    padding: 0 20px 30px 20px;
    overflow: auto;
    box-sizing: border-box;

    .noDisplay {
      display: none;
    }

    .active {
      display: block;
    }

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
        margin-top: 10px;
        float: right;
        width: 76px;
        height: 26px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(220, 220, 220, 1);
        border-radius: 5px;
        margin-left: 20px;
      }

      .el-select {
        float: right;
        height: 26px;
        margin-left: 20px;
      }

      .el-input {
        margin-top: 10px;
        float: right;
        width: 200px;
        height: 26px;
        margin-left: 20px;
      }

      .submit {
        background-color: #8de1bc;
        color: #ffffff;
      }
    }

    .table {
      margin-top: 50px;
      padding: 25px;

      .el-table__header {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
      }
    }
  }
}
</style>
