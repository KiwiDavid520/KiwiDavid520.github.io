<template>
  <div class="app-container">
    <el-card style="margin-bottom:5px;">
      <el-row type="flex" align="middle" justify="end">
        <!-- <el-col :span="18">
          <el-row type="flex" justify="front" style="font-size:20px">根节点操作</el-row>
        </el-col> -->
        <el-col :span="4">
          <el-button type="primary" style="width:100%;font-size: 20px;" @click="addPermissionWithNoPid">添加权限</el-button>
        </el-col>

      </el-row>

    </el-card>
    <el-card>

      <!-- <hr style="border-bottom:none"> -->
      <el-table
        :data="permissionList"
        row-key="id"
        border
        :tree-props="{children: 'children'}"
        height="560"
        highlight-current-row="true"
        style="cursor: pointer;"
      >
        <el-table-column label="权限名称" prop="name" align="center" />
        <el-table-column label="权限标记" prop="code" align="center" />
        <el-table-column label="权限描述" prop="description" align="center" />
        <el-table-column label="权限操作" align="center">
          <template v-slot="scoped">
            <el-button v-if="scoped.row.type===1" type="text" size="small" @click="addPermission(scoped.row.id)">添加权限</el-button>
            <el-button type="text" size="small" @click="updatePermission(scoped.row.id)">编辑权限</el-button>
            <el-button type="text" size="small" @click="deletePermission(scoped.row.id)">删除权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="permissionType==='0'||'1'?'添加权限':'更新权限'" :visible="isShow" @close="cancelBtn">
      <el-form ref="ruleForm" :model="formData" label-width="100px" :rules="rules">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入权限名称" />
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="formData.description" placeholder="请输入权限描述" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item label="权限激活状态">
          <el-switch
            v-model="formData.enVisible"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-button @click="cancelBtn">取消</el-button>
          <el-button type="primary" @click="sureBtn">确定</el-button>
        </el-row>

      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, getPermissionDetailById, updatePermissionDetailById, addNewPermission, deletePermissionById } from '@/api/permission'
export default {
  data() {
    return {
      formData: {
        enVisible: '', // 是否激活权限，在别的页面想要有这个权限的时候是否能够看到 1 为激活   0为禁用
        name: '',
        code: '',
        description: '',
        type: '', // 权限层级。第一层为1，第二层为2
        pid: ''
      },
      permissionList: [],
      isShow: false,
      permissionType: '0', // 0代表是添加权限，1代表是更新权限
      id: '',
      // 数据效验规则
      rules: {
        name: [
          {
            required: true, message: '请输入权限名称', trigger: 'blur'
          }
        ],
        description: [
          { required: true, message: '请输入权限描述', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入权限标识', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.permissionList = await getPermissionList()
      // 将数据再转化成树形结构
      this.permissionList = this.listToTree(this.permissionList, '0')
      console.log(this.permissionList)
    },
    listToTree(list, pid) {
      const newArr = []
      list.forEach((item) => {
        if (item.pid === pid) {
          item.children = this.listToTree(list, item.id)
          newArr.push(item)
        }
      })
      return newArr
    },
    async addPermission(id) {
      this.permissionType = '0'
      this.id = id
      this.isShow = !this.isShow
    },
    cancelBtn() {
      this.isShow = false
      // 这里还需要把表单清空
      this.formData = {
        enVisible: '', // 是否激活权限，在别的页面想要有这个权限的时候是否能够看到 1 为激活   0为禁用
        name: '',
        code: '',
        description: '',
        type: '', // 权限层级。第一层为1，第二层为2
        pid: ''
      }
      this.resetForm()
    },
    async sureBtn() {
      if (this.permissionType === '2') {
        // 首先进行表单验证
        await this.$refs.ruleForm.validate()
        try {
          await updatePermissionDetailById(this.formData)
          this.$message.success('更新成功')
          this.cancelBtn()
          this.getPermissionList()
          // 重置表单验证
          this.resetForm()
        } catch (error) {
          this.$message.success(error)
          this.cancelBtn()
        }
      } else if (this.permissionType === '0') {
        // 其他情况就是添加权限,其中permissionType 为0和1时都是添加权限。0是作为无pid的添加权限。1是由pid的添加权限。
        try {
          // 首先进行表单验证
          await this.$refs.ruleForm.validate()
          await addNewPermission({
            ...this.formData,
            pid: this.id,
            type: 2
          })
          this.id = '0'
          this.$message.success('添加权限点成功')
          this.cancelBtn()
          this.getPermissionList()
          // 重置表单验证
          this.resetForm()
        } catch (error) {
          this.$message.success(error)
          this.cancelBtn()
        }
      } else {
        try {
          // 首先进行表单验证
          await this.$refs.ruleForm.validate()
          // 发送请求
          await addNewPermission({
            ...this.formData,
            pid: '0',
            type: 1
          })
          // console.log(res)
          // 提示用户
          this.$message.success('添加权限点成功')
          // 关闭弹窗
          this.cancelBtn()
          this.getPermissionList()
          // 重置表单验证
          this.resetForm()
        } catch (error) {
          console.log(error)
          this.$message.error('添加权限点失败')
        }
      }
    },
    async updatePermission(id) {
      this.permissionType = '2' // 决定窗口的标题显示
      this.formData = await getPermissionDetailById(id)
      this.isShow = true
    },
    addPermissionWithNoPid() {
      this.permissionType = '1'
      this.isShow = true
    },
    // 删除权限点
    async deletePermission(id) {
      // 先提示是否确定要删除
      await this.$confirm('确定要删除吗？该操作不可逆！')
      await deletePermissionById(id)
      this.getPermissionList()
    },
    // 重置表单验证
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
