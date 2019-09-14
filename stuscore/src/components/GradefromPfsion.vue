<template>
  <!-- 通过专业信息查看该专业所有学生 点击学生的详细信息之后跳转到该页面 显示选中的学生信息 -->
  <div class="GradefromPfsion container">
    <NavBar></NavBar>
    <div class="well well-sm" style="margin-top: -35px;">
      <router-link to="/admin">主页 </router-link> / 
      <router-link to="/seekbyzid"> 查询专业信息 </router-link>
      <router-link v-bind:to="'/professiondetails/'+zid"> / 专业详细信息</router-link>
       / 学生成绩
    </div>
    
    <div class="panel panel-success">
        <div class="panel-body">
            <span><b>专业代码：</b> {{professionInfo.zid}} </span>
            <span><b>专业名称：</b> {{professionInfo.zname}} </span>
            <span><b>专业描述：</b> {{professionInfo.description}} </span>
            <span><b>学生学号：</b> {{studentInfo.sid}} </span>
            <span><b>学生姓名：</b> {{studentInfo.name}} </span>
            <span><b>学生班级：</b> {{studentInfo.inclass}} </span>
        </div>
    </div>

    <div>
      <h4 class="page-header">成绩列表</h4>
      <div id="fourBtn">
        <input type="text" class="form-control pull-left" placeholder="输入课程进行检索" v-model="filterInput" id="search">
        <button class="btn btn-sm btn-default pull-right" @click="exportExcel">导出</button>
        <button class="btn btn-sm btn-default pull-right" @click="showfailed">未通过课程</button>
        <button class="btn btn-sm btn-default pull-right" @click="showpass">已通过课程</button>
        <button class="btn btn-sm btn-default pull-right" @click="showall">全部课程</button>
      </div>
    </div>

    <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th>学期</th>
            <th>课程代码</th>
            <th>课程名</th>
            <th>分数</th>
            <th>获得学分</th>
          </tr>
        </thead>
        <tbody id="tbody" v-for="(student,index) in filterAll(studentgrade, filterInput)">
          <tr>
            <td>{{student.semester}}</td>
            <td>{{student.kid}}</td>
            <td>{{student.kname}}</td>
            <td>{{student.score}}</td>
            <td>{{student.getcredit}}</td>
            <span class="pull-right">
              <router-link class="btn btn-primary btn-sm" v-bind:to="'/editbystuid/'+sid+ '/' + student.kid">编辑</router-link>
              <button type="button" class="btn btn-danger btn-sm" v-on:click="deleteinfo(student.id)">删除</button>
            </span>
          </tr>
        </tbody>
    </table>

  </div>
</template>

<script>
import NavBar from './NavBar'
export default {
  name: 'GradefromPfsion',
  data () {
    return {
      zid:"",
      sid:"",
      professionInfo:"",
      studentInfo:"",
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
        return info.kname.match(value);
      })
    },
    deleteinfo(id){
      this.$http.delete("http://localhost:3000/score/"+id).then(function(response){
        alert('删除成功');
        // this.$router.go(-1);
        this.$router.go(0);
      })
    },
    getProfession(){
      //获取专业信息
      this.zid = this.$route.params.zid;
      this.$http.get("http://localhost:3000/profession?zid="+this.zid).then(function (response) {
        this.professionInfo = response.body[0];
        //console.log(this.professionInfo);
      })
    },
    getStudent(){
      //获取学生信息
      this.sid = this.$route.params.sid;
      this.$http.get("http://localhost:3000/student?sid="+this.sid).then(function(response){
        this.studentInfo = response.body[0];
      })
    },
    getStudentGrade(){
      //获取学生成绩
      this.allgrade = [];
      this.passgrade = [];
      this.nopassgrade = [];
      this.$http.get("http://localhost:3000/score?sid="+this.sid).then(function(response){
        this.studentgrade = response.body;
        //同时得到全部课程、通过课程、未通过课程
        this.allgrade = response.body;
        var _grade = this.allgrade;
        for(var i = 0; i < _grade.length; i++) {
          if(_grade[i].score < 60) {
            this.nopassgrade.push(_grade[i]);
          } else {
            this.passgrade.push(_grade[i]);
          }
        }
        // console.log(this.allgrade);
        // console.log(this.nopassgrade);
        // console.log(this.passgrade);
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
            const tHeader = ['学期','课程代码', '课程名', '分数', '获得学分'];
            const filterVal = ['semester', 'kid', 'kname', 'score', 'getcredit'];
            var list = this.studentgrade;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, this.studentInfo.name+'的成绩单');
        })
    },
    // 参数过滤
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    },
  },
  created(){
    this.getProfession();
    this.getStudent();
    this.getStudentGrade();
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
