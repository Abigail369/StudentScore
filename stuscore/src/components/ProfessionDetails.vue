<template>
  <div class="professiondetails container">
    <NavBar></NavBar>
    <div class="well well-sm" style="margin-top: -35px;">
      <router-link to="/admin">主页 </router-link> / 
      <router-link to="/seekbyzid"> 查询专业信息 </router-link>
      / 专业详细信息
    </div>
    <div class="panel panel-success">
        <div class="panel-body">
            <span><b>专业代码：</b> {{professionInfo.zid}} </span>
            <span><b>专业名称：</b> {{professionInfo.zname}} </span>
            <span><b>专业描述：</b> {{professionInfo.description}} </span>
        </div>
    </div>

    <!-- 显示该专业的学生信息 -->
    <h4 class="page-header">该专业的学生信息</h4>
    <div id="fourBtn">
        <input type="text" class="form-control pull-left" placeholder="输入班级进行检索" v-model="classname" id="search">
        <button class="btn btn-primary" @click="findClass">查询</button>
        <button class="btn btn-success" @click="showAllClass">显示全部班级</button>
        <button class="btn btn-sm btn-default pull-right" @click="exportExcel">导出</button>
      </div>
    <table class="table">
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>班级</th>
        </tr>
      </thead>
      <tbody v-for="stu in stuInfo">
        <tr>
          <td>{{stu.sid}}</td>
          <td>{{stu.name}}</td>
          <td>{{stu.sex}}</td>
          <td>{{stu.age}}</td>
          <td>{{stu.inclass}}</td>
          <span class="pull-right">
            <!-- 点击跳转到该学生所有成绩界面 -->
            <router-link type="button" class="btn btn-success btn-sm" v-bind:to="'/gradefrompfsion/'+stu.sid+'/'+zid">查看成绩</router-link>
          </span>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NavBar from './NavBar'
export default {
  name: 'ProfessionDetails',
  data () {
    return {
      zid:"",
      professionInfo:"",
      studentsInfo:[],
      stuInfo:[],
      classname:""
    }
  },
  methods:{
    getProfessionInfo(){
      //获取传过来的专业id
      this.zid = this.$route.params.zid;
      //通过专业id获取该专业的详细信息显示在页面中
      this.$http.get("http://localhost:3000/profession?zid="+this.zid).then(function (response) {
        this.professionInfo = response.body[0];
        //console.log(this.professionInfo);
      })
    },
    getstudentsInfo(){
      //根据专业id获取所有该专业的学生
      this.$http.get("http://localhost:3000/student?zid="+this.zid).then(function(response){
        this.studentsInfo = response.body;
        this.stuInfo = response.body;
        //console.log(this.stuInfo);
      })
    },
    findClass(){
      //筛选班级
      //显示的都是stuinfo 作为每次筛选出来的信息 最开始显示全部的班级
      var temporaryInfo = this.studentsInfo;
      this.stuInfo = [];
      for(var i = 0; i < temporaryInfo.length; i++) {
        if((temporaryInfo[i].inclass).indexOf(this.classname) != -1) {
          this.stuInfo.push(temporaryInfo[i]);
        }
      //console.log(this.stuInfo);
        }
    },
    showAllClass(){
      //显示全部班级 studengInfo的值永远不被编辑
      this.classname = "";
      this.stuInfo = this.studentsInfo;
    },
    exportExcel(){
      //要根据筛选出来的不同班级进行下载
      require.ensure([], () => {
            const {
                export_json_to_excel
            } = require('vendor/Export2Excel');
            const tHeader = ['学号','姓名', '性别', '年龄', '班级'];
            const filterVal = ['sid', 'name', 'sex', 'age', 'inclass'];
            var list = this.stuInfo;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, this.professionInfo.zname+'的学生名单');
        })
    },
    // 参数过滤
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    }
  },
  created(){
    this.getProfessionInfo();
    this.getstudentsInfo();
  },
  components:{
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel-body > span {
  margin-left: 40px;
}
#fourBtn{
  margin-top: -15px;
  margin-bottom: 20px;
}
#search {
  width: 500px;
}
</style>
