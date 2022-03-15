<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow" :show-close="false">
      <common-form :form-label="operateFormLabel" :form="operateForm" ref="commonForm" :rules="userRules"
                   :is-ok="isOk"></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exit">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary" @click="getList">查询</el-button>
      </common-form>
    </div>
    <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList"
                  @edit="editUser" @del="delUser" :is-show-table="isShowTable" :right-width="rightWidth"></common-table>
  </div>
</template>
<script>
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable"
import {getUserListApi, addUserApi, updateUserApi, deleteUserApi} from "@/api/getData";
import {isInArray} from "@/api/publicMethod";

export default {
  components: {
    CommonTable,
    CommonForm
  },
  data() {
    return {
      operateType: 'add',
      rightWidth: '180',
      isShow: false,
      isShowTable: true,
      isOk: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '用户名'
        },
        {
          prop: 'mail_box',
          label: '邮箱',
          width: 270
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'department',
          label: '部门',
          width: 200
        },
        {
          prop: 'position',
          label: '职位',
          width: 200
        }
      ],
      config: {
        page: 1,
        total: 1,
        size: 10,
        loading: false
      },
      operateForm: {
        id: '',
        name: '',
        pwd: '',
        mail_box: '',
        age: '',
        department: '',
        position: ''
      },
      operateFormLabel: [
        {
          model: 'name',
          label: '用户名'
        },
        {
          model: 'mail_box',
          label: '邮箱'
        },
        {
          model: 'age',
          label: '年龄'
        },
        {
          model: 'department',
          label: '部门'
        },
        {
          model: 'position',
          label: '职位'
        }
      ],
      userRules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {pattern: /^[a-zA-Z0-9]{5,32}$/, message: '用户名长度为5-32个字符'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {pattern: /^[a-zA-Z]\w{5,17}$/, message: '密码规则以字母开头，长度在6~18之间，只能包含字母、数字和下划线'}
        ],
        mail_box: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '邮箱格式错误'
          }
        ],
        age: [
          {required: true, message: '请输入年龄', trigger: 'blur'},
          {pattern: /(^[0-9]{1,2}$)/, message: '年龄必须是整数且最多2位'}
        ],
        department: [
          {required: true, message: '请输入部门', trigger: 'blur'},
          {min: 0, max: 128, message: '部门最长为128个字符', trigger: 'blur'},
        ],
        position: [
          {required: true, message: '请输入职位', trigger: 'blur'},
          {min: 0, max: 128, message: '职位最长为128个字符', trigger: 'blur'},
        ]
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ],
      searchFrom: {
        keyword: ''
      },
    }
  },
  methods: {
    async getList() {
      try {
        this.searchFrom.keyword ? (this.config.page = 1) : ''
        this.config.loading = true
        let result = await getUserListApi(this.$store.state.data.token, this.config.page, this.config.size, this.searchFrom.keyword)
        if (result.data.code === 0) {
          result = result.data.data;
          this.tableData = result.rows;
          this.config.total = result.total;
          this.tableData.forEach(item => {
            item.type = 'user'
          });
        } else {
          return null
        }
      } catch (e) {
        console.log('getList', e)
      } finally {
        this.config.loading = false
        this.searchFrom.keyword = ''
      }
    },
    editUser(row) {
      this.operateType = 'edit'
      if (isInArray(this.operateFormLabel, 'pwd')) {
        this.operateFormLabel.splice(this.operateFormLabel.length - 1, 1)
      }
      this.isShow = true
      this.operateForm = row
    },
    async confirm() {
      try {
        if (this.operateType === 'edit') {
          //判断是否符合验证条件，符合将isOk设置为true
          this.$refs.commonForm.$refs['form'].validate((valid) => {
            if (valid) {
              this.isOk = true
            }
          })
          if (this.isOk) {
            let result = await updateUserApi(this.$store.state.data.token, this.operateForm.id, this.operateForm.name,
                this.operateForm.mail_box, this.operateForm.age, this.operateForm.department, this.operateForm.position)
            if (result.data.code === 0) {
              this.$notify({
                title: '',
                message: '更新成功',
                duration: 1000,
                type: 'success',
                onClose: () => {
                  this.isShow = false
                  this.getList()
                }
              });
            } else {
              this.$notify.error({
                title: '',
                message: '更新失败',
                duration: 1000,
                onClose: () => {
                  this.isShow = false
                  this.config.page = 1
                  this.getList()
                }
              });
            }
            this.isOk = false
          }
        } else {
          //判断是否符合验证条件，符合将isOk设置为true
          this.$refs.commonForm.$refs['form'].validate((valid) => {
            if (valid) {
              this.isOk = true
            }
          })
          if (this.isOk) {
            let result = await addUserApi(this.$store.state.data.token, this.operateForm.name, this.operateForm.mail_box,
                this.operateForm.age, this.operateForm.department, this.operateForm.position, this.operateForm.pwd)
            if (result.data.code === 0) {
              this.$notify({
                title: '',
                message: '添加成功',
                duration: 1000,
                type: 'success',
                onClose: () => {
                  this.isShow = false
                  this.config.page = 1
                  this.getList()
                }
              });
            } else {
              this.$notify.error({
                title: '',
                message: '添加失败',
                duration: 1000,
                onClose: () => {
                  this.isShow = false
                  this.config.page = 1
                  this.getList()
                }
              });
            }
            this.isOk = false;
          }
        }
      } catch (e) {
        console.log(`confirm`, e)
      }
    },
    delUser(row) {
      try {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let id = row.id
          let result = await deleteUserApi(this.$store.state.data.token, id)
          if (result.data.code === 0) {
            this.$notify({
              title: '',
              message: '删除成功',
              duration: 1000,
              type: 'success',
              onClose: () => {
                location.reload()
              }
            });
          } else {
            this.$notify.error({
              title: '',
              message: '删除失败',
              duration: 1000,
              onClose: () => {
                this.config.page = 1
                this.getList()
              }
            });
          }
        }).catch(() => {
          this.config.page = 1
          this.getList()
        });
      } catch (e) {
        console.log(`delUser`,e)
      }
    },
    addUser() {
      if (!isInArray(this.operateFormLabel, 'pwd')) {
        this.operateFormLabel.push({
          model: 'pwd',
          label: '密码',
          type: 'password'
        })
      }
      this.operateForm = {}
      this.operateType = 'add'
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
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/common.scss";
</style>