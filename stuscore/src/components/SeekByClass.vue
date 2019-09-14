<template>
  <!-- 输入课程id或课程名 模糊匹配出所有可能的课程 点击详情跳转到该课程的具体信息 -->
  <div class="seekbyclass container">
    <NavBar></NavBar>
    
    <div class="well well-sm">
      <router-link to="/admin">主页 </router-link> / 查询课程信息
    </div>
    <form class="bs-example bs-example-form" role="form" id="seekform">
      <div class="row">
        <br>
        <div class="col-lg-6">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="请输入课程编号" v-model="kid">
            <span class="input-group-btn">
              <button class="btn btn-primary" type="button" @click="seekClass">
                查询
              </button>
            </span>
          </div><!-- /input-group -->
        </div><!-- /.col-lg-6 -->
      </div><!-- /.row -->
    </form>
    <div v-if="ifshow" >
      <h4 class="page-header">查询结果</h4>
      <table class="table">
        <thead>
          <tr>
            <th>课程代码</th>
            <th>课程名称</th>
            <th>课程学分</th>
          </tr>
        </thead>
        <tbody v-for="course in courses">
          <tr>
            <td>{{course.kid}}</td>
            <td>{{course.kname}}</td>
            <td>{{course.credit}}</td>
            <router-link class="btn btn-sm btn-success" v-bind:to="'/classdetails/'+course.kid">详情</router-link>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import NavBar from './NavBar'
export default {
  name: 'SeekByClass',
  data () {
    return {
      kid:"",
      ifshow:"",
      courses:[]
    }
  },
  methods:{
    seekClass(){
      //显示查询表格
      this.ifshow = "show";
      //根据输入的内容获取课程信息
      //实际上要模糊查询，列出所可能的课程值 但我查不出来 只能把所有课程信息当做查到的模糊值返回 所以这个kid其实在这里用不到 后期再修改
      this.$http.get("http://localhost:3000/course").then(function(response) {
        this.courses = response.body;
      })
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
#seekform{
    margin-top: -25px;
}
</style>
