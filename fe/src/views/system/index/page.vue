<template>
  <d2-container class="page">
    <el-button type="primary" @click="loadTodoList">Load</el-button>
    <d2-page-cover>
      <d2-icon-svg class="logo" name="RDCBDC"/>
      <template slot="footer">
        <d2-badge/>
        <d2-help/>
      </template>
    </d2-page-cover>
  </d2-container>
</template>

<script>
import D2Badge from './components/d2-badge'
import D2Help from './components/d2-help'
import D2PageCover from './components/d2-page-cover'
import { getTodoList } from '@api/bdc-main'
const zlog = console.log.bind(console)

export default {
  components: {
    D2Badge,
    D2Help,
    D2PageCover
  },
  data () {
    return {
      filename: __filename
    }
  },
  mounted() {
  },
  created() {
    this.loadTodoList()
  },
  methods: {
    loadTodoList() {
      let postData = {}
      getTodoList(postData)
        .then(res => {
          zlog('--->loadToList: res: res =', res)
        })
        .catch(err => {

        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  .logo {
    width: 320px;
  }
  .btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    line-height: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    .btn-group__btn {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
      &.btn-group__btn--link {
        color: $color-primary;
      }
    }
  }
}
</style>
