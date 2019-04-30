import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CreateNewcase from '@/components/CreateNewcase'
import QueryCase from '@/components/QueryCase'
import AddCase from '@/components/AddCase'
import Load from '@/components/Load'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/createnewcase',
      name:'CreateNewcase',
      component: CreateNewcase
    },
    {
      path:'/addcase',
      name:'AddCase',
      component: AddCase
    },
    {
      path:'/querycase',
      name:'QueryCase',
      component: QueryCase
    },
    {
      path:'/load',
      name:'Load',
      component:Load
    }
  ]
})


