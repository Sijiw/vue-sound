<template>
  <div>
    <h1 mb-8>推荐</h1>
    <div class="recommend-container">
      <ListCard
        v-for="item in data"
        :key="item.id"
        :id="item.id"
        :text="item.name"
        :imgSrc="item.coverImgUrl"
      ></ListCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeMount, onMounted, reactive } from 'vue'
import ListCard from '@/components/list-card/list-card.vue'
import { SongListItem } from '@/utils/home'
import { useHomeStore } from '@/store/home'

let data: SongListItem[] = reactive([])
const homeStore = useHomeStore()

homeStore.getHotSongList(10)
data = homeStore.hotSongList
</script>

<style scoped lang="less">
.recommend-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  margin-top: 10px;
  width: 100%;
  height: 500px;
}
</style>
