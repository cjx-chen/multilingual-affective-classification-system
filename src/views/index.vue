<template>
  <a-layout class="container">
    <div class="component">
      <div class="lighthouse-block">
        <img class="lighthouse" src="../static/img/lighthouse.png" alt="lighthouse" />
      </div>
      <div class="oval1-block">
        <img class="oval1" src="../static/img/oval1.png" alt="oval1">
      </div>
      <div class="oval2-block">
        <img class="oval2" src="../static/img/oval2.png" alt="oval2">
      </div>
      <div class="rect1-block">
        <img class="rect1" src="../static/img/rect1.png" alt="rect1">
      </div>
      <div class="rect2-block">
        <img class="rect2" src="../static/img/rect2.png" alt="rect2">
      </div>
      <div class="rect3-block">
        <img class="rect3" src="../static/img/rect3.png" alt="rect3">
      </div>
      <div class="rect4-block">
        <img class="rect4" src="../static/img/rect4.png" alt="rect4">
      </div>
      <div class="cir1-block">
        <img class="cir1" src="../static/img/cir1.png" alt="cir1">
      </div>
      <div class="trial-block">
        <img class="tria2" src="../static/img/tria2.png" alt="tria2">
      </div>
      <div class="tria3-block">
        <img class="tria3" src="../static/img/tria3.png" alt="tria3">
      </div>
    </div>
    <a-layout-header class="header">
      <a-button class="text" @click="useText()" type="primary" shape="round" :size="size">文字</a-button>
      <a-button class="file" @click="useFile()" type="primary" shape="round" :size="size">文档</a-button>
    </a-layout-header>
    <a-layout-content class="content">
      <div class="block">
        <a-button class="method" @click="autoDetection()" type="primary" shape="round" :size="size">自动检测</a-button>
        <a-button class="method" @click="mal()" type="primary" shape="round" :size="size">Mal</a-button>
        <a-button class="method" @click="kananda()" type="primary" shape="round" :size="size">Kananda</a-button>
        <a-button class="method" @click="tamil()" type="primary" shape="round" :size="size">Tamil</a-button>
        <div>
          <a-textarea class="input" v-model:value="inputText" :rows="6" />
          <a-textarea class="output" v-model:value="output" :rows="4" :disabled="true" />
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer class="footer">
      <template class="welcome">
        Welcome to
      </template>
    </a-layout-footer>
  </a-layout>
</template>

<script>
  import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'

  export default defineComponent({
    name: 'Index',
    components: {

    },
    data() {
      return {

      }
    },
    setup() {
      const state = reactive({
        inputText: ''
      })

      const output = ref('');

      const mal = (val) => {
        console.log(state.inputText)
      }

      // onMounted(() => {
      //   console.log(inputText)
      //   // console.log(input.value)
      // })

      return {
        size: ref('large'),
        ...toRefs(state),
        output,
        mal
      }
    }
  })
</script>

<style scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../static/img/bg.png') center center/100% 100% no-repeat;
    overflow: hidden;
  }

  .ant-layout-header,
  .ant-layout-footer {
    background: transparent;
  }

  /* header */
  .ant-btn-primary {
    color: #D9D9D9;
    background: linear-gradient(90deg, #715DD2 0%, #5A36D8 100%);
    border: 1px solid #791DCC;
  }

  .ant-btn-round.ant-btn-lg {
    padding: 0;
  }

  .text,
  .file {
    height: 46px;
    width: 79px;
    font-size: 20px;
    font-family: YouYuan;
    margin-top: 4.93vh;
  }

  .text {
    margin-left: 21.15vw;
    margin-right: 18px;
  }

  /* content */
  .block {
    height: 70.18vh;
    width: 67.81vw;
    border-radius: 50px;
    margin-top: 4.91vh;
    margin-left: 18.13vw;
    background: #F6F6F6;
    padding-left: 108px;
    padding-top: 48px;
  }

  .method {
    color: #D9D9D9;
    background: linear-gradient(90deg, #715DD2 0%, #5A36D8 100%);
    border: 1px solid #791DCC;
    font-size: 16px;
    height: 35px;
    width: 87px;
    z-index: 2;
  }

  .ant-input[disabled] {
    background-color: #fff;
  }

  /* footer */
  .welcome {
    text-align: right;
    margin-top: 6.67vh;
    margin-right: 17.5vw;
    background: #F6F6F6;
    font-size: 28px;
    font-weight: lighter;
    font-family: Bahnschrift;
  }

  /* component */
  .lighthouse {
    height: 206px;
    width: 68px;
    position: absolute;
    top: 43px;
    left: 61px;
    z-index: 2;
  }

  .oval1 {
    width: 153px;
    height: 123px;
    position: absolute;
    top: 21px;
    left: 19px;
    z-index: 1;
  }

  .oval2 {
    width: 167px;
    height: 159px;
    position: absolute;
    left: 64.69vw;
    top: 57.69vh;
  }

  .cir1 {
    width: 115px;
    height: 117px;
    position: absolute;
    top: -47px;
    right: -18px;
    overflow: hidden;
  }

  .tria2 {
    height: 148px;
    width: 138px;
    position: absolute;
    top: 29px;
    right: 371px;
  }

  .tria3 {
    width: 192px;
    height: 207px;
    position: absolute;
    left: 0;
    bottom: 21.2vh;
  }

  .rect1 {
    height: 211px;
    width: 191px;
    position: absolute;
    bottom: -115px;
    left: 42.5vw;
  }

  .rect2 {
    height: 87px;
    width: 89px;
    position: absolute;
    right: 17.24vw;
    bottom: 9.54vh;
  }

  .rect3 {
    width: 168px;
    height: 175px;
    position: absolute;
    left: 83px;
    top: -66px;
  }

  .rect4 {
    height: 208px;
    width: 192px;
    position: absolute;
    left: 92.45vw;
    top: 39.44vh;
  }

  /* textare */
  .input {
    width: 357px !important;
    border-radius: 35px !important;
    padding: 20px;
    margin-top: -16px;
    margin-left: -4px;
  }

  .ant-input:hover {
    border-color: #791DCC !important;
  }

  .ant-input::selection {
    background: #715DD2 !important;
  }

  .output {
    width: 315px !important;
    border-radius: 35px !important;
    padding: 20px;
    z-index: 99;
    position: absolute;
    top: 50.65vh;
    left: 45.39vw;
  }
</style>