<template>
  <div>
    <div class="request-wrapper">
      <div>{{msg}}</div>
      <el-button @click="axiosGet">request</el-button>
      <el-button @click="jsonGet">json</el-button>
    </div>
    <div class="upload-wrapper">
      <div class="upload-view">
        <img
          class="img-src"
          src="http://localhost:8888/showImage"
        />
      </div>
      <div class="upload-view">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/toUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
        >
          <el-button
            size="small"
            type="primary"
          >点击上传</el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import axios from 'axios'
import VueRouter from 'vue-router'

@Component({
  components: {}
})
export default class AxiosView extends Vue {
  msg = 'empty'
  fileList: Array<any> = []

  @Watch('msg')
  msgChanged(val: string) {
    console.info(val)
  }

  @Watch('fileList')
  fileListChanged() {
    console.info(this.fileList)
  }

  get reverseList() {
    return this.fileList.reverse()
  }

  jsonGet() {
    axios
      .get('https://echarts.apache.org/examples/data/asset/geo/HK.json?callback')
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }
  axiosGet() {
    console.info(this)
    axios({
      method: 'get',
      url: 'http://localhost:8888/start',
      // withCredentials: true,
      // params: {
      //   ID: 12345678
      // },
      // responseType: 'text',
      data: {
        userId: 12345
      }
    })
      .then(response => {
        // handle success
        this.msg = response.data
      })
      .catch(error => {
        // handle error
        this.msg = error
      })
      .finally(function() {
        // always executed
        console.info('finally')
      })
  }

  handleRemove(file: any, fileList: Array<any>) {
    console.log(file, fileList)
    this.fileList = fileList
  }
  handlePreview(file: any) {
    console.log(file)
  }
  handleExceed(files: any, fileList: Array<any>) {
    this.$message.warning(
      `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
        fileList.length} 个文件`
    )
  }
  beforeRemove(files: any, fileList: Array<any>) {
    return this.$confirm(`确定移除 ？` + files + fileList)
  }

  beforeRouteLeave(to: VueRouter, from: VueRouter, next: Function) {
    console.info('离开本页面beforeRouteLeave', to, from, this)
    next()
  }
}
</script>
<style lang="less">
.img-src {
  width: 200px;
  height: 30px;
}

.upload-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
