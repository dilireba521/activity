<template>
  <div class="box">
    <!-- header -->
    <div class="header">
      <scheduleElm />
    </div>
    <!-- list  -->
    <div class="list">
      <div class="list_header">玩家预测</div>
      <div class="flex">
        <div class="order">
          <div class="order_header">
            <div class="order_header_name">玩家编号</div>
            <div class="order_header_price">预测价格</div>
          </div>
          <div class="order_list">
            <div class="item" v-for="(item, i) in list" :key="i">
              <div class="name">{{ item.name }}</div>
              <div class="price">{{ item.price }}</div>
            </div>
          </div>
        </div>
        <div class="order">
          <div class="order_header active">
            <div class="order_header_name">玩家编号</div>
            <div class="order_header_price">预测价格</div>
          </div>
          <div class="order_list">
            <div class="item active" v-for="(item, i) in list" :key="i">
              <div class="name">{{ item.name }}</div>
              <div class="price">{{ item.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import scheduleElm from './component/schedule.vue'
const list = [
  {
    name: '01',
    price: '98'
  },
  {
    name: '02',
    price: '98'
  }
]
</script>
<style lang="less" scoped>
.box {
  width: 360px;
  padding-right: 4px;
  border-left: 1px solid #473a2c;
}
.header {
  padding: 24px 0 20px 0;
  color: #ffffff;
  text-align: center;
  border-top: 1px solid #473a2c;
  border-right: 1px solid #473a2c;
  background: #101014;
}
.list {
  border-top: 1px solid #473a2c;
  border-right: 1px solid #473a2c;
  border-bottom: 1px solid #473a2c;
  &_header {
    height: 28px;
    font-weight: 500;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 28px;
    text-align: center;

    background: #101014;
  }
}
.order {
  flex: 1;
  & + & {
    margin-left: 2px;
  }
  &_header {
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    background: #ff5260;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    &.active {
      background: #20b26c;
    }
  }
  &_list {
    height: 780px;
    background: #101014;
  }
}
.item {
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  height: 30px;
  font-family: Roboto, Roboto;
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 30px;
  .price {
    color: #ff5260;
  }
  &.active {
    .price {
      color: #20b26c;
    }
  }
}
</style>
