<template>
  <div class="box">
    <div class="flex-1 pl-4 pr-8">
      <div class="detail">
        <div>现价</div>
        <div class="detail_value text-red">336</div>
      </div>
      <div class="detail">
        <div>涨跌</div>
        <div class="detail_value text-red">336</div>
      </div>
      <div class="detail">
        <div>涨幅</div>
        <div class="detail_value text-red">0.12%</div>
      </div>
      <div class="detail">
        <div>总量</div>
        <div class="detail_value text-yellow">336</div>
      </div>
      <div class="detail">
        <div>总手</div>
        <div class="detail_value text-yellow">336</div>
      </div>
      <div class="detail">
        <div>总股本</div>
        <div class="detail_value text-gray">336</div>
      </div>
    </div>
    <div class="flex-1 pl-4 pr-8">
      <div class="detail">
        <div>开盘</div>
        <div class="detail_value text-green">336</div>
      </div>
      <div class="detail">
        <div>最高</div>
        <div class="detail_value text-red">336</div>
      </div>
      <div class="detail">
        <div>最低</div>
        <div class="detail_value text-green">0.12%</div>
      </div>
      <div class="detail">
        <div>比量</div>
        <div class="detail_value text-red">336</div>
      </div>
      <div class="detail">
        <div>换手</div>
        <div class="detail_value text-gray">88.8%</div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
</script>
<style lang="less" scoped>
.box {
  height: 145px;
  display: flex;
  background: rgba(216, 216, 216, 0.1);
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.49);
  line-height: 24px;
  border-top: 1px solid #473a2c;
  border-bottom: 1px solid #473a2c;
}
.detail {
  display: flex;
  &_value {
    flex: 1;
    text-align: right;
  }
}
</style>
