<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before" class="total">共{{ total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" style="width: 33%;" @click="imprtEmployee">导入</el-button>
          <el-button size="small" type="danger" style="width: 33%;" @click="exportEmployee">导出</el-button>
          <el-button size="small" type="primary" style="width: 33%;" @click="isShow = true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="list" :lazy="true" height="460">
          <el-table-column label="序号" type="index" :index="customIndex" align="center" />
          <el-table-column label="姓名" prop="username" align="center" />
          <el-table-column label="工号" prop="workNumber" align="center" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formatterMethod" align="center" />
          <el-table-column label="部门" prop="departmentName" align="center" />
          <el-table-column label="入职时间" align="center">
            <template v-slot="{row}">
              {{ row.timeOfEntry | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" prop="enableState" align="center">
            <template v-slot="scoped">

              <!-- {{ scoped.row.enableState }} -->
              <el-switch
                v-model="scoped.row.enableState"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="2"
                :disabled="true"
              />

            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280" align="center">
            <template #default="scoped">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployee(scoped.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">

          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :hide-on-single-page="value"
            :page-size="pageConfig.size"
            @prev-click="prevClick"
            @next-click="nextClick"
            @current-change="currentChange"
          />
        </el-row>

      </el-card>
      <AddEmployee :is-show="isShow" @closeDialog="closeDialog" />
    </div>
  </div>
</template>

<script>
import { getDetailList, deleteEmployeeById } from '@/api/employee'
import EmployeeEnume from '@/api/constant/employees'
import AddEmployee from './components/AddEmployee'
import { export_json_to_excel } from '@/vendor/Export2Excel'
export default {
  components: {
    AddEmployee
  },
  data() {
    return {
      pageConfig: {
        page: 1,
        size: 8
      },
      list: [],
      total: 0,
      value: false,
      isShow: false

    }
  },
  async created() {
    this.getList()
  },
  methods: {
    // 封装获取员工列表方法
    async getList() {
      const { rows, total } = await getDetailList(this.pageConfig)
      this.list = rows.map(item => {
        const date = new Date()
        return {
          ...item,
          timeOfEntryCompany: date.toString(),
          enableState: 1
        }
      })
      this.total = total
    },
    // 分页器上一页触发事件
    prevClick(newPage) {
      this.pageConfig.page--
      this.getList()
    },
    // 分页器下一页触发事件
    nextClick() {
      this.pageConfig.page++
      this.getList()
    },
    // 用户选择某一页触发
    currentChange(newPage) {
      // console.log(newPage)
      this.pageConfig.page = newPage
      this.getList()
    },

    // 格式化某一列内容
    formatterMethod(row, column, cellValue) {
      // 这种将所有可能性列举出来方法叫做枚举，当然js中是没有枚举的数据格式的
      //
      // const hireType = [
      //   { id: 1, value: '长期合同工' },
      //   { id: 2, value: '临时工' }
      // ]
      const res = EmployeeEnume.hireType.find(item => Number(item.id) === Number(cellValue))
      // const res = undefined

      return res ? res.value : '未知形式'
    },

    customIndex(index) {
      return (this.pageConfig.page - 1) * this.pageConfig.size + index + 1
    },
    // 删除员工
    async deleteEmployee(id) {
      await this.$confirm('确定删除该员工吗?')
      await deleteEmployeeById(id)
      this.$message.success('删除成功')
      this.getList()
      this.pageConfig.page--
    },
    closeDialog() {
      this.isShow = false
    },
    imprtEmployee() {
      this.$router.push('/import')
      this.$message.success('请导入文件')
    },
    toArr(arr) {
      const header = []
      const data = []

      // 首先拿到头部
      for (const item in arr[0]) {
        header.push(item)
      }
      // console.log(header)
      arr.forEach(item => {
        data.push(Object.values(item))
      })
      console.log(data)
      return [header, data]
    },
    async exportEmployee() {
      // 拿到所有的员工（传参数）
      const { rows } = await getDetailList({ page: 1, size: this.total })
      // await getDetailList({ page: 1, size: this.total })
      const arr = this.toArr(rows)

      export_json_to_excel({
        header: arr[0],
        data: arr[1]
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.total{
  cursor: pointer;
}
</style>
