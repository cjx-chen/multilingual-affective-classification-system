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
      <a-button class="text" @click="useText" type="primary" shape="round" :size="size">文字</a-button>
      <a-button class="file" @click="useFile" type="primary" shape="round" :size="size">文档</a-button>
    </a-layout-header>
    <a-layout-content class="content">
      <div class="block">
        <!-- <a-button class="method" @click="autoDetection()" type="primary" shape="round" :size="size">自动检测</a-button> -->
        <a-button class="method malBtn" @click="mal" type="primary" shape="round" :size="size">Mal</a-button>
        <a-button class="method" @click="kananda" type="primary" shape="round" :size="size">Kananda</a-button>
        <a-button class="method" @click="tamil" type="primary" shape="round" :size="size">Tamil</a-button>
        <div :data="state">
          <div class="input-block" v-if="state.uploadType === '0'">
            <a-textarea class="input" v-model:value="state.inputText" :rows="6" />
          </div>
          <div class="upload-block" v-if="state.uploadType === '1'">
            <!-- <div class="msgTitle">请上传以下格式的文档：</div>
            <div class="msgContent">.xlsx、.txt.</div> -->
            <div class="uploadBtn">
              <a-upload v-model:file-list="txtFile" name="txt" accept=".txt" :multiple="true"
                :before-upload="beforeUploadTxt" :headers="headers" :showUploadList="true" :withCredentials="true"
                :disabled="loading">
                <a-button v-if="txtFile.length < 1 && excelFile.length < 1" type="primary" class="selectFileBtn"
                  @click="useTxt">
                  <upload-outlined></upload-outlined>
                  txt
                </a-button>
              </a-upload>
              <a-upload v-model:file-list="excelFile" name="file" accept=".xls,.xlsx" :multiple="true"
                :before-upload="beforeUploadExcel" :headers="headers" :showUploadList="true" :withCredentials="true"
                :disabled="loading">
                <a-button v-if="excelFile.length < 1 && txtFile.length < 1" type="primary" class="selectFileBtn"
                  @click="useExcel">
                  <upload-outlined></upload-outlined>
                  Excel
                </a-button>
              </a-upload>
            </div>
          </div>
          <div class="output-block" :rows="4" :data="tags">
            <a-tag v-if="tags.tag" prop="tags.tag" color="purple">{{ tags.tag }}</a-tag>
            <a class="file-address" v-if="tags.pos" prop="tags.pos" :href="'http://'+tags.pos" :download="'http://'+tags.pos" target="_blank">http://{{ tags.pos }}</a>
            <!-- <a class="file-address" v-if="tags.pos" prop="tags.pos" href="#" :download="'http://'+tags.pos" target="_blank">http://{{ tags.pos }}</a> -->
          </div>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer class="footer">
      <div class="welcome">
        Welcome to
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<script>
  import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'
  import { message } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import axios from '../utils/axios'

  export default defineComponent({
    name: 'Index',
    components: {
      UploadOutlined
    },
    setup() {
      const state = reactive({
        inputText: '',
        typeNum: '',
        uploadType: '0',
        fileType: ''
      })

      const tags = reactive({
        tag: '',
        pos: ''
      });

      const txtFile = ref([]);

      const excelFile = ref([]);

      const loading = ref(false);

      const useText = (val) => {
        if (state.uploadType) {
          state.uploadType = '0';
          tags.tag = '';
          tags.pos = '';
          // console.log('文字')
        }
      }

      const useFile = (val) => {
        if (state.uploadType) {
          state.uploadType = '1';
          tags.tag = '';
          tags.pos = '';
          // console.log('文字')
        }
      }

      const useTxt = (val) => {
        state.fileType = '1';
      }

      const useExcel = (val) => {
        state.fileType = '2';
      }

      // Txt上传前
      const beforeUploadTxt = (file) => {
        console.log('file', file);

        // 获取图片地址
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          // console.log('e.target', e.target)
          file.path = e.target.result;
          console.log('url', file.path)
          txtFile.value = [file];
        };
        return false;
      }

      // Txt上传
      const handleUploadTxt = () => {
        console.log('txt', txtFile.value[0]);
        console.log('type', state.typeNum);

        if (!txtFile.value.length) {
          console.log('Please upload first');
          return;
        }
        // 使用formData格式传递参数
        let params = new FormData();
        params.append('txt', txtFile.value[0]);
        params.append('type', state.typeNum);

        loading.value = true;

        try {
          axios.post('/upload_txt', params).then((res) => {
            console.log(res)
            const Datas = res.data.pos;
            tags.pos = Datas;
            console.log('pos', tags.pos)
            getFile()
            if (state.typeNum === '0') {
              console.log('Mal Success!')
            } else if (state.typeNum === '1') {
              console.log('Kananda Success!')
            } else if (state.typeNum === '2') {
              console.log('Tamil Success!')
            }
          })
        } catch (err) {
          console.log(err);
        } finally {
          loading.value = false;
        }
      }

      // Excel上传前
      const beforeUploadExcel = (file) => {
        console.log('file', file);

        // 获取图片地址
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          // console.log('e.target', e.target)
          file.path = e.target.result;
          console.log('url', file.path)
          excelFile.value = [file];
        };
        return false;
      }

      // 上传
      const handleUploadExcel = () => {
        console.log('file', excelFile.value[0]);
        console.log('type', state.typeNum);

        if (!excelFile.value.length) {
          console.log('Please upload first');
          return;
        }
        // 使用formData格式传递参数
        let params = new FormData();
        params.append('file', excelFile.value[0]);
        params.append('type', state.typeNum);

        loading.value = true;

        try {
          axios.post('/upload_excel', params).then((res) => {
            console.log(res)
            const Datas = res.data.pos;
            tags.pos = Datas;
            // console.log('pos', tags.pos)
            getFile()
            if (state.typeNum === '0') {
              console.log('Mal Success!')
            } else if (state.typeNum === '1') {
              console.log('Kananda Success!')
            } else if (state.typeNum === '2') {
              console.log('Tamil Success!')
            }
          })
        } catch (err) {
          console.log(err);
        } finally {
          loading.value = false;
        }
      }

      const mal = (val) => {
        state.typeNum = '0';
        console.log('state.fileType', state.fileType)
        if (state.inputText && state.uploadType === '0') {
          getTags();
        } else if (state.fileType === '1') {
          handleUploadTxt();
        } else if (state.fileType === '2') {
          handleUploadExcel();
        }
      }

      const kananda = (val) => {
        state.typeNum = '1';
        if (state.inputText && state.uploadType === '0') {
          getTags();
        } else if (state.fileType === '1') {
          handleUploadTxt();
        } else if (state.fileType === '2') {
          handleUploadExcel();
        }
      }

      const tamil = (val) => {
        state.typeNum = '2';
        if (state.inputText && state.uploadType === '0') {
          getTags();
        } else if (state.fileType === '1') {
          handleUploadTxt();
        } else if (state.fileType === '2') {
          handleUploadExcel();
        }
      }

      const getTags = (val) => {
        if (state.inputText) {
          // console.log('text', state.inputText)
          let params = new FormData();
          // 测试用例
          // params.append('text', 'Film nodidmele ee song ge addict aadavaru like maadinYalllrigu thanks for 1000 likes');
          // params.append('type', '2');
          params.append('text', state.inputText);
          params.append('type', state.typeNum);
          axios.post('/single', params).then((res) => {
            console.log(res.data)
            const Datas = res.data;
            tags.tag = Datas;
            // console.log('tags', tags.tag)
            // ElMessage.success('修改成功')
            if (state.typeNum === '0') {
              console.log('Mal Success!')
            } else if (state.typeNum === '1') {
              console.log('Kananda Success!')
            } else if (state.typeNum === '2') {
              console.log('Tamil Success!')
            }
          })
        }
      }

      const txtChange = info => {
        if (info.file.status !== 'uploading') {
          // txtFile = info.file;
          console.log(info.file, info.txtFile);
        }

        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }

      const excelChange = info => {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.excelChange);
        }

        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }

      return {
        size: ref('large'),
        // ...toRefs(state),
        // ...toRefs(tags),
        state,
        tags,
        loading,
        txtFile,
        excelFile,
        useFile,
        useText,
        useTxt,
        useExcel,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        txtChange,
        excelChange,
        mal,
        kananda,
        tamil,
        beforeUploadTxt,
        beforeUploadExcel,
        handleUploadTxt,
        handleUploadExcel
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
    z-index: 9999;
  }

  .malBtn {
    /* margin-left: 45px; */
    margin-left: 3.49vw;
  }

  .ant-input[disabled] {
    background-color: #fff;
  }

  /* footer */
  .welcome {
    text-align: right;
    margin-top: 6.67vh;
    margin-right: 17.5vw;
    color: #C4C4C4;
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
    width: 27.92vw !important;
    height: 29.81vh !important;
    border-radius: 35px !important;
    padding: 20px;
    margin-top: -16px;
    margin-left: -4px;
  }

  .ant-input:hover {
    border-color: #791DCC !important;
    z-index: 1000;
  }

  .ant-input::selection {
    background: #715DD2 !important;
  }

  .upload-block {
    position: relative;
    background-color: #fff;
    width: 27.92vw;
    height: 29.81vh;
    margin-top: -16px;
    margin-left: -4px;
    border-radius: 35px !important;
    padding: 20px;
    border: 1px solid rgb(228, 228, 228);
  }

  .upload-block:hover {
    border: 1px solid #791DCC;
    opacity: 1;
    z-index: 1000 !important;
  }

  /* .msgTitle {
    margin-top: 14px;
    margin-left: 7px;
    color: rgba(8, 8, 8, 0.92);
  }

  .msgContent {
    margin-left: 29px;
    color: rgba(8, 8, 8, 0.92);
  } */

  .selectFileInput {
    display: none;
  }

  .selectFileBtn {
    width: 148px;
    height: 47px;
    /* margin-top: 12px; */
    margin-top: 3vh;
    /* margin-left: 56px; */
    margin-left: 6vw;
  }

  .output-block {
    background-color: #fff;
    width: 24.58vw;
    height: 20vh;
    border-radius: 35px !important;
    padding: 20px;
    position: relative;
    margin-top: -57px;
    margin-left: 22.14vw;
    border: 1px solid rgb(228, 228, 228);
  }

  .output-block:hover {
    border: 1px solid #791DCC;
  }

  .file-address {
    color: #791DCC;
    word-wrap: break-word;
  }
</style>