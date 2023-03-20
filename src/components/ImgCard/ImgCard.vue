<template>
  <i><img :src="src" alt="" /></i>
</template>

<script lang="ts" setup>
interface Props {
  src: string
}

const props = defineProps<Props>()
</script>

<style scoped lang="less">
i {
  height: 100%;
  border-radius: 8px;
  img {
    height: inherit;
    border-radius: inherit;
  }
}
</style>
