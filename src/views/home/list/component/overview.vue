<template>
  <div class="box">
    <div style="padding-left: 1.6%;padding-right: 3.2%;" class="flex-1">
      <div class="detail">
        <div>现价</div>
        <div class="detail_value text-red">{{info?.now || 0}}</div>
      </div>
      <div class="detail">
        <div>涨跌</div>
        <div class="detail_value text-red">{{parseFloat(info?.zd || 0).toFixed(0) || 0}}</div>
      </div>
      <div class="detail">
        <div>涨幅</div>
        <div class="detail_value text-red">{{parseFloat(info?.zf || 0).toFixed(2) || 0}}%</div>
      </div>
      <div class="detail">
        <div>总量</div>
        <div class="detail_value text-yellow">{{info?.zl || 0}}</div>
      </div>
      <div class="detail">
        <div>总手</div>
        <div class="detail_value text-yellow">{{info?.zs || 0}}</div>
      </div>
      <!-- <div class="detail">
        <div>总股本</div>
        <div class="detail_value text-gray">{{info?.zd || 0}}</div>
      </div> -->
    </div>
    <div style="padding-left: 1.6%;padding-right: 3.2%;" class="flex-1">
      <div class="detail">
        <div>开盘</div>
        <div class="detail_value text-green">{{info?.open || 0}}</div>
      </div>
      <div class="detail">
        <div>最高</div>
        <div class="detail_value text-red">{{info?.max || 0}}</div>
      </div>
      <div class="detail">
        <div>最低</div>
        <div class="detail_value text-green">{{info?.min || 0}}</div>
      </div>
      <!-- <div class="detail">
        <div>比量</div>
        <div class="detail_value text-red">{{info?.zd || 0}}</div>
      </div> -->
      <div class="detail">
        <div>换手</div>
        <div class="detail_value text-gray">{{parseFloat(info?.hs || 0).toFixed(2) || 0}}%</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  dataSource: {
    type: Object,
    default: () => { }
  }
})
const info = ref()
watch(()=> props.dataSource, (val) => {

  info.value = val?.info
},{deep: true})
</script>
<style lang="less" scoped>
.box {
  height: 124px;
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
  word-break: keep-all;
  &_value {
    flex: 1;
    text-align: right;
  }
}
</style>
