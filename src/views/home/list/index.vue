<template>
  <div class="box">
    <!-- header  -->
    <div class="header">
      <div class="header-name">虾米股份 200216</div>
      <div class="header-msg">
        <div class="header-msg_value">336</div>
        <div class="header-msg_number">6</div>
        <div class="header-msg_per">0.12%</div>
      </div>
    </div>
    <!-- top rank  -->
    <div>
      <rankElm :dataSource="rankData.sell" type="sell" />
      <rankElm :dataSource="rankData.buy" type="buy" />
    </div>
    <!-- overview -->
    <overviewElm></overviewElm>
    <!-- order -->
    <orderElm :dataSource="orderData"></orderElm>
    <!-- orderlarge -->
    <orderlargeElm :dataSource="orderlargeData"></orderlargeElm>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import rankElm from './component/rank.vue'
import overviewElm from './component/overview.vue'
import orderElm from './component/order.vue'
import orderlargeElm from './component/orderlarge.vue'
const rankData = reactive({
  sell: [
    {
      name: '卖1',
      price: '100',
      number: '2'
    },
    {
      name: '卖1',
      price: '80',
      number: '2'
    },
    {
      name: '卖1',
      price: '1',
      number: '2'
    },
    {
      name: '卖1',
      price: '100',
      number: '112'
    },
    {
      name: '卖1',
      price: '100',
      number: '22'
    }
  ],
  buy: [
    {
      name: '卖1',
      price: '100',
      number: '2'
    },
    {
      name: '卖1',
      price: '100',
      number: '2'
    },
    {
      name: '卖1',
      price: '100',
      number: '2'
    }
  ]
})
// order
const orderData = ref([
  {
    time: '13:20',
    price: '100',
    value: '100',
    number: '100'
  },
  {
    time: '13:20',
    price: '100',
    value: '80',
    number: '100'
  },
  {
    time: '13:20',
    price: '100',
    value: '90',
    number: '100'
  }
])

// orderlarge
const orderlargeData = ref([
  {
    time: '00:00:00',
    price: '100',
    number: '100'
  }
])
</script>
<style lang="less" scoped>
.box {
  width: 250px;

  background: #101014;
  .header {
    padding: 20px 32px 4px 32px;
    border-top: 1px solid #473a2c;
    border-bottom: 1px solid #473a2c;
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
      color: #ff5260;
      font-size: 16px;
      line-height: 22px;
      &_value {
        width: 50px;
        font-size: 24px;
        line-height: 32px;
      }
      &_number {
        width: 40px;
        text-align: right;
      }
      &_per {
        width: 60px;
        text-align: right;
      }
    }
  }
}
</style>
