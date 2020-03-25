<template>
  <d2-container>
    <template slot="header">

    </template>
    <div class="safeZone">
      <div class="book">
        <div class="bookInfo"></div>
        <div class="bookNote"></div>
      </div>
      <div class="side">
        <div class="ads"></div>
        <div class="list">
          <div
            class="book"
            v-for="(book, index) in ztest.bookList"
            :key="index"
          >
          </div>
        </div>
      </div>
    </div>

    <!--<h1>Hola Alice.</h1>-->
    <!--<el-progress :text-inside="true" :stroke-width="24" :percentage="45" status="success"></el-progress>-->
    <!--<el-button-->
    <!--  type="primary"-->
    <!--  @click="loadBookList">-->
    <!--  使用-->
    <!--</el-button>-->
    <template slot="footer">
      <div class="footer">
        <div class="copyright">
          Designed by <a href="https://www.ezhq.xyz" target="_blank">ezhq</a> in China | Template by <a
          href="https://github.com/d2-projects/d2-admin" target="_blank">D2 Admin</a>
        </div>

      </div>
    </template>
  </d2-container>
</template>

<script>
  import {getBookList} from '@api/epgs/erds/ris'

  const zlog = console.log.bind(console)

  export default {
    components: {},
    data() {
      return {
        zcache: {},
        zdata: {},
        zlist: {},
        ztest: {
          bookList: [
            {
              "id": 1,
              "titleChina": "基地",
              "titleEnglish": "Base",
              "isbn": "N/A",
              "press": "N/A",
              "authorChina": "艾萨克·阿西莫夫",
              "authorEnglish": "Isaac Asimov",
              "timeCreate": 1561382544999,
              "timeUpdate": 1561384397527,
              "progress": "40/200",
              "done": false
            },
            {
              "id": 2,
              "titleChina": "基地 2",
              "titleEnglish": "Base 2",
              "isbn": "N/A",
              "press": "N/A",
              "authorChina": "艾萨克·阿西莫夫",
              "authorEnglish": "Isaac Asimov",
              "timeCreate": 1561382544999,
              "timeUpdate": 1561384397527,
              "progress": "20/200",
              "done": false
            }
          ],
        }
      }
    },
    mounted() {
    },
    created() {
      // this.loadTodoList()
    },
    methods: {
      loadBookList() {
        let postData = {}
        getBookList(postData)
          .then(res => {
            zlog('--->loadBookList: res: res =', res)
          })
          .catch(err => {

          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .safeZone {
    border: 2px solid darkcyan;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
  .safeZone>.book {
    border: 2px solid darkgreen;
    width: 80%;
    height: 100%;
  }
  .safeZone>.book>.bookInfo {
    border: 2px solid darkgrey;
    width: 100%;
    height: 200px;
  }
  .safeZone>.book>.bookNote {}
  .safeZone>.side {
    border: 2px solid darkkhaki;
    width: 20%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .safeZone>.side>.ads {
    border: 2px solid darkcyan;
    width: 100%;
    height: 20%;
    min-height: 200px;
  }
  .safeZone>.side>.list {
    border: 2px solid darkmagenta;
    width: 100%;
    height: 100%;


  }

  a {
    color: rgba(183, 205, 226, 1);
    font-size: 12px;
    font-weight: bold;
  }
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .copyright {
    /*border: 2px solid limegreen;*/
    color: rgba(183, 205, 226, 1);
    font-size: 14px;
  }
</style>
