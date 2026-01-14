<template>
  <div id="app">
    <v-app>
      <div class="main">
        <div class="mainPic-home"></div>

        <v-row class="text-h5 pt-8 mb-2" justify="center">
          <span>ALL POSTS</span>
        </v-row>
        <div class="postList">
          <div class="container">
            <div v-if="store.apiData && store.apiData.List">
              <v-row class="postsRow" dense>
                <v-col v-for="post in store.apiData.List" :key="post.id" cols="4">
                  <v-card class="pa-4 ma-2" outlined @click="openDialog(post)">
                    <div class="title text-h6 mt-3" justify="center">{{ post.title }}</div>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title class="text-h6">{{ selectedPost?.title }}</v-card-title>
            <v-card-text>
              <div v-html="selectedPost?.body"></div>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="error" text @click="deletePost" :loading="deleting">削除</v-btn>
              <v-btn color="primary" text @click="dialog = false">閉じる</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
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
    await axios.get(
      'https://m3h-tajima-kadai3-containerapp.whiteisland-5e3c12d2.japaneast.azurecontainerapps.io/api/DELETE',
      { params: { id } },
    )
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
.container {
  width: 100%;
  margin: 0 auto;
}

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
.mainPic-home {
  height: 650px;
  background-image: url(https://marketplace.canva.com/EAGN56S1Xhg/1/0/1600w/canva-%E3%83%94%E3%83%B3%E3%82%AF%E3%80%80%E3%81%8A%E3%81%97%E3%82%83%E3%82%8C%E3%80%80%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%80%80%E8%8A%B1%E3%80%80pc%E3%80%80%E3%83%87%E3%82%B9%E3%82%AF%E3%83%88%E3%83%83%E3%83%97%E5%A3%81%E7%B4%99-LA1GBWfcrIg.jpg);
  background-size: cover;
  background-position: center -100px;
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
  background-image: url(https://img.freepik.com/free-photo/decorative-colorful-daisy-flowers-background_23-2148187022.jpg?semt=ais_hybrid&w=740&q=80);
  background-size: cover;
  opacity: 0.9;
}

.title {
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  padding: 8px;
  text-align: center;
}
</style>
