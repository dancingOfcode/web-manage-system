<script setup>
import { ref } from 'vue'

const emit = defineEmits(['onDeviceId'])

const options = ref([
  {
    value: 'Mikron_VCE_800_Pro_sldprt',
    label: 'Mikron_VCE_800_Pro_sldprt',
    position: {
      x: 150,
      y: 150,
      z: 50,
    },
  },
  {
    value: 'Mikron_VCE_800_Pro_sldprt1',
    label: 'Mikron_VCE_800_Pro_sldprt1',
    position: {
      x: 120,
      y: 150,
      z: 60,
    },
  },
])

const handleChange = value => {
  let selectDevice = options.value.filter(v => v.value === value)
  emit('onDeviceId', selectDevice[0])
}

// 搜索过滤
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const value = ref(undefined)
</script>

<template>
  <div class="device-select">
    <a-select
      show-search
      placeholder="请选择"
      style="width: 150px"
      :options="options"
      v-model:value="value"
      @change="handleChange"
      :filter-option="filterOption"
      :dropdownStyle="{ background: '#191e2d' }"
    ></a-select>
  </div>
</template>

<style lang="scss" scoped>
.device-select {
  position: absolute;
  top: vh(108);
  left: vw(468);
  z-index: 999;
}
</style>