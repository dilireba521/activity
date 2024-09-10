<template>
  <div class="box">
    <!-- header -->
    <div class="header">
      <scheduleElm :dataSource="dataSource" />
    </div>
    <!-- list  -->
    <div class="list">
      <div class="list_header">
        <div>玩家预测</div>
        <div>参与人数：{{ dataSource?.personCount }}</div>
      </div>
      <div class="flex h-full">
        <div class="order">
          <div class="order_header">
            <div class="order_header_name">玩家编号</div>
            <div class="order_header_price">预测价格</div>
          </div>
          <div class="order_list">
            <div class="item" v-for="(item, i) in listLeft" :key="i">
              <div class="name">{{ item.user_id }}</div>
              <div class="price">{{ item.prediction }}</div>
            </div>
            <Empty v-if="listLeft.length == 0" :style="{ marginBlock: '0px', paddingTop: '320px' }"
              :image="Empty.PRESENTED_IMAGE_SIMPLE" />
          </div>
        </div>
        <div class="order">
          <div class="order_header active">
            <div class="order_header_name">玩家编号</div>
            <div class="order_header_price">预测价格</div>
          </div>
          <div class="order_list">
            <div class="item active" v-for="(item, i) in listRight" :key="i">
              <div class="name">{{ item.user_id }}</div>
              <div class="price">{{ item.prediction }}</div>
            </div>
            <Empty v-if="listRight.length == 0" :style="{ marginBlock: '0px', paddingTop: '320px' }"
              :image="Empty.PRESENTED_IMAGE_SIMPLE" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import scheduleElm from './component/schedule.vue'
import { Empty } from 'ant-design-vue'

const props = defineProps({
  dataSource: {
    type: Object,
    default: () => { }
  }
})
const currentIndex = computed(() => {
  return props.dataSource?.rank?.findIndex(item => item.user_id == '当前价') || 0
})
const listLeft = computed(() => {
  return props.dataSource?.rank?.slice(0, currentIndex.value)?.reverse() || []
})
const listRight = computed(() => {
  return props.dataSource?.rank?.slice(currentIndex.value + 1) || []
})

</script>
<style lang="less" scoped>
.box {
  min-width: 360px;
  // padding-right: 4px;
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
  height: calc(100% - 200px);
  border-top: 1px solid #473a2c;
  border-right: 1px solid #473a2c;
  // border-bottom: 1px solid #473a2c;

  &_header {
    height: 28px;
    font-weight: 500;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    background: #101014;
  }
}

.order {
  flex: 1;

  &+& {
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
    overflow: auto;
    height: 100%;
    min-height: 780px;
    background: #101014;

    &::-webkit-scrollbar {
      display: none;
    }
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
}</style>
