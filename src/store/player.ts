import { ListSongData } from '@/utils/playlist'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    state: {
      currentMusic: {
        url: '',
        name: '',
        singer: '',
        picUrl:
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        duration: '00:00' as string | number
      },
      currentMusicList: [] as ListSongData[]
    },
    isPlaying: false
  }),
  actions: {
    changePlayState() {
      this.isPlaying = !this.isPlaying
    },
    setPlayState(playState: boolean) {
      this.isPlaying = playState
    }
  }
})
