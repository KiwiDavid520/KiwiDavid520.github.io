<template>
  <div class="app-container">
    <!-- {{ $route.params.id }}-->
    <el-card>
      <el-tabs>
        <el-tab-pane label="登录账户设置">

          <!-- 放置表单 -->
          <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
            <el-form-item label="姓名:" prop="username">
              <el-input v-model="formData.username" style="width:300px" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input v-model="formData.password" style="width:300px" type="password" placeholder="请输入密码" status-icon="true" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:300px" @click="updateInfo">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情">
          <UserInfo />
        </el-tab-pane>
        <el-tab-pane label="岗位信息">
          <JobInfo />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getDetailInfo, saveUserDetailById } from '@/api/user'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {

      UserInfo,
      formData: {
        username: '',
        password: ''
      },
      userId: this.$route.params.id,
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { max: 10, message: '长度不能超过十位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    // const res = await getDetailInfo(this.userId)
    // this.formData.username = res.username
    // this.formData.password = res.password
    this.formData = {
      ...await getDetailInfo(this.userId),
      password: ''
    }
  },
  methods: {

    // 更新某个员工信息
    async updateInfo() {
      await this.$refs.ruleForm.validate()
      await saveUserDetailById(this.formData)
      this.$message.success('更新成功')
    }

  }
}
</script>

<style>

</style>
