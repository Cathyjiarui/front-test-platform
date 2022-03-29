<template>
  <div class="testCase">
    <common-table :table-label="tableLabel" :table-data="tableData" :config="config"
                  :is-show-table="isShowTable" :right-width="rightWidth" @apiDelete="apiDelete" @apiTest="apiTest">
    </common-table>
  </div>
</template>
<script>
import CommonTable from "@/components/CommonTable";
import {
  getApiList,
  delApiById
} from '@/api/apiTest'

export default {
  components: {
    CommonTable
  },
  data() {
    return {
      isShowTable: true,
      rightWidth: '260',
      tableData: [],
      config: {
        page: 1,
        total: 1,
        size: 10,
        loading: false
      },
      tableLabel: [
        {
          prop: 'is_implement',
          label: '执行',
          width: 50
        },
        {
          prop: 'case_serial',
          label: '用例编号',
          width: 80
        },
        {
          prop: 'case_name',
          label: '用例名称',
          width: 120
        },
        {
          prop: 'module_name',
          label: '模块名称',
          width: 80
        },
        {
          prop: 'request_type',
          label: '类型',
          width: 80
        },
        {
          prop: 'api_address',
          label: '地址',
          width: 260
        },
        {
          prop: 'request_parameter',
          label: '参数',
          width: 120
        },
        {
          prop: 'response_text',
          label: '预期响应信息',
          width: 100
        }
      ],
    }
  },
  methods: {
    async getList() {
      let result = await getApiList(this.$store.state.token, this.config.page, this.config.size)
      if (result.data.code === 0) {
        this.tableData = result.data.data.rows;
        this.tableData.forEach(item => {
          //修改执行列显示内容
          if (item.is_implement === 1) {
            item.is_implement = '是'
          } else {
            item.is_implement = '否'
          }
          //修改类型模块显示内容
          switch (item.request_type) {
            case 1:
              item.request_type = 'GET';
              break;
            case 2:
              item.request_type = 'POST';
              break;
            case 3:
              item.request_type = 'PUT';
              break;
            case 4:
              item.request_type = 'DELETE';
              break;
            default:
              item.request_type = '--';
              break;
          }
          item.type = 'api';
        })

      }
    },
    apiDelete(row) {
      this.$confirm('删除后无法找回，确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await delApiById(this.$store.state.token, row.id)
        if (result.data.code === 0) {
          this.$message({
            type: 'info',
            message: '删除成功'
          });
          this.getList();
        } else {
          this.$message({
            type: 'info',
            message: '删除失败'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    apiTest(row) {

    },
  },
  created() {
    this.getList();
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/testCase.scss";
</style>
<style lang="scss">
.el-table .warning-row {
  background: #F39800;
}
</style>