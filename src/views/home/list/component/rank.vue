<template>
  <div :class="['box', type == 'buy' && 'active']">
    <div class="rank" v-for="(item, i) in dataSource" :key="i">
      <div class="ran'k_name">{{ item.name }}</div>
      <div :class="['rank_price',type == 'buy'? 'text-red':'text-green']">{{ item.price }}</div>
      <div class="rank_number text-green-1">{{ item.number }}</div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'sell',
    validate: (value) => {
      return ['sell', 'buy'].indexOf(value) !== -1
    }
  },
  dataSource: {
    type: Array,
    default: () => []
  }
})
</script>
<style lang="less" scoped>
.box {
  height: 120px;
  padding-left: 4px;
  background: rgba(32, 178, 108, 0.1);
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.49);
  line-height: 24px;
  display: flex;
  justify-content: end;
  flex-direction: column;
  &.active {
    background: rgba(255, 82, 96, 0.1);
    justify-content: start;
  }
}
.rank {
  display: flex;
  &_name {
    width: 50px;
  }
  &_price {
    flex: 1;
    text-align: right;
  }
  &_number {
    flex: 1;
    padding-left: 20%;
    text-align: left;
  }
}
</style>
