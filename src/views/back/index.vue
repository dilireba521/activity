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
      <Row :gutter="[16, 16]" style="height: 250px">
        <Col :span="6">
          <div class="card">
            <cardElm title="资讯主题" detail="资讯主题资讯主题"></cardElm></div
        ></Col>
        <Col :span="6">
          <div class="card">
            <div class="flex items-center justify-center w-full h-full cursor-pointer">
              <img :src="addIcon" @click="openEditInfo" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <div class="pt-40">
      <div class="title">公告区（活动当前指引）</div>
      <Row :gutter="[16, 16]" style="height: 250px">
        <Col :span="6">
          <div class="card active">
            <cardElm title="当前指引" detail="资讯主题资讯主题"></cardElm></div
        ></Col>
        <Col :span="6">
          <div class="card">
            <div class="flex items-center justify-center w-full h-full cursor-pointer">
              <img :src="addIcon" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <div class="pt-40">
      <PanelElm title="内幕交易阶段">
        <Row :gutter="[8, 8]" style="height: 250px">
          <Col :span="6">
            <div class="card dark">
              <cardElm title="问题一"> 22 </cardElm>
            </div>
          </Col>
          <Col :span="6">
            <div class="card dark">
              <div class="flex items-center justify-center w-full h-full cursor-pointer">
                <img :src="addIcon" @click="openEditQuestion" />
              </div>
            </div>
          </Col>
        </Row>
      </PanelElm>
    </div>
    <div class="pt-40">
      <div class="title">玩家预测</div>
      <Row :gutter="[5, 5]" style="min-height: 846px">
        <Col v-for="(items, index) in chunks" :key="index" :span="4">
          <div class="forecast-list">
            <div class="forecast-list_title">
              <div class="forecast-list_number">玩家编号</div>
              <div class="flex-1">预测价格</div>
              <div>操作</div>
            </div>
            <div v-for="(item, i) in items" :key="i" class="forecast-list_item">
              <div class="forecast-list_number">{{ item }}</div>
              <div class="flex-1">335</div>
              <div class="cursor-pointer text-yellow" @click="openEditForecast">编辑</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <!-- 玩家预测-编辑 -->
    <editForecast ref="editForecastRef" />
    <!-- 资讯-编辑、新增 -->
    <editInfo ref="editInfoRef" />
    <!-- 内幕交易阶段 -->
    <editQuestion ref="editQuestionRef" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import scheduleElm from '@/views/home/order/component/schedule.vue'
import cardElm from './component/card.vue'
import addIcon from '@/assets/add.svg'
import PanelElm from './component/panel.vue'
import { Button, Input, Textarea, Row, Col } from 'ant-design-vue'
import editForecast from './component/editForecast.vue'
import editInfo from './component/editInfo.vue'
import editQuestion from './component/editQuestion.vue'
import { arrayChunks } from '@/utils/array.js'
const arr = Array.from({ length: 120 }, (_, i) => i)
const size = 20
const chunks = arrayChunks(arr, size)
// 玩家预测
const editForecastRef = ref()
function openEditForecast(params) {
  editForecastRef.value.open = true
}
// 资讯
const editInfoRef = ref()
function openEditInfo(params) {
  editInfoRef.value.open = true
}

// 内幕交易阶段
const editQuestionRef = ref()
function openEditQuestion(params) {
  editQuestionRef.value.open = true
}
</script>
<style lang="less" scoped>
.card {
  background: #474951;
  border-radius: 4px;
  padding: 16px 16px 12px 16px;
  height: 100%;
  &.active {
    background: #33353e;
    border: 1px solid #efc394;
  }
  &.dark {
    background: #33353e;
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
.forecast-list {
  &_title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #101014;
    border-radius: 4px 4px 0px 0px;
    height: 24px;
    padding: 0 12px;
    font-size: 14px;
    line-height: 24px;
  }
  &_item {
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
    height: 42px;
    line-height: 42px;
    background: rgba(255, 255, 255, 0.1);
    font-size: 16px;
    color: #ffffff;
  }
  &_number {
    width: 105px;
  }
}
</style>
