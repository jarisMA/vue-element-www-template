<template>
  <div class="bg-container">
    <div class="policy-container">
      <div class="header">
        <p class="header-title">斗西家计划 <span></span> 隐私政策</p>
      </div>
      <div class="content">
        <p class="content-title">
          《斗西家计划隐私政策》
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.bg-container {
  background-color: #f7f7fb;
  height: 100vh;
}
.policy-container {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 30px;
  .header {
    display: flex;
    border-bottom: 1px solid #999;
    .header-title {
      font-size: 20px;
      line-height: 60px;
      font-weight: 500;
      color: #333;
      position: relative;
      span {
        display: inline-block;
        width: 2px;
        height: 30px;
        background-color: #999;
        transform: translateY(25%);
        margin: 0 10px;
      }
    }
  }
  .content {
    .content-title {
      color: #333;
      text-align: center;
      font-size: 23px;
      font-weight: 500;
      line-height: 100px;
    }
  }
}
</style>
