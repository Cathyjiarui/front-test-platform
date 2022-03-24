<template>
  <div>
    <div id="testStatus" style="width:50%;height:278px;margin-top: 20px">
    </div>
  </div>
</template>
<script>
import {
  testSituation,
  annualReport
} from '@/api/getData'

export default {
  data() {
    return {
      testStatus: '',
      testStatusData: []
    }
  },
  mounted: function () {
    this.drawLine1()
  },
  methods: {
    async drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      this.testStatus = this.$echarts.init(document.getElementById('testStatus'))
      // 绘制图标
      let result = await testSituation(this.$store.state.data.token)
      if (result.data.code === 0) {
        this.testStatusData = result.data.data
      }
      this.testStatus.setOption({
        title: {
          text: '测试现状',
          left: 'center',
          top: 'center'
        },
        series: [
          {
            type: 'pie',
            data: [{
              value: this.testStatusData.test,
              name: '提测'
            },
              {
                value: this.testStatusData.testing,
                name: '测试中'
              }
            ],
            radius: ['40%', '90%']
          }
        ]
      });
    }
  }
}
</script>
<style lang="scss" scoped>

</style>