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

        
        <el-button icon="el-icon-plus" class="edit" size="mini" onMouseOver="this.style.backgroundColor='#efefef'">新增</el-button>
        <el-button icon="el-icon-download" class="submit" size="mini" @click="dr">导入</el-button>    
        <el-button icon="el-icon-search" class="edit" size="mini" @click="getList">查询</el-button>

        <el-input v-model="name" class="queryName" placeholder="请输入名称进行搜索" size="mini" ></el-input>
        <el-select v-model="type" placeholder="请选择" size="mini" class="edit">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        	
				<!-- 				<el-button class="edit" size="mini">小组</el-button>
				<el-button class="edit" size="mini" @click="getClassList">班级</el-button>
				<el-button class="edit" size="mini">老师</el-button> -->
				<el-upload class="uploadfile" style="display:none" action :http-request="uploadFileMethod" :show-file-list="false"
				 :before-upload="newEditorbeforeupload" ref="uniqueId" id="uniqueId" multiple></el-upload>
			</div>
			<div class="noDisplay" v-bind:class="{ active: isTeacherActive}">
        <el-table :data="teacherData" border style="width: 100%;margin-top:20px;" :row-style="{'color':'#333333','font-size':'16px'}"
         :header-cell-style="{'color':'#666666','font-size':'16px'}">
          <el-table-column prop="teacherId" label="老师代码"></el-table-column>
          <el-table-column prop="teacherName" label="老师名称"></el-table-column>
          <el-table-column prop="account" label="帐号"></el-table-column>
          <el-table-column prop="mobile" label="手机号码"></el-table-column>
        </el-table>
      </div>
      <div class="noDisplay" v-bind:class="{ active: isClassActive}">
				<el-table :data="classData" border style="width: 100%;margin-top:20px;" :row-style="{'color':'#333333','font-size':'16px'}"
				 :header-cell-style="{'color':'#666666','font-size':'16px'}">
					<el-table-column prop="classId" label="班级代码"></el-table-column>
					<el-table-column prop="className" label="班级名称"></el-table-column>
				</el-table>
      </div>
      <div class="noDisplay" v-bind:class="{ active: isGroupActive}">
        <el-table :data="groupData" border style="width: 100%;margin-top:20px;" :row-style="{'color':'#333333','font-size':'16px'}"
         :header-cell-style="{'color':'#666666','font-size':'16px'}">
          <el-table-column prop="groupId" label="小组代码"></el-table-column>
          <el-table-column prop="groupName" label="小组名称"></el-table-column>
        </el-table>
      </div>
      <div class="noDisplay" v-bind:class="{ active: isStudentActive}">
        <el-table :data="studentData" border style="width: 100%;margin-top:20px;" :row-style="{'color':'#333333','font-size':'16px'}"
         :header-cell-style="{'color':'#666666','font-size':'16px'}">
          <el-table-column prop="studentId" label="学生代码"></el-table-column>
          <el-table-column prop="studentName" label="学生名称"></el-table-column>
          <el-table-column prop="account" label="帐号"></el-table-column>
          <el-table-column prop="mobile" label="手机号码"></el-table-column>
        </el-table>
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
				options: [{
					value: '1',
					label: '老师',
          selected:true
				}, {
					value: '2',
					label: '班级'
				}, {
					value: '3',
					label: '小组'
				}, {
					value: '4',
					label: '学生'
				}],
				classData: [],
        teacherData: [],
        studentData: [],
        groupData: [],
        name:'',
        type:'',
        isTeacherActive:false,
        isClassActive:false,
        isGroupActive:false,
        isStudentActive:false
			};
		},
    created() {
      // this.getList(1);
    },
		mounted() {},
		methods: {
			getList(inType) {
        console.log(inType);
        let body = {
          name:this.name,
          type:(inType>0 && inType <5) ? inType:this.type,
         //TODO 页面需要添加分页 插件
          pageNo:1,
          pageSize:9999
        }
				console.dir(body);
				this.http(this.api.queryOrgList,body).then(res => {
					console.log(res); 
          console.log("rows");
          console.dir(res.data.data.rows);

        this.isTeacherActive=false,
        this.isClassActive=false,
        this.isGroupActive=false,
        this.isStudentActive=false

          if (this.type == 1)
          {
            this.teacherData = res.data.data.rows;
            this.isTeacherActive=true;
          }else if (this.type == 2)
					{
            this.classData = res.data.data.rows;
            this.isClassActive=true;
					}else if (this.type == 3)
          {
            this.groupData = res.data.data.rows;
            this.isGroupActive=true;
          }else if (this.type == 4)
          {
            this.studentData = res.data.data.rows;
            this.isStudentActive=true;
          }

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

      .noDisplay{
        display:none;
      }

      .active{
        display:block;
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

        .el-select{
          float: right;
          height: 26px;
          margin-left: 20px;  
        }

        .el-input{
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
        margin-top:50px;
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
