<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :http-request="httpRrequest"
      :before-upload="beforeUpload"
      :on-change="onChange"
      :class="{hasImg:fileList.length>0}"
    >
      <i class="el-icon-plus" />

    </el-upload>
    <!-- 进度条 -->
    <el-progress
      v-show="percentShow"
      :text-inside="true"
      :stroke-width="22"
      :percentage="percent"
      style="width: 150px;"
    />
    <el-dialog
      title="
      图片预览"
      :visible="isShow"
      style="height:750px"
      @close="isShow=false"
    >
      <el-row type="flex" justify="center">
        <img :src="picSrc" alt="" class="addImg">
      </el-row>

    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDpX9aopbC7jEagigbQ9jBYinmcFjTGvQj',
  SecretKey: 'CBxUrhOxKWWNF3g9OTPzPj9QYVFk3A5m'
})
export default {
  data() {
    return {
      fileList: [],
      isShow: false,
      picSrc: '',
      percent: 0,
      percentShow: false
    }
  },
  methods: {
    // 点击放大镜时触发的钩子
    onPreview(data) {
      // console.log(data)
      this.isShow = !this.isShow
      this.picSrc = data.url
    },
    // 移除文件时触发的钩子
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    // 覆盖原始的上传行为action
    httpRrequest(params) {
      cos.putObject({
        Bucket: 'hr-picture-1315259797', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-guangzhou', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: params.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: (progressData) => {
          console.log(JSON.stringify(progressData))
          this.percent = progressData.percent * 100

          // 不要立刻结束，用户体验不好
          if (progressData.percent === 1) {
            setTimeout(() => {
              this.percentShow = false
            }, 1500)
          }
        }
      }, (err, data) => {
        // 这是上传成功后的回调函数
        console.log(err || data)
        if (!err) {
          this.fileList[0].url = 'http://' + data.Location
          this.fileList[0].status = 'success'
        }
      })
    },

    // 文件上传前的钩子
    beforeUpload(file) {
      const arr = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png']

      if (!arr.includes(file.type)) {
        this.$message.error('图片格式不符合，目前只支持jpeg、jpg、gif、png 图片格式')
        return false
      }

      const size = 1024 * 1024 * 1024
      if (file.size > size) {
        this.$message.error('图片的大小不能超过1M')
        return false
      }

      this.percentShow = true
    },
    // 文件列表改变时触发的钩子
    onChange(file, fileList) {
      this.fileList = fileList
    }
  }
}
</script>

<style lang="scss" scoped>
.hasImg{
  ::v-deep .el-upload--picture-card{
  display:none;
 }
}
::v-deep img{
  display: block;
  object-fit: cover;
  width: 100%;
  height: 400px;
}
</style>
