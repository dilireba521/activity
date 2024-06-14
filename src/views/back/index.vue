<template>
  <div class="container">
    <div class="flex height">
      <div class="flex-1 mr-16 card">
        <div class="title">当前价格</div>
        <div class="flex">
          <Textarea class="felx-1 curVal"></Textarea>
          <div class="ml-16 felx-1">
            <Input class="curVal-num" placeholder="输入买卖数量" />
            <div class="flex">
              <div @click="submit({ type: 'buy' })" class="flex-1 button active">买入</div>
              <div @click="submit({ type: 'sell' })" class="flex-1 button">卖出</div>
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
      <div style="width: 320px" class="card">
        <scheduleElm />
      </div>
    </div>
    <div class="pt-40">
      <div class="title">资讯</div>
      <Row :gutter="[16, 16]">
        <Col class="height" v-for="item in dataSource.info" :key="item.id" :span="6">
        <div :class="['card', item.is_send == 1 && 'active']">
          <cardElm :title="item.title" :detail="item.content" @click="openEditInfo({ type: moduleType.info, record: item })"></cardElm>
        </div>
        </Col>
        <Col :span="6">
        <div class="card height">
          <div class=" flex items-center justify-center w-full h-full cursor-pointer">
            <img :src="addIcon" @click="openEditInfo({ type: moduleType.info })" />
          </div>
        </div>
        </Col>
      </Row>
    </div>
    <div class="pt-40">
      <div class="title">公告区（活动当前指引）</div>
      <Row :gutter="[16, 16]">
        <Col class="height" v-for="item in dataSource.notice" :key="item.id" :span="6">
        <div :class="['card', item.is_send == 1 && 'active']">
          <cardElm :title="item.title" :detail="item.content" @click="openEditInfo({ type: moduleType.notice, record: item })"></cardElm>
        </div>
        </Col>
        <Col :span="6">
        <div class="card height">
          <div class="flex items-center justify-center w-full h-full cursor-pointer">
            <img :src="addIcon" @click="openEditInfo({ type: moduleType.notice })"  />
          </div>
        </div>
        </Col>
      </Row>
    </div>
    <div class="pt-40">
      <PanelElm title="内幕交易阶段">
        <Row :gutter="[8, 8]">
          <Col class="height" v-for="item in dataSource.question" :key="item.id" :span="6">
          <div class="card dark">
            <cardElm :title="item.title">{{ item.content }}</cardElm>
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
    <editInfo ref="editInfoRef" :record="curRecordInfo" :type="editType" @success="noticeeditFn" />
    <!-- 内幕交易阶段 -->
    <editQuestion ref="editQuestionRef" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import scheduleElm from '@/views/home/order/component/schedule.vue'
import cardElm from './component/card.vue'
import addIcon from '@/assets/add.svg'
import PanelElm from './component/panel.vue'
import { Button, Input, Textarea, Row, Col } from 'ant-design-vue'
import editForecast from './component/editForecast.vue'
import editInfo from './component/editInfo.vue'
import editQuestion from './component/editQuestion.vue'
import { arrayChunks } from '@/utils/array.js'
import { useGet } from '@/utils/fetch.js'


const arr = Array?.from({ length: 120 }, (_, i) => i)
const size = 20
const chunks = arrayChunks(arr, size)
enum moduleType {
  info = '资讯',
  notice = '公告',
  question = '问题',
}
const dataSource = reactive({
  info: [],
  notice: [],
  question: [],
})

const editType = ref(moduleType.info)

// 玩家预测
const editForecastRef = ref()
function openEditForecast(params) {
  editForecastRef.value.open = true
}
// 资讯
const curRecordInfo = ref()
const editInfoRef = ref()
function openEditInfo(params: any) {
  curRecordInfo.value = null
  editType.value = params.type
  if(params.record){
    curRecordInfo.value = params.record
  }
  console.log('params--', params,curRecordInfo.value);
  
  editInfoRef.value.open = true
}

// 内幕交易阶段
const editQuestionRef = ref()
function openEditQuestion(params) {
  editQuestionRef.value.open = true
}
function submit(params) {
  console.log('params--', params);
}
// 资讯、公告，内幕接口
async function noticeeditFn(params: any) {
  const { data } = await useGet('/games/noticeedit/', params)
  switch (params.type) {
    case moduleType.info:
      dataSource.info = data.value?.data
      break
    case moduleType.notice:
      dataSource.notice = data.value?.data
      break
    case moduleType.question:
      dataSource.question = data.value?.data
      break
  }
  console.log('data--', data);

}
function initData() {
  noticeeditFn({ type: moduleType.info })
  noticeeditFn({ type: moduleType.notice })
  noticeeditFn({ type: moduleType.question })
}
onMounted(() => {
  initData()
})
</script>
<style lang="less" scoped>
.height {
  height: 250px;
}

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

  &+& {
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
