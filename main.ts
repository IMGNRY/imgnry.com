import 'lazysizes'

import Vue from 'vue'
import Root from './Root.vue'
import IMGNRY from './IMGNRY'

// import LoadScript from 'vue-plugin-load-script'
// Vue.use(LoadScript)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Kristofer from './Kristofer.vue'
import Fille from './Fille.vue'

const loadedScripts = new Set<string>()

Vue.use({
  install(Vue) {
    Vue.prototype.$loadScript = function(path: string) {
      // Don't load the same script twice
      if (loadedScripts.has(path)) {
        return Promise.resolve()
      }
      loadedScripts.add(path)
      
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load script: ' + path))
        script.src = path
        document.head.appendChild(script)
      })
    }
  },
})

import './nightsky'

const routes = [
  { path: '/', component: IMGNRY },
  { path: '/kristofer', component: Kristofer },
  { path: '/fille', component: Fille },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    router,
    render: createElement => createElement(Root),
  }).$mount('#app')
})
