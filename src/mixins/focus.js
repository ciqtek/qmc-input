/*
 * @Author: tigoo
 * @Date: 2021-10-30 16:18:48
 * @LastEditTime: 2021-10-30 16:20:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /package-test/ciqtek-input/src/mixins/focus.js
 */
export default function(refName) {
  return {
    methods: {
      focus() {
        this.$refs[refName].focus()
      }
    }
  }
}
