<template>
  <div style="height: 100%" ref="echarts">
    echarts
  </div>
</template>
<script>
import ECharts from 'echarts'

export default {
  props: {
    chartsData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        }
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }
  },
  watch: {
    chartsData: {
      handler: function () {
        this.initChart()
      },
      deep: true
    },
    isCollapse(){
      setTimeout(() => {
        this.resizeChart()
      },300)
    }
  },
  data() {
    return {
      echarts: null,
      axisOption: {
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '20%'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089'
        ],
        series: []
      },
      normalOption: {
        tooltip: {
          trigger: 'item'
        },
        color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
        series: []
      }
    }
  },
  methods: {
    initChart() {
      this.initChartData()
      if (this.echarts) {
        this.echarts.setOption(this.options);
      } else {
        this.echarts = ECharts.init(this.$refs.echarts)
        this.echarts.setOption(this.options)
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartsData.xData
        this.axisOption.series = this.chartsData.series
      } else {
        this.normalOption.series = this.chartsData.series
      }
    },
    resizeChart() {
      this.echarts ? this.echarts.resize() : ''
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeChart)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeChart)
  }
}
</script>
<style lang="scss" scoped></style>