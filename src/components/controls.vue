<script setup>
import { ref } from 'vue'

const emits = defineEmits(['onControlId'])

const controlClick = e => {
  let id = Number(e.target.id)
  emits('onControlId', id)
}
</script>

<template>
  <div class="controls-wrap" @click="controlClick">
    <img
      id="1"
      alt="初始视角"
      title="初始视角"
      src="@/assets/images/control_inital.png"
    />
    <img
      id="2"
      alt="视频监控"
      title="视频监控"
      src="@/assets/images/control_video.png"
    />
    <img
      id="3"
      alt="广播中心"
      title="广播中心"
      src="@/assets/images/control_audio.png"
    />
  </div>
</template>

<style lang="scss" scoped>
.controls-wrap {
  position: absolute;
  top: vh(108);
  right: vw(460);
  display: flex;
  z-index: 999;
  flex-direction: column;

  img {
    cursor: pointer;
    width: vw(24);
    height: vw(24);
    margin-bottom: vh(16);
  }
}
</style>