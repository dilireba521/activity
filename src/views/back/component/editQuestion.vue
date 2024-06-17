<template>
  <Modal width="430px" :closable="false" v-model:open="open" title="资讯">
    <Form v-bind="formItemLayoutWithOutLabel" ref="formRef" :model="form" class="form">
      <Form.Item v-bind="formItemLayout" name="title" :required="true" label="标题"><Input v-model:value="form.title"
          placeholder="请输入" />
      </Form.Item>
      <Form.Item v-bind="formItemLayout" name="content" :required="true" label="内容">
        <Textarea v-model:value="form.content" placeholder="请输入" />
      </Form.Item>
      <Form.Item :name="['options', index, 'content']" v-bind="index === 0 ? formItemLayout : {}" :required="true"
        v-for="(item, index) in form.options" :key="index" :label="index == 0 ? '选项' : ''">
        <div>
          <div class="flex items-center pb-8">
            <Input :bordered="false" :prefix="item.title" v-model:value="item.content" style="width: 50%"
              placeholder="请输入" />
            <Form.ItemRest>
              <Checkbox v-model:checked="item.is_answer">答案</Checkbox>
            </Form.ItemRest>
            <MinusCircleOutlined @click="removeItem" v-if="index != 0 && index == form.options.length - 1" />
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="dashed" style="width: 50%;" @click="addItem">添加选项</Button>
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
import { Modal, Form, Input, Textarea, Button, message, Checkbox, Space } from 'ant-design-vue'
import { ref, reactive, watch, toRaw } from 'vue'
import { MinusCircleOutlined } from '@ant-design/icons-vue'
import { useMyFetch } from '@/utils/fetch.js'

const emit = defineEmits(['success'])

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const open = ref(false)
const props = defineProps({
  type: {
    type: String,
    default: '问题'
  },
  record: {
    type: Object,
    default: () => ({})
  }
})
// 模板
const questionList = ['A', 'B', 'C', 'D', 'E', 'F']

const loading = ref(false)
const formRef = ref();
const form = reactive({
  title: '',
  content: '',
  options: []
})
// 添加元素
function addItem() {
  const _len = form.options.length
  if (_len >= questionList.length) {
    message.warning('最多添加6个选项')
    return
  }
  form.options.push({
    title: questionList[_len],
    content: '',
    is_answer: false
  })
}
// 删除元素
function removeItem() {
  form.options.pop()
}
function initData() {
  addItem()
}
watch(open, (cur) => {
  formRef.value?.resetFields();
  form.title = ''
  form.content = ''
  form.options = []
  if (cur) {
    form.options?.length == 0 && initData()
    if (props.record?.id) {
      form.title = props.record.title
      form.content = props.record.content
      form.options = props.record.options
    }
  }
})
function close() {
  open.value = false
}

function onSubmit() {
  formRef.value
    .validate()
    .then(() => {
      const _form = toRaw(form)
      const _params = {
        type: props.type,
        ..._form,
        options: _form.options.map(item => {
          const _item = {
            ...item,
            is_answer: item.is_answer ? 1 : 0
          }
          if (item.id) {
            _item.option_id = item.id;
          }
          return _item
        }),
      }
      if (props.record?.id) {
        _params.id = props.record.id
      }
      console.log('params', _params);
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
