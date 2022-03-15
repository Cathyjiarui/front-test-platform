<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <CommonAside></CommonAside>
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader></CommonHeader>
      </el-header>
      <CommonTab></CommonTab>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonHeader from "@/components/CommonHeader";
import CommonAside from "@/components/CommonAside";
import CommonTab from "@/components/CommonTab";
export default {
  components: {
    CommonHeader,
    CommonAside,
    CommonTab
  },
  created() {
    this.$router.push({path: '/home'})
  }
}
</script>
<style lang="scss" scoped>
.el-header{
  background-color: #333;
}
</style>