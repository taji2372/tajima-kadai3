<template>
  <v-container>
    <v-row class="mt-15">
      <v-col cols="1"></v-col>
      <v-col cols="7">
        <v-text-field label="タイトル" v-model="title" />
      </v-col>
      <v-col cols="2">
        <v-select v-model="selectId" label="ジャンル" :items="genre" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="9">
        <QuillEditor
          ref="quillRef"
          v-model:content="body"
          content-type="html"
          :options="editorOptions"
        />
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col cols="1"></v-col>
      <v-col cols="1">
        <v-btn class="mt-3" color="primary" @click="submitPost">投稿</v-btn>
      </v-col>
      <v-col cols="3"
        ><v-file-input
          v-model="thumbnail"
          label="サムネイル画像を選択"
          accept="image/*"
          prepend-icon="mdi-image"
        />
      </v-col>
      <v-img v-if="thumbnail" :src="previewUrl" max-width="200" class="mt-3" />
    </v-row>
  </v-container>
  <v-dialog v-model="dialog" max-width="300px">
    <v-card>
      <v-card-title class="text-h6 ml-3 pt-5">投稿が完了しました</v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="dialog = false">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { usePostStore } from '../stores/PostStore'

const title = ref('')
const body = ref('')
const genre = ['diary', 'lifehack', 'fashion']
const selectId = ref(null)

const thumbnail = ref(null)
const previewUrl = ref(null)
const quillRef = ref(null)
const dialog = ref(false)

const editorOptions = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, false] }],
      ['link', 'image'],
    ],
  },
}

watch(thumbnail, (newFile) => {
  if (newFile) {
    previewUrl.value = URL.createObjectURL(newFile)
  }
})

onMounted(() => {
  console.log('Quill ref onMounted', quillRef.value)
})

const postStore = usePostStore()

async function submitPost() {
  const id = Math.floor(Date.now() / 1000)
  const payload = {
    id,
    title: title.value,
    genre: selectId.value,
    body: body.value,
    thumbnailFile: thumbnail.value || null, // ← 追加
  }

  try {
    console.log(
      '送信前 body type',
      typeof body.value,
      'body length',
      body.value == null ? 0 : String(body.value).length,
    )
    console.log('送信前 body preview', body.value && String(body.value).slice(0, 200))
    console.log('送信ペイロード', payload)
    await postStore.insertPost(payload)
    console.log('投稿成功', postStore.PostResult)
    if (title.value === '' || genre.value === null || body.value === '') {
      alert('タイトル、ジャンル、本文は必須です。')
      return
    } else {
      alert('投稿が完了しました。')
    }
    // フォームクリア
    title.value = ''
    selectId.value = null
    body.value = ''
    thumbnail.value = null
    previewUrl.value = null
  } catch (err) {
    console.error('投稿失敗', err)
  }
}
</script>

<style>
/* .v-container {
  height: 2000px;
  background-color: aqua;
} */
</style>
