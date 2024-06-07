<template>
  <div class="panel">
    <div class="panel-header">{{ title }}</div>
    <div class="panel-cont">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '标题'
  }
})
</script>
<style lang="less" scoped>
.panel {
  border-radius: 4px;
  &-header {
    background: #17181e;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    padding: 0 16px;
  }
  &-cont {
    padding: 16px 12px;
    background: #474951ff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
