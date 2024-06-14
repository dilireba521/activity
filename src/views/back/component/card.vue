<template>
  <div class="box">
    <div class="title">{{ title }}</div>
    <div class="detail">
      <slot v-if="slotDefault"></slot>
      <div v-else>{{ detail }}</div>
    </div>
    <div class="btns">
      <Button
        size="small"
        class="info-btn btn"
        type="primary"
        @click="handleClick({ action: 'delete' })"
        >删除</Button
      >
      <div class="flex">
        <Button
          class="btn"
          size="small"
          type="primary"
          danger
          @click="handleClick({ action: 'edit' })"
          >编辑</Button
        >
        <Button class="btn" size="small" type="primary" @click="handleClick({ action: 'submit' })">
          <div class="text-black">发布</div>
        </Button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Button } from 'ant-design-vue'
import { useSlots } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: 'title'
  },
  detail: {
    type: String,
    default: ''
  },
  record: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['click'])
const handleClick = (params) => {
  emit('click', params)
}

const slotDefault = !!useSlots().default
</script>
<style lang="less" scoped>
.btn {
  width: 72px;
  height: 28px;
  line-height: 26px;
  text-align: center;
  & + & {
    margin-left: 12px;
  }
}
.info-btn {
  background: #696969;
  &:hover {
    background: rgba(105, 105, 105, 0.8);
  }
}
.box {
  width: 100%;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
  .title {
    font-size: 24px;
    line-height: 32px;
    padding-bottom: 16px;
  }
  .detail {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    flex: 1;
  }
  .btns {
    display: flex;
    justify-content: space-between;
  }
}
</style>
