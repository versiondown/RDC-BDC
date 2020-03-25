<template>
  <d2-container class="page">
    <!--<template slot="header"></template>-->
    <div class="bkImg">
      <d2-icon-svg name="promoWorker" class="bkWorker"></d2-icon-svg>
      <h1 class="slogan">Keep IT Simple & Stupid !</h1>
    </div>
    <!--<template slot="footer">Designed by ezhq in China.</template>-->
  </d2-container>
</template>

<script>
  import D2Badge from './components/d2-badge'
  import D2Help from './components/d2-help'
  import D2PageCover from './components/d2-page-cover'
  import {getTodoList} from '@api/bdc-main'

  const zlog = console.log.bind(console)

  export default {
    components: {
      D2Badge,
      D2Help,
      D2PageCover
    },
    data() {
      return {
        filename: __filename
      }
    },
    mounted() {
    },
    created() {
      // this.loadTodoList()
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
    /*border: 2px solid red;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .bkImg {
      /*border: 2px solid limegreen;*/
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .bkWorker {
        /*border: 2px solid blue;*/
        /*min-height: 30%;*/
        width: 60vw;
        /*max-width: 60%;*/
        height: 40vw;
        max-height: 60%;
      }
      .slogan {
        color: rgba(183, 205, 226, 1);
        font-size: 14px;
      }
    }

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
