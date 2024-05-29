<template>
  <div class="box">
    <div class="order" v-for="(item, i) in dataSource" :key="i">
      <div class="order_time">{{ item.time }}</div>
      <div class="order_price">{{ item.price }}</div>
      <div :class="['order_value', item.value > target && 'active']">
        {{ item.value
        }}<img v-if="item.value != target" :src="item.value > target ? upIcon : downIcon" />
      </div>
      <div class="order_number">{{ item.number }}</div>
    </div>
  </div>
</template>
<script setup>
import upIcon from '@/assets/up.svg'
import downIcon from '@/assets/down.svg'
const props = defineProps({
  target: {
    type: [String, Number],
    default: 90
  },
  dataSource: {
    type: Object,
    default: () => []
  }
})
</script>
<style lang="less" scoped>
.box {
  height: 288px;
  background: #101014;
  font-family: Roboto, Roboto;
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.49);
  line-height: 24px;
}
.order {
  display: flex;
  padding: 0 8px 0 4px;
  &_price {
    width: 68px;
    text-align: right;
    color: #ff5260;
  }
  &_value {
    width: 73px;
    text-align: right;
    color: #20b26c;
    &.active {
      color: #ff5260;
    }
  }
  &_number {
    flex: 1;
    color: #20b2b1;
    text-align: right;
  }
}
</style>
