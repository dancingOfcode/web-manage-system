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
  <div class="maintain-modal">
    <a-modal
      title="故障维修明细"
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