<template>
  <div class="info-card">
    <div class="info-img">
      <ImgCard :src="state.coverImgUrl"></ImgCard>
    </div>
    <div class="info">
      <h2>{{ state.name }}</h2>
    </div>
  </div>
  <SongTable :data="state.listData"></SongTable>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import {
  getPlayListDetail,
  ListSongData,
  PlayListDetail
} from '@/utils/playlist'
import SongTable from '@/components/song-table/song-table.vue'
import ImgCard from '@/components/ImgCard/ImgCard.vue'

const route = useRoute()
const params = route.params
const state = reactive({
  id: '',
  name: '',
  coverImgUrl: '',
  listData: [] as ListSongData[]
})

getPlayListDetail(params.id as string).then((res) => {
  console.log(res)

  state.listData = res.listData
  state.id = res.id
  state.name = res.name
  state.coverImgUrl = res.coverImgUrl
})
</script>

<style scoped lang="less">
.info-card {
  display: flex;

  width: 100%;
  height: 200px;
  // margin: 0 30px 20px 0;

  .info-img {
    height: 100%;
  }

  .info {
    padding: 0 20px;
  }
}
</style>
