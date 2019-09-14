<template>
  <!-- 选择登陆方式界面 -->
  <div class="homepage img1">
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <a href="#" class="navbar-brand"><i>学生成绩管理系统</i></a>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#" @click="login"><span class="glyphicon glyphicon-user"> 管理员登录</span></a></li>
          <li><a href="#" @click="stulogin"><span class="glyphicon glyphicon-zoom-in"> 学生登录</span></a></li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid page-induce">
      <h2 class="page-header text-muted">Welcome to use.</h2>
      <p class="text-muted">The front-end page uses Vue.js.<br>Please select a different role to log in and use it normally after login</p>
      <br>
      <LoginAlert v-if="loginalert" v-bind:message="loginalert"></LoginAlert>
      <StuLoginAlert v-if="stuloginalert" v-bind:message="stuloginalert"></StuLoginAlert>
    </div>


  </div>
</template>

<script>
import LoginAlert from './LoginAlert'
import StuLoginAlert from './StuLoginAlert'
export default {
  name: 'HomePage',
  data () {
    return {
      loginalert:"",
      stuloginalert:""
    }
  },
  methods:{
    login(){
      //点击登录后loginalert值不为空，stuloginalert为空，显示<LoginAlert>管理员登录组件
      //两个组件不能同时显示
      
        this.loginalert = "loginalert";
        this.stuloginalert = "";
      
    },
    stulogin(){
      //this.$router.push({path:"/stulogin"});
      //点击学生登录后stuloginalert值不为空，显示<StuLoginAlert>学生登录组件
      
        this.stuloginalert = "stuloginalert";
        this.loginalert = "";
    }
  },
  components:{
    LoginAlert,
    StuLoginAlert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar-default {
    background-color: rgba(235, 235, 224, 10%);
    border-color: transparent;
  }

  .img1{
      background-size: 100% 100%;
      background: url('~@/../static/images/back3.jpg') center center no-repeat;
      height: 100%;
      position: fixed;
      width: 100%
  }
  .navbar-default .navbar-brand {
      color: #ffffff;
      font-size: 25px;
  }
  .navbar-default .navbar-nav > li > a {
      color: #e6e6e6;
  }
  .navbar-default .navbar-nav > li > a:hover,
  .navbar-default .navbar-nav > li > a:focus {
      color: #538bc6;
  }
  .page-induce {
    margin-left: 800px;
    margin-top: 40px;
  }
</style>
