import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import HelloWorld from '@/components/HelloWorld'

import HomePage from '@/components/HomePage'
import Admin from '@/components/Admin'
import Student from '@/components/Student'
import SeekByStuid from '@/components/SeekByStuid'
import SearchStu from '@/components/SearchStu'
import EditByStuid from '@/components/EditByStuid'
import SeekByClass from '@/components/SeekByClass'
import ClassDetails from '@/components/ClassDetails'
import SeekByZid from '@/components/SeekByZid'
import ProfessionDetails from '@/components/ProfessionDetails'
import GradefromPfsion from '@/components/GradefromPfsion'
import AddGrade from '@/components/AddGrade'

import global from '@/api/global.js'

Vue.prototype.GLOBAL = global

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  //路由配置
  mode:"history",
  base:__dirname,//这两句加上有用
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
    	path: '/admin',
    	name: 'Admin',
    	component: Admin
    },
    {
    	path: '/student',
    	name: 'Student',
    	component: Student
    },
    {
      path: '/seekbystuid',
      name: 'SeekByStuid',
      component: SeekByStuid
    },
    {
      path: '/searchstu/:sid',
      name: 'SearchStu',
      component: SearchStu
    },
    {
      path: '/editbystuid/:stuid/:kid',
      name: 'EditByStuid',
      component: EditByStuid
    },
    {
      path: '/seekbyclass',
      name: 'SeekByClass',
      component: SeekByClass
    },
    {
      path: '/classdetails/:kid',
      name: 'ClassDetails',
      component: ClassDetails
    },
    {
      path: '/seekbyzid',
      name: 'SeekByZid',
      component: SeekByZid
    },
    {
      path: '/professiondetails/:zid',
      name: 'ProfessionDetails',
      component: ProfessionDetails
    },
    {
      path: '/gradefrompfsion/:sid/:zid',
      name: 'GradefromPfsion',
      component: GradefromPfsion
    },
    {
      path: '/addgrade',
      name: 'AddGrade',
      component: AddGrade
    }
  ]
})
