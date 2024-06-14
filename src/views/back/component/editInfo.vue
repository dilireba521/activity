<template>
  <Modal width="430px" :closable="false" v-model:open="open" :title="type">
    <Form ref="formRef" :model="formState" class="form">
      <Form.Item name="title" :required="true" label="标题"><Input v-model:value="formState.title" placeholder="请输入" />
      </Form.Item>
      <Form.Item name="content" :required="true" label="内容">
        <Textarea v-model:value="formState.content" :autoSize="{ minRows: 4, maxRows: 6 }" placeholder="请输入"></Textarea>
      </Form.Item>
    </Form>
    <template #footer>
      <div class="flex justify-center pt-40">
        <Button @click="close">取消</Button>
        <Button :loading="loading" type="primary" @click="onSubmit">
          <div class="text-black">保存</div>
        </Button>
      </div>
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import { Modal, Form, Input, Textarea, Button, message } from 'ant-design-vue'
import { reactive, ref, toRaw, watch } from 'vue'
import { useMyFetch } from '@/utils/fetch.js'

enum moduleType {
  info = '资讯',
  notice = '公告',
  question = '问题',
}
const emit = defineEmits(['success'])
const open = ref(false)
const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  record: {
    type: Object,
    default: () => ({})
  }
})
const loading = ref(false)
const formRef = ref();
const formState = reactive({
  title: '',
  content: ''
})
function close() {
  open.value = false
}
watch(open, (cur) => {
  formRef.value?.resetFields();
  formState.title = ''
  formState.content = ''
  if (cur) {
    if (props.record?.id) {
      formState.title = props.record.title
      formState.content = props.record.content
    }
  }
})
function onSubmit() {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', formState, toRaw(formState));
      const _params = { type: props.type, ...toRaw(formState) }
      if (props.record?.id) {
        _params.id = props.record.id
      }
      postNoticeeditFn(_params)
    })
    .catch(error => {
      console.log('error', error);
    });
}
// 资讯、公告，内幕接口
async function postNoticeeditFn(params) {
  loading.value = true
  const { data } = await useMyFetch('/games/noticeedit/').post(params).json()
  loading.value = false
  open.value = false
  message.success('操作成功！')
  emit('success', { type: props.type })
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
