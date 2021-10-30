/*
 * @Author: your name
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /package-test/ciqtek-input/test/index.test.js
 */
import test1 from './test'

test('main', () => {
  expect(test1(1, 2)).toBe(3)
})

import {mount} from '@vue/test-utils'
import CiqtekInput from '../src/ciqtek-input.vue'

const CELL_HEIGHT = 20
const utils = {
  getOffsetByDigit(digit) {
    return digit.split('').map(v => {
      const offset = v * CELL_HEIGHT
      if (!offset) {
        return 0
      }
      return -offset
    })
  },
  getWrapper(supportCssTransForm, props) {
    return mount(CiqtekInput, {
      attachToDocument: true,
      propsData: props,
      attrs: {
        unitTest: {
          cellHeight: CELL_HEIGHT,
          supportCssTransForm
        }
      }
    })
  }
}

describe('CiqtekInput.vue', () => {
  describe('on the condition of support transform', () => {
    const wrapper = utils.getWrapper(true)

    test('should be correct vue component', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper.name()).toBe('CiqtekInput')
    })
  })

  describe('on the condition of not normal work', () => {
    const wrapper = utils.getWrapper(false)

    test('init instance without props should be work', done => {
      wrapper.vm.$on('blur', () => {
        expect(wrapper.vm.digitOffsetArr).toEqual(
          utils.getOffsetByDigit('1000')
        )
        done()
      })
    })

    test('setDigit should be work', done => {
      const wrapper2 = utils.getWrapper(false, {rollDigits: 3000})
      wrapper2.vm.$on('blur', () => {
        wrapper2.vm.setDigit(2500)

        wrapper2.vm.$on('blur', () => {
          expect(wrapper2.vm.digitOffsetArr).toEqual(
            utils.getOffsetByDigit('2500')
          )
          done()
        })
      })
    })

    test('setDigit with array should be work', done => {
      const wrapper2 = utils.getWrapper(false)
      wrapper2.vm.$on('blur', () => {
        wrapper2.vm.value = 44n

        wrapper2.vm.$on('focus', () => {
          expect(wrapper2.vm.value).toEqual(utils.getOffsetByDigit('44n'))
          done()
        })
      })
    })
  })
})
