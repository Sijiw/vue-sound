import { defineStore } from 'pinia'
import { getHotPlayList } from '@/api/home'
import { SongListItem } from '@/utils/home'

export const useHomeStore = defineStore('home', {
  state: () => ({
    hotSongList: [] as SongListItem[]
  }),
  actions: {
    getHotSongList(limit = 20) {
      getHotPlayList(limit).then((res) => {
        const resData = res.data.playlists
        console.log(resData)

        resData.forEach((item: SongListItem, index: number) => {
          this.hotSongList[index] = {
            name: item.name,
            id: item.id,
            description: item.description,
            coverImgUrl: item.coverImgUrl
          }
        })
      })
    }
  }
})
