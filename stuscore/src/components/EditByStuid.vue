<template>
  <!-- 根据学号查询成绩后的修改 -->
  <div class="editbystuid container">
    <NavBar></NavBar>

    <div class="well well-sm" style="margin-top: -35px;">
      <router-link to="/admin">主页 </router-link>
      / 修改学生成绩
    </div>
    <form class="form-horizontal" role="form" v-on:submit="edit">
      <fieldset>
        <legend><span class="glyphicon glyphicon-pencil"> 请填写以下信息</span></legend>
        <div class="form-group">
          <label class="col-sm-2 control-label">学生学号</label>
          <div class="col-sm-3">
             <input class="form-control" type="text" :placeholder=stuinfo.sid disabled>
          </div>
          <label class="col-sm-2 control-label">学生姓名</label>
          <div class="col-sm-3">
             <input class="form-control" type="text" v-model="stuinfo.name" :placeholder=stuinfo.name>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">课程代码</label>
          <div class="col-sm-3">
             <input class="form-control" type="password" :placeholder=stuinfo.kid disabled>
          </div>
          <label class="col-sm-2 control-label">课程名称</label>
          <div class="col-sm-3">
             <input class="form-control" type="text" v-model="stuinfo.kname" :placeholder=stuinfo.kname>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">课程成绩</label>
          <div class="col-sm-3">
             <input class="form-control" type="text" v-model="stuinfo.score" :placeholder=stuinfo.score>
          </div>
          <label class="col-sm-2 control-label">获得学分</label>
          <div class="col-sm-3">
             <input class="form-control" type="text" v-model="stuinfo.getcredit" :placeholder=stuinfo.getcredit>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">所在学期</label>
          <div class="col-sm-3">
             <input class="form-control" type="text" v-model="stuinfo.semester" :placeholder=stuinfo.semester>
          </div>
        </div>
      </fieldset>     
      <button type="submit" class="btn btn-success center-block">修改</button>
    </form>

  </div>
</template>

<script>
import NavBar from './NavBar'
export default {
  name: 'EditByStuid',
  data () {
    return {
      stuid:"",
      kid:"",
      stuinfo:"",
      id:""
    }
  },
  methods:{
    getId() {
      //获取上一页面传来的学号和课程编码
      this.stuid = this.$route.params.stuid;
      this.kid = this.$route.params.kid;
      //alert(this.stuid);
      //alert(this.kid);
    },
    getInfo() {
      //根据sid获取学生的成绩信息，放在输入框里
      this.$http.get("http://localhost:3000/score?sid="+this.stuid+"&&kid="+this.kid)
          .then(function(response){
            console.log(response)
            this.stuinfo = response.body[0];
            //在我的测试数据中 每条数据都有一个独特的id 不是sid 先获取数据的id 然后根据id去修改数据 不然会303
            //获取要修改的数据的独特id
            this.id = this.stuinfo.id;
            //alert(this.id);
        })
    },
    edit(e){
      var newinfo = {
        sid: this.stuinfo.sid,
        name: this.stuinfo.name,
        kid: this.stuinfo.kid,
        kname: this.stuinfo.kname,
        score: this.stuinfo.score,
        semester: this.stuinfo.semester,
        getcredit: this.stuinfo.getcredit
      }
      //记录输入的新信息
      console.log(newinfo);
      //根据i该条数据的独特id修改，而不是根据参数修改
      this.$http.put('http://localhost:3000/score/'+this.id, newinfo).then(function(response){
        alert('修改成功');
        this.$router.go(-1);
      })
      //阻止按钮默认事件
      e.preventDefault();
    }
  },
  created(){
    this.getId();
    this.getInfo();
  },
  components:{
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
