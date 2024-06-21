<template>
  <div class="code-box">
    <Input v-for="(item,i) in inputRefCode" :key="i" :ref="item" :maxlength="1" placeholder="" v-model:value="data[i]" style="width: 32px"
      @keyup="(e) => keyup(e?.key as KeyupType, i)" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, computed, onMounted } from 'vue';
import { Input } from 'ant-design-vue';

const emit = defineEmits(['change']);
enum KeyupType {
  left = 'ArrowLeft',
  right = 'ArrowRight',
  del = 'Backspace',
}
const inputNum = 6
// @ts-ignore
const inputRefCode: any[] = new Array(inputNum).fill(0).map(() => ref());
const data = ref(new Array(inputNum));

const code = computed(() => {
  const _code = data.value.join('') ;
  return _code;
});
watch(code, (newVal) => {
  emit('change', { code: newVal });
});
function clearAll() {
  data.value = new Array(inputNum)
}

watch(()=> [...data.value],(cur,oldV)=>{
  console.log(cur,oldV);
  
  if(!oldV[0] && cur[0]){
    inputRefCode?.[1].value?.[0].focus()
  }
  if(cur[0] && cur[1] && !oldV[1]){
    inputRefCode?.[2].value?.[0].focus()
  }
  if(cur[0] && cur[1] && cur[2] && !oldV[2]){
    inputRefCode?.[3].value?.[0].focus()
  }
  if(cur[0] && cur[1] && cur[2] && cur[3] && !oldV[3]){
    inputRefCode?.[4].value?.[0].focus()
  }
   if(cur[0] && cur[1] && cur[2] && cur[3] && cur[4] && !oldV[4]){
    inputRefCode?.[5].value?.[0].focus()
  }
})

function keyup(type: KeyupType, index: number) {
  switch (type) {
    case KeyupType.left:
      inputRefCode?.[index - 1]?.value?.[0].focus();
      break;
    case KeyupType.right:
      inputRefCode?.[index + 1]?.value?.[0].focus();
      break;
    case KeyupType.del:
      inputRefCode?.[index - 1]?.value?.[0].focus();
      break;
  }
}

defineExpose({ code, clearAll });
onMounted(() => {
  setTimeout(() => {
    inputRefCode?.[0]?.value?.[0].focus();
  }, 0);
});
</script>
<style lang="less" scoped>
.code-box {
  margin-top: 32px;
  margin-bottom: 4px;

  .ant-input {
    padding-right: 8px;
    padding-left: 8px;
    border: 1px solid rgb(255 255 255 / 50%);
    background-color: rgb(216 216 216 / 0%);
    text-align: center;
  }

  .ant-input+.ant-input {
    margin-left: 16px;
  }
}
</style>
