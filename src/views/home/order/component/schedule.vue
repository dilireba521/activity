<template>
  <div class="schedule">
    <div class="schedule_time">当前时间：{{ diffTime }}</div>
    <!-- <div class="schedule_step">当前阶段：{{ dataSource?.stage?.stage || timeList[stage].stage }}</div> -->
    <!-- <div class="schedule_next">距离{{timeList[stage].stage}}收盘</div> -->
    <div class="schedule_next">距离下一阶段</div>
    <div class="schedule_countdown">{{ residue }}</div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useTimestamp, useDateFormat } from '@vueuse/core'
import { diffTime2 } from '@/utils/dateUtil'
import { formatToTime, formatToDate } from '@/utils/dateUtil';
import dayjs from 'dayjs'
const props = defineProps({
  dataSource: {
    type: Object,
    default: () => { }
  }
})
// const begin = new Date().getTime()
const timeList = [
  {
    time:'17:00:00',
    stage:'早盘'
  },{
    time:'22:00:00',
    stage:'晚盘'
  }
]
const { timestamp } = useTimestamp({ controls: true, interval: 1000 })

const stage = computed(() => {
  const _day = formatToDate(new Date())
  const _now = new Date().getTime()
  const _target = dayjs(_day + timeList[0].time)
  return _now < _target ? 0 : 1
})
const residue = computed(() => {
  const _residue = props?.dataSource?.stage?.residue * 1000
  // const _day = formatToDate(timestamp.value)
  // const _target = dayjs(_day + timeList[stage.value || 0]?.time)
  return diffTime2(timestamp.value + _residue, timestamp.value) || "00:00:00"
})
const diffTime = computed(() => {
  // return diffTime2(timestamp.value, begin)
  return formatToTime(timestamp.value)
})
</script>
<style lang="less" scoped>
.schedule {
  color: #ffffff;
  text-align: center;
  height: 156px;
  &_time {
    font-family: Roboto, Roboto;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
  }

  &_step {
    font-size: 16px;
    line-height: 22px;
    margin-top: 4px;
  }

  &_next {
    margin-top: 24px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 22px;
  }

  &_countdown {
    font-family: Roboto, Roboto;
    font-weight: bold;
    font-size: 48px;
    color: #ffffff;
    line-height: 56px;
  }
}
</style>
