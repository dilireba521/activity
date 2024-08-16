import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataSourceStore = defineStore('dataSource', () => {
  const dataSource = ref()
  return { dataSource }
})
