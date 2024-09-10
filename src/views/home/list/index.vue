<template>
  <div class="box">
    <!-- header  -->
    <div class="header">
      <div class="header-name">虾米股份 200216</div>
      <div class="header-msg">
        <div class="header-msg_value">{{ dataSource?.info?.now || 0 }}</div>
        <div class="header-msg_number">{{ dataSource?.info?.zd || 0 }}</div>&nbsp;&nbsp;
        <div class="header-msg_per">{{ dataSource?.info?.zf.toFixed(2) || 0 }}%</div>
      </div>
    </div>
    <!-- top rank  -->
    <div>
      <rankElm :dataSource="rankData.sell" type="sell" />
      <rankElm :dataSource="rankData.buy" type="buy" />
    </div>
    <!-- overview -->
    <overviewElm :dataSource="dataSource"></overviewElm>
    <!-- order -->
    <orderElm :dataSource="orderData"></orderElm>
    <!-- orderlarge -->
    <orderlargeElm :dataSource="orderlargeData"></orderlargeElm>
  </div>
</template>
<script setup>
import { ref, reactive, watch } from 'vue'
import rankElm from './component/rank.vue'
import overviewElm from './component/overview.vue'
import orderElm from './component/order.vue'
import orderlargeElm from './component/orderlarge.vue'
import { useIntervalCustom } from "@/utils/useIntervalCustom"
import { formatToTime2 } from "@/utils/dateUtil"

const props = defineProps({
  dataSource: {
    type: Object,
    default: () => { }
  }
})
let isRandom = false
const rankData = reactive({
  sell: [
  ],
  buy: [
  ]
})
// order
const orderData = ref()

// orderlarge
const orderlargeData = ref()

function reloadData() {
  const _arr = []
  const _arr1 = []
  
  for (let i = 1; i < 6; i++) {
    let _number = parseInt(Math.random() * 50 + 1)
    let _price = (props?.dataSource?.info?.now || 0) + (i - 1)
    if (!isRandom) {
      _number = i == 1 ? props?.dataSource?.pan?.sell : '--'
      _price = i == 1 ? (props?.dataSource?.info?.now || 0) + (i - 1) : '--'
    }
    _arr.push({
      name: '卖' + i,
      price: _price,
      number: _number
    })
  }
  for (let i = 1; i < 6; i++) {
    let _number = parseInt(Math.random() * 50 + 1)
    let _price = (props?.dataSource?.info?.now || 0) - (i)
    if (!isRandom) {
      _number = i == 1 ? props?.dataSource?.pan?.buy : '--'
      _price = i == 1 ? (props?.dataSource?.info?.now || 0) - (i) : '--'
    }
    _arr1.push({
      name: '买' + i,
      price: _price,
      number: _number
    })
  }

  rankData.sell = _arr.reverse()
  rankData.buy = _arr1
  // console.log(_arr, _arr1)

}
useIntervalCustom(reloadData, { delay: 10000 })

watch(() => props.dataSource, (cur) => {
  // console.log(cur);
  if (cur?.trade) {
    orderData.value = cur.trade.map(item => {
      return {
        time: formatToTime2(item.create_time),
        price: item?.amount || 0,
        value: item?.price_change || 0,
        type: item.type
      }
    }).slice(0, 12)
  }
  if (cur?.other_info) {
    orderlargeData.value = cur.other_info.map(item => {
      return {
        time: formatToTime2(item.create_time),
        price: item?.amount || 0,
        number: item?.price_change || 0,
        type: item.type
      }
    }).slice(0, 12)
  }
  if (!cur?.pan?.isOpen) {
    isRandom = false
  } else {
    isRandom = true
  }
})

</script>
<style lang="less" scoped>
.box {
  min-width: 250px;

  // background: #101014;

  .header {
    padding: 10px 32px 4px 32px;
    border-top: 1px solid #473a2c;
    border-bottom: 1px solid #473a2c;
    text-align: center;
    &-name {
      font-weight: 500;
      font-size: 24px;
      color: #efc394;
      line-height: 28px;
    }

    &-msg {
      display: flex;
      font-family: Roboto, Roboto;
      align-items: self-end;
      justify-content: center;
      color: #ff5260;
      font-size: 16px;
      line-height: 22px;

      &_value {
        min-width: 50px;
        font-size: 40px;
        line-height: 40px;
      }

      &_number {
        min-width: 40px;
        text-align: right;
      }

      &_per {
        min-width: 60px;
        text-align: right;
      }
    }
  }
}
</style>
