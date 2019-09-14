<template>
  <!-- 录入成绩界面 -->
  <div class="addgrade container">
    <NavBar></NavBar>
    <div class="well well-sm" style="margin-top: -35px;">
      <router-link to="/admin">主页 </router-link>
      / 录入成绩
    </div>
    <form class="form-horizontal" role="form" v-on:submit="add">
      <fieldset>
        <legend><span class="glyphicon glyphicon-pencil"> 请填写以下信息</span></legend>
        <div class="form-group">
          <label class="col-sm-2 control-label">学生学号</label>
          <div class="col-sm-3">
             <input class="form-control" type="text" v-model="stu.sid" @blur="getStuName">
             <span class="glyphicon glyphicon-ok" style="color: green" v-if="sidright">该学生存在</span>
             <span class="glyphicon glyphicon-remove" style="color: red" v-if="sidwrong">该学生不存在</span>
          </div>
          <label class="col-sm-2 control-label">学生姓名</label>
          <div class="col-sm-3">
             <input class="form-control" type="text" v-model="name" disabled>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">课程代码</label>
          <div class="col-sm-3">
             <input class="form-control" type="text" v-model="stu.kid" @blur="getClassName">
             <span class="glyphicon glyphicon-ok" style="color: green" v-if="kidright">该课程存在</span>
             <span class="glyphicon glyphicon-remove" style="color: red" v-if="kidwrong">该课程不存在</span>
          </div>
          <label class="col-sm-2 control-label">课程名称</label>
          <div class="col-sm-3">
             <input class="form-control" type="text" v-model="kname" disabled>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">课程成绩</label>
          <div class="col-sm-3">
             <input class="form-control" type="text" v-model="stu.score" @blur="judgeGrade">
             <span v-if="judgewrong" class="glyphicon glyphicon-remove" style="color: red">{{name}}的{{kname}}课程已有成绩，请重新填写</span>
             <span v-if="judgeright" class="glyphicon glyphicon-ok" style="color: green">{{name}}的{{kname}}课程还未录入成绩，可以继续填写</span>
          </div>
          <label class="col-sm-2 control-label">获得学分</label>
          <div class="col-sm-3">
             <input class="form-control" type="text" v-model="stu.getcredit">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">所在学期</label>
          <div class="col-sm-3">
             <input class="form-control" type="text" v-model="stu.semester">
          </div>
        </div>
      </fieldset>
      <button type="submit" class="btn btn-success center-block">提交</button>
    </form>
  </div>
</template>

<script>
import NavBar from './NavBar'
export default {
  name: 'AddGrade',
  data () {
    return {
      stu:{},
      name:"",
      kname:"",
      sidright:"",
      sidwrong:"",
      kidright:"",
      kidwrong:"",
      judgewrong:"",
      judgeright:""
    }
  },
  methods:{
    add(e){
      // console.log(this.stu.sid);
      // if(this.stu.sid==undefined){
      //   alert('1');
      // }
      if(this.stu.sid==undefined || this.stu.sid==undefined || this.stu.score==undefined || this.stu.semester==undefined || this.stu.getcredit==undefined || this.judgewrong=="1") {
        alert('格式错误，请重新填写');
      } else{
        var newinfo = this.stu;
        this.$http.post('http://localhost:3000/score',newinfo).then(function(response){
          console.log(response.body);
          alert('录入成功');
          this.stu = {};
          this.name = "";
          this.kname="";
          this.judgeright="";
          this.judgewrong="";
          this.sidwrong="";
          this.sidright="";
          this.kidwrong="";
          this.kidright="";
        })
      }
      e.preventDefault();
    },
    getStuName(){
      if(this.stu.sid == null) {
        return;
      }
      //根据输入的学生id获取该学生姓名
      //alert(this.stu.sid);
      this.$http.get("http://localhost:3000/student?sid="+this.stu.sid).then(function(response) {
        if(response.body.length == 0){
          this.sidwrong = "1";
          this.sidright = "";
          this.stu.name = "";
          this.name = "";
          return;
        }
        this.stu.name = response.body[0].name;
        this.name = response.body[0].name;
        this.sidwrong = "";
        this.sidright = "1";
      })
    },
    getClassName(){
      if(this.stu.kid == null) {
        return;
      }
      this.$http.get("http://localhost:3000/course?kid="+this.stu.kid).then(function(response){
        if(response.body.length == 0){
          this.kidwrong = "1";
          this.kidright = "";
          this.stu.kname = "";
          this.kname = "";
          return;
        }
        this.stu.kname = response.body[0].kname;
        this.kname = response.body[0].kname;
        this.kidwrong = "";
        this.kidright = "1";
      })
    },
    judgeGrade(){
      if(this.stu.score == null) {
        return;
      }
      this.$http.get("http://localhost:3000/score?sid="+this.stu.sid+"&kid="+this.stu.kid).then(function(response){
        console.log(this.stu.score);
        //先判断该条成绩存不存在 不存在成绩 length的值为0 存在的成绩 length值为1
        if(response.body.length != 0) {
          this.judgewrong = "1";
          return;
        } else {
          this.judgeright = "1";
        }
      })
    }
  },
  components:{
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-group{

}
</style>
