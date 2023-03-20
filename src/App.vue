<template>
  <div class="layout">
    <div class="flex-content">
      <div class="aside">
        <el-scrollbar>
          <sidebar></sidebar>
        </el-scrollbar>
      </div>
      <div class="content" p-x-8>
        <Header></Header>
        <div class="main" text-2xl p-y-4>
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="footer">
      <PlayerController
        :name="state.name"
        :singer="state.singer"
        :music-src="state.musicSrc"
        :pic-url="state.picUrl"
      ></PlayerController>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from './store/player'
import sidebar from './components/sidebar/sidebar.vue'
import Header from './components/header/header.vue'
import PlayerController from './components/PlayerController/PlayerController.vue'

const playerStore = usePlayerStore()
const state = reactive({
  musicSrc: playerStore.state.currentMusic.url,
  name: playerStore.state.currentMusic.name,
  singer: playerStore.state.currentMusic.singer,
  picUrl: playerStore.state.currentMusic.picUrl
})

// 计算属性也可以用于监听url变化
// 但是更新速度不如订阅
// const musicSrc = computed(() => playerStore.currentMusic.url)

// 订阅当前播放音乐的url
playerStore.$subscribe((mutation, storeState) => {
  // new Promise((resolve, reject) => {
  //   state.musicSrc = storeState.currentMusic.data.url
  //   name = storeState.currentMusic.data.name
  //   singer = storeState.currentMusic.data.singer
  //   resolve('ok')
  // }).then((res) => {
  //   playerStore.setPlayState(true)
  //   audioRef.value.play()
  // })

  state.musicSrc = storeState.state.currentMusic.url
  state.name = storeState.state.currentMusic.name
  state.singer = storeState.state.currentMusic.singer
  state.picUrl = storeState.state.currentMusic.picUrl
})
</script>

<style scoped lang="less">
@import '@/styles/styleutils';
.layout {
  position: relative;

  height: 100%;
  width: 100%;

  .flex-content {
    display: flex;
    width: 100%;
    height: 90%;
    .aside {
      min-width: 20%;
      height: 100%;
      // background-color: #fdacbc;
    }
    .content {
      display: flex;
      flex-direction: column;
      width: 80%;
      height: 100%;
      // background-color: #f5a2b2;
      background-color: #f8f8f8;
      .main {
        position: relative;
        overflow: auto;

        flex: 1;
        // height: 90%;

        .scroll-bar();
      }
    }
  }
  .footer {
    position: sticky;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 10%;
    background-color: #fff;
  }
}
</style>
