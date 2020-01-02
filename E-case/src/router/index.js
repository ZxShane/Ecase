import Vue from 'vue'
import Router from 'vue-router'
import CreateNewcase from '@/components/CreateNewcase'
import QueryCase from '@/components/QueryCase'
import Load from '@/components/Load'
import MyTrade from '@/components/MyTrade'
import Medicine from '@/components/Medicine'
import InHospital from '@/components/InHospital'
import TransferToLive from '@/components/TransferToLive'
import info from '@/components/info'
import register from '@/components/Register'
import PersonalInfo from '@/components/PersonalInfo'
import ChangeInfo from '@/components/changeinfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Load',
      component: Load
    },
    {
      path: '/createnewcase',
      name: 'CreateNewcase',
      component: CreateNewcase
    },
    {
      path: '/querycase',
      name: 'QueryCase',
      component: QueryCase
    },
    {
      path: '/mytrade',
      name: 'MyTrade',
      component: MyTrade
    },
    {
      path: '/medicine',
      name: 'Medicine',
      component: Medicine
    },
    {
      path: '/inhospital',
      name: 'Inhospital',
      component: InHospital
    },
    {
      path: '/transfer',
      name: 'TransferToLive',
      component: TransferToLive
    },
    {
      path: '/info',
      name: 'Info',
      component: info
    },
    {
      path: '/register',
      name: 'Register',
      component: register
    },{
      path:'/personalinfo',
      name:'PersonalInfo',
      component:PersonalInfo
    },
    {
      path:'/changeinfo',
      name:ChangeInfo,
      component:ChangeInfo
    }
  ]
})


