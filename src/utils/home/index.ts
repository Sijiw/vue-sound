import { getHotPlayList } from '@/api/home'

export interface SongListItem {
  name: string
  id: number
  description: string
  coverImgUrl: string
}
