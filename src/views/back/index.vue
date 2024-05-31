<template>
  <div class="container">
    <div style="height: 200px" class="flex">
      <div class="flex-1 mr-16 card">
        <div class="title">当前价格</div>
        <div class="flex">
          <Textarea class="felx-1 curVal"></Textarea>
          <div class="ml-16 felx-1">
            <Input class="curVal-num" placeholder="输入买卖数量" />
            <div class="flex">
              <div class="flex-1 button active">买入</div>
              <div class="flex-1 button">卖出</div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 300px" class="flex items-center justify-center mr-16 card active single">
        K线展示
      </div>
      <div style="width: 260px" class="flex items-center justify-center mr-16 card single">
        开盘
      </div>
      <div style="width: 320px" class="card"><scheduleElm /></div>
    </div>
    <div class="pt-40">
      <div class="title">资讯</div>
      <div class="card"></div>
    </div>
  </div>
</template>
<script setup>
import scheduleElm from '@/views/home/order/component/schedule.vue'
import { Button, Input, Textarea } from 'ant-design-vue'
</script>
<style lang="less" scoped>
.card {
  background: #474951;
  border-radius: 4px;
  padding: 16px 16px 12px 16px;
  &.active {
    background: #33353e;
    border-radius: 4px;
    border: 1px solid #efc394;
  }
}
.container {
  padding: 20px 40px;
  background: #33353e;
}
.single {
  font-weight: 600;
  font-size: 36px;
  color: #ffffff;
  line-height: 50px;
}
.button {
  display: inline-block;
  background: #2ba169;
  border-radius: 4px;
  font-size: 18px;
  color: #ffffff;
  line-height: 48px;
  height: 48px;
  text-align: center;
  cursor: pointer;
  &.active {
    background: #ff5260;
  }
  &:hover {
    opacity: 0.9;
  }
  & + & {
    margin-left: 16px;
  }
}
.title {
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 12px;
}
.curVal {
  background: #33353e;
  font-size: 32px;
  line-height: 38px;
  height: 124px;
  width: 428px;
}
.curVal-num {
  height: 48px;
  width: 428px;
  margin-bottom: 21px;
  margin-top: 4px;
}
</style>
