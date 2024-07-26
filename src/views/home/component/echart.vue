<template>
  <div class="pl-8 box">
    <div class="flex">
      <img class="mr-8" :src="Right" alt="" />
      <div :class="['scale', item.value == cur && 'active']" v-for="item in list" :key="item.value">
        {{ item.label }}
      </div>
    </div>
    <div class="flex leading-20">
      <div class="mr-8 text-third">5分线</div>
      <div class="text-secondary">虾米股份</div>
    </div>
    <div ref="curEchart" style="height: 794px;width: 100%;">
      <!-- <Empty v-if="!myChart" :style="{ marginBlock: '0px', paddingTop: '320px' }" :image="Empty.PRESENTED_IMAGE_SIMPLE" /> -->
    </div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts'
import Right from '@/assets/right.svg'
import { ref, onMounted, nextTick, watch } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { Empty } from 'ant-design-vue'

const props = defineProps({
  dataSource: {
    type: Array,
    default: () => []
  }
})

const list = [
  {
    label: '分时',
    value: 'time'
  },
  {
    label: '日',
    value: 'day'
  },
  {
    label: '周',
    value: 'week'
  },
  {
    label: '月',
    value: 'month'
  },
  {
    label: '年',
    value: 'year'
  },
  {
    label: '1分',
    value: '1min'
  },
  {
    label: '5分',
    value: '5min'
  },
  {
    label: '15分',
    value: '15min'
  },
  {
    label: '30分',
    value: '30min'
  },
  {
    label: '60分',
    value: '36min'
  },
  {
    label: '多周期',
    value: 'more'
  },
  {
    label: '设置',
    value: 'setting'
  }
]
var myChart = null
const cur = ref('5min')
const curEchart = ref()

function initData() {
  if (!myChart) {
  console.log("myChart===",echarts,curEchart.value);

    myChart = echarts?.init(curEchart.value)
  }
  const _datax = [], _data = [];
  props.dataSource?.forEach((item) => {
    const _time = useDateFormat(item.create_time, 'HH:mm')
    _datax.push(_time.value)
    _data.push([item.close, item.open, item.high, item.low])
  })
  myChart?.setOption({
    grid: {
      left: '2%',
      right: '4%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: _datax,
        axisPointer: {
          type: 'shadow'
        },
        axisTick: {
          show: false // 隐藏刻度点
        },
        axisLabel: {
          showMaxLabel: true,
          // textStyle: {
          //   color: '#FFFFFF99'
          // },
          margin: 20
        },
        axisLine: {
          show: true, // 隐藏坐标轴线
          lineStyle: {
            type: 'dashed', // 设置线条类型为虚线
            color: 'rgba(255, 255, 255, 0.1)',
            type: [5, 2],
            dashOffset: 0
          }
        },
        splitLine: {
          show: false // 显示刻度线
        },
        min: function (extent) {
          const _max = Math.max(extent.max + Math.floor(extent.max / 2), 4)
          return _max == 4 ? 0 : -1
        },
        max: function (extent) {
          const _max = Math.max(extent.max + Math.floor(extent.max / 2), 4)
          return _max
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        position: 'right',
        axisLabel: {
          // textStyle: {
          //   color: '#FFFFFF99'
          // },
          margin: 10
        },
        axisLine: {
          show: false // 隐藏坐标轴线
        },
        splitLine: {
          show: true, // 显示刻度线
          lineStyle: {
            type: 'dashed', // 设置线条类型为虚线
            color: 'rgba(255, 255, 255, 0.1)',
            type: [2, 5],
            dashOffset: -5
          }
        }
      }
    ],
    series: [
      {
        name: 'BTC价格',
        type: 'candlestick',
        itemStyle: {
          // borderWidth: 6
        },
        data: _data,
        itemStyle:{
          color:'#47b262',
          color0:'#eb5454',
          borderColor:'#47b262',
          borderColor0:'#eb5454',
          borderColorDoji:'#eb5454',
        }
      }
    ]
  })

}
watch(() => props.dataSource, () => {
  nextTick(() => {
    initData()
  })
})
onMounted(() => {
  window.onresize = function () {
    myChart?.resize()
  }
})
</script>
<style lang="less" scoped>
.box {
  background: #101014;
  border-left: 1px solid #473a2c;
  border-right: 1px solid #473a2c;
  border-bottom: 1px solid #473a2c;
}

.scale {
  font-size: 14px;
  color: #999999;
  line-height: 20px;
  padding: 0 4px;

  &.active {
    color: #000000;
    background: #efc394;
  }
}
</style>
