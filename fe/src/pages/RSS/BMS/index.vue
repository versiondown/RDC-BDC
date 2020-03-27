<template>
  <d2-container>
    <template slot="header">
    </template>
    <div class="safeZone">
      <div class="book">
        <div class="bookInfo">

          <div class="main">
            <div class="cover">
              <img class="img" :src="zdata.bookInfo.coverImgUrl"/>
            </div>

            <div class="infos">
              <div class="info">
                <!--<div class="title">{{zdata.bookInfo.titleChina}} | {{zdata.bookInfo.titleEnglish}}</div>-->
                <div class="title">{{zdata.bookInfo.titleEnglish}}</div>
                <div class="author">{{zdata.bookInfo.authorEnglish}}</div>
                <div class="author">{{zdata.bookInfo.press}}</div>
                <div class="isbn">{{zdata.bookInfo.isbn}}</div>
                <div class="isbn">{{zdata.bookInfo.progress}}</div>
              </div>
            </div>
          </div>

          <div v-if="zdata.bookInfo.id !== ''" class="bar"
               :style="{'background': `linear-gradient(90deg, bisque, bisque ${Number(zdata.bookInfo.progress.split('/')[0]) / Number(zdata.bookInfo.progress.split('/')[1]) * 100}%, oldlace ${Number(zdata.bookInfo.progress.split('/')[0]) / Number(zdata.bookInfo.progress.split('/')[1]) * 100 + 0.1}%, oldlace)`}"></div>
          <div v-else class="bar"
               :style="{'background': `linear-gradient(90deg, bisque, bisque 100%, oldlace 100%, oldlace)`}"></div>
        </div>
        <div class="bookNote"></div>
      </div>
      <div class="side">
        <div class="ads">
          <div class="ad">
            <el-button type="warning" plain @click="loadBookList">R</el-button>
            <el-button type="warning" plain @click="addBookButtonClick">+</el-button>
            <el-button type="warning" plain @click="delBookButtonClick">-</el-button>
          </div>
        </div>
        <div class="list">
          <div
            class="book"
            v-for="(book, index) in zlist.bookList"
            :key="index"
            @click="bookListClick(book.id)"
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
            <div class="bar"
                 :style="{'background': `linear-gradient(90deg, bisque, bisque ${Number(book.progress.split('/')[0]) / Number(book.progress.split('/')[1]) * 100}%, oldlace ${Number(book.progress.split('/')[0]) / Number(book.progress.split('/')[1]) * 100 + 0.1}%, oldlace)`}">
            </div>
          </div>
        </div>
      </div>
    </div>
    <template slot="footer">
      <div class="footer">
        <div class="copyright">
          Designed by <a href="https://www.ezhq.xyz" target="_blank">ezhq</a> in China | Template by <a
          href="https://github.com/d2-projects/d2-admin" target="_blank">D2 Admin</a>
        </div>

      </div>
    </template>

    <el-dialog
      title="Add book"
      :visible.sync="zcache.window.addBook.see"
      :width="zcache.window.addBook.width"
      :before-close="addBookCancel">
      <el-form :label-position="zcache.window.addBook.labelPosition" :model="zdata.addBook">
        <el-form-item label="Title(Chinese)" :label-width="zcache.window.addBook.labelWidth">
          <el-input v-model="zdata.addBook.titleChina" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Title(English)" :label-width="zcache.window.addBook.labelWidth">
          <el-input v-model="zdata.addBook.titleEnglish" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Author(Chinese)" :label-width="zcache.window.addBook.labelWidth">
          <el-input v-model="zdata.addBook.authorChina" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Author(English)" :label-width="zcache.window.addBook.labelWidth">
          <el-input v-model="zdata.addBook.authorEnglish" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="CoverUrl" :label-width="zcache.window.addBook.labelWidth">
          <el-input v-model="zdata.addBook.coverImgUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ISBN" :label-width="zcache.window.addBook.labelWidth">
          <el-input v-model="zdata.addBook.isbn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Press" :label-width="zcache.window.addBook.labelWidth">
          <el-input v-model="zdata.addBook.press" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Pages" :label-width="zcache.window.addBook.labelWidth">
          <el-input v-model="zdata.addBook.progress" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>


      <span slot="footer" class="dialog-footer">
        <el-button @click="addBookCancel">Cancel</el-button>
        <el-button type="primary" @click="addBookSubmit">Submit</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
  import {getBookList, getBookInfo, addBook, delBook} from '@api/rss/bms/index'

  const zlog = console.log.bind(console)

  export default {
    components: {},
    data() {
      return {
        zcache: {
          public: {
            notify:{
              position: 'top-right',
            }
          },
          window: {
            addBook: {
              see: false,
              width: '60%',
              labelPosition: 'auto',
              labelWidth: '200px',
            }
          }
        },
        zdata: {
          bookInfo: {
            titleEnglish: 'Please chose your book.',
            authorEnglish: '',
            coverImgUrl: '',
            isbn: '',
            press: '',
            progress: '',
            id: '',
          },
          bookInfoDefault: {
            titleEnglish: 'Please chose your book.',
            authorEnglish: '',
            coverImgUrl: '',
            isbn: '',
            press: '',
            progress: '',
            id: '',
          },
          addBook: {
            titleChina: '',
            titleEnglish: '',
            authorChina: '',
            authorEnglish: '',
            coverImgUrl: 'https://res.cloudinary.com/imgcave/image/upload/v1582859280/Img/Logo/ezhq_Blog_Cover_1_pg11id.png',
            isbn: '',
            press: '',
            progress: '',
          },
          addBookDefault: {
            titleChina: '',
            titleEnglish: '',
            authorChina: '',
            authorEnglish: '',
            coverImgUrl: 'https://res.cloudinary.com/imgcave/image/upload/v1582859280/Img/Logo/ezhq_Blog_Cover_1_pg11id.png',
            isbn: '',
            press: '',
            progress: '',
          },
        },
        zlist: {
          bookList: [],
        },
        ztest: {}
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
            this.loadBookListSuccess(res)
          })
          .catch(err => {
            this.loadBookListFail(err)
          })
      },
      loadBookListSuccess(inRes) {
        this.zlist.bookList = inRes.data

        this.$notify.success({
          title: 'Update',
          message: 'Success to update book list.',
          position: this.zcache.public.notify.position,
          offset: 0,
          showClose: false
        });
      },
      loadBookListFail(inErr) {
        this.$notify.error({
          title: 'Update',
          message: 'Fail to update book list.',
          position: this.zcache.public.notify.position,
          offset: 60,
          showClose: false
        });
      },
      bookListClick(inId) {
        this.loadBookInfo(inId)
      },
      loadBookInfo(inId) {
        getBookInfo(inId)
          .then(res => {
            this.loadBookInfoSuccess(res)
          })
          .catch(err => {
            this.loadBookInfoFail(err)
          })

      },
      loadBookInfoSuccess(inRes){
        this.zdata.bookInfo = inRes.data
      },
      loadBookInfoFail(inErr){
        this.$notify.error({
          title: 'Info',
          message: 'Success to load book info.',
          position: this.zcache.public.notify.position,
          offset: 60,
          showClose: false
        });
      },
      addBookButtonClick() {
        this.zcache.window.addBook.see = true
      },
      addBookSubmit() {
        let postData = this.zdata.addBook

        addBook(postData)
          .then(res => {
            this.addBookSuccess(res)
          })
          .catch(err => {

            this.addBookFail(err)
          })
      },
      addBookSuccess(inRes) {
        this.zcache.window.addBook.see = false

        this.zdata.addBook = JSON.parse(JSON.stringify(this.zdata.addBookDefault))

        this.loadBookList()
      },
      addBookFail(inErr) {
        this.$notify.error({
          title: 'Add Fail.',
          message: 'Fail to add book.',
          position: this.zcache.public.notify.position,
          offset: 60,
          showClose: false
        });
      },
      addBookCancel(done) {
        this.$confirm('Confirm close window ? Your data will not save.')
          .then(_ => {
            this.zcache.window.addBook.see = false
            this.zdata.addBook = JSON.parse(JSON.stringify(this.zdata.addBookDefault))
          })
          .catch(_ => {
          });
      },
      delBookButtonClick() {
        let deleteBookId = this.zdata.bookInfo.id

        if (deleteBookId === '') {
          this.delBookCheckFail()
        } else {
          delBook(deleteBookId)
            .then(res => {
              this.delBookSuccess(res)
            })
            .catch(err => {
              this.delBookFail(err)
            })
        }

      },
      delBookCheckFail() {
        this.$notify.error({
          title: 'No Book.',
          message: 'Please select a book to delete.',
          position: this.zcache.public.notify.position,
          offset: 60,
          showClose: false
        });
      },
      delBookSuccess(inRes) {
        this.zdata.bookInfo = JSON.parse(JSON.stringify(this.zdata.bookInfoDefault))

        this.loadBookList()
      },
      delBookFail(inErr) {
        this.$notify.error({
          title: 'Del Fail.',
          message: 'Fail to delete the book.',
          position: this.zcache.public.notify.position,
          offset: 60,
          showClose: false
        });
      },
      loadBookNote() {
      },
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
  $fontSizeNormalLevel1: 10px;
  $fontSizeNormalLevel2: 12px;
  $fontSizeNormalLevel3: 14px;
  $fontSizeNormalLevel4: 16px;
  $fontSizeNormalLevel5: 18px;
  .safeZone {
    /*border: 2px solid darkcyan;*/
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .safeZone > .book {
    /*border: 2px solid darkgreen;*/
    width: 90%;
    height: 100%;
    padding: 0 0 4px 0;
    border-radius: $radiusNormal;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 1px 2px 0 grey;
    overflow: scroll;
  }

  .safeZone > .book > .bookInfo {
    /*border: 2px solid dodgerblue;*/
    background: oldlace;
    width: 100%;
    height: 200px;
    border-radius: $radiusNormal;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .safeZone > .book > .bookInfo > .main {
    /*border: 2px solid orange;*/
    width: 100%;
    height: 180px;
    border-radius: $radiusNormal $radiusNormal 0 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .safeZone > .book > .bookInfo > .main > .cover {
    /*border: 2px solid lightskyblue;*/
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .safeZone > .book > .bookInfo > .main > .cover > .img {
    width: auto;
    height: 90%;
  }
  .safeZone > .book > .bookInfo > .main > .infos {
    /*border: 2px solid darkred;*/
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .safeZone > .book > .bookInfo > .main > .infos > .info {
    /*border: 2px solid hotpink;*/
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .safeZone > .book > .bookInfo > .main > .infos > .info > div {
    /*border: 1px solid green;*/
    width: auto;
    margin: 4px 0;
    color: grey;
    font-size: 18px;
  }
  .safeZone > .book > .bookInfo > .main > .infos > .info > .title {
    color: black;
    font-size: 22px;
    font-weight: bold;
  }
  .safeZone > .book > .bookInfo > .bar {
    /*border: 2px solid darkred;*/
    width: 100%;
    height: 20px;
    border-radius: 0 0 $radiusNormal $radiusNormal;
  }

  .safeZone > .book > .bookNote {
    /*border: 2px solid darkorange;*/
    width: 100%;
    height: 100%;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .safeZone > .side {
    /*border: 2px solid darkkhaki;*/
    width: $sideWidth;
    height: 100%;
    border-radius: $radiusNormal;
    margin-left: 4px;
    padding: 0 0 4px 0;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: scroll;

    box-shadow: 0 1px 2px 0 grey;
  }

  .safeZone > .side > .ads {
    /*border: 2px solid darkorange;*/
    width: 100%;
    height: 200px;
    border-radius: 4px;
    margin: 0 0 4px 0;
    background-color: oldlace;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .safeZone > .side > .ads > .ad {
    width: 94%;
    height: 100%;
    border-radius: 4px;
    /*background-color: oldlace;*/
    /*box-shadow: 0 0px 2px 0 grey;*/
    display: flex;
    flex-direction: row;
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
    border-radius: $radiusNormal;
    box-shadow: 0 0px 2px 0 grey;
  }
  .safeZone > .side > .list > .book:hover {
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
  .safeZone > .side > .list > .book > .main > .infos > .info > div {
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
