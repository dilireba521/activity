<template>
  <div class="box">
    <template v-if="dataSource?.length > 0">
      <div class="order" v-for="(item, i) in dataSource" :key="i">
      <div class="order_time">{{ item.time }}</div>
      <div :class="['order_price', item.type == '买入' && 'active']">{{ item.price }}</div>
      <div :class="['order_value', item.type == '买入' && 'active']">
        {{ item.value
        }}<img v-if="item.price != 0" :src="item.type == '买入' ? upIcon : downIcon" />
      </div>
      <!-- <div class="order_number">{{ item.number }}</div> -->
    </div>
    </template>
    
    <Empty v-else:style="{ marginBlock: '0px', paddingTop: '320px' }" :image="Empty.PRESENTED_IMAGE_SIMPLE" />

  </div>
</template>
<script setup>
import upIcon from '@/assets/up.svg'
import downIcon from '@/assets/down.svg'
import { Empty } from 'ant-design-vue'

const props = defineProps({
  dataSource: {
    type: Object,
    default: () => []
  }
})
</script>
<style lang="less" scoped>
.box {
  overflow: auto;
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
    width: 98px;
    text-align: right;
    color: #20b26c;
    &.active {
      color: #ff5260;
    }
  }
  &_value {
    // width: 73px;
    flex: 1;
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
