<template>
  <div class="box">
    <div class="header">
      <div class="flex">
        <div class="header-price">最终价格：{{data?.data?.price}}</div>
        <div class="header-msg">
          <div class="header-msg_item">参与人数：{{data?.data?.stat?.person_count}}人</div>
          <div class="header-msg_item">总交易次数：{{data?.data?.stat?.trade_counts}}次</div>
          <div class="header-msg_item">买入次数：{{data?.data?.stat?.buy_count}}次</div>
          <div class="header-msg_item">卖出次数：{{data?.data?.stat?.sell_count}}次</div>
        </div>
      </div>
      <div class="header-title">虾米股份 200216</div>
    </div>
    <div class="cont">
      <div class="flex items-end pb-12">
        <div class="title">排行榜</div>
        <div>预测价格与最终价格差值</div>
      </div>
      <Row :gutter="[12, 12]">
        <Col v-for="(items, index) in chunks" :key="index" :span="4">
          <div class="list">
            <div class="list-header">
              <div class="list-header_rank">排行</div>
              <div class="list-header_number">玩家编号</div>
              <div class="list-header_price">预测价格</div>
              <div class="list-header_diff">价差</div>
            </div>
            <div
              :class="[
                'list-item',
                index == 0 &&
                  ((i == 0 && 'first') || (i == 1 && 'secondary') || (i == 2 && 'third'))
              ]"
              v-for="(item, i) in items"
              :key="i"
            >
              <div class="list-item_rank">{{ (i + 1 + index * 20).toString().padStart(2, '0')}}</div>
              <div class="list-item_number">{{ item.user_id.toString().padStart(2, '0') }}</div>
              <div class="list-item_price">{{ item.prediction  }}</div>
              <div class="list-item_diff">{{ item.diff  }}</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script setup>
import { Row, Col } from 'ant-design-vue'
import { arrayChunks } from '@/utils/array.js'
import { useGet } from '@/utils/fetch.js'
import { watch, ref } from 'vue';

const size = 20
const chunks = ref()
const { data } = useGet('/games/rank/')

watch(data, (newVal) => {
  console.log(newVal);
  chunks.value = arrayChunks(newVal.data.rank, size)
})

</script>
<style lang="less" scoped>
.box {
  padding-top: 40px;
  padding-left: 42px;
  padding-right: 42px;
  // padding-bottom: 20px;
}
.header {
  border-bottom: 1px solid rgba(239, 195, 148, 0.6);
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  &-price {
    font-weight: 500;
    font-size: 36px;
    color: #efc394;
    line-height: 48px;
    padding-right: 80px;
  }
  &-msg {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 28px;
    display: flex;
    align-items: end;
    &_item {
      margin-right: 24px;
    }
  }
  &-title {
    font-size: 24px;
    color: #ffffff;
    line-height: 48px;
  }
}
.cont {
  padding-top: 24px;
  line-height: 20px;
  .title {
    font-size: 24px;
    color: #ffffff;
    line-height: 32px;
    margin-right: 8px;
  }
}
.list {
  &-header {
    display: flex;
    height: 24px;
    justify-content: space-between;
    line-height: 24px;
    background: #101014;
    padding: 0 12px;
    border-radius: 4px 4px 0px 0px;
    &_rank {
      width: 60px;
    }
    &_number {
      width: 84px;
    }
    &_price {
      width: 94px;
    }
    &_diff {
      text-align: right;
      flex: 1;
    }
  }
  &-item {
    display: flex;
    height: 41px;
    justify-content: space-between;
    line-height: 40px;
    background: #232323;
    padding: 0 12px;
    font-size: 16px;
    margin-bottom: 1px;
    font-family: Roboto, Roboto;
    &_rank {
      width: 60px;
      font-weight: bold;
      font-size: 20px;
    }
    &_number {
      width: 84px;
    }
    &_price {
      width: 94px;
    }
    &_diff {
      text-align: right;
      flex: 1;
    }
    &.first {
      background: #ffce99;
      color: #000000;
    }
    &.first &_rank {
      color: #e37232;
    }
    &.secondary {
      background: #c2dce7;
      color: #000000;
    }
    &.secondary &_rank {
      color: #507b8c;
    }
    &.third {
      background: #bb7f37;
      color: #000000;
    }
    &.third &_rank {
      color: #9d4d13;
    }
  }
}
</style>
