<template>
  <!-- 根据输入的学生id查找该学生所有的成绩显示在表格中 -->
  <div class="seekbystuid container">
    <NavBar></NavBar>
    
    <div class="well well-sm">
      <router-link to="/admin">主页 </router-link> / 成绩查询
    </div>
    <form class="bs-example bs-example-form" role="form" id="seekform">
      <div class="row">
        <br>
        <div class="col-lg-6">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="请输入学生编号" v-model="studentid">
            <span class="input-group-btn">
              <router-link class="btn btn-primary" type="button" v-bind:to="'/searchstu/'+studentid">
                查询
              </router-link>
            </span>
          </div><!-- /input-group -->
        </div><!-- /.col-lg-6 -->
      </div><!-- /.row -->
    </form>
  </div>
</template>

<script>
import NavBar from './NavBar'
export default {
  name: 'SeekByStuid',
  data () {
    return {
      studentid:""
    }
  },
  methods:{
    
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
