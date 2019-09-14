<template>
  <!-- 学生查询成绩页面 -->
  <div class="student img1">
    <div class="container">

      <nav class="navbar navbar-default" role="navigation">
    		<div class="container-fluid">
    			<div class="navbar-header">
    				<a class="navbar-brand" href="#">成绩管理系统-学生版</a>
    			</div>
    			<div>
    				<ul class="nav navbar-nav pull-right">
                    <li><a href="#">学号 {{stuinfo.stuid}}</a></li>
    		            <li><a> {{stuinfo.stuid}}</a></li>
    		            <li><a href="#"><span class="glyphicon glyphicon-log-out" @click="logout">退出</span></a></li>
    		        </ul>
    			</div>
    		</div>
    	</nav>

    	<input type="text" class="form-control" placeholder="检索不同学期成绩" v-model="filterInput">
    	<!-- 成绩展示 -->
      <h2 class="page-header"></h2>
      <button class="btn pull-right" @click="exportExcel">导出</button>
      <div class="tabCard">
        <ul id="myTab" class="nav nav-tabs">
           <li class="active" @click="showall"><a href="#home" data-toggle="tab">
              全部课程</a>
           </li>
           <li @click="showpass"><a href="#pass" data-toggle="tab">通过课程</a></li>
           <li @click="showfailed"><a href="#ios" data-toggle="tab">未通过课程</a></li>
        </ul>
        <div id="myTabContent" class="tab-content">
           <div class="tab-pane fade in active" id="home">
              <table class="table">
                  <thead>
                    <tr>
                      <th>学期</th>
                      <th>课程代码</th>
                      <th>课程名</th>
                      <th>分数</th>
                      <th>获得学分</th>
                    </tr>
                  </thead>
                  <tbody id="tbody">
                    <tr v-for="(info,index) in filterAll(infos,filterInput)" :key="index">
                      <td>{{info.semester}}</td>
                      <td>{{info.kid}}</td>
                      <td>{{info.kname}}</td>
                      <td>{{info.score}}</td>
                      <td>{{info.getcredit}}</td>
                    </tr>
                  </tbody>
              </table>
           </div>
           <div class="tab-pane fade" id="ios">
              <table class="table">
                  <thead>
                    <tr>
                      <th>学期</th>
                      <th>课程代码</th>
                      <th>课程名</th>
                      <th>分数</th>
                      <th>获得学分</th>
                    </tr>
                  </thead>
                  <tbody id="tbody">
                    <tr v-for="(info,index) in filterAll(nopassinfos,filterInput)">
                      <td>{{info.semester}}</td>
                      <td>{{info.kid}}</td>
                      <td>{{info.kname}}</td>
                      <td>{{info.score}}</td>
                      <td>{{info.getcredit}}</td>
                    </tr>
                  </tbody>
              </table>
           </div>
           <div class="tab-pane fade" id="pass">
              <table class="table">
                  <thead>
                    <tr>
                      <th>学期</th>
                      <th>课程代码</th>
                      <th>课程名</th>
                      <th>分数</th>
                      <th>获得学分</th>
                    </tr>
                  </thead>
                  <tbody id="tbody">
                    <tr v-for="(info,index) in filterAll(passinfos,filterInput)">
                      <td>{{info.semester}}</td>
                      <td>{{info.kid}}</td>
                      <td>{{info.kname}}</td>
                      <td>{{info.score}}</td>
                      <td>{{info.getcredit}}</td>
                    </tr>
                  </tbody>
              </table>
           </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data () {
    return {
      stuinfo:{

      },
      infos:[
        
      ],
      nopassinfos:[

      ],
      passinfos:[

      ],
      filterInput:"",
      all:"all",
      pass:"",
      failed:""
    }

  },
  methods:{
  	filterAll(infos, value) {
      return infos.filter(function(info){
        return info.semester.match(value);
      })
    },
    getAllgarde(){
      this.$http.get("http://localhost:3000/score?sid="+this.stuinfo.stuid).then(function(response){
        this.infos = response.body;
        console.log(this.infos);
        //得到未通过课程
        this.getNopassinfos();
        //得到通过课程
        this.getPassinfos();
      })
    },
    getNopassinfos(){
      //获取未通过的课程
      var _infos = this.infos;
      //alert(_infos.length);
      for(var i = 0; i < _infos.length; i++) {
        if(_infos[i].score < 60) {
          this.nopassinfos.push(_infos[i]);
        }
      }
    },
    getPassinfos(){
      //通过的课程
      var _infos = this.infos;
      //alert(_infos.length);
      for(var i = 0; i < _infos.length; i++) {
        if(_infos[i].score >= 60) {
          this.passinfos.push(_infos[i]);
        }
      }
    },
    logout(){
      //退出登录
      //从localstorage中删除stu_id变量 回到登录页面
      localStorage.removeItem("stu_id");
      this.$router.push({path:"/"});
    },
    exportExcel(){
      require.ensure([], () => {
            const {
                export_json_to_excel
            } = require('vendor/Export2Excel');
            const tHeader = ['学期','课程代码', '课程名', '分数', '获得学分'];
            const filterVal = ['semester', 'kid', 'kname', 'score', 'getcredit'];
            //判断处于哪个控件 将list设置为不同的下载内容
            var list = [];
            if(this.pass == "" && this.failed == "") {
              list = this.infos;
            }
            if(this.all == "" && this.failed == "") {
              list = this.passinfos;
            }
            if(this.all == "" && this.pass == "") {
              list = this.nopassinfos;
            }
            // console.log(list);
            // console.log(this.infos);
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '列表excel');
        })
    },
    // 参数过滤
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    },

    //获取当前选项卡有关的函数
    showall(){
      this.all = "all";
      this.failed = "";
      this.pass = "";
      //alert("当前显示控件:"+this.all+" 通过选项:"+this.pass+" 未通过控件:"+this.failed);
    },
    showpass(){
      this.pass = "pass";
      this.failed = "";
      this.all = "";
      //alert("当前显示控件:"+this.pass+" 全部选项:"+this.all+" 未通过控件:"+this.failed);
    },
    showfailed(){
      this.failed = "failed";
      this.all = "";
      this.pass = "";
      //alert("当前显示控件:"+this.failed+" 全部选项:"+this.all+" 通过控件:"+this.pass);
    }
  },

  created(){
    //开始先验证stu_id是否有值存在 判断是否登录
    if(localStorage.getItem('stu_id') == null) {
      alert('请先登录');
      this.$router.push({path:"/"});
      return;
    }

    //通过localstorage获取学生id
    this.stuinfo.stuid = localStorage.getItem('stu_id');
  	// 	然后要根据获取到的id，获得学生的姓名,显示在页面上，注：后续要修改为显示姓名
    //...

    //页面开始就获取该账号对应的所有成绩
    this.getAllgarde();
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
      background: url('~@/../static/images/back.jpg') center center no-repeat;
      height: 100%;
      background-attachment: fixed;
      width: 100%
  }
  .container{
    background-color: white;
  }
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
  #tbody tr:nth-child(even) {
    background: #fffae5;
  }
  #tbody tr:nth-child(odd) {
    background: #e5ecff;
  }

</style>
