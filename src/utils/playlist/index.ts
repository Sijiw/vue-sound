import { getPlayListDetailAPI } from '@/api/playlist'
import { msToMin } from '@/utils/time'

export type NameAndID = {
  id: string
  name: string
}

export type Singer = NameAndID

export type Album = NameAndID & {
  picUrl: string
}

export type ListSongItem = {
  ar: Singer[]
  al: Album
  dt: number
  picUrl: string
} & NameAndID

export type ListSongData = {
  singers: Singer[]
  singerStr: string
  album: Album
  time: string
  picUrl: string
} & NameAndID

export type PlayListDetail = NameAndID & {
  listData: ListSongData[]
  coverImgUrl: string
}

export const getPlayListDetail = (id: string) => {
  return getPlayListDetailAPI(id).then((res) => {
    console.log(res)

    const songList = res.data.playlist.tracks
    const playListInfo = res.data.playlist
    const data: PlayListDetail = {
      id,
      name: playListInfo.name,
      coverImgUrl: playListInfo.coverImgUrl,
      listData: []
    }
    songList.forEach((item: ListSongItem, index: number) => {
      const singers: string[] = []
      item.ar.forEach((item: NameAndID, index: number) => {
        singers[index] = item.name
      })
      data.listData[index] = {
        name: item.name,
        id: item.id,
        singers: item.ar,
        singerStr: singers.join('/'),
        album: {
          name: item.al.name,
          id: item.al.id,
          picUrl: item.al.picUrl
        },
        time: msToMin(item.dt),
        picUrl: item.al.picUrl
      }
    })

    return data
  })
}
