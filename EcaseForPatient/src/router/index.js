import Vue from 'vue'
import Router from 'vue-router'
import Load from '@/components/Load'
import Account from '@/components/account'
import Wallet from '@/components/Wallet'
import guahao from '@/components/guahao'
import Addinfo from '@/components/Addinfo'
import choosedoc from '@/components/choosedoc'
import Myhao from '@/components/Myhao'
import choosehospital from "@/components/choosehospital";
import Register from '@/components/Register'
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
        path:'/account',
          name:'account',
          component:Account
      },
    {
      path:'/transfer',
      name:'Transfer',
      component:Wallet
    },
    {
      path:'/guahao',
      name:'guahao',
      component:guahao
    },
    {
      path:'/addinfo',
      name:'Addinfo',
      component:Addinfo
    },
    {
      path:'/choosedoc',
      name:'choosedoc',
      component:choosedoc
    },
    {
      path:'/myhao',
      name:Myhao,
      component:Myhao
    },
    {
      path:'/choosehospital',
      name:choosehospital,
      component:choosehospital
    },
    {
      path:'/register',
      name:Register,
      component:Register
    },
    {
      path:'/personalinfo',
      name:PersonalInfo,
      component:PersonalInfo
    },
    {
      path:'/changeinfo',
      name:ChangeInfo,
      component:ChangeInfo
    }
  ]
})


