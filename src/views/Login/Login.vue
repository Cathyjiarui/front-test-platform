<template>
  <div class="login" v-on:keyup.enter="submitForm">
    <common-form class="loginForm" :form-label="loginFormLabel" :form="loginForm" ref="commonForm" :rules="loginRules"
                 :is-ok="isOk">
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </common-form>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import {loginApi} from "@/api/getData";

export default {
  components: {
    CommonForm
  },
  data() {
    return {
      isOk: false,
      loginForm: {
        name: '',
        pwd: ''
      },
      loginFormLabel: [
        {
          model: 'name',
          label: '用户名'
        },
        {
          model: 'pwd',
          label: '密码',
          type: 'password'
        }
      ],
      loginRules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {pattern: /^[a-zA-Z0-9]{5,32}$/, message: '用户名长度为5-32个字符'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.commonForm.$refs['form'].resetFields();
    },
    submitForm() {
      //判断是否符合验证条件，符合将isOk设置为true
      this.$refs.commonForm.$refs['form'].validate((valid) => {
        if (valid) {
          this.isOk = true
        }
      })
      if (this.isOk) {
        //恢复isOk设置
        this.isOk = false
        //发送登录请求
        loginApi(this.loginForm.name, this.loginForm.pwd).then(res => {
          if (res.data.code === 0) {
            localStorage.setItem('token', res.data.data);
            localStorage.setItem('user_name',this.loginForm.name)
            this.$store.dispatch('setToken', res.data.data)
            this.$store.dispatch('setUserName',this.loginForm.name)
            this.$notify({
              title: '',
              message: '登录成功',
              showClose: false,
              duration: 1000,
              type: 'success',
              onClose: () => {
                //跳转⻚⾯, 根据业务需要
                this.$router.push({path: '/main'})
              }
            });
          } else {
            this.$notify.error({
              title: '错误',
              message: '用户名或密码错误',
              showClose: false,
              duration: 1000,
              offset: 10,
              onClose: () => {
                this.$refs.commonForm.$refs['form'].resetFields();
              }
            });
          }
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '登录失败',
          showClose: false,
          duration: 1000,
          offset: 10,
          onClose: () => {
            this.$refs.commonForm.$refs['form'].resetFields();
          }
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/login.scss";
</style>