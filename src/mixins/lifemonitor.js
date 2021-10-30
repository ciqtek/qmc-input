/*
 * @Author: tigoo
 * @Date: 2021-10-30 16:24:55
 * @LastEditTime: 2021-10-30 16:27:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /package-test/ciqtek-input/src/mixins/lifemonitor.js
 */
function logIn4(msg) {
  console.log('[Ciqtek Created]')
}
export default {
  created() {
    logIn4('[Ciqtek Created]')
  },
  mounted() {
    logIn4('[Ciqtek Mounted]')
  },
  destroyed() {
    logIn4('[Ciqtek Destoryed]')
  }
}
