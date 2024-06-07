<template>
  <Modal width="430px" :closable="false" v-model:open="open" title="资讯">
    <Form class="form">
      <Form.Item label="标题"><Input v-model:value="form.title" placeholder="请输入" /></Form.Item>
      <Form.Item label="选项">
        <div>
          <div v-for="(item, index) in form.option" :key="index" class="flex items-center pb-8">
            <Input
              :bordered="false"
              :prefix="item.key"
              v-model:value="item.value"
              style="width: 50%"
              placeholder="请输入"
            />
            <MinusCircleOutlined
              @click="removeItem"
              v-if="index != 0 && index == form.option.length - 1"
            />
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="dashed" style="width: 50%; margin-left: 40px" @click="addItem"
          >添加选项</Button
        >
      </Form.Item>
    </Form>
    <template #footer>
      <div class="flex justify-center pt-40">
        <Button @click="close">取消</Button>
        <Button type="primary">
          <div class="text-black">保存</div>
        </Button>
      </div>
    </template>
  </Modal>
</template>
<script setup>
import { Modal, Form, Input, Button, message } from 'ant-design-vue'
import { ref, reactive, watch } from 'vue'
import { MinusCircleOutlined } from '@ant-design/icons-vue'

const open = ref(false)
const props = defineProps({
  record: {
    type: Object,
    default: () => ({})
  }
})
// 模板
const questionList = ['A', 'B', 'C', 'D', 'E', 'F']

const form = reactive({
  title: '',
  option: []
})
// 添加元素
function addItem() {
  const _len = form.option.length
  if (_len >= questionList.length) {
    message.warning('最多添加6个选项')
    return
  }
  form.option.push({
    key: questionList[_len],
    value: '',
    selected: false
  })
}
// 删除元素
function removeItem() {
  form.option.pop()
}
function initData() {
  addItem()
}
watch(open, (cur) => {
  if (cur) {
    form.option.length == 0 && initData()
  }
})
function close() {
  open.value = false
}
defineExpose({
  open
})
</script>
<style lang="less" scoped>
.form {
  width: 360px;
  margin: 0 auto;
}
</style>
