<template>
	<!-- 验证管理员登录组件 -->
	<div class="loginalert alert" id="content">
	 	<form v-on:submit="testLogin" id="loginform">
	 		<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	  		<div class="well">
	  			<h4>管理员登录</h4>
	  			<div class="form-group">
	  				<input type="text" class="form-control" v-model="logininfo.name" placeholder="请输入账号..."/>
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
  name: 'LoginAlert',
  data () {
    return {
      logininfo:{

      },
      testmsg:""
    }
  },
  methods:{
  	testLogin(){
  		//验证登录
  		//获取输入框中的账号与密码 请求该账号信息
  		//与返回的密码对比 一致登录成功 不一致返回testmsg错误信息
  		if(this.logininfo.name == "" || this.logininfo.password == "") {
  			this.testmsg = "账号及密码不能为空";
  		}
  		//alert(this.testmsg);
  		else {
  			//使用localstorage存储admin_id
  			localStorage.setItem("admin_id",this.logininfo.name);
  			this.$router.push({path:"/admin"});
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
