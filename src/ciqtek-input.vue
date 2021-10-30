<!--
 * @Author: tigoo
 * @LastEditTime: 2021-10-30 19:13:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /package-test/ciqtek-input/src/ciqtek-input.vue
-->
<template>
  <!-- contain wrap -->
  <div
    class="ciqtek-input"
    v-on="$listeners"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!-- input pre slot -->
    <div class="ciqtek-input__frontend" v-if="$slots.front">
      <slot name="front"></slot>
    </div>
    <!-- input maincontain-->
    <input
      type="text"
      :class="[
        'ciqtek-input__main',
        inputSize ? 'ciqtek-input__main--' + inputSize : '',
        {'is-disabled': inputDisabled}
      ]"
      :disabled="inputDisabled"
      :readonly="inputReadonly"
      :autocomplete="autoComplete"
      v-bind="$attrs"
      v-model="value"
      ref="input"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
    />
    <!-- input suffix slot -->
    <div class="ciqtek-input__backend" v-if="$slots.back">
      <slot name="back"></slot>
    </div>
  </div>
</template>

<script>
import {blurHandle, focusHandle, compatibleUnit} from './utils/util'
import Focus from './mixins/focus'
import LifeMonitor from './mixins/lifemonitor'
import Log from './mixins/log'
import log from './mixins/log'

export default {
  name: 'CiqtekInput',

  inheritAttrs: false,
  componentName: 'CiqtekInput',

  mixins: [Focus('input'), LifeMonitor, Log],
  /**
   * @type {Object}
   */
  props: {
    inputStyle: {
      type: Array,
      default: function() {
        return ['border', 'black']
      }
    },
    inputVal: {
      type: String | Number,
      default: '',
      required: true
    },
    inputMin: {
      type: Number,
      default: 0
    },
    inputMax: {
      type: Number,
      default: 100
    },
    inputSize: {
      type: String,
      default: 'big',
      validator: function(value) {
        if (!value)
          console.warn(
            '[Ciqtek Warn][Input] inputSize property should be in big samll. pls check again'
          )
      }
    },
    // stayDigits
    inputStayDigits: {
      type: Number,
      default: 3,
      validator(val) {
        return val >= 0 && val === parseInt(val, 10)
      }
    },
    // max Unit of input
    inputMaxUnit: {
      type: String,
      default: 'M'
    },
    // min Unit of input
    inputMinUnit: {
      type: String,
      default: 'p'
    },
    // unit Array <String>
    inputUnitArr: {
      type: Array,
      default: function() {
        return ['n', 'u', 'μ', 'm', 'k', 'M']
      },
      validator: function(arr) {
        return arr.length > 0
      },
      required: true
    },
    inputDisabled: [Boolean],
    inputReadonly: Boolean
  },
  data() {
    return {
      value: this.inputVal,
      hovering: false,
      focused: false,
      autoComplete: false,
      // return component value
      valueCache: {
        renderVal: '',
        numVal: null
      }
    }
  },
  watch: {
    value(val) {
      const checkVal = compatibleUnit(
        val,
        this.inputUnitArr,
        this.inputMin,
        this.inputMax,
        this.inputMaxUnit,
        this.inputMinUnit,
        this.inputStayDigits
      )
      console.log('[Ciqtek Input checkVal]', checkVal)
      if (checkVal) {
        let {renderVal, calcNum} = checkVal
        this.setValCache(renderVal, calcNum)
      } else {
        this.resetValCache()
      }
      console.log('[Ciqtek Input valueCache]', this.valueCache)
    }
  },
  methods: {
    /**
     * @description: return result of component
     * @param {}
     * @return {Object}
     */

    getValCache() {
      return this.valueCache
    },
    /**
     * @description: setValCache
     * @param {String} renderVal
     * @param {Number} calcNum
     * @return {*}
     */

    setValCache(renderVal, calcNum) {
      this.valueCache.renderVal = renderVal
      this.valueCache.numVal = calcNum
    },
    /**
     * @description: resetValCache
     * @param {*}
     * @return {*}
     */

    resetValCache() {
      this.valueCache.renderVal = ''
      this.valueCache.numVal = null
    },
    blurHandle() {
      this.value = blurHandle(this.value)
    },
    focusHandle() {
      this.value = focusHandle(this.value)
    },
    // component Methods :focus has been declare
    blur() {
      this.getCurrentCom().blur()
    },
    select() {
      this.getCurrentCom().select()
    },
    getCurrentCom() {
      return this.$refs.input || document.getElementsByTagName('input')
    },
    /**
     * @description: this is dynmnic calc offset value
     * @param {String} place
     * @return {void}
     */
    calcIconOffset(place) {
      if (!place) return
      let elList = [].slice.call(
        this.$el.querySelectorAll(`.ciqtek-input__${place}`) || []
      )
      if (!elList.length) return
      let el = null
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i]
          break
        }
      }
      if (!el) return
      const pendantMap = {
        suffix: 'append',
        prefix: 'prepend'
      }

      const pendant = pendantMap[place]
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${
          this.$el.querySelector(`.ciqtek-input-group__${pendant}`).offsetWidth
        }px)`
      } else {
        el.removeAttribute('style')
      }
    },
    // clear event
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
    handleBlur(event) {
      console.log('[Ciqtek Input :Blur]')
      this.focused = false
      this.$emit('blur', event)
      this.value = this.valueCache.renderVal
    },
    handleFocus(event) {
      console.log('[Ciqtek Input :Focus]')
      this.focused = true
      this.$emit('focus', event)
      this.value = this.valueCache.numVal
    },
    handleChange(event) {
      this.$emit('change', {...this.getValCache(), event})
    }
  },
  created() {
    // this.$on('inputSelect', this.select)
  },
  mounted() {
    // calc offset
    this.calcIconOffset()
    // aria support
    let ciqIpt = this.getCurrentCom()
    ciqIpt.setAttribute('role', 'input')
    ciqIpt.setAttribute('aria-valuenow', this.value)
    ciqIpt.setAttribute('aria-disabled', this.inputDisabled)
    ciqIpt.setAttribute('aria-valuemax', this.inputMax)
    ciqIpt.setAttribute('aria-valuemin', this.inputMin)
  },
  updated() {
    let ciqIpt = this.getCurrentCom()
    ciqIpt.setAttribute('aria-valuenow', this.value)
  }
}
</script>

<style lang="less">
@import url('./stylus/variables');
.ciqtek-input {
  .ciqtek-input__main {
    &--big {
      height: @bigSize;
      line-height: @bigSize;
      font-size: @bigFont;
    }
    &--small {
      height: @smallSize;
      line-height: @smallSize;
      font-size: @smallFont;
    }
  }
  .ciqtek-input__frontend {
    margin-left: 10px;
    padding-right: 10px;
  }
  .ciqtek-input__backend {
    margin-right: 20px;
    padding-left: 10px;
  }
  .is-disabled {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>
