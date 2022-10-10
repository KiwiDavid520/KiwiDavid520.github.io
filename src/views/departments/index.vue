<template>
  <div class="app-container">
    <el-card class="tree-card">
      <!-- 用了一个行列布局 -->
      <TreeTools :node-data="companyInfo" :is-company="true" />
      <hr>
      <!-- 部门树形结构 -->
      <el-tree :data="depts" :default-expand-all="true" :expand-on-click-node="false" :props="{label:'name'}">

        <template #default="scoped">
          <TreeTools :node-data="scoped.data" :is-company="false" @addDepts="addDepts" @delateDepts="delateDepts" />
        </template>
      </el-tree>
    </el-card>
    <AddDepts :is-show-dialog="isShow" :node-data="nodeData" @isShowChange="turnFalse" />
  </div>
</template>

<script>

import TreeTools from './components/tree-tools.vue'
import { getDepartmentList, delateDeptsById } from '@/api/departments'
import { listToTreeData } from '@/utils/index'
import AddDepts from '@/views/departments/components/add-depts.vue'
export default {
  components: {
    TreeTools,
    AddDepts
  },
  data() {
    return {
      companyInfo: {
        name: '广东菠萝科技有限公司',
        manager: '负责人'
      },
      depts: [],
      isShow: false,
      nodeData: {}
    }
  },
  async created() {
    this.getList()
  },
  methods: {
    async  getList() {
      const { depts } = await getDepartmentList()
      this.depts = listToTreeData(depts, '')
    },
    addDepts(nodeData) {
      this.isShow = !this.isShow
      this.nodeData = nodeData
    },
    async delateDepts(data) {
      await delateDeptsById(data)
      try {
        await this.$confirm('确定删除吗?此操作不可逆！')
        this.$message.success('删除部门成功')
        this.getList()
      } catch (error) {
        console.log(error)
      }
    },
    turnFalse(data) {
      this.isShow = data
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .tree-card {
    padding: 30px  140px;
    font-size:14px;

  .aa{
      cursor: pointer;
    }
  }
  </style>
