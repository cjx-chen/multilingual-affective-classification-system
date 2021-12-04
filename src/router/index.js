import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/index.vue')
  }
  // {
    // path: '/homepage',
    // name: 'HomePage',
    // component: () => import('../views/homepage/index.vue'),
    // children: [{
    //   path: 'courses',
    //   name: 'Course',
    //   component: () => import('../views/homepage/course-manager/index.vue')
    // },
  // }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
