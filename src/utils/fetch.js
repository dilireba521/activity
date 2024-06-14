import { createFetch, isObject } from '@vueuse/core'
import { computed, unref } from 'vue'
import { stringifyQuery } from 'vue-router'
const baseConfig = {
  options: {
    immediate: false,
    timeout: 60000,
    // 在请求前修改配置，如：注入 token 值
    async beforeFetch({ options }) {
      return { options }
    },
    // 在请求后处理数据，如：拦截错误、处理过期
    afterFetch({ data, response }) {
      // code...
      return { data, response }
    },
    // 请求错误
    onFetchError({ data, error }) {
      console.error(error)
      return { data, error }
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
}
function baseFetch(opt) {
  // console.log('baseFetch', opt, baseConfig)
  return createFetch({ baseConfig, ...(opt || {}) })
}

const baseURL = 'http://192.168.0.102:8000'

const useMyFetch = baseFetch({
  baseUrl: baseURL
})
function useGet(url, params) {
  const _url = computed(() => {
    const _url = unref(url)
    const _query = unref(params)
    const queryString = isObject(_query) ? stringifyQuery(_query) : _query || ''
    return `${_url}${queryString ? '?' : ''}${queryString}`
  })
  return useMyFetch(_url).json()
}

export { useMyFetch, useGet }
