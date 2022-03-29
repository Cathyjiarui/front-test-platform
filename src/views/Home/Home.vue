<template>
  <div class="testCase">
    <el-dialog :title="operateType === 'add' ? '新增故事' : '更新故事'" :visible.sync="isShow" :show-close="false">
      <common-form :form-label="operateFormLabel" ref="commonForm" :form="operateForm"
                   :is-ok="isOk"></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exit">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="testCase-header">
      <el-button type="primary" @click="addTestCase">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary" @click="getList">查询</el-button>
      </common-form>
    </div>
    <common-table :table-label="tableLabel" :table-data="tableData" :config="config"
                  :is-show-table="isShowTable" @changePage="getList" @testReceive="testReceive"
                  @testReturn="testReturn" @testImportant="testImportant" @testCancel="testCancel"
                  @testOver="testOver" @testEdit="testEdit" @testGitAddress="testGitAddress" :right-width="rightWidth">
    </common-table>
  </div>
</template>
<script>
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable";
import {
  getNotOverTestCase,
  updateTestCaseReceive,
  updateTestCaseIsImportant,
  testCaseOver,
  updateTestCase,
  insertTestCaseOver,
  findTestCaseByAssociationStoryPoint
} from '@/api/getData'

export default {
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      isShowTable: true,
      rightWidth: '370',
      operateType: 'add',
      isShow: false,
      isOk: false,
      operateForm: {},
      operateFormLabel: [
        {
          model: 'story_content',
          label: '故事内容',
        },
        {
          model: 'association_story_point',
          label: '故事编号',
        },
        {
          model: 'git_address',
          label: 'Git地址'
        }
      ],
      tableData: [],
      tableLabel: [
        {
          prop: 'create_time',
          label: '提测时间',
          width: 110
        },
        {
          prop: 'story_content',
          label: '任务内容',
          width: 530
        },
        {
          prop: 'user_name',
          label: '测试员',
          width: 80
        },
        {
          prop: 'association_story_point',
          label: '任务编号',
          width: 100
        }
      ],
      config: {
        page: 1,
        total: 1,
        size: 10,
        loading: false
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ],
      searchFrom: {
        keyword: ''
      }
    }
  },
  methods: {
    async getList() {
      try {
        this.tableData = []
        this.config.loading = true
        if (this.searchFrom.keyword) {
          let result = await findTestCaseByAssociationStoryPoint(this.$store.state.data.token, this.searchFrom.keyword)
          if (result.data.code === 0) {
            this.tableData.push(result.data.data)
            this.tableData.forEach(item => {
              item.type = 'test'
            })
            this.searchFrom.keyword = ''
          }
        } else {
          let result = await getNotOverTestCase(this.$store.state.data.token, this.config.page, this.config.size)
          if (result.data.code === 0) {
            this.tableData = result.data.data.rows.map(item => {
              item.user_name = item.receive === 0 ? '未领取' : item.user_name;
              return item
            })
            this.tableData.forEach(item => {
              item.type = 'test'
            })
            this.config.total = result.data.data.total;
          }
        }
        this.config.loading = false
      } catch (e) {
        console.log(`getList`, e)
      }
    },
    testReceive(row) {
      this.$confirm('确定领用吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(async () => {
        try {
          let result = await updateTestCaseReceive(this.$store.state.data.token, row.id, '1', this.$store.state.data.user_name)
          if (result.data.code === 0) {
            this.$notify({
              title: '',
              message: '领用成功',
              duration: 1000,
              type: 'success',
              onClose: () => {
                location.reload()
              }
            });
          } else {
            this.$notify.error({
              title: '',
              message: '领用失败',
              duration: 1000,
              onClose: () => {
                this.config.page = 1
                this.getList()
              }
            });
          }
        } catch (e) {
          console.log(`testReceive`, e)
        }
      }).catch(() => {
        this.config.page = 1
        this.getList()
      });
    },
    testReturn(row) {
      this.$confirm('确定退回吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          let result = await updateTestCaseReceive(this.$store.state.data.token, row.id, '0', '')
          if (result.data.code === 0) {
            this.$notify({
              title: '',
              message: '退回成功',
              duration: 1000,
              type: 'success',
              onClose: () => {
                location.reload()
              }
            });
          } else {
            this.$notify.error({
              title: '',
              message: '退回失败',
              duration: 1000,
              onClose: () => {
                this.config.page = 1
                this.getList()
              }
            });
          }
        } catch (e) {
          console.log(`testReturn`, e)
        }
      }).catch(() => {
        this.config.page = 1
        location.reload()
      });
    },
    async testImportant(row) {
      try {
        let result = await updateTestCaseIsImportant(this.$store.state.data.token, row.id, '1')
        if (result.data.code === 0) {
          this.$notify({
            title: '',
            message: '更新成功',
            duration: 1000,
            type: 'success',
            onClose: () => {
              location.reload()
            }
          });
        } else {
          this.$notify.error({
            title: '',
            message: '更新失败',
            duration: 1000,
            onClose: () => {
              this.config.page = 1
              this.getList()
            }
          });
        }
      } catch (e) {
        console.log(`testImportant`, e)
      }
    },
    async testCancel(row) {
      try {
        let result = await updateTestCaseIsImportant(this.$store.state.data.token, row.id, '0')
        if (result.data.code === 0) {
          this.$notify({
            title: '',
            message: '更新成功',
            duration: 1000,
            type: 'success',
            onClose: () => {
              location.reload()
            }
          });
        } else {
          this.$notify.error({
            title: '',
            message: '更新失败',
            duration: 1000,
            onClose: () => {
              this.config.page = 1
              this.getList()
            }
          });
        }
      } catch (e) {
        console.log(`testCancel`, e)
      }
    },
    testOver(row) {
      this.$confirm('确定结束吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          let result = await testCaseOver(this.$store.state.data.token, row.id, '1')
          if (result.data.code === 0) {
            this.$notify({
              title: '',
              message: '已结束',
              duration: 1000,
              type: 'success',
              onClose: () => {
                location.reload()
              }
            });
          } else {
            this.$notify.error({
              title: '',
              message: '结束失败',
              duration: 1000,
              onClose: () => {
                this.config.page = 1
                this.getList()
              }
            });
          }
        } catch (e) {
          console.log(`testOver`, e)
        }
      }).catch(() => {
        this.config.page = 1
        location.reload()
      });
    },
    testGitAddress(row) {
      window.open(row.git_address, '_blank')
      location.reload()
    },
    async confirm() {
      try {
        switch (this.operateType) {
          case "add": {
            let result = await insertTestCaseOver(this.$store.state.data.token, this.operateForm.story_content,
                this.operateForm.association_story_point, this.operateForm.git_address)
            if (result.data.code === 0) {
              this.$notify({
                title: '',
                message: '插入成功',
                duration: 1000,
                type: 'success',
                onClose: () => {
                  location.reload()
                }
              });
            } else {
              this.$notify.error({
                title: '',
                message: '插入失败',
                duration: 1000,
                onClose: () => {
                  this.config.page = 1
                  this.getList()
                }
              });
            }
            this.isShow = false;
            break;
          }
          case 'edit': {
            let result = await updateTestCase(this.$store.state.data.token, this.operateForm.id, this.operateForm.story_content,
                this.operateForm.association_story_point, this.operateForm.git_address)
            if (result.data.code === 0) {
              this.$notify({
                title: '',
                message: '更新成功',
                duration: 1000,
                type: 'success',
                onClose: () => {
                  location.reload()
                }
              });
            } else {
              this.$notify.error({
                title: '',
                message: '更新失败',
                duration: 1000,
                onClose: () => {
                  this.config.page = 1
                  this.getList()
                }
              });
            }
            this.isShow = false;
            break;
          }
          default:
            break;
        }
      } catch (e) {
        console.log(`confirm`, e)
      }
    },
    testEdit(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    addTestCase() {
      this.operateType = 'add'
      this.operateForm = {}
      this.isShow = true
    },
    exit() {
      this.isShow = false
      this.getList()
      this.$refs.commonForm.$refs['form'].clearValidate()
    }
  },
  created() {
    this.getList()
  },
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