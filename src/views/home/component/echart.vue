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
    <div ref="curEchart" style="height: 790px"></div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts'
import Right from '@/assets/right.svg'
import { ref, onMounted, nextTick } from 'vue'
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
const cur = ref('5min')
const curEchart = ref()
function initData() {
  var myChart = echarts.init(curEchart.value)
  myChart.setOption({
    grid: {
      left: '2%',
      right: '4%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [
          '2017-10-24',
          '2017-10-25',
          '2017-10-26',
          '2017-10-27',
          '2017-10-24',
          '2017-10-25',
          '2017-10-26',
          '2017-10-27',
          '2017-10-24',
          '2017-10-25',
          '2017-10-26',
          '2017-10-27'
        ],
        axisPointer: {
          type: 'shadow'
        },
        axisTick: {
          show: false // 隐藏刻度点
        },
        axisLabel: {
          showMaxLabel: true,

          textStyle: {
            color: '#D1D4DC'
          },
          margin: 20
        },
        axisLine: {
          show: true // 隐藏坐标轴线
        },
        splitLine: {
          show: true, // 显示刻度线
          lineStyle: {
            type: 'dashed', // 设置线条类型为虚线
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        position: 'right',
        axisLabel: {
          textStyle: {
            color: '#D1D4DC'
          },
          margin: 10
        },
        axisLine: {
          show: false // 隐藏坐标轴线
        },
        splitLine: {
          show: true, // 显示刻度线
          lineStyle: {
            type: 'dashed', // 设置线条类型为虚线
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    ],
    series: [
      {
        name: 'BTC价格',
        type: 'candlestick',
        data: [
          [20, 34, 10, 38],
          [40, 35, 30, 50],
          [31, 38, 33, 44],
          [38, 15, 5, 42],
          [20, 34, 10, 38],
          [40, 35, 30, 50],
          [31, 38, 33, 44],
          [38, 15, 5, 42],
          [20, 34, 10, 38],
          [40, 35, 30, 50],
          [31, 38, 33, 44],
          [38, 15, 5, 42]
        ]
      }
    ]
  })
}
onMounted(() => {
  nextTick(() => {
    initData()
  })
})
</script>
<style lang="less" scoped>
.box {
  background: #101014;
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
