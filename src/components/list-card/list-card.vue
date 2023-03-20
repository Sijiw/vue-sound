<template>
  <router-link :to="{ name: 'PlayList', params: toParams }" class="list-card">
    <div>
      <div class="img-box"><img :src="imgSrc" /></div>
      <div class="card-text">{{ text }}</div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
interface Props {
  imgSrc: string
  text: string
  id: number
}

const props = defineProps<Props>()
const toParams = {
  id: props.id
}
</script>

<style scoped lang="less">
.list-card {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  width: 150px;
  height: 180px;
  margin-bottom: 10px;
  font-size: 14px;

  & + .list-card {
    margin-left: 30px;
  }

  &:nth-child(6n) {
    margin-left: 0;
  }

  .img-box {
    width: 100%;
    height: 150px;
    margin-bottom: 8px;
    border-radius: var(--border-radius-base);

    img {
      height: 100%;
      border-radius: inherit;
    }
  }

  .card-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
