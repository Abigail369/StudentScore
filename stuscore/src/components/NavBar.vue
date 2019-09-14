<template>
  <div class="navbar">
  	<!-- 导航条组件 -->
    <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">成绩管理系统-管理员版</a>
          </div>
          <div>
            <ul class="nav navbar-nav pull-right">
                    <li><a>欢迎您 {{admin_name}}</a></li>
                    <li><a href="#"><span class="glyphicon  glyphicon-log-out" @click="logout">退出</span></a></li>
                </ul>
          </div>
        </div>
      </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
     admin_name: localStorage.getItem('admin_id')
    }
  },
  methods:{
    logout(){
      //退出登录
      //从localstorage中删除admin_id变量 回到登录页面
      localStorage.removeItem("admin_id");
      this.$router.push({path:"/"});
    }
  },
  created(){
    if(localStorage.getItem('admin_id') == null) {
      alert('请先登录');
      this.$router.push({path:"/"});
      return;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar-default {
    background-color: #517b7b;
  }
  .navbar-default .navbar-brand {
      color: white;
      font-size: 25px;
  }
  .navbar-default .navbar-nav > li > a {
      color: #eee;
  }
  .navbar-default .navbar-nav > li > a:hover,
  .navbar-default .navbar-nav > li > a:focus {
      color: #538bc6;
  }
</style>
