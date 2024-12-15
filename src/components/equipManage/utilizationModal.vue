<script setup>
import { ref } from 'vue'

const open = ref(true)
const emit = defineEmits(['onClose'])

const handleCancel = () => {
  emit('onClose')
  open.value = false
}
</script>

<template>
  <div class="utilization-modal">
    <a-modal
      title="实时稼动率"
      :footer="null"
      v-model:open="open"
      @cancel="handleCancel"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
</style>