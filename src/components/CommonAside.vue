<template>
  <el-menu
      :collapse="isCollapse"
      default-active="/"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="uniqueOpened">
    <h3 v-show="!isCollapse">测试平台</h3>
    <h3 v-show="isCollapse" style="font-size: 30px"><i class="el-icon-menu"></i></h3>
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu :index="item.label" v-for="(item,index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem,subIndex) in item.children" :key="subIndex"
                      @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          {{ subItem.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  computed: {
    noChildren() {
      return this.asideMenu.filter(item => !item.children)
    },
    hasChildren() {
      return this.asideMenu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  },
  methods: {
    clickMenu(item) {
      this.$router.push({name: item.name})
      this.$store.commit('selectMenu', item)
    }
  },
  data() {
    return {
      uniqueOpened: true,
      asideMenu: [
        {
          path: '/',
          name: 'home',
          label: '测试任务',
          icon: 's-order'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user-solid'
        },
        {
          label: '测试工具',
          icon: 's-tools',
          children: [
            {
              path: '/encryptionAndDecryption',
              name: 'encryptionAndDecryption',
              label: '数据加解密',
              icon: 's-promotion'
            }
          ]
        },
        {
          label: '测试报表',
          icon: 'data-line',
          children: [
            {
              path: '/testingStatus',
              name: 'testingStatus',
              label: '测试现状',
              icon: 'data-line'
            },
            {
              path: '/monthlyReport',
              name: 'monthlyReport',
              label: '月度报表',
              icon: 'data-line'
            }
          ]
        },
        {
          label: '自动化测试',
          icon: 's-opportunity',
          children: [
            {
              path: '/serverManagement',
              name: 'serverManagement',
              label: '接口管理',
              icon: 'service'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.el-menu {
  h3{
    color: #FFFFFF;
    text-align: center;
    line-height: 48px;
  }
  height: 100%;
  border: none;

}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>