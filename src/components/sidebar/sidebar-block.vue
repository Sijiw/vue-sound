<template>
  <div p-0.5>
    <div p-1 class="sidebar-block__title" color-black-400 mb-1>
      {{ title }}
    </div>
    <router-link :to="{ name: 'PlayList', params: { id: 5020888643 } }">
      <div p-1 cursor-pointer class="sidebar-block__item">
        <div class="icon i-ic-baseline-headset" mr-1.5></div>
        <span>歌单</span>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { sidebarBlockProps } from './sidebar-block'

const props = defineProps(sidebarBlockProps)
console.log(props.title)
</script>

<style scoped lang="less">
.sidebar-block__title {
  font-size: 12px;
  // border-bottom: 1px solid var(--border-color);
}
.sidebar-block__item {
  display: flex;
  align-items: center;

  --text-size: 14px;
  --icon-size: 18px;

  line-height: 1;
  font-size: var(--text-size);

  .icon {
    vertical-align: bottom;
    font-size: var(--icon-size);
  }

  .aim {
    background-color: var(--bg-hover-gray);
    border-radius: var(--border-radius-base);
  }

  &:hover {
    .aim();
  }
}
</style>
