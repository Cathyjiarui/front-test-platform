<template>
  <el-form :inline="inline" :model="form" ref="form" label-width="100px" size="mini" :rules="rules" :isok="isOk">
    <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label" :prop="item.model">
      <el-input v-model="form[item.model]" :placeholder="'请输入' + item.label" v-if="!item.type"></el-input>
      <el-input v-model="form[item.model]" :placeholder="'请输入' + item.label" v-if="item.type === 'textarea'"></el-input>
      <el-input v-model="form[item.model]" :placeholder="'请输入' + item.label" v-if="item.type === 'password'" autocomplete="off" :type="item.type"></el-input>
      <el-select v-model="form[item.model]" placeholder="请选择" v-if="item.type === 'select'" @change="change($event)">
        <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-switch v-model="form[item.model]" v-if="item.type === 'switch'"></el-switch>
      <el-date-picker v-model="form[item.model]" type="date" placeholder="选择日期" v-if="item.type === 'date'">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'CommonForm',
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array,
    rules: Object,
    isOk : Boolean
  },
  methods:{
    change($event){
      // console.log('item',$event)
      this.$emit('change',$event)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>