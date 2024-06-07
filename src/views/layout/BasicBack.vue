<template>
  <div class="container">
    <header class="header">
      <img :src="Logo" style="margin-right: 8px" />
      R股技术分析
    </header>
    <RouterView></RouterView>
  </div>
</template>
<script setup>
import Logo from '@/assets/logo.svg'
</script>
<style lang="less" scoped>
.container {
  // min-height: 100vh;
  .header {
    display: flex;
    align-items: center;
    padding-left: 42px;
    height: 64px;
    background: #17181e;
    font-size: 23px;
    color: #ffffff;
    line-height: 32px;
    img {
      width: 68px;
      height: 24px;
    }
  }
}
</style>
