<template>
  <!-- Too many flex😥 -->
  <!-- Fix by Less mixin later😕 -->
  <audio ref="audio" :src="props.musicSrc"></audio>
  <div class="controller" w-full h-full flex p-4 justify-between items-center>
    <div class="controller-info" flex h-full gap-4>
      <el-image :src="picUrl" fit="fill" :lazy="true"></el-image>

      <div class="controller-info__text">
        <h1>{{ name }}</h1>
        <h2>{{ singer }}</h2>
      </div>
    </div>
    <div class="controller-main" flex flex-col justify-center flex-1>
      <div class="controller-main__buttons" flex justify-center gap-4>
        <i><Icon icon="ic:round-skip-previous" /></i>
        <i @click="notifyPlay" v-show="!playState"
          ><Icon icon="ic:round-play-arrow"
        /></i>
        <i @click="notifyPause" v-show="playState"
          ><Icon icon="ic:round-pause"
        /></i>
        <i><Icon icon="ic:round-skip-next" /></i>
      </div>
      <div class="controller-main__bar" flex justify-center items-center gap-2>
        <span>{{ currentTime }}</span>
        <div
          class="progress-bar"
          ref="bar"
          cursor-pointer
          w-lg
          h-2
          bg-gray
          border-rd-1.6
          relative
          flex
          items-center
        >
          <div
            class="controller-main__innerBar"
            ref="innerProgressBar"
            h-full
            border-rd-inherit
            bg-pink
          ></div>
          <div
            class="place-ball"
            ref="placeBall"
            bg-pink
            h-4
            w-4
            absolute
          ></div>
        </div>
        <span>{{ duration }}</span>
      </div>
    </div>
    <div class="controller-right" h-full flex items-center gap-4 justify-end>
      <div class="controller-volume" flex items-center relative>
        <el-popover trigger="click">
          <template #reference>
            <i><Icon icon="ic:round-volume-mute" /></i>
          </template>
          <div w-full h-full flex-col items-center justify-center text-center>
            <el-input-number
              v-model="audio.volume"
              :precision="2"
              :step="0.01"
              :max="1"
            ></el-input-number>
          </div>
        </el-popover>
      </div>
      <i><Icon icon="ic:round-playlist-play" /></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { controllerProps } from '@/utils/player'
import { usePlayerStore } from '@/store/player'
import { useIntervalFn, useMouse, useEventListener } from '@vueuse/core'
import { formatCurrentTime, formatTimeToSecond } from '@/utils/controller/time'

const props = defineProps(controllerProps)
const playerStore = usePlayerStore()
const playState = computed(() => playerStore.isPlaying)
// Audio Part
// Use HTMLAudioElement instead of <audio />
const audio = reactive(new Audio())
const isEnded = computed(() => audio.ended)
const currentTime = ref('00:00')
const duration = computed(() => playerStore.state.currentMusic.duration)
const durationNumber = computed(() =>
  formatTimeToSecond(duration.value as string)
)

// ProgressBar Part
type MoveType = 'click' | 'auto'
const bar = ref()
const innerProgressBar = ref()
const placeBall = ref()
const moveableWidth = ref(0)
const position = ref(0)
const { x } = useMouse()

// Volume Part
const volumeVisible = ref(true)
const volume = computed(() => audio.volume)

watch([() => props.musicSrc], ([src]) => {
  audio.src = props.musicSrc

  playerStore.isPlaying = true
  resume()
  audio.play()
})

// Unable to watch currentTime😕So use Interval with VueUse
const { pause, resume } = useIntervalFn(() => {
  currentTime.value = formatCurrentTime(audio.currentTime.toString())

  setBallPlace('auto')
  if (Math.floor(audio.currentTime) === durationNumber.value) {
    notifyPause()
  }
}, 1000)
pause()

const notifyPlay = () => {
  playerStore.setPlayState(true)
  resume()
  audio.play()
}

const notifyPause = () => {
  playerStore.setPlayState(false)
  pause()
  audio.pause()
}

// Move the position of place-ball
const setBallPlace = (type = 'click' as MoveType) => {
  const durationSecond = formatTimeToSecond(duration.value as string)
  if (type === 'click') {
    position.value = x.value - bar.value.offsetLeft
    if (position.value < 0) {
      position.value = 0
    }
    if (position.value > moveableWidth.value) {
      position.value = moveableWidth.value
    }
  } else {
    position.value = (audio.currentTime / durationSecond) * moveableWidth.value
  }

  placeBall.value.style.left = `${position.value}px`
  innerProgressBar.value.style.width = `${position.value}px`
}

const seek = () => {
  audio.currentTime =
    (position.value / moveableWidth.value) *
    formatTimeToSecond(duration.value as string)
  currentTime.value = formatCurrentTime(audio.currentTime.toString())
}

// Use click to move progress
// Use VueUse to listen. It's more powerful than addEventListener👍
// When mousedown -> pause interval -> watch move ball
// When mouseup -> unregister mousemove -> pause ->
//      update currentTime -> resume -> unregister mouseupEvent
const barMouseDownEvent = useEventListener(bar, 'mousedown', (e) => {
  pause()
  setBallPlace()
  const barMouseMoveEvent = useEventListener(bar, 'mousemove', (e) => {
    setBallPlace()
  })
  const mouseupEvent = useEventListener(document, 'mouseup', (e) => {
    barMouseMoveEvent()
    notifyPause()
    seek()
    notifyPlay()
    mouseupEvent()
  })
})

onMounted(() => {
  // Origin volume(1) is to high! 😱😫
  audio.volume = 0.1
  moveableWidth.value = bar.value.offsetWidth - placeBall.value.offsetWidth
})
</script>

<style scoped lang="less">
.controller {
  --icon-size: 32px;
  .controller-info {
    width: 30%;
  }

  .controller-main__buttons {
    font-size: var(--icon-size);
  }

  .controller-right {
    width: 30%;
    font-size: var(--icon-size);
  }

  i {
    font-size: var(--icon-size);
    cursor: pointer;
    width: 1em;
    height: 1em;
    transition: all 0.3s;
    &:hover {
      color: #409eef;
    }
  }

  .place-ball {
    border-radius: 50%;
  }
}
</style>
