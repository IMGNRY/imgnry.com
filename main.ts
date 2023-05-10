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

Vue.use({
  install(Vue) {
    Vue.prototype.$loadScript = function(path) {
      return new Promise((resolve, reject) => {
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
})

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    router,
    render: createElement => createElement(Root),
  }).$mount('#app')
})
