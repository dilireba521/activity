<template>
  <div class="panel">
    <div class="panel-header">
      <img :src="curIcon" />
      {{ title }}
    </div>
    <div class="panel-body">
      <div class="panel-body_msg">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed ,useSlots } from 'vue'
import Notice from '@/assets/notice.svg'
import Info from '@/assets/info.svg'
import Answer from '@/assets/answer.svg'
import Question from '@/assets/question.svg'

const slots = useSlots();

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'notice'
  }
})
const iconMap = {
  answer: Answer,
  question: Question,
  notice: Notice,
  info: Info
}
const curIcon = computed(() => {
  return iconMap[props.icon]
})
</script>
<style lang="less" scoped>
.panel {
  background: #101014;
  border: 1px solid #473a2c;
  & + & {
    border-left: 0;
  }
  &-header {
    font-weight: 500;
    font-size: 14px;
    color: #fff;
    line-height: 20px;
    height: 28px;
    padding: 4px 12px;
    background: rgba(35, 35, 39, 0.4);
    img {
      vertical-align: text-bottom;
      margin-right: 4px;
    }
  }
  &-body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 170px;
    color: #fff;
    // padding: 16px;
    font-size: 32px;
    line-height: 1.1;
    // text-align: center;
  }
}
</style>
