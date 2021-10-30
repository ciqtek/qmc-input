/*
 * @Author: tigoo
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /package-test/ciqtek-input/build/rollup.config.js
 */
// rollup 相关配置
import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import {terser} from 'rollup-plugin-terser'
import minimist from 'minimist'
// 支持less
import less from 'rollup-plugin-less'

const argv = minimist(process.argv.slice(2))

const config = {
  input: 'src/index.js',
  output: {
    name: 'CiqtekInput',
    exports: 'named'
  },
  plugins: [
    commonjs(),
    vue({
      // css: false,
      compileTemplate: true,
      style: {
        postcssPlugins: [require('autoprefixer')]
      }
    }),
    less(),
    babel({
      babelHelpers: 'runtime',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
      exclude: 'node_modules/**'
    })
  ]
}

// 浏览器for
if (argv.format === 'iife') {
  config.plugins.push(terser())
}

export default config
