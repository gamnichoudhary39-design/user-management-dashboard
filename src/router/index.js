import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/homeView.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/usersView.vue'
import PostsView from '../views/PostsView.vue'
import SettingsView from '../views/SettingsView.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    component: LoginView,
  },
  {
    path: '/home',
    component: HomeView,
  },
  {
    path: '/users',
    component: UsersView,
  },
  {
    path: '/posts',
    component: PostsView,
  },
  {
    path: '/settings',
    component: SettingsView,
  },
  {
    path: '/:pathMatch(.)',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to,from, next) => {
  const token = localStorage.getItem('token')

  if (to.path !== '/' && !token) {
    next('/')
  } else {
    next()
  }
})

export default router