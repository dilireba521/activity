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
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import rankElm from './component/rank.vue'
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
</script>
<style lang="less" scoped>
.box {
  width: 250px;
  .header {
    padding: 20px 32px 4px 32px;
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
