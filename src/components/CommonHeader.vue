<template>
  <header>
    <div class="l-content">
      <el-button plain :icon="buttonIcon" size="mini" @click="collapseMenu"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">测试任务</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini" @command="handleCommand">
      <span class="el-dropdown-link">
        <img class="user" :src="userImg"/>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userManage">详情</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import {mapState} from 'vuex'
import {getUserByToken} from '@/api/getData'
export default {
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  data() {
    return {
      userImg: require('../assets/images/user.png'),
      buttonIcon: 'el-icon-s-fold',
      userManage: {
        path: '/userManage',
        name: 'userManage',
        label: '用户详情',
        icon: 'user'
      }
    }
  },
  methods: {
    collapseMenu() {
      this.$store.commit('CollapseMenu')
      if (this.buttonIcon === 'el-icon-s-fold') {
        this.buttonIcon = 'el-icon-s-unfold'
      } else {
        this.buttonIcon = 'el-icon-s-fold'
      }
    },
    handleCommand(command) {
      if (command === 'userManage') {
        this.$router.push({name: this.userManage.name})
        this.$store.commit('selectMenu', this.userManage)
      } else {
        localStorage.setItem('token','')
        this.$store.dispatch('clearToken')
        this.$store.dispatch('clearUserName')
        this.$router.push({ name: 'login'})
      }
    }
  },
  created() {
    getUserByToken(this.$store.state.data.token).then(res => {
      if(res.data.code === 0){
        this.userImg = res.data.data.head_img
      }
    })

  }
}
</script>
<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.el-button{
  padding: 0;
}

.el-button--mini, .el-button--small {
  font-size: 25px;
  //border-radius: 90%;
}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
<style lang="scss">
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #666;
    font-weight: normal;
  }

  &:last-child {
    .el-breadcrumb__inner {
      color: #FFFFFF;
    }
  }
}
</style>