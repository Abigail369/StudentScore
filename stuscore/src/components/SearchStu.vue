<template>
  <!-- 根据输入的学生id查找该学生所有的成绩显示在表格中 -->
  <div class="searchstu container">
    <NavBar></NavBar>
    <div class="well well-sm">
      <router-link to="/admin">主页 </router-link> / 
      <router-link to="/seekbystuid"> 成绩查询 </router-link>
      / 查询结果
    </div>
    
    <div>
      <h4 class="page-header">查询结果</h4>
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
            <th>学号</th>
            <th>姓名</th>
            <th>学期</th>
            <th>课程代码</th>
            <th>课程名</th>
            <th>分数</th>
            <th>获得学分</th>
          </tr>
        </thead>
        <tbody id="tbody" v-for="(student,index) in filterAll(studentgrade,filterInput)">
          <tr>
            <td>{{student.sid}}</td>
            <td>{{student.name}}</td>
            <td>{{student.semester}}</td>
            <td>{{student.kid}}</td>
            <td>{{student.kname}}</td>
            <td>{{student.score}}</td>
            <td>{{student.getcredit}}</td>
            <span class="pull-right">
              <router-link class="btn btn-primary btn-sm" v-bind:to="'/editbystuid/'+studentid+ '/' + student.kid">编辑</router-link>
              <button type="button" class="btn btn-danger btn-sm" v-on:click="deleteinfo(student.id,student.sid)">删除</button>
            </span>
          </tr>
        </tbody>
    </table>

  </div>
</template>

<script>
import NavBar from './NavBar'
export default {
  name: 'SearchStu',
  data () {
    return {
      filterInput:"",
      studentid:"",
      studentname:"",
      studentgrade:[],
      allgrade:[],
      passgrade:[],
      nopassgrade:[]
    }
  },
  methods:{
    filterAll(infos, value) {
      return infos.filter(function(info){
        return info.kname.match(value);
      })
    },
    // 根据学生id查询该生所有成绩 显示在表格中
    seekStuGrade(){
      this.allgrade = [];
      this.passgrade = [];
      this.nopassgrade = [];
      this.getStudentname();//先获取姓名
      //获取studentgrade
      this.$http.get("http://localhost:3000/score?sid="+this.studentid).then(function(response){
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

      })
    },
    deleteinfo(id,sid) {
      //console.log(id);
      this.$http.delete("http://localhost:3000/score/"+id).then(function(response){
        alert('删除成功');
        // this.$router.go(-1);
        this.$router.go(0);
      })
    },
    //根据id得到该学生的姓名 显示在表格中
    getStudentname(){
      this.studentid = this.$route.params.sid;
      this.$http.get("http://localhost:3000/student?sid="+this.studentid).then(function(response){
        this.studentname = response.body[0].name;
        //console.log(response.body[0].name);
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
            const tHeader = ['学号','姓名','学期','课程代码', '课程名', '分数', '获得学分'];
            const filterVal = ['sid','name','semester', 'kid', 'kname', 'score', 'getcredit'];
            //判断处于哪个控件 将list设置为不同的下载内容
            var list = this.studentgrade;
            // console.log(list);
            // console.log(this.infos);
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, this.studentname+'的成绩单');
        })
    },
    // 参数过滤
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    },
  },
  created(){
    this.seekStuGrade();
    //alert(this.$route.params.sid);
  },
  components:{
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #seekform{
    margin-top: -25px;
  }
  .btn{
    margin-left: 4px;
  }
  #fourBtn{
    margin-top: -17px;
    margin-bottom: 80px;
  }
  #search {
    width: 500px;
  }
  .well{
    margin-top: -35px;
  }
</style>
