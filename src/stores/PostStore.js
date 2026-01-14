import { defineStore } from 'pinia'
import axios from 'axios'

// ------------------------------------------
// AxiosのベースURL設定（Spring Boot側のポート）
// ------------------------------------------

export const usePostStore = defineStore('Post', {
  state: () => ({
    userPost: '',
    PostResult: '',
    postData: '',
    apiData: null,
    apiError: null,
    apiLoading: false,
  }),

  getters: {
    // ------------------------------------------
    // ジャンル別の投稿を取得
    // ------------------------------------------
    diaryPosts: (state) => state.apiData?.List?.filter((post) => post.genre === 'diary') || [],
    lifehackPosts: (state) =>
      state.apiData?.List?.filter((post) => post.genre === 'lifehack') || [],
    fashionPosts: (state) => state.apiData?.List?.filter((post) => post.genre === 'fashion') || [],
  },

  actions: {
    // ------------------------------------------
    // DBからデータを取得（SELECT）
    // ------------------------------------------
    async fetchSelect() {
      this.apiLoading = true
      try {
        const res = await axios.get(
          'https://m3h-tajima-kadai3-containerapp.whiteisland-5e3c12d2.japaneast.azurecontainerapps.io/api/SELECT',
        )
        this.apiData = res.data
        return res.data
      } catch (err) {
        console.error('fetchSelect failed', err)
        this.apiError = err.message
        throw err
      } finally {
        this.apiLoading = false
      }
    },

    // INSERT処理（FormData対応）
    async insertPost(postData) {
      this.apiLoading = true
      try {
        console.log('insertPost sending', postData)

        // FormDataを作成（Multipart対応）
        const formData = new FormData()
        formData.append('id', postData.id || '')
        formData.append('title', postData.title)
        formData.append('body', postData.body)
        formData.append('genre', postData.genre)
        if (postData.thumbnailFile) {
          formData.append('thumbnail', postData.thumbnailFile)
        }

        const res = await axios.post('/api/INSERT', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        console.log('insertPost response', res.data)
        this.PostResult = res.data
        return res.data
      } catch (err) {
        console.error('insertPost failed', err)
        this.apiError = err.message
        throw err
      } finally {
        this.apiLoading = false
      }
    },

    // ------------------------------------------
    // DELETE処理
    // ------------------------------------------
    async deletePost(id) {
      this.apiLoading = true
      try {
        const res = await axios.get('/api/DELETE', { params: { id } })
        await this.fetchSelect()
        return res.data
      } catch (err) {
        console.error('deletePost failed', err)
        this.apiError = err.message
        throw err
      } finally {
        this.apiLoading = false
      }
    },
  },
})
