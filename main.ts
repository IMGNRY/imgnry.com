import 'lazysizes'

import Vue from 'vue'
import App from './App'

import LoadScript from 'vue-plugin-load-script'
Vue.use(LoadScript)

declare module 'vue/types/vue' {
    interface Vue {
        $loadScript: (path: string) => Promise<void>
    }
}

import './nightsky'

document.addEventListener('DOMContentLoaded', () => {
    new Vue({ render: createElement => createElement(App) }).$mount('#app')
})

// document.addEventListener('lazybeforeunveil', function(e) {
//     const spinner = (e.target as HTMLImageElement).nextElementSibling as HTMLElement
//     if (spinner && spinner.classList.contains('spinner')) {
//         spinner.style.opacity = '0'
//     }
// })
