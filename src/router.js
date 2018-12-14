import Vue from 'vue'
import Router from 'vue-router'
import Skills from './components/Skills.vue'
import About from './components/About.vue'
import LoginComponent from "./components/login.vue"
import Secure from "./components/secure.vue"
import register from "./components/register.vue"
import datatable from "./components/datatable.vue"
import test from "./components/test.vue"
import livetable from "./components/livetable.vue"
import search from './components/search.vue'
import modal from './components/modal.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'skills',
      component: Skills
    },
    
    {
      path: '/about',
      name: 'about',
      component: About
    },

    {
      path: '/modal',
      name: 'modal',
      component: modal
    },
    
    {
      path: '/',
      redirect: {
        name: "login"
      } 
    },

    {
      path: "/login",
      name: "login",
      component: LoginComponent
    },

    {
      path: "/secure",
      name: "secure",
      component: Secure
    },

    {
      path: "/register",
      name: "register",
      component: register
    },

    {
      path: "/datatable",
      name: "datatable",
      component: datatable
    },

    {
      path: "/test",
      name: "test",
      component: test
    },

    {
      path: "/livetable",
      name: "livetable",
      component: livetable
    },

    {
      path: '/search',
      name: 'search',
      component: search
    },
  ]
})
