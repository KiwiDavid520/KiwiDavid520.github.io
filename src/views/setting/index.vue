<template>
  <div class="page-wrapper">
    <el-card>

      <el-tabs>
        <el-tab-pane label="角色列表">
          <el-button type="primary" class="primarybtn" @click="isShow=true">+新增角色</el-button>
          <el-table :data="roleList" border :highlight-current-row="true">
            <el-table-column label="角色名称" prop="name" align="center" />
            <el-table-column label="角色描述" prop="description" align="center" />

            <el-table-column label="操作按钮" align="center">

              <template #default="scope">
                <el-button size="small" type="primary" @click="assignPermission(scope.row.id)">分配权限</el-button>
                <el-button size="small" type="success" @click="editRole(scope.row.id)">编辑</el-button>
                <el-button size="small" type="danger" @click="delateRole(scope.row.id)">删除</el-button>
              </template>

            </el-table-column>

          </el-table>
          <!-- 分页组件，让这个组件独占一行 -->
          <el-row type="flex" justify="center" align="middle" style="height:60px">
            <!-- 分页组件 -->
            <el-pagination
              type="flex"
              layout="prev, pager, next"
              :page-size="pageConfig.pagesize"
              :total="total"

              @current-change="currentChange"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息">
          <el-form style=" margin:30px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="companyInfo.companyPhone" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司备注">
              <el-input v-model="companyInfo.remarks" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      :title="whichName"
      :visible="isShow"
      @close="closeDialog"
    >
      <el-form ref="addRole" :rules="rules" :model="formData">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="formData.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" type="primary" @click="addRole">确认</el-button>
        <el-button size="small" type="danger" @click="cancelAdd">取消</el-button>
      </template>

    </el-dialog>

    <!-- 设置角色权限 -->
    <el-dialog :visible="isShowPermission" title="为角色（岗位）分配权限" @close="btnCancel">

      <el-checkbox-group v-model="checkedPermission">
        <el-checkbox v-for="item in permissionList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>

      <template #footer>
        <el-row type="flex" justify="center">
          <el-button @click="btnCancel">取消</el-button>
          <el-button type="primary" @click="btnOk">确定</el-button>
        </el-row>
      </template>

    </el-dialog>
  </div>
</template>

<script>
import { getCompanyInfo, getRoleList, addNewRole, getDetailById, resetRoleById, deleteRoleById, assignPermissionForRole } from '@/api/setting'
import { getPermissionList } from '@/api/permission'

export default {
  data() {
    return {
      companyInfo: {},
      pageConfig: {
        page: 1,
        pagesize: 5
      },
      roleList: [],
      total: 0,
      isShow: false,
      formData: {
        name: '',
        description: '',
        id: ''
      },
      whichName: '新增角色',
      rules: {
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ]
      },
      isShowPermission: false,
      permissionList: [],
      checkedPermission: [],
      permissionId: ''
    }
  },
  async created() {
    this.companyInfo = await getCompanyInfo(this.$store.state.user.userInfo.companyId)
    console.log(this.companyInfo)

    // 获取角色列表
    // const { rows, total } = await getRoleList(this.pageConfig)
    // this.roleList = rows
    // this.total = total
    // console.log(this.roleList)
    this.getRoleList()
  },
  methods: {
    currentChange(res) {
      // console.log(res)
      this.pageConfig.page = res
      this.getRoleList()
    },
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageConfig)
      this.roleList = rows
      this.total = total
    },
    async addRole() {
      try {
        await this.$refs.addRole.validate()
        if (this.whichName === '新增角色') {
          await addNewRole(this.formData)
          this.isShow = false
          this.formData.name = ''
          this.formData.description = ''
          this.$message.success('添加成功')
          this.getRoleList()
        } else {
          const res = await resetRoleById(this.formData)
          console.log(res)
          this.isShow = false
          this.formData.name = ''
          this.formData.description = ''
          this.$message.success('更新成功')
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      }
    },
    cancelAdd() {
      this.isShow = false
      this.formData.name = ''
      this.formData.description = ''
    },
    closeDialog() {
      this.cancelAdd()
    },
    async editRole(id) {
      this.formData.id = id
      this.whichName = '编辑角色'
      const res = await getDetailById(id)
      console.log(res)
      this.isShow = true
      console.log(id)
      this.formData.name = res.name
      this.formData.description = res.description
    },
    async delateRole(id) {
      await this.$confirm('确认删除?')

      await deleteRoleById(id)
      this.$message.success('删除成功')
      if (this.roleList.length === 1 && this.pageConfig.page !== 1) {
        this.pageConfig.page -= 1
      }
      // window.location.reload()
      this.getRoleList()
    },
    async assignPermission(id) {
      this.permissionId = id
      const res = await getPermissionList()
      const { permIds } = await getDetailById(id)
      // console.log(res1)
      this.permissionList = res
      this.checkedPermission = permIds
      this.isShowPermission = true
    },
    // 发送分配权限请求
    async btnOk() {
      await assignPermissionForRole({
        id: this.permissionId,
        permIds: this.checkedPermission instanceof Array ? this.checkedPermission : []
      })
      this.$message.success('为角色（岗位）分配权限成功')
      this.btnCancel() // 关闭弹窗
      this.getRoleList()// 重新获取权限列表
    },
    btnCancel() {
      // 清空数据
      this.permissionId = ''
      this.checkedPermission = []
      this.isShowPermission = false
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper{
  margin: 30px;

  .primarybtn{
  width: 100%;
  font-size: 20px;
}
}

</style>
