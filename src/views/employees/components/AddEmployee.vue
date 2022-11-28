<template>
  <el-dialog title="新增员工" :visible="isShow" @close="closeDialog">
    <el-form ref="form" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:90%" placeholder="请输入新员工的姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:90%" placeholder="请输入新员工的手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:90%" placeholder="请选择新员工的入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:90%" placeholder="请选择新员工的聘用形式">
          <el-option v-for="item in employeeEnum.hireType" :key="item.id" :value="item.id" :label="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:90%" placeholder="请输入新员工的工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input ref="whichDepts" v-model="formData.departmentName" style="width:90%" placeholder="请选择新员工被分配的部门" @focus="showTree=true" />
        <el-tree
          v-if="showTree"
          :data="depts"
          :props="{label:'name'}"
          default-expand-all
          @node-click="nodeClick"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:90%" placeholder="请选择新员工的转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="closeDialog">取消</el-button>
          <el-button type="primary" size="small" @click="sureToSubmit">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import employeeEnum from '@/api/constant/employees'
import { getDepartmentList } from '@/api/departments'
import { listToTreeData } from '@/utils/index'
import { addEmployee } from '@/api/employee'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showTree: false,
      deptsList: [],
      employeeEnum,
      // 表单数据
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      // 表单的验证规则
      rules: {
        username: [
          { required: true, message: '请输入新员工的姓名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入新员工的手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的11位的手机号码格式', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择新员工的入职时间', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '请选择新员工的聘用形式', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '请输入新员工的工号', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '请选择新员工被分配的部门', trigger: 'blur' }
        ],
        correctionTime: [
          { required: true, message: '请选择新员工的转正时间', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    const { depts } = await getDepartmentList()
    // 整理树形结构方便渲染
    this.depts = listToTreeData(depts, '')
  },
  methods: {
    async sureToSubmit() {
      // 先效验
      await this.$refs.form.validate()
      // 发送请求
      try {
        await addEmployee(this.formData)
        this.$message.success('操作成功！')
        this.closeDialog()
        this.$parent.getList()
      } catch (error) {
        console.log(error)
      }
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.form.resetFields()
    },
    nodeClick(data) {
      this.formData.departmentName = data.name
      this.showTree = false
    },

    closeDialog() {
      this.showTree = false
      this.$emit('closeDialog')
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }

      this.$refs.form.resetFields()
    },
    ifShowTree() {
      console.log(1111)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree{
  position: absolute;
  border: 1px solid #ccc;
  z-index: 999;
  width: 90%;
  height: 160px;
  overflow:auto
}
</style>
