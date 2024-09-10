<template>
  <div class="box">
    <div class="title">大额买卖</div>
    <template v-if="dataSource?.length > 0">
      <div :class="['item',
        item.type == '竞价买入' && 'red',
        item.type == '竞价卖出' && 'green',
        item.type == '极速拉升' && 'red',
        item.type == '猛烈打压' && 'origin',
        item.type == '大笔卖出' && 'green'
      ]" v-for="(item, i) in dataSource" :key="i">
        <div class="item_time">{{ item.time }}</div>
        <div class="item_price">{{ item.price }}</div>
        <div class="item_type">{{ item.type }}</div>
        <div class="item_number">{{ item.number }}手</div>
      </div>
    </template>
    <Empty v-else:style="{ marginBlock: '0px', paddingTop: '320px' }" :image="Empty.PRESENTED_IMAGE_SIMPLE" />

  </div>
</template>
<script setup>
import { Empty } from 'ant-design-vue'

const props = defineProps({
  dataSource: {
    type: Array,
    default: () => []
  }
})
</script>
<style lang="less" scoped>
.box {
  background: #101014;
  border-top: 1px solid #473a2c;
  // border-bottom: 1px solid #473a2c;
  min-height: 300px;
  height: calc(100% - 736px);
  padding: 0 4px;
}

.title {
  font-weight: 500;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 24px;
  height: 24px;
  text-align: center;
}

.item {
  display: flex;
  font-family: Roboto, Roboto;
  font-weight: 400;
  font-size: 14px;
  color: #FF5260FF;
  line-height: 20px;

  &.green {
    color: #20B26CFF;
  }

  &.red {
    color: #EE0000FF;
  }

  &.origin {
    color: #FF8000FF;
  }

  &_price {
    width: 20%;
    text-align: right;
    margin-right: 8%;
  }
  &_number {
    flex: 1;
    text-align: right;
    padding-right: 1.6%;
  }
}
</style>
