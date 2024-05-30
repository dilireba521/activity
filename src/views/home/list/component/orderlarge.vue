<template>
  <div class="box">
    <div class="title">大额买卖</div>
    <div class="item" v-for="(item, i) in dataSource" :key="i">
      <div class="item_time">{{ item.time }}</div>
      <div class="item_price">{{ item.price }}</div>
      <div class="item_type">大笔买入</div>
      <div class="item_number">{{ item.number }}手</div>
    </div>
  </div>
</template>
<script setup>
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
  border-bottom: 1px solid #473a2c;
  height: 276px;
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
  color: #ff5260;
  line-height: 20px;
  &_price {
    width: 50px;
    text-align: right;
    margin-right: 20px;
  }
  &_number {
    flex: 1;
    text-align: right;
  }
}
</style>
