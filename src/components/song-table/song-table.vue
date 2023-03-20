<template>
  <div class="song-row song-table__title" text-base>
    <div>歌曲</div>
    <div>歌手</div>
    <div>专辑</div>
  </div>
  <div
    class="song-row song-item"
    v-for="item in data"
    :key="item.id"
    @dblclick="handleDoubleClick(item)"
    font-700
  >
    <div>{{ item.name }}</div>
    <div>{{ item.singerStr }}</div>
    <div>{{ item.album.name }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ListSongData } from '@/utils/playlist/index'
import { usePlayerStore } from '@/store/player'
import { getMusicDetailAPI } from '@/api/music'

interface Props {
  data: ListSongData[]
}

const props = defineProps<Props>()
const emit = defineEmits(['musicUrlChange'])
const playerStore = usePlayerStore()

const handleDoubleClick = (item: ListSongData) => {
  getMusicDetailAPI(item.id).then((res) => {
    console.log(res)
    console.log(item)

    // playerStore.currentMusic.url = res.data.data[0].url
    playerStore.state.currentMusic = {
      url: res.data.data[0].url,
      name: item.name,
      singer: item.singerStr,
      picUrl: item.picUrl,
      duration: item.time
    }
    playerStore.state.currentMusicList = props.data
  })
}
</script>

<style scoped lang="less">
@import '@/styles/styleutils.less';
.song-row {
  width: 100%;
  display: grid;
  // column-gap: 10px;
  grid-template-columns: 45% 30% 25%;
  padding: 10px;

  div {
    .truncate();
    margin-right: 5px;
  }
}

.song-item {
  .hover();
}
</style>
