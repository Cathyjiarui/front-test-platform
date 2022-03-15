<template>
  <div class="animal">
    <div class="animal-header">
      <common-form inline :formLabel="formLabel" :form="searchFrom" @change="change">
        <el-button type="primary" @click="getList">查询</el-button>
      </common-form>
    </div>
    <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList"
                  :is-show-table="isShowTable" :right-width="rightWidth" @animalImage="animalImage"></common-table>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable";
import {getAnimalListApi} from "@/api/getData"

export default {
  name: "animal",
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      isShowTable: true,
      rightWidth: '180',
      config: {
        page: 1,
        total: 1,
        size: 20,
        loading: false
      },
      formLabel: [
        {
          type: 'select',
          options: [
            {
              label: '普通',
              value: 'ordinary'
            },
            {
              label: '悠闲',
              value: 'leisurely'
            },
            {
              label: '运动',
              value: 'movement'
            },
            {
              label: '暴躁',
              value: 'irritable'
            },
            {
              label: '元气',
              value: 'vitality'
            },
            {
              label: '成熟',
              value: 'mature'
            },
            {
              label: '自恋',
              value: 'narcissism'
            },
            {
              label: '大姐姐',
              value: 'bigSister'
            }
          ]
        }
      ],
      searchFrom: {
        keyword: ''
      },
      tableData: [],
      tableLabel: [
        {
          prop: 'animal_name',
          label: '动物名称'
        },
        {
          prop: 'amiibo_id',
          label: 'amiibo序号'
        },
        {
          prop: 'sex',
          label: '性别'
        },
        {
          prop: 'race',
          label: '种族'
        },
        {
          prop: 'disposition',
          label: '性格'
        },
        {
          prop: 'birthday',
          label: '生日'
        },
        {
          prop: 'gift_one',
          label: '推荐礼物1'
        },
        {
          prop: 'gift_two',
          label: '推荐礼物2'
        },
        {
          prop: 'gift_three',
          label: '推荐礼物3'
        },
        {
          prop: 'gift_four',
          label: '推荐礼物4'
        },
        {
          prop: 'favorite_song',
          label: '喜爱歌曲'
        },
        {
          prop: 'favorite_colour',
          label: '喜爱颜色'
        }
      ]
    }
  },
  methods: {
    async getList() {
      try {
        this.searchFrom.keyword ? (this.config.page = 1) : ''
        this.config.loading = true;

        let result = await getAnimalListApi(this.config.page, this.config.size, this.searchFrom.keyword);
        if (result.data.code === 0) {
          result = result.data.data
          this.tableData = result.rows;
          this.tableData.forEach(item => {
            item.sex = item.sex === 1 ? '男' : '女';
            item.type = 'animal';
          })
          this.config.page = result.page;
          this.config.total = result.total;
          this.config.size = result.size;
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
    animalImage(row) {
      const h = this.$createElement;
      this.$msgbox({
        title: '形象',
        message: h('p', null, [
          h('img', {style: 'width: 330px; height: 438px; background-image: url(' + row.img_url + ');'})
        ]),
        confirmButtonText: '确定',
        beforeClose: (action, instance, done) => {
          done()
        }
      }).then();
    },
    change($event) {
      switch ($event) {
        case 'ordinary':
          this.searchFrom.keyword = '普通';
          break;
        case 'leisurely':
          this.searchFrom.keyword = '悠闲';
          break;
        case 'movement':
          this.searchFrom.keyword = '运动';
          break;
        case 'irritable':
          this.searchFrom.keyword = '暴躁';
          break;
        case 'vitality':
          this.searchFrom.keyword = '元气';
          break;
        case 'mature':
          this.searchFrom.keyword = '成熟';
          break;
        case 'narcissism':
          this.searchFrom.keyword = '自恋';
          break;
        case 'bigSister':
          this.searchFrom.keyword = '大姐姐';
          break;
        default:
          this.searchFrom.keyword = '';
      }
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/animal.scss";
</style>