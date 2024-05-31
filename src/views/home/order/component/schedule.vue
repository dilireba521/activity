<template>
  <div class="schedule">
    <div class="schedule_time">当前游戏时间：00:00:00</div>
    <div class="schedule_step">当前阶段：第一阶段</div>
    <div class="schedule_next">距离下一阶段</div>
    <div class="schedule_countdown">00:14:59</div>
  </div>
</template>
<style lang="less" scoped>
.schedule {
  color: #ffffff;
  text-align: center;
  &_time {
    font-family: Roboto, Roboto;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
  }
  &_step {
    font-size: 16px;
    line-height: 22px;
    margin-top: 4px;
    margin-bottom: 24px;
  }
  &_next {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 22px;
  }
  &_countdown {
    font-family: Roboto, Roboto;
    font-weight: bold;
    font-size: 48px;
    color: #ffffff;
    line-height: 56px;
  }
}
</style>
