<template>
  <div class="app-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <!-- <ImgUpload />
    这里是首页 -->
    <el-card style="margin-bottom:8px;">
      <!-- 头像 -->
      <el-row type="flex" justify="front" align="middle">
        <el-row>
          <el-col>
            <img ref="imgavera" v-fiximg="defaultImg" class="imgavera" src="http://hr-picture-1315259797.cos.ap-guangzhou.myqcloud.com/0d7f-izmihnt7905464.jpg" alt="">
          </el-col>
        </el-row>
        <el-row style="margin-left:20px;">
          <el-col :span="24">
            <el-row style="margin-bottom:10px;">
              <span class="textone" style="font-weight:700"> {{ $t("message.你好") }}，{{ name }} ，{{ $t("message.欢迎进入公司系统") }}，{{ $t("message.愿您开心每一天!") }}</span>
            </el-row>
            <el-row>
              <span class="texttwo"> {{ userInfo.username }} | {{ userInfo.departmentName }}</span>
            </el-row>
          </el-col>
        </el-row>
      </el-row>

    </el-card>

    <el-row>
      <el-col :span="12">
        <el-row>
          <el-card class="card-container">
            <!-- 这里有工作日历 -->
            <h2>{{ $t("message.工作日历") }}</h2>
            <hr>
            <el-row type="flex" justify="end">
              <el-col :span="5" style="margin-right:5px;">
                <el-select v-model="year" size="small" @change="dateChange">
                  <el-option v-for="(item,index) in yearArr" :key="index" :label="item " :value="item" />
                </el-select>
              </el-col>
              <el-col :span="5">
                <el-select v-model="month" size="small" @change="dateChange">
                  <el-option v-for="(item,index) in 12" :key="index" :label="item" :value="item" />
                </el-select>
              </el-col>

            </el-row>

            <el-calendar v-model="value" class="cal">
              <template #dateCell="scoped">

                <!-- {{ scoped.date }} -->
                <span class="day">{{ scoped.data.day | dayFilter }}</span>
                <span v-if="scoped.date.getDay()===0||scoped.date.getDay()===6" class="rest">{{ $t("message.休") }}</span>

              </template>
            </el-calendar>

          </el-card>
        </el-row>

        <el-row>
          <el-card class="card-container">
            <h2>{{ $t("message.公司新闻") }}</h2>
            <hr>
            <div class="advContent">
              <div class="contentItem">
                <ul class="noticeList">
                  <li>
                    <div class="item">
                      <img src="@/assets/common/img.jpeg" alt="">
                      <div>
                        <p><span class="col">朱继柳</span> 发布了 第1期“传智大讲堂”互动讨论获奖名单公布</p>
                        <p>2018-07-21 15:21:38</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item">
                      <img src="@/assets/common/img.jpeg" alt="">
                      <div>
                        <p><span class="col">朱继柳</span> 发布了 第2期“传智大讲堂”互动讨论获奖名单公布</p>
                        <p>2018-07-21 15:21:38</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item">
                      <img src="@/assets/common/img.jpeg" alt="">
                      <div>
                        <p><span class="col">朱继柳</span> 发布了 第3期“传智大讲堂”互动讨论获奖名单公布</p>
                        <p>2018-07-21 15:21:38</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-card class="card-container">
            <h2>{{ $t("message.系统访问数据") }}</h2>
            <hr>
            <div ref="ridar" style="height:400px;color:black !important;margin-top: 45px;" />
          </el-card>
        </el-row>
        <el-row>
          <el-card class="card-container box-card">
            <h2>{{ $t("message.人事招聘业绩统计") }}</h2>
            <hr>
            <div ref="yeji" style="height:400px;margin-top: 45px;" />
          </el-card>
        </el-row>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'

export default {
  name: 'Dashboard',
  filters: {
    dayFilter(val) {
      return val.split('-')[2]
    }
  },
  data() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    return {
      defaultImg: 'http://hr-picture-1315259797.cos.ap-guangzhou.myqcloud.com/0d7f-izmihnt7905464.jpg',
      userInfo: {},
      value: new Date(),
      year: year,
      month: month,
      yearArr: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      date2: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'staffPhoto'
    ])
  },

  created() {
    // this.userInfo = this.$store
    this.userInfo = this.$store.state.user.userInfo
    // console.log(this.value)
    console.log(this.month)
  },
  mounted() {
    this.$refs.imgavera.src = this.staffPhoto

    // 访问量部分   因为echart需要使用到dom，但是第一次获取dom只能在mounted阶段
    const chartDom = this.$refs.ridar
    const myChart = echarts.init(chartDom)
    const option = {

      textStyle: {
        fontSize: 16
      },
      legend: {
        data: ['Allocated Budget', 'Actual Spending']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '正式员工访问量', max: 6500 },
          { name: '管理人员访问量', max: 16000 },
          { name: '工资模块访问量', max: 30000 },
          { name: '社保模块访问量', max: 38000 },
          { name: '考勤模块访问量', max: 52000 },
          { name: '审批模块访问量', max: 25000 }
        ]
      },
      series: [
        {
          // name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [6200, 10000, 25000, 35000, 50000, 18000]
              // name: 'Allocated Budget'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000]
              // name: 'Actual Spending'
            }
          ]
        }
      ]
    }
    option && myChart.setOption(option)

    // 业绩部分
    const chartDomt = this.$refs.yeji
    const myChartt = echarts.init(chartDomt)
    const optiont = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Boss直聘', '智联招聘', '58人才网', '本地人才招聘（社招）', '实习僧']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Boss直聘',
          type: 'line',
          stack: 'Total',
          data: [10, 20, 30, 40, 45, 40, 30]
        },
        {
          name: '智联招聘',
          type: 'line',
          stack: 'Total',
          data: [7, 19, 17, 26, 30, 32, 31]
        },
        {
          name: '58人才网',
          type: 'line',
          stack: 'Total',
          data: [8, 22, 1, 4, 19, 30, 10]
        },
        {
          name: '本地人才招聘（社招）',
          type: 'line',
          stack: 'Total',
          data: [30, 32, 30, 4, 9, 30, 0]
        },
        {
          name: '实习僧',
          type: 'line',
          stack: 'Total',
          data: [17, 5, 18, 9, 12, 15, 13]
        }
      ]
    }
    optiont && myChartt.setOption(optiont)

    // 翻译日历的头部
    const dom = document.querySelectorAll('thead th')
    console.log(dom)
    for (const k in this.date2) {
      dom[k].innerHTML = this.date2[k]
      dom[k].style.fontSize = '16px'
      dom[k].style.fontWeight = '700'
      if (k >= 5) {
        // console.log(1111111)
        dom[k].style.color = 'red'
      }
    }
  },
  methods: {
    dateChange() {
      this.value = new Date(`${this.year}-${this.month}-1`)
    }
  }

}
</script>

<style lang="scss" scoped>

.bigbox{
  text-overflow: ellipsis
}
.imgavera{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.textone{
  // margin-bottom: 15px;
  font-size: 25px;
  font-weight: normal;
}
.texttwo{
  font-size: 20px;
  font-weight: normal;
  color: gray;
}
hr{
  border-top: none;
  border-color: black;
  border-left: none;
  border-right: none;
}
::v-deep .el-calendar__header{
  display: none;
}

::v-deep .el-calendar-table .el-calendar-day{
  height: 50px;
  font-size: 20px;
}
::v-deep .el-calendar-table{
  text-indent: 0em;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
}
::v-deep .el-calendar-table td{
  border: none;
}

.rest{
  margin-left: 10px;
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: orange;
  font-size: 2px;
  line-height: 18px;
  vertical-align: middle;
  color: white;
}
::v-deep .el-calendar-table td.is-selected{
  background-color: #ccc;
}

.card-container h2,span{

  text-align: center;

}
.advContent {
  background: #fff;
  border-radius: 5px 5px 0px 0px;
  .title {
    font-size: 16px;
    padding: 20px;
    font-weight: bold;
    border-bottom: solid 1px #ccc;
  }
  .contentItem {
    padding: 0 30px;
    min-height: 350px;
    .item {
      display: flex;
      padding:18px 0 10px;
      border-bottom: solid 1px #ccc;
      .col {
        color: #8a97f8;
      }
      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-right: 10px;
      }
      p{
        padding: 0 0 8px;
      }
    }
  }
}
li{
  list-style: none;
}

h2{
  font-size: 25px;
}

</style>
