import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
import axios from 'axios'
import Edit from '../views/EditView.vue'


function AdminAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){

    var req = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }

    console.log(req)

    axios.post('http://localhost:8686/validate',{}, req).then(res => {
      console.log(res)
      next()
    }).catch(err => {
      console.log(err.response)
      next('/login')
    })
  }else{
    next('/login')
  }
}


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/panel',
    name: 'panel',
    component: UserView
  },
  {
    path: '/admin/users',
    name: 'users',
    component: UserView,
    beforeEnter: AdminAuth
  },
  {
    path: '/admin/users/edit/:id',
    name: 'edit',
    component: Edit,
    beforeEnter: AdminAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
