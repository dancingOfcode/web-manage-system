<template>
    <a-drawer class="cus-drawer" v-model:open="open" :title="title" width="520" :closable="false"
        :footer-style="{ textAlign: 'right' }" @close="closeDrawer">
        <slot name="content"></slot>
        <template #footer>
            <slot name="footer" class="footer"></slot>
        </template>
    </a-drawer>
</template>
<script setup>
import { ref } from 'vue';

const open = ref(false);
const props = defineProps(['title'])

const showDrawer = () => {
    open.value = true;
};

const closeDrawer = () => {
    open.value = false;
};

defineExpose({ showDrawer, closeDrawer })
</script>