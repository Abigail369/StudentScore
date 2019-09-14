<template>
  <!-- 管理员操作界面 -->
  <div class="admin img1">
    <div class="container">
      <!-- 将导航栏作为组件 -->
      <NavBar></NavBar>
      
      <!-- 选择框 -->
      <div class="container">
        <div class="row">
          <br>
          <div class="panel panel-primary col-md-6 col-md-offset-3" id="optionsTab">
            <div class="panel-heading">选择操作类型</div>
            <ul class="list-group">

              <li class="list-group-item"><a href="#" @click="showop1"><span class="glyphicon glyphicon-search"> 信息查询</span></a></li>
              <div v-if="option1" class="op">
                <p><router-link v-bind:to="{path:'/seekbystuid'}">  学生成绩查询</router-link></p>
              </div>

              <li class="list-group-item"><a href="#" @click="showop2"><span class="glyphicon glyphicon-text-width"> 其他查询</span></a></li>
              <div v-if="option2"  class="op">
                <p><router-link v-bind:to="{path:'/seekbyclass'}"> 课程信息查询 </router-link></p>
                <p><router-link v-bind:to="{path:'/seekbyzid'}"> 专业信息查询 </router-link></p>
              </div>

              <li class="list-group-item"><a href="#" @click="showop3"><span class="glyphicon glyphicon-pencil"> 成绩管理</span></a>
                <div v-if="option3"  class="op">
                  <p><router-link v-bind:to="{path:'/addgrade'}"> 录入成绩 </router-link></p>
                  <p><router-link v-bind:to="{path:'/seekbystuid'}"> 修改成绩</router-link></p>
                </div>
              
              <li class="list-group-item">
                
              </li>
            </ul>
          </div>
        </div>
      </div>
        
    </div>
    

    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
export default {
  name: 'Admin',
  data () {
    return {
      //制作三个树形菜单的属性 点击树干 属性值置为非空
      option1:"",
      option2:"",
      option3:""
    }
  },
  methods:{
    showop1(){
      if(this.option1 == "1") {
        this.option1 = "";
      } else {
        this.option2 = "";
        this.option3 = "";
        //只能同时显示一个
        this.option1 = "1";
      }
    },
    showop2(){
      if(this.option2 == "2") {
        this.option2 = "";
      } else {
        this.option1 = "";
        this.option3 = "";
        this.option2 = "2";
      }
    },
    showop3(){
      if(this.option3 == "3") {
        this.option3 = "";
      } else {
        this.option1 = "";
        this.option2 = "";
        this.option3 = "3";
      }
    }
  },
  created(){
    
  },
  components:{
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    min-height: 800px;
  }
  .img1{
      background-size: 100% 100%;
      background: url('~@/../static/images/back3.jpg') center center no-repeat;
      height: 100%;
      background-attachment: fixed;
      width: 100%
  }
  .container{
    /*background-color: rgb(194, 214, 214, 0.6);*/
    background-color: white;
  }
  .op {
    margin-left: 60px;
  }
  #optionsTab {
    height: 250px;
  }
</style>
