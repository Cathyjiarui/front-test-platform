<template>
  <div>
    <span>月度报表</span>
    <el-divider></el-divider>
    <div id="monthlyReport" style="width:70%;height:278px;margin-left: 15%;margin-top: 20px">
    </div>
  </div>
</template>
<script>
import {
  annualReport
} from '@/api/getData'

export default {
  data() {
    return {
      monthlyReport: '',
      moon: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      moonData: [],
      annualReportData: {}
    }
  },
  mounted: function () {
    this.drawLine1()
  },
  methods: {
    async drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      this.monthlyReport = this.$echarts.init(document.getElementById('monthlyReport'))
      let result = await annualReport(this.$store.state.data.token)
      if (result.data.code === 0) {
        this.annualReportData = result.data.data
        for(let i in this.moon){
          this.moonData.push(this.annualReportData[this.moon[i]])
        }
      }
      // 绘制图标
      this.monthlyReport.setOption({
        xAxis: {
          data: this.moon
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: this.moonData
          }
        ]
      });
    }
  }
}
</script>
<style lang="scss" scoped>

</style>