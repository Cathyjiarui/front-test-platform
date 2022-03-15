<template>
  <div>
    <el-divider content-position="left">数据加解密</el-divider>
    <common-form :form-label="encryptionAndDecryptionFormLabel" :form="encryptionAndDecryptionForm"></common-form>
  </div>
</template>
<script>
import CommonForm from "@/components/CommonForm";

export default {
  components: {
    CommonForm
  },
  data() {
    return {
      encryptionAndDecryptionForm: {
        name: '',
        pwd: ''
      },
      encryptionAndDecryptionFormLabel: [
        {
          model: 'name',
          label: '用户名',
          type: 'textarea'
        },
        {
          model: 'pwd',
          label: '密码',
          type: 'textarea'
        }
      ]
    }
  },
}
</script>
<style lang="scss" scoped>

</style>