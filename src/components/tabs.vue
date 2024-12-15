<script setup>
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'

const currentId = ref(3)

const emit = defineEmits(['onCurrentId'])

onMounted(() => {
  emit('onCurrentId', currentId.value)
})

const itemClick = e => {
  const id = Number(e.target.id)
  if (currentId.value === id) {
    return message.warning('已切换到当前菜单，请勿重复点击！')
  }
  if (id !== 3) {
    return message.info('该模块暂未开放，敬请期待！')
  }

  currentId.value = id
  emit('onCurrentId', id)
}
</script>

<template>
  <div class="tab-warap" @click="itemClick">
    <div class="left">
      <div :class="['item', { active: currentId === 1 }]" id="1">全景预览</div>
      <div :class="['item', { active: currentId === 2 }]" id="2">计划管理</div>
      <div :class="['item', { active: currentId === 3 }]" id="3">设备管理</div>
      <div :class="['item', { active: currentId === 4 }]" id="4">品质管理</div>
    </div>
    <div class="right">
      <div :class="['item', { active: currentId === 5 }]" id="5">全景预览</div>
      <div :class="['item', { active: currentId === 6 }]" id="6">计划管理</div>
      <div :class="['item', { active: currentId === 7 }]" id="7">设备管理</div>
      <div :class="['item', { active: currentId === 8 }]" id="8">品质管理</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-warap {
  display: flex;
  position: absolute;
  top: 0;
  width: 78vw;
  height: vh(62);
  z-index: 999;
  justify-content: space-between;
  .left,
  .right {
    width: vw(450);
    display: flex;
    color: #fff;
    padding: 0 vw(16);
    letter-spacing: 1px;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;

    .item {
      cursor: pointer;
      white-space: nowrap;
      padding: vh(6) vw(10);
      background: url('@/assets/images/tab_bg.png') no-repeat;
      background-size: 100% 100%;
      &:hover {
        background: url('@/assets/images/tab_selected_bg.png') no-repeat;
        background-size: 100% 100%;
      }

      &.active {
        background: url('@/assets/images/tab_selected_bg.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>