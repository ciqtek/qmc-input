/*
 * @Author: tigoo
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /package-test/ciqtek-input/src/index.js
 */
// import vue component
import Component from './ciqtek-input.vue'
// import style
import './stylus/index.less'

// registe
Component.install = Vue => {
  Vue.component(Component.name, Component)
}

// support
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(Component)
}

// export
export default Component
