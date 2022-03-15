<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" v-loading="config.loading" :row-class-name="tableRowClassName">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (config.page - 1) * config.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label"
                       :width="item.width ? item.width : 125">
        <template slot-scope="scope">
          <span>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" :width="rightWidth">
        <template slot-scope="scope">
          <el-button size="mini" @click="userEdit(scope.row)" v-show="scope.row.type === 'user'">编辑</el-button>
          <el-button size="mini" type="danger" @click="userDelete(scope.row)" v-show="scope.row.type === 'user'">删除
          </el-button>
          <el-button size="mini" type="success" @click="testReceive(scope.row)" plain
                     v-show="scope.row.type === 'test' && scope.row.receive === 0 && scope.row.test_over === 0">领取
          </el-button>
          <el-button size="mini" type="success" @click="testReturn(scope.row)" plain
                     v-show="scope.row.type === 'test' && scope.row.receive === 1 && scope.row.test_over === 0">退回
          </el-button>
          <el-button size="mini" type="primary" @click="testEdit(scope.row)" plain
                     v-show="scope.row.type === 'test' && scope.row.test_over === 0">编辑
          </el-button>
          <el-button size="mini" type="danger" @click="testOver(scope.row)" plain
                     v-show="scope.row.type === 'test' && scope.row.test_over === 0">结束
          </el-button>
          <el-button size="mini" type="warning" @click="testImportant(scope.row)" plain
                     v-show="scope.row.type === 'test' && scope.row.is_important === 0 && scope.row.test_over === 0">重要
          </el-button>
          <el-button size="mini" type="warning" @click="testCancel(scope.row)" plain
                     v-show="scope.row.type === 'test' && scope.row.is_important === 1 && scope.row.test_over === 0">取消
          </el-button>
          <el-button size="mini" type="info" @click="testGitAddress(scope.row)" plain
                     v-show="scope.row.type === 'test'">Git地址
          </el-button>
          <el-button size="mini" type="success" @click="animalImage(scope.row)" v-show="scope.row.type === 'animal'">形象</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pager" layout="total, prev, pager, next" :total="config.total"
                   :current-page.sync="config.page"
                   :page-size="config.size" @current-change="changePage" :hide-on-single-page="isShowTable" background>
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
    isShowTable: Boolean,
    rightWidth: String
  },
  methods: {
    userEdit(row) {
      this.$emit('edit', row)
    },
    userDelete(row) {
      this.$emit('del', row)
    },
    tableRowClassName(row) {
      // console.log(row.row.is_important)
      if (row.row.is_important) {
        return 'warning-row'
      }
      return ''
    },
    testReceive(row) {
      this.$emit('testReceive', row)
    },
    testReturn(row) {
      this.$emit('testReturn', row)
    },
    testImportant(row) {
      this.$emit('testImportant', row)
    },
    testCancel(row) {
      this.$emit('testCancel', row)
    },
    testOver(row) {
      this.$emit('testOver', row)
    },
    testGitAddress(row) {
      this.$emit('testGitAddress', row)
    },
    testEdit(row) {
      this.$emit('testEdit', row)
    },
    changePage(page) {
      this.$emit('changePage', page)
    },
    animalImage(row){
      this.$emit('animalImage',row)
    }
  },
}
</script>

<style lang="scss" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #FFF;
  position: relative;

  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>