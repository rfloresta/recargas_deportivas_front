import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import ReloadBalance from './components/ReloadBalance.vue'
import CheckBalance from './components/CheckBalance.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/reload-balance', component: ReloadBalance },
  { path: '/check-balance', component: CheckBalance }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
