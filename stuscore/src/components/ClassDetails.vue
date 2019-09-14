<template>
	<div class="ClassDetails container">
		<NavBar></NavBar>
		<div class="well well-sm" style="margin-top: -35px;">
      	<router-link to="/admin">主页 </router-link> / 
      	<router-link to="/seekbyclass"> 查询课程信息 </router-link>
      	/ 课程详细信息
    	</div>
	    <div class="panel panel-success">
		    <div class="panel-body">
		        <span><b>课程代码：</b> {{courseInfo.kid}} </span>
		        <span><b>课程名称：</b> {{courseInfo.kname}} </span>
		        <span><b>课程学分：</b> {{courseInfo.credit}} </span>
		    </div>
		</div>

		<!-- 显示选修该课程的学生信息 -->
		<h4 class="page-header">选修该课程的学生信息</h4>
		<div id="fourBtn">
	        <input type="text" class="form-control pull-left" placeholder="输入学生姓名进行检索" v-model="filterInput" id="search">
	        <button class="btn btn-sm btn-default pull-right" @click="exportExcel">导出</button>
	        <button class="btn btn-sm btn-default pull-right" @click="showfailed">未通过</button>
	        <button class="btn btn-sm btn-default pull-right" @click="showpass">已通过</button>
	        <button class="btn btn-sm btn-default pull-right" @click="showall">全部</button>
	    </div>
		<table class="table">
			<thead>
				<tr>
					<th>学号</th>
					<th>姓名</th>
					<th>成绩</th>
					<th>学分</th>
					<th>学期</th>
				</tr>
			</thead>
			<tbody v-for="(stu,index) in filterAll(studentgrade,filterInput)">
				<tr>
					<td>{{stu.sid}}</td>
					<td>{{stu.name}}</td>
					<td>{{stu.score}}</td>
					<td>{{stu.getcredit}}</td>
					<td>{{stu.semester}}</td>
					<span class="pull-right">
            <router-link class="btn btn-primary btn-sm" v-bind:to="'/editbystuid/'+stu.sid+ '/' + kid">编辑</router-link>
            <button type="button" class="btn btn-danger btn-sm" v-on:click="deleteinfo(stu.id)">删除</button>
          </span>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import NavBar from './NavBar'
export default {
	name: 'ClassDetails',
	data () {
		return {
			kid:"",
			courseInfo:"",
			studentgrade:[],
      allgrade:[],
      passgrade:[],
      nopassgrade:[],
			filterInput:""
		}
	},
	methods:{
		filterAll(infos, value){
			return infos.filter(function(info){
				return info.name.match(value)
			})
		},
		deleteinfo(id){
			this.$http.delete("http://localhost:3000/score/"+id).then(function(response){
        alert('删除成功');
        // this.$router.go(-1);
        this.$router.go(0);
      })
		},
		getCourseInfo(){
			//获取传过来的课程id
			this.kid = this.$route.params.kid;
			//通过课程id获取该课程的详细信息显示在页面中
			this.$http.get("http://localhost:3000/course?kid="+this.kid).then(function (response) {
				this.courseInfo = response.body[0];
				console.log(this.courseInfo);
			})
		},
		getstudentsInfo(){
			//根据课程id获取所有选修该课程的学生
			this.allgrade = [];
	        this.passgrade = [];
	        this.nopassgrade = [];

			this.$http.get("http://localhost:3000/score?kid="+this.kid).then(function(response){
				this.studentgrade = response.body;
				this.allgrade = response.body;
		        var _grade = this.allgrade;
		        for(var i = 0; i < _grade.length; i++) {
		          if(_grade[i].score < 60) {
		            this.nopassgrade.push(_grade[i]);
		          } else {
		            this.passgrade.push(_grade[i]);
		          }
		        }
			})
		},
		showall(){
      this.studentgrade = this.allgrade;
    },
    showpass(){
      this.studentgrade = this.passgrade;
    },
    showfailed(){
      this.studentgrade = this.nopassgrade;
    },
    exportExcel(){
    	require.ensure([], () => {
        const {
            export_json_to_excel
        } = require('vendor/Export2Excel');
        const tHeader = ['学号','姓名', '成绩', '获得学分', '学期'];
        const filterVal = ['sid', 'name', 'score', 'getcredit', 'semester'];
        //判断处于哪个控件 将list设置为不同的下载内容
        var list = this.studentgrade;
        // console.log(list);
        // console.log(this.infos);
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, this.courseInfo.kname+'课程成绩单');
      })
    },
    // 参数过滤
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    }
	},
	created(){
		this.getCourseInfo();
		this.getstudentsInfo();
	},
	components:{
		NavBar
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
	margin-bottom: -20px;
}
.panel-body > span {
	margin-left: 40px;
}
#fourBtn{
	margin-top: -17px;
	margin-bottom: 80px;
}
#search {
	width: 500px;
}
</style>
