<template>
  <Modal width="430px" :closable="false" v-model:open="open" title="预测修改">
    <Form ref="formRef" v-bind="formItemLayout" :model="formState" class="form">
      <Form.Item label="玩家编号">{{ formState.user_id }}</Form.Item>
      <Form.Item label="当前预测">{{ formState.predictionOld }}</Form.Item>
      <Form.Item name="prediction" :required="true" label="预测修改">
        <Input type="number" v-model:value="formState.prediction" placeholder="请输入" />
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
<script setup>
import { Modal, Form, Input, Button, message } from 'ant-design-vue'
import { ref, reactive, watch, toRaw } from 'vue'
import { useMyFetch } from '@/utils/fetch.js'

const emit = defineEmits(['success'])

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const open = ref(false)
const props = defineProps({
  record: {
    type: Object,
    default: () => ({})
  }
})
const loading = ref(false)
const formRef = ref();
const formState = reactive({
  user_id: '',
  predictionOld: '',
  prediction: '',
})
watch(open, (cur) => {
  formRef.value?.resetFields();
  formState.user_id = ''
  formState.predictionOld = ''
  formState.prediction = ''
  if (cur) {
    console.log(props.record);
    if (props.record?.user_id) {
      formState.user_id = props.record.user_id
      formState.predictionOld = props.record.prediction
    }
  }
})
function onSubmit() {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', formState, toRaw(formState));
      const _params = {
        type: 'change',
        ...toRaw(formState)
      }
      postPredictionFn(_params)
    })
    .catch(error => {
      console.log('error', error);
    });
}
async function postPredictionFn(params) {
  loading.value = true
  try {
    const { data } = await useMyFetch('/games/prediction/').post(params).json()
    if (data.value.code == 0) {
      open.value = false
      message.success('操作成功！')
      emit('success')
    } else {
      message.error(data.value.msg || '操作失败！')
    }

  } finally {
    loading.value = false
  }



}
function close() {
  open.value = false
}
defineExpose({
  open
})
</script>
<style lang="less" scoped>
.form {
  width: 250px;
  margin: 0 auto;
}
</style>
