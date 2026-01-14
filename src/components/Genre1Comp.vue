<template>
  <div id="app">
    <v-app>
      <div class="main">
        <div class="mainPic-genre1"></div>
        <v-row class="text-h5 pt-8 mb-2" justify="center"><span>DIARY</span></v-row>
        <div class="postList">
          <div v-if="store.apiData && store.apiData.List">
            <v-row class="postsRow" dense justify="center">
              <v-col v-for="post in store.diaryPosts" :key="post.id" cols="4">
                <v-card class="pa-4 ma-2" outlined @click="openDialog(post)">
                  <div class="title text-h6">{{ post.title }}</div>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <!-- ポップアップダイアログ -->
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title class="text-h6">{{ selectedPost?.title }}</v-card-title>
          <v-card-text>
            <div v-html="selectedPost?.body"></div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" text @click="deletePost" :loading="deleting">削除</v-btn>
            <v-btn color="primary" text @click="dialog = false">閉じる</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePostStore } from '../stores/PostStore'
import axios from 'axios'

const store = usePostStore()

const dialog = ref(false)
const selectedPost = ref(null)
const deleting = ref(false)

const openDialog = (post) => {
  selectedPost.value = post
  dialog.value = true
}

const deletePost = async () => {
  if (!selectedPost.value) return
  if (!confirm('この投稿を削除しますか？')) return
  try {
    deleting.value = true
    const id = selectedPost.value.id
    await axios.get('/api/DELETE', { params: { id } })
    dialog.value = false
    selectedPost.value = null
    await store.fetchSelect()
  } catch (err) {
    console.error('削除に失敗しました', err)
    alert('削除に失敗しました')
  } finally {
    deleting.value = false
  }
}

onMounted(async () => {
  try {
    await store.fetchSelect()
  } catch (err) {
    console.error('データ取得に失敗', err)
  }
})
</script>

<style>
@media (min-width: 1024px) {
  .postList {
    min-height: 100vh;
    width: 100%;
    margin: 0 auto;
  }
}
.main {
  height: 1500px;
  background-color: rgb(255, 255, 255);
}
.mainPic-genre1 {
  height: 650px;
  background-image: url(https://marketplace.canva.com/EAGscZe5jso/2/0/1600w/canva-%E7%99%BD%E3%80%80%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%80%80%E3%83%9F%E3%83%8B%E3%83%9E%E3%83%AB%E3%80%80%E8%8A%B1%E3%80%80%E5%BD%B1%E3%80%80%E6%89%8B%E6%8F%8F%E3%81%8D%E3%80%80%E3%83%87%E3%82%B9%E3%82%AF%E3%83%88%E3%83%83%E3%83%97%E5%A3%81%E7%B4%99%E3%80%80-QqZye3iAUa4.jpg);
  background-size: cover;
  background-position: center center;
}

.postList {
  width: 100%;
  margin: 0 auto;
  padding: 0 48px;
}

.postsRow {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.postsRow > .v-col {
  box-sizing: border-box;
  max-width: 360px;
  padding: 0 12px;
}

.postsRow .v-card {
  width: 100%;
  height: 200px;
  max-width: 320px;
  background-color: rgba(212, 178, 138, 0.5);
  cursor: pointer;
}
</style>
