<template>
  <!-- 输入专业id或专业名 模糊匹配出所有可能的专业 点击详情跳转到该专业的具体信息和该专业学生 -->
  <div class="seekbyzid container">
    <NavBar></NavBar>
    
    <div class="well well-sm">
      <router-link to="/admin">主页 </router-link> / 查询专业信息
    </div>
    <form class="bs-example bs-example-form" role="form" id="seekform">
      <div class="row">
        <br>
        <div class="col-lg-6">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="请输入专业编号或专业名称" v-model="zid">
            <span class="input-group-btn">
              <button class="btn btn-primary" type="button" @click="seekProfession">
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
            <th>专业代码</th>
            <th>专业名称</th>
            <th>专业描述</th>
          </tr>
        </thead>
        <tbody v-for="pro in professions">
          <tr>
            <td>{{pro.zid}}</td>
            <td>{{pro.zname}}</td>
            <td>{{pro.description}}</td>
            <router-link class="btn btn-sm btn-success" v-bind:to="'/professiondetails/'+pro.zid">详情</router-link>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import NavBar from './NavBar'
export default {
  name: 'seekbyzid',
  data () {
    return {
      zid:"",
      ifshow:"",
      professions:[]
    }
  },
  methods:{
    seekProfession(){
      //显示查询表格
      this.ifshow = "show";
      //根据输入的内容获取专业信息
      //实际上要模糊查询，列出所可能的专业 但我查不出来 只能把所有专业信息当做查到的模糊值返回 所以这个zid其实在这里用不到 后期再修改
      this.$http.get("http://localhost:3000/profession").then(function(response) {
        this.professions = response.body;
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
