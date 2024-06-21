<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ConfigProvider, theme } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
const { darkAlgorithm } = theme;

const curTheme = {
  algorithm:[darkAlgorithm],
  token: {
    colorPrimary: '#EFC394FF',
    colorError: '#D87179FF',
    colorBorder: '#979797',
    colorSuccess: '#2BA169FF',
    paddingMD: 8,
    paddingContentHorizontalLG: 12,
    colorTextHeading: '#fff',
    colorBgContainer: '#17181EFF',
    controlOutlineWidth: 0
  },
  components: {
    Modal: {
      colorBgElevated: '#17181EFF'
    }
  }
}
</script>

<template>
  <ConfigProvider :locale="zhCN" :theme="curTheme">
    <RouterView />
  </ConfigProvider>
</template>
