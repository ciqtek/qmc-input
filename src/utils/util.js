/*
 * @Author: tigoo
 * @LastEditTime: 2021-10-30 19:12:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /package-test/ciqtek-input/src/utils/util.js
 */

/**
 * @param  {Number} val
 */
export function blurHandle(val) {
  return val + 'm'
}
/**
 * @param  {String} val
 * @param  {Number} {returnparseFloat(val
 */
export function focusHandle(val) {
  return parseFloat(val)
}
/**
 * 输入框单位兼容
 * @param {String} val 输入框实际输入内容
 * @param {Array} unitArr 包含的单位
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {String} maxUnit 最大单位
 * @param {String} minUnit 最小单位
 * @param {Number} stayDigits 保留的小数位
 * @returns {Object} 返回计算数值和显示数值
 */
export function compatibleUnit(
  val,
  unitArr,
  min,
  max,
  maxUnit,
  minUnit,
  stayDigits
) {
  const unitNum = {
    p: 1e-12,
    n: 1e-9,
    u: 1e-6,
    μ: 1e-6,
    m: 1e-3,
    k: 1e3,
    M: 1e6,
    G: 1e9
  }
  val = isNull(val) ? '' : val.toString()
  // 转换为字符串
  const numUnitF = /(-?\d+(\.\d+)?)/.exec(val) && /(-?\d+(\.\d+)?)/.exec(val)[0]
  let num = parseFloat(val)
  if (!!num || num === 0) {
    const numLength = numUnitF.length
    const effectiveIndex = val.indexOf(num)
    const strLength = val.length
    let unitFromVal
    if (numLength === strLength || isExp(val)) {
      num = num < min ? min : num
      num = num > max ? max : num
      return {
        calcNum: num,
        renderVal: num2Unit(num, stayDigits)
      }
    } else if (numLength + 1 === strLength) {
      unitFromVal = val.substring(
        effectiveIndex + numLength,
        effectiveIndex + numLength + 1
      )
    } else {
      return false
    }
    if (unitArr.includes(unitFromVal)) {
      const minUnitVal = num * unitNum[unitFromVal]
      if (minUnitVal <= min) {
        return {
          calcNum: min,
          renderVal: min / unitNum[minUnit] + minUnit
        }
      } else if (minUnitVal >= max) {
        return {
          calcNum: max,
          renderVal: max / (unitNum[maxUnit] || 1) + maxUnit
        }
      } else {
        const calcNum = minUnitVal
        const renderVal = num2Unit(minUnitVal, stayDigits)
        return {
          calcNum,
          renderVal
        }
      }
    } else {
      return false
    }
  } else {
    return false
  }
}
/**
 * number类型数值转换为带单位的数值
 * @param {Number}
 */
export function num2Unit(num, stayDigits = 4) {
  try {
    const a = num.toExponential() + ''
    const b = a.split('e')
    const c = parseInt(b[1] / 3)
    const d = b[1] % 3
    if (c < 0 && b[0] * 10 ** d < 1) {
      return (b[0] * 1000 * 10 ** d).toFixed(stayDigits) + getUnit(c - 1)
    } else {
      if (c <= 3) {
        return (b[0] * 10 ** d).toFixed(stayDigits) + getUnit(c)
      } else {
        return (b[0] * 10 ** d * 1000).toFixed(stayDigits) + getUnit(3)
      }
    }
  } catch (error) {
    return false
  }
}
/**
 * @description: is NUll
 * @param {*} value
 * @return {*}
 */
export function isNull(value) {
  return Object.prototype.toString.call(value).toLowerCase() === '[object null]'
}
// !FIXME 只是从字符串角度判断 时间急～
/**
 * @description: is Exponential
 * @param {*} value
 * @return {*}
 */
export function isExp(value) {
  return value.toString().indexOf('e') > 0
}
/**
 * @description: 10倍数
 * @param {Number} key
 * @return {String}
 */

function getUnit(key) {
  let unit = ''
  switch (key) {
    case -4:
      unit = 'p'
      break
    case -3:
      unit = 'n'
      break
    case -2:
      unit = 'μ'
      break
    case -1:
      unit = 'm'
      break
    case 0:
      unit = ''
      break
    case 1:
      unit = 'K'
      break
    case 2:
      unit = 'M'
      break
    case 3:
      unit = 'G'
      break
    default:
      unit = ''
      break
  }
  return unit
}
