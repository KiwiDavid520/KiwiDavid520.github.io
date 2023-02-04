<template>
  <el-dialog :visible="isShowDialig" title="分配角色" @close="closeDialog">
    <el-checkbox-group v-model="checkedRole">
      <el-checkbox v-for="item in RoleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <el-row type="flex" justify="center">
        <el-button @click.native="cancel">取消</el-button>
        <el-button type="primary" @click.native="btnOk">确定</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getRoleList, assignRole } from '@/api/employee'
import { getDetailInfo } from '@/api/user'
export default {
  props: {
    isShowDialig: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      RoleList: [],
      checkedRole: [],
      id: ''
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 999 })
      this.RoleList = rows
    },
    closeDialog() {
      this.$emit('closeRoleDialog')
    },
    async getRoleInfo(id) {
      this.id = id
      const { roleIds } = await getDetailInfo(id)
      // 经过测试，有null的情况
      this.checkedRole = roleIds instanceof Array ? roleIds : []
    },
    cancel() {
      // 清理数据
      this.id = ''
      this.checkedRole = []
      // 关闭弹窗
      this.closeDialog()
    },
    async btnOk() {
      // 发送请求
      await assignRole({
        id: this.id,
        roleIds: this.checkedRole
      })
      this.$message.success('分配角色成功')
      this.closeDialog()
      // 清空数据
      this.id = ''
      this.checkedRole = []
    }
  }
}
</script>

<style>

</style>
