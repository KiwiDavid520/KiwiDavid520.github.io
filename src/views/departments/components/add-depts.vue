<template>
  <el-dialog :title="formData.id?'编辑部门':'新增部门'" :visible="isShowDialog" @close="closeDialog">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>

      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>

      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in employeeList " :key="item.id" :value="item.username">{{ item.username }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="sureBtn">确定</el-button>
        <el-button size="small" @click="closeDialog">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getSimpleList } from '@/api/employee'
import { addNewDepts, getDeptsDetailById, editDeptsById, getDepartmentList } from '@/api/departments'
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    },
    nodeData: {
      type: Object,
      required: true
    }
  },
  data() {
    const checkCode = async(rule, value, callback) => {
      // 编写效验逻辑
      // 首先拿到部门列表
      const { depts } = await getDepartmentList()
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts.some(item => {
          return item.code === value && item.id !== this.formData.id
        })
      } else {
        isRepeat = depts.some(item => {
          return item.code === value
        })
      }

      if (isRepeat) {
        callback(new Error('部门编码重复,全公司部门编码都是唯一的'))
        this.$message.error('部门编码重复,全公司部门编码都是唯一的')
      } else {
        // 成功
        callback()
      }
    }

    const checkName = async(rule, value, callback) => {
      const { depts } = await getDepartmentList()
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts.some(item => {
          return item.name === value && item.id !== this.formData.id
        })
      } else {
        isRepeat = depts.some(item => {
          return item.name === value
        })
      }

      if (isRepeat) {
        callback(new Error('部门名称重复,全公司部门名称都是唯一的'))
        this.$message.error('部门名称重复,全公司部门名称都是唯一的')
      } else {
        // 成功
        callback()
      }
    }
    return {
      formData: {
        code: '',
        introduce: '',
        manager: '',
        name: ''
      },
      employeeList: [],
      rules: {
        name: [
          {
            required: true, message: '请输入部门名称', trigger: 'blur'
          },
          {
            min: 3, max: 10, message: '部门名称长度在3-10', trigger: 'blur'
          },
          {
            validator: checkName, trigger: 'blur'
          }
        ],
        code: [
          {
            required: true, message: '请输入部门编码', trigger: 'blur'
          },
          {
            validator: checkCode, trigger: 'blur'
          }
        ],
        manager: {
          required: true, message: '请选择部门负责人', trigger: 'blur'
        },
        introduce: {
          required: true, message: '请对部门进行介绍', trigger: 'blur'
        }
      }
    }
  },

  async created() {
    const res = await getSimpleList()
    console.log(res)
    this.employeeList = res
  },
  methods: {
    async sureBtn() {
      await this.$refs.ruleForm.validate()
      if (this.formData.id) {
        // 是编辑
        await editDeptsById(this.formData)
        // console.log(res, 111111111111111)
        this.$message.success('更新部门成功')
        this.$emit('isShowChange', false)
      } else {
        // 是新增
        this.formData = {
          ...this.formData,
          pid: this.nodeData.id
        }
        const res = await addNewDepts(this.formData)
        console.log(res)
        this.$message.success('添加部门成功')
        this.$emit('isShowChange', false)
      }
    },
    closeDialog() {
      this.formData = {
        code: '',
        introduce: '',
        manager: '',
        name: ''
      }
      this.$refs.ruleForm.resetFields()
      this.$emit('isShowChange', false)
    },
    async getDeptsDetail(nodeData) {
      console.log(nodeData)
      // this.formData = nodeData
      const res = await getDeptsDetailById(nodeData.id)
      // console.log(res, 1111111)
      this.formData = res
    }
  }
}
</script>

<style>

</style>
