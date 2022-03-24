<template>
  <div>
    <span>数据加解密</span>
    <el-divider></el-divider>
    <el-row :gutter="100">
      <el-col :span="6">
        <el-input
            type="textarea"
            :rows="10"
            v-model="inputText">
        </el-input>
      </el-col>
      <el-col :span="3">
        <br/><br/>
        <el-button type="primary" @click="enc">加密</el-button>
        <br/><br/><br/><br/><br/>
        <el-button type="primary" @click="dec">解密</el-button>
      </el-col>
      <el-col :span="6">
        <el-input
            type="textarea"
            :rows="10"
            v-model="outputText">
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  encryption,
  decryption
} from '@/api/encryptionAndDecryption'

export default {
  components: {},
  data() {
    return {
      inputText: '',
      outputText: ''
    }
  },
  methods: {
    async enc() {
      try {
        let result = await encryption(this.inputText);
        if (result.data.code === 0) {
          this.outputText = result.data.data;
        } else {
          this.outputText = "加密失败！"
        }
      } catch (e) {
        console.log('log', e)
      }
    },
    async dec() {
      try {
        let result = await decryption(this.inputText);
        if (result.data.code === 0) {
          this.outputText = result.data.data;
        } else {
          this.outputText = "解密失败！"
        }
      } catch (e) {
        console.log('log', e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>