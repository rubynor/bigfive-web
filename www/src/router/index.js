import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Form from '../views/Form'
import Test from '../views/Test'
import Result from '../views/Result'
import Compare from '../views/Compare'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home - Free open-source BigFive personality traits test - translated to multiple languages',
      metaTags: [
        {
          name: 'description',
          content: 'Take a free, open-source Big Five personality test - translated to multiple languages. Get to know yourself better from a detailed profile of your personality traits or learn to know others by comparing yourself with your partner, colleagues, friends or family.'
        },
        {
          property: 'og:description',
          content: 'Take a free, open-source Big Five personality test - translated to multiple languages. Get to know yourself better from a detailed profile of your personality traits or learn to know others by comparing yourself with your partner, colleagues, friends or family.'
        }
      ]
    }
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/result/:id',
    name: 'result',
    component: Result
  },
  {
    path: '/compare/:id',
    name: 'compare',
    component: Compare
  },
  {
    path: '/bigfive',
    name: 'bigfive',
    component: () => import(/* webpackChunkName: "Bigfive" */ '../views/Big_five')
  },
  {
    path: '/openness_to_experience',
    name: 'openness',
    component: () => import(/* webpackChunkName: "Openness" */ '../views/Openness_to_experience')
  },
  {
    path: '/conscientiousness',
    name: 'conscientiousness',
    component: () => import(/* webpackChunkName: "Conscientiousness" */ '../views/Conscientiousness')
  },
  {
    path: '/extraversion',
    name: 'extraversion',
    component: () => import(/* webpackChunkName: "Extraversion" */ '../views/Extraversion')
  },
  {
    path: '/agreeableness',
    name: 'agreeableness',
    component: () => import(/* webpackChunkName: "Agreeableness" */ '../views/Agreeableness')
  },
  {
    path: '/neuroticism',
    name: 'neuroticism',
    component: () => import(/* webpackChunkName: "Neuroticism" */ '../views/Neuroticism')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  }
})

export default router
