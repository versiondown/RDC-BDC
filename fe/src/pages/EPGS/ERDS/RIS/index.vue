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
        <div class="ads">
          <el-button type="primary" @click="loadBookList">S</el-button>
        </div>
        <div class="list">
          <div
            class="book"
            v-for="(book, index) in zlist.bookList"
            :key="index"
          >
            <div class="main">
              <div class="cover">
                <img class="img" :src="book.coverImgUrl"/>
              </div>
              <div class="infos">
                <div class="info">
                  <div class="title">{{book.titleEnglish}}</div>
                  <div class="author">{{book.authorEnglish}}</div>
                  <div class="isbn">{{book.isbn}}</div>
                </div>
              </div>
            </div>
            <div class="bar" :style="{'background': `linear-gradient(90deg, bisque, bisque ${Number(book.progress.split('/')[0]) / Number(book.progress.split('/')[1]) * 100}%, oldlace ${Number(book.progress.split('/')[0]) / Number(book.progress.split('/')[1]) * 100 + 0.1}%, oldlace)`}">
            </div>
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
        zlist: {
          bookList: []
        },
        ztest: {
          bookList: [
            {
              "id": 1,
              "titleChina": "基地",
              "titleEnglish": "Base",
              "authorChina": "艾萨克·阿西莫夫",
              "authorEnglish": "Isaac Asimov",
              "coverImgUrl": "https://res.cloudinary.com/imgcave/image/upload/v1582859280/Img/Logo/ezhq_Blog_Cover_1_pg11id.png",
              "isbn": "N/A",
              "press": "N/A",
              "timeCreate": 1561382544999,
              "timeUpdate": 1561384397527,
              "progress": "160/200",
              "done": false
            },
            {
              "id": 2,
              "titleChina": "基地 2",
              "titleEnglish": "Base 2",
              "authorChina": "艾萨克·阿西莫夫",
              "authorEnglish": "Isaac Asimov",
              "coverImgUrl": "https://res.cloudinary.com/imgcave/image/upload/v1582859280/Img/Logo/ezhq_Blog_Cover_1_pg11id.png",
              "isbn": "N/A",
              "press": "N/A",
              "timeCreate": 1561382544999,
              "timeUpdate": 1561384397527,
              "progress": "120/200",
              "done": false
            },
            {
              "id": 3,
              "titleChina": "基地 3",
              "titleEnglish": "Base 3",
              "authorChina": "艾萨克·阿西莫夫",
              "authorEnglish": "Isaac Asimov",
              "coverImgUrl": "https://res.cloudinary.com/imgcave/image/upload/v1582859280/Img/Logo/ezhq_Blog_Cover_1_pg11id.png",
              "isbn": "N/A",
              "press": "N/A",
              "timeCreate": 1561382544999,
              "timeUpdate": 1561384397527,
              "progress": "80/200",
              "done": false
            },
            {
              "id": 4,
              "titleChina": "基地 4",
              "titleEnglish": "Base 4",
              "authorChina": "艾萨克·阿西莫夫",
              "authorEnglish": "Isaac Asimov",
              "coverImgUrl": "https://res.cloudinary.com/imgcave/image/upload/v1582859280/Img/Logo/ezhq_Blog_Cover_1_pg11id.png",
              "isbn": "N/A",
              "press": "N/A",
              "timeCreate": 1561382544999,
              "timeUpdate": 1561384397527,
              "progress": "40/200",
              "done": false
            }
          ],
        }
      }
    },
    mounted() {
    },
    created() {
      this.loadBookList()
    },
    methods: {
      loadBookList() {
        let postData = {}
        getBookList(postData)
          .then(res => {
            zlog('--->loadBookList: res: res =', res)
            this.zlist.bookList = res.data
          })
          .catch(err => {

          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  $radiusNormal: 4px;
  $sideWidth: 400px;
  $sideListItemHeight: 160px;
  $sideListItemMainHeight: 140px;
  $sideListItemBarHeight: 20px;
  $sideListItemCoverRadius: 4px;
  $fontSizeNormalLevel1: 14px;
  $fontSizeNormalLevel2: 12px;
  $fontSizeNormalLevel3: 10px;
  .safeZone {
    /*border: 2px solid darkcyan;*/
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }

  .safeZone > .book {
    /*border: 2px solid darkgreen;*/
    width: 100%;
    height: 100%;
  }

  .safeZone > .book > .bookInfo {
    /*border: 2px solid darkgrey;*/
    width: 100%;
    height: 200px;
  }

  .safeZone > .book > .bookNote {
  }

  .safeZone > .side {
    /*border: 2px solid darkkhaki;*/
    width: $sideWidth;
    height: 100%;
    border-radius: $radiusNormal;
    padding: 4px 0;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: auto;

    box-shadow: 0 1px 2px 0 grey;
  }

  .safeZone > .side > .ads {
    /*border: 2px solid darkorange;*/
    width: 100%;
    height: 200px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .safeZone > .side > .list {
    /*border: 2px solid darkmagenta;*/
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-shrink: unset;
    overflow: scroll;
  }

  .safeZone > .side > .list > .book {
    /*border: 2px solid darkcyan;*/
    transition: all 0.2s;
    height: $sideListItemHeight;
    width: 94%;
    margin: 4px 4px;
    background-color: oldlace;
    flex-shrink: 0;
    border-radius: 4px;
    box-shadow: 0 0px 2px 0 grey;
  }
  .safeZone > .side > .list > .book:hover{
    transition: all 0.2s;
    box-shadow: 0 2px 4px 0 grey;
  }

  .safeZone > .side > .list > .book > .main {
    /*background-color: darkcyan;*/
    width: 100%;
    height: $sideListItemMainHeight;
    border-radius: $radiusNormal $radiusNormal 0 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .safeZone > .side > .list > .book > .main > .cover {
    /*border: 1px solid lightskyblue;*/
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .safeZone > .side > .list > .book > .main > .cover > .img {
    width: 80%;
    height: 80%;
    border-radius: $sideListItemCoverRadius;
  }
  .safeZone > .side > .list > .book > .main > .infos {
    /*border: 1px solid darkorange;*/
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .safeZone > .side > .list > .book > .main > .infos > .info {
    /*border: 1px solid lightgreen;*/
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: scroll;
  }
  .safeZone > .side > .list > .book > .main > .infos > .info>div {
    /*border: 1px solid lightpink;*/
    width: 100%;
    height: 24px;
    flex-shrink: 0;
    font-size: $fontSizeNormalLevel2;
    line-height: 24px;

    text-align: left;
  }
  .safeZone > .side > .list > .book > .bar {
    /*background-color: oldlace;*/
    /*background: linear-gradient(90deg, green, green 40%, oldlace 41%, oldlace);*/
    width: 100%;
    height: $sideListItemBarHeight;
    border-radius: 0 0 $radiusNormal $radiusNormal;
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
