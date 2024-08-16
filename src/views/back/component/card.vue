<template>
  <div class="box">
    <div class="flex justify-between items-center mb-16">
      <div class="title">
        {{ title }}
      </div>
      <div v-if="record?.isSend && record?.isSend != 0"
        :class="[record?.isSend == 2 && 'text-green', record?.isSend == 1 && 'text-red']">
        {{
          record?.isSend == 1 ? '当前发布' : record?.isSend == 2 ? '已发布' : ''
        }}</div>
    </div>

    <div class="detail">
      <slot v-if="slotDefault"></slot>
      <template v-else>{{ detail }}</template>
    </div>
    <div class="btns">
      <Button size="small" class="info-btn btn" type="primary" @click="handleClick({ action: 'delete' })">删除</Button>
      <div class="flex">
        <Button class="btn" size="small" type="primary" danger @click="handleClick({ action: 'edit' })">编辑</Button>
        <Button v-if="hasCancel" class="btn" size="small" type="primary" @click="handleClick({ action: 'cancel' })">
          <div class="text-black">取消发布</div>
        </Button>
        <Button v-else class="btn" size="small" type="primary" @click="handleClick({ action: 'submit' })">
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
  hasCancel: Boolean,
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

  &+& {
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
  }

  .detail {
    font-weight: 400;
    font-size: 16px;
    // line-height: 24px;
    height: 48px;
    flex: 1;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .btns {
    display: flex;
    justify-content: space-between;
  }
}
</style>
