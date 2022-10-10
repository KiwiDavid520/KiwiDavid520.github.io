<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%;">
    <el-col>
      <strong v-if="isCompany">{{ nodeData.name }}</strong>
      <span v-else>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ nodeData.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown>
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="addDepts">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isCompany">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isCompany&&nodeData.pid!==''" @click.native="delateDepts(nodeData)">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    nodeData: {
      type: Object,
      required: true
    },
    isCompany: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addDepts() {
      console.log('添加按钮被点击')
      this.$emit('addDepts', this.nodeData)
    },
    delateDepts(data) {
      this.$emit('delateDepts', this.nodeData)
    }
  }
}
</script>

<style>

</style>
