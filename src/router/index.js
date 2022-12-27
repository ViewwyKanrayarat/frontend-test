import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueRouter from 'vue-router'
import login from '../views/LoginPage.vue'
import home from '../views/HomePage.vue'
import page1 from '../views/view-page1.vue'
import page2 from '../views/view-page2.vue'
import page3 from '../views/view-page3.vue'


Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: { name: 'login' } },
  { path: '/home', redirect: { name: 'page1' } },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: { requireLogin: false }
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: { requireLogin: true },
    children: [
      {
        path: 'page1',
        name: 'page1',
        component: page1,
        meta: { requireLogin: true }
      },
      {
        path: 'page2',
        name: 'page2',
        component: page2,
        meta: { requireLogin: true }
      },
      {
        path: 'page3',
        name: 'page3',
        component: page3,
        meta: { requireLogin: true }
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, form, next) => {
  // เช็คว่า login หรือยัง
  const ls = VueCookies.get('token')
  // requireLogin: true
  if (to.matched.some((x) => x.meta.requireLogin)) {
    // ถ้าไม่มี token ต้อง Login
    if (ls === undefined || ls === null) {
      // ไปที่พาร์ท login
      next({ name: 'login' })
    } else {
      // มี token
      next()
    }
 // requireLogin: false
  } else {
    // ไม่ต้อง login
    if (ls === undefined || ls === null) {
      next()
    } else {
      // ถ้ามี token แล้ว เด้งไปหน้า home
      if (to.name === 'login') {
        next({ name: 'page1' })
      } else {
        next()
      }
    }
  }
})

export default router
