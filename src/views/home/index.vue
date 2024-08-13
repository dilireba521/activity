<template>
  <div class="container">
    <div class="header">
      <div v-for="item in headerList" :key="item" class="header-item">{{ item }}</div>
    </div>
    <div class="flex h-full">
      <div class="side">
        <div v-for="item in sideList" :key="item.name" :class="['side-item', activeName == item.name && 'active']">
          <img v-if="item.icon" :src="item.icon" />
          <div class="side-item-name">{{ item.name }}</div>
        </div>
      </div>
      <div class="flex flex-1">
        <div class="flex-1">
          <div v-if="!showQuestion" class="flex">
            <Panel icon="info" class="flex-1" :title="dataSource?.zx?.title || '资讯'">
              <div v-if="dataSource?.zx?.content" class="p-16">{{ dataSource?.zx?.content }}</div>
              <Empty v-else :style="{ marginBlock: '0px', paddingTop: '32px' }" :image="Empty.PRESENTED_IMAGE_SIMPLE" />
            </Panel>
            <Panel icon="notice" class="flex-1" :title="dataSource?.notice?.title || '公告'">
              <div v-if="dataSource?.notice?.content" class="p-16">{{ dataSource?.notice?.content }}</div>
              <Empty v-else :style="{ marginBlock: '0px', paddingTop: '32px' }" :image="Empty.PRESENTED_IMAGE_SIMPLE" />
            </Panel>
          </div>
          <div v-else class="flex">
            <Panel icon="question" class="flex-1" :title="dataSource?.question?.title || '问题'">
              <div class="flex items-center justify-center w-full h-full break-all p-16">Q：{{
                dataSource?.question?.content }}</div>
            </Panel>
            <Panel icon="answer" class="flex-1" title="选项">
              <div v-if="dataSource?.question?.options" class="flex items-center h-full">
                <div class="answer">
                  <div v-for="(item, i) in dataSource?.question?.options" :key="item.id" class="answer-item">
                    <div :class="['answer-item_cont', item.isAnswer && 'active']">
                      {{ item.title }}：{{ item.content }}
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
          <div>
            <EchartElm :dataSource="kline" />
          </div>
        </div>
        <div class="shrink-0">
          <listElm :dataSource="dataSource"/>
        </div>
        <div class="shrink-0">
          <orderElm :dataSource="dataSource"></orderElm>
        </div>
      </div>
    </div>
    <openElm :dataSource="dataSource"/>
  </div>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import Panel from './component/Panel.vue'
import Next from '@/assets/next.svg'
import EchartElm from './component/echart.vue'
import listElm from './list/index.vue'
import orderElm from './order/index.vue'
import openElm from './component/open.vue'
import { useWebSocket } from '@vueuse/core'
import { Empty, Input } from 'ant-design-vue'
const dataVal = reactive({
  code2: '',
})
function keyup(params) {
  console.log("params======",params);
}
function change(params) {
  console.log("params======",params,codeElmRef.value);
  if(params.code.length == 6){
    setTimeout(()=>{
      codeElmRef.value?.clearAll()
      console.log();
    },10000)
  }
}
const codeElmRef = ref()
// 信息集合
const dataSource = ref()
const kline = ref()
const env = import.meta.env
const { status, data, send, open, close } = useWebSocket(env.VITE_GLOB_WEBSOCKET + '/rank/', {
  onMessage: (ws, event) => {
    dataSource.value = event?.data && JSON.parse(event.data)
    kline.value = dataSource.value?.kline
    // console.log("dataSource.value---", dataSource.value);
  },
  onConnected: (ws) => {
    console.log('WebSocket onConnected', ws)
  },
  onError: (ws, event) => {
    console.log('WebSocket onError', ws, event)
  },
  // onDisconnected: (ws,event) => {
  //   // close()
  //   console.error('onDisconnected 发生错误:', ws,event)
  // },
})


const showQuestion = computed(() => {
  return dataSource.value?.question?.content
})

const headerList = ['系统', '报价', '行情', '分析', '职能', '工具', '资讯', '帮助', '决策']
const sideList = [
  {
    icon: '',
    name: '首页'
  },
  {
    icon: Next,
    name: '应用'
  },
  {
    icon: '',
    name: '分时图'
  },
  {
    icon: '',
    name: 'K线图'
  },
  {
    icon: '',
    name: '个股资料'
  },
  {
    icon: '',
    name: '自选股'
  },
  {
    icon: '',
    name: '综合排名'
  },
  {
    icon: '',
    name: '牛叉诊股'
  },
  {
    icon: '',
    name: '超级盘口 '
  }
]
const activeName = ref('K线图')

window.addEventListener('beforeunload', function () {
  close()
})

</script>
<style lang="less" scoped>
.container {
  height: calc(100vh - 32px);
  position: relative;
}

.header {
  position: absolute;
  top: -32px;
  height: 32px;
  line-height: 32px;
  padding-left: 8px;
  display: flex;
  color: #999999;

  &-item {
    margin-right: 12px;
  }
}

.side {
  width: 22px;
  color: #999999;

  &-item {
    width: 22px;
    word-wrap: break-word;
    background: #33353e;
    border: 1px solid #000000;
    padding: 8px 0;
    line-height: 16px;
    text-align: center;

    &.active {
      color: #000000;
      background: #efc394;
    }
  }

  &-item+&-item {
    border-top: 0;
  }
}

.answer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  min-height: 65%;
  flex-wrap: wrap;
  margin: 0 auto;

  &-item {
    width: 50%;
    flex-shrink: 0;
    margin-bottom: 4px;

    &_cont {
      display: inline-block;
      line-height: 46px;
      padding: 0 20px;
      height: 48px;
      font-size: 20px;

      border-radius: 4px;

      &.active {
        color: #000000;
        background: #efc394;
      }
    }
  }
}
</style>
