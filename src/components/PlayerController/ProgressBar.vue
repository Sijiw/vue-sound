<template>
  <div
    class="bar"
    ref="bar"
    @mousedown="handleBarMousedown"
    @click="setBallPlace"
    cursor-pointer
    w-lg
    h-2
    bg-gray
    border-rd-1.6
    relative
    flex
    items-center
  >
    <div class="place-ball" ref="placeBall" bg-pink h-4 w-4></div>
  </div>
</template>

<script lang="ts" setup>
import { useMouse } from '@vueuse/core'
const bar = ref()
const placeBall = ref()
const moveableWidth = ref(0)

const { x, y } = useMouse()

// Move the position of place-ball
const setBallPlace = () => {
  let position = x.value - bar.value.offsetLeft
  if (position < 0) {
    position = 0
  }
  if (position > moveableWidth.value) {
    position = moveableWidth.value
  }
  placeBall.value.style.left = `${position}px`
}

const handleBarMousedown = () => {
  bar.value.addEventListener('mousemove', setBallPlace)
  document.addEventListener('mouseup', () => {
    console.log(placeBall.value.offsetLeft)

    bar.value.removeEventListener('mousemove', setBallPlace)
  })
}

onMounted(() => {
  moveableWidth.value = bar.value.offsetWidth - placeBall.value.offsetWidth
})
</script>

<style scoped lang="less">
.place-ball {
  position: absolute;
  border-radius: 50%;
}
</style>
