<template>
	<!-- 验证学生登录组件 -->
	<div class="stuloginalert alert" id="content">
	 	<form v-on:submit="testLogin" id="loginform">
	 		<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	  		<div class="well">
	  			<h4>学生登录</h4>
	  			<div class="form-group">
	  				<input type="text" class="form-control" v-model="logininfo.stuid" placeholder="请输入学号..."/>
	  			</div>
	  			
	  			<div class="form-group">
	  				<input type="password" class="form-control" v-model="logininfo.password" placeholder="请输入密码..."/>
	  			</div>
	  			<!-- 如果密码错误 显示错误信息在最下方 -->
	  			<p>{{testmsg}}</p>
	  			<!-- 点击登录触发form绑定的testlogin函数 验证登录 -->
	  			<button type="submit" class="btn btn-success center-block">登录</button>
	  			
	  		</div>
	  	</form>
  </div>
</template>

<script>
export default {
  name: 'StuLoginAlert',
  data () {
    return {
      logininfo:{

      },
      testmsg:""
    }
  },
  methods:{
  	testLogin(){
  		//alert(localStorage.getItem('stu_id'));
  		//验证登录
  		//获取输入框中的账号与密码 请求该账号信息
  		//与返回的密码对比 一致登录成功 不一致返回testmsg错误信息
  		//登录成功后跳转到学生查询信息界面 将学生id记下 作为token验证登录
  		if(this.logininfo.stuid == "" || this.logininfo.password == "") {
  			this.testmsg = "账号及密码不能为空";
  		}
  		//alert(this.testmsg);
  		else {
  			//使用localstorage存储stu_id
  			localStorage.setItem("stu_id",this.logininfo.stuid);
  			//alert(localStorage.getItem('stu_id'));

  			this.$router.push({path:"/student", query:{stuid:this.logininfo.stuid}});
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#content {
		background-color: #afd2ff66;
		border: 0px solid rgba(0, 0, 0, 0.2);
		border-radius: 31px;
		box-shadow: 0px 0px 40px 21px rgba(131, 151, 201, 0.5);
		-webkit-box-shadow: 0px 0px 40px 21px rgba(131, 151, 201, 0.5);
		box-shadow: 0px 0px 40px 21px rgba(131, 151, 201, 0.5);
	}
	.form-control {
		background-color: #fffc;
	}
	.form-group, .well{
		background-color: #afd2ff66;
	}
	.form-group > label {
		color: #595959;
	}
	span {
		color: #001a4d;
		font-size: 30px;
	}
</style>
