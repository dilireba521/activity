<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
const theme = {
  token: {
    colorPrimary: '#EFC394FF',
    colorError: '#D87179FF',
    colorBorder: '#979797',
    colorSuccess: '#2BA169FF'
  }
}
</script>

<template>
  <ConfigProvider :theme="theme">
    <RouterView />
  </ConfigProvider>
</template>
