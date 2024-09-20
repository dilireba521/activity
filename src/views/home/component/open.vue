<template>
  <div v-show="showMask" class="mask">
    <div class="mask-cont">
      <div>当前时间：{{ format }}</div>
      <div class="mt-8 text-yellow">
        开盘时间：{{ isEnd ? endValue : beginValue }}
      </div>
      <div class="mask-cont_begin">{{ isEnd ? '晚盘' : '早盘' }}开盘倒计时</div>
      <div class="mask-cont_time">{{ diffTime }}</div>
    </div>
    <div class="mask-footer">
      <img :src="Logo" style="margin-right: 8px" />
      R股技术分析
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useTimestamp, useDateFormat } from '@vueuse/core'
import { diffTime2 } from '@/utils/dateUtil'
import Logo from '@/assets/logo.svg'

const { timestamp, pause, resume } = useTimestamp({ controls: true })
const format = useDateFormat(timestamp, 'YYYY年MM月DD日 HH:mm:ss')
const begin = '2024-09-22 17:00:00'
const beginValue = useDateFormat(begin, 'YYYY年MM月DD日 HH:mm:ss')
const beginTime = new Date(begin).getTime()
const begin2 = '2024-09-22 19:00:00'
const begin2Time = new Date(begin2).getTime()

const end = '2024-09-22 21:00:00'
const endValue = useDateFormat(end, 'YYYY年MM月DD日 HH:mm:ss')
const endTime = new Date(end).getTime()

const showMask = ref(true)
const diffTime = computed(() => {
  const _time = (isEnd.value ? endTime : beginTime)
  return diffTime2(_time, timestamp.value)
})

const isEnd = computed(() => {
  return timestamp.value >= begin2Time
})

const props = defineProps({
  dataSource: {
    type: Object,
    default: () => { }
  }
})
watch(() => props?.dataSource,(cur)=>{
  if(!cur?.mask){
    showMask.value = false
    pause()
  }else {
    showMask.value = true
    resume()
  }
})

</script>
<style lang="less" scoped>
.mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 85%);

  &-cont {
    position: absolute;
    width: 100%;
    top: 389px;
    font-size: 36px;
    color: #ffffff;
    line-height: 48px;
    text-align: center;

    &_begin {
      font-size: 24px;
      color: rgba(255, 255, 255, 0.8);
      line-height: 32px;
      margin-top: 48px;
    }

    &_time {
      margin-top: 8px;
      font-family: Roboto, Roboto;
      font-weight: bold;
      font-size: 72px;
      color: #efc394;
      line-height: 80px;
    }
  }

  &-footer {
    position: absolute;
    bottom: 36px;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    opacity: 0.85;
    font-size: 20px;

    img {
      width: 56px;
      height: 20px;
    }
  }
}
</style>
