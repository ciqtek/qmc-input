/*
 * @Author: tigoo
 * @LastEditTime: 2021-10-30 19:15:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /package-test/ciqtek-input/src/ciqtek-input.d.ts
 */
import Vue, {VueConstructor} from 'vue'

/**
 * @FYI https://www.yuque.com/docs/share/a72a1b84-c0e4-4bd5-853f-6711cb08a507
 */
declare module 'qmc-ciqtek-input' {
  class VueComponent extends Vue {
    static install(vue: typeof Vue): void
  }

  type CombinedVueInstance<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = Data & Methods & Computed & Props & Instance

  type ExtendedVue<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue
  >

  type Combined<Data, Methods, Computed, Props> = Data &
    Methods &
    Computed &
    Props

  type CiqtekInputData = {}

  type CiqtekInputMethods = {}

  type CiqtekInputComputed = {}

  type CiqtekInputProps = {}

  type CiqtekInput = Combined<
    CiqtekInputData,
    CiqtekInputMethods,
    CiqtekInputComputed,
    CiqtekInputProps
  >

  export interface CiqtekInputType extends VueComponent, CiqtekInput {}

  const CiqtekInputConstruction: ExtendedVue<
    Vue,
    CiqtekInputData,
    CiqtekInputMethods,
    CiqtekInputComputed,
    CiqtekInputProps
  >

  export default CiqtekInputConstruction
}
