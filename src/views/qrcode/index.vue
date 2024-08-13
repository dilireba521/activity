<template>
    <div class="box">
        <div v-if="!isMobile()">
            <QRCode cancel :size="300" :value="curUrl" error-level="H" icon="/favicon.ico" color="#edbd88" bgColor="#33353E"
                style="border-color: #efc39440;margin:auto" />
        </div>
        <div v-else>
            <Form layout="vertical" size="large" ref="formRef" v-bind="formItemLayout" :model="formState" class="form">
                <Form.Item label="玩家编号" :required="true">
                    <Input type="number" v-model:value="formState.user_id" placeholder="请输入" />
                </Form.Item>
                <Form.Item name="prediction" :required="true" label="预测修改">
                    <Input type="number" v-model:value="formState.prediction" placeholder="请输入" />
                </Form.Item>
            </Form>
            <Button size="large" class="w-full" :loading="loading" type="primary" @click="onSubmit">
                <div class="text-black inline-block">保存</div>
            </Button>
            <Button size="large" class="w-full mt-8" :loading="loading" type="primary" @click="resetForm" danger>
                <div class="text-black inline-block">重置</div>
            </Button>
        </div>

    </div>
</template>
<script setup>
import { Form, Input, Button, message, QRCode } from 'ant-design-vue'
import { ref, reactive, watch, toRaw, onMounted } from 'vue'
import { useMyFetch } from '@/utils/fetch.js'
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
const formRef = ref();
const formState = reactive({
    user_id: '',
    prediction: '',
})

const isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
}

const loading = ref(false)
const curUrl = window.location.href
console.log("curUrl====", curUrl);
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
// 重置
function resetForm() {
    formRef.value.resetFields();
}
async function postPredictionFn(params) {
    loading.value = true
    const { data } = await useMyFetch('/games/prediction/').post(params).json()
    loading.value = false
    open.value = false
    message.success('操作成功！')
    resetForm()
}
onMounted(() => {
    console.log('isMobile===', isMobile());
})
</script>
<style lang="less" scoped>
.box {
    width: 80vw;
    margin: 0 auto;
    padding-top: 10vh;
}
</style>
