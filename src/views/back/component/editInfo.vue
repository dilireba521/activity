<template>
  <Modal width="430px" :closable="false" v-model:open="open" title="资讯">
    <Form class="form">
      <Form.Item label="标题"><Input placeholder="请输入" /></Form.Item>
      <Form.Item label="内容">
        <Textarea :autosize="{ minRows: 4, maxRows: 6 }" placeholder="请输入"></Textarea>
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
import { Modal, Form, Input, Textarea, Button } from 'ant-design-vue'
import { ref } from 'vue'

const open = ref(false)
const props = defineProps({
  record: {
    type: Object,
    default: () => ({})
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
