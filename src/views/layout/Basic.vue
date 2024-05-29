<template>
  <div class="container">
    <!-- header -->
    <header class="header">
      <img :src="Logo" style="margin-right: 9px" />
      R股技术分析
    </header>
    <!-- main -->
    <RouterView></RouterView>
  </div>
</template>
<script setup>
import Logo from '@/assets/logo.svg'
</script>
<style lang="less" scoped>
.container {
  height: 100vh;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  text-align: center;
  background: #101014;
  line-height: 32px;
}
</style>
