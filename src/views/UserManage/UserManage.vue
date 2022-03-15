<template>
  <el-row class="userManage" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg"/>
          <div class="userinfo">
            <p class="name">{{ userName }}</p>
            <p class="access">{{ userPosition }}</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2020-10-20</span></p>
          <p>上次登录地点：<span>北京</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 522px; margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column show-overflow-tooltip v-for="(val, key) in tableLabel" :key="key" :prop="key"
                           :label="val"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card shadow="hover" v-for="item in countData" :key="item.name" :body-style="{display: 'flex', padding: 0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <EChart style="height: 280px" :charts-data="echartsData.order"></EChart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <EChart style="height: 260px" :charts-data="echartsData.user"></EChart>
        </el-card>
        <el-card shadow="hover">
          <EChart style="height: 260px" :charts-data="echartsData.video" :is-axis-chart="false"></EChart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import EChart from "@/components/EChart";
import {getUserByToken} from "@/api/getData"
export default {
  components: {
    EChart
  },
  data() {
    return {
      userImg: require('@/assets/images/user.png'),
      userName: '',
      userPosition: '',
      countData: [
        {
          name: '今日新增缺陷',
          value: 1234,
          icon: 'hot-water',
          color: '#2EC7C9'
        },
        {
          name: '系统模块数量',
          value: 2102,
          icon: 'sugar',
          color: '#FFB980'
        },
        {
          name: '今日新增用例',
          value: 3213,
          icon: 'grape',
          color: '#5AB1EF'
        },
        {
          name: '历史遗留缺陷',
          value: 1234,
          icon: 'hot-water',
          color: '#2EC7C9'
        },
        {
          name: '本月收藏订单',
          value: 2102,
          icon: 'sugar',
          color: '#FFB980'
        },
        {
          name: '系统用例总数',
          value: 3213,
          icon: 'grape',
          color: '#5AB1EF'
        }
      ],
      tableData: [],
      tableLabel: {
        name: '模块',
        todayBuy: '日缺陷',
        monthBuy: '月缺陷',
        totalBuy: '总缺陷'
      },
      echartsData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  methods: {
    getTableData() {
      this.$http.get('/userManage/getData').then(res => {
        res = res.data
        // console.log(res)
        this.tableData = res.data.tableData
        //订单折线图
        const order = res.data.orderData
        this.echartsData.order.xData = order.date
        //step1：取出series中的name部分 - 键名
        let orderKeyArray = Object.keys(order.data[0])
        //step2；循环读取data的值
        orderKeyArray.forEach(key => {
          this.echartsData.order.series.push({
            name: key === 'wechat' ? '小程序' : key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })
        //用户柱状图
        this.echartsData.user.xData = res.data.userData.map(item => item.date)
        this.echartsData.user.series.push({
          name: '新增缺陷',
          data: res.data.userData.map(item => item.new),
          type: 'bar'
        })
        this.echartsData.user.series.push({
          name: '未解决缺陷',
          data: res.data.userData.map(item => item.active),
          type: 'bar',
          barGap: 0
        })
        // 视频饼图
        this.echartsData.video.series.push({
          data: res.data.videoData,
          type: 'pie'
        })
      })
    }
  },
  created() {
    this.getTableData()
    getUserByToken(this.$store.state.data.token).then(res => {
      if (res.data.code === 0) {
        let userData = res.data.data
        this.userImg = userData.head_img
        this.userName = userData.name
        this.userPosition = userData.position
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/userManage.scss";
</style>