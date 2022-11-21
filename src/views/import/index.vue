<template>
  <UploadExcel :on-success="onSuccess" />
</template>

<script>
import { addEmployeeByXlsx } from '@/api/employee'
export default {
  methods: {
    async onSuccess(data) {
      try {
        // console.log('最终的数据是', data)
        // 但是得到的数据是中文的，我们需要把数据改造成英文的
        const newData = data.results.map((item) => {
          return this.zhToEn(item)
        })
        await addEmployeeByXlsx(newData)
        this.$message.success('批量导入员工成功！')
        // 导入成功后要后退一个页面
        this.$router.back(1)
      } catch (error) {
        this.$message.error('出错了，请检查是否导入成功！')
      }
    },
    zhToEn(data) {
      return {
        // 其中日期需要格式化一下
        timeOfEntry: '2022-11-15',
        username: data['姓名'],
        workNumber: data['工号'],
        mobile: data['手机号'],
        correctionTime: '2022-12-18',
        formOfEmployment: '1',
        departmentName: '总裁办'
      }
    }

  }
  // beforeUpload(data) {
  //   console.log(data)
  // }
}
</script>

<style>

</style>
