<script setup>
import { h, ref, reactive, onMounted } from 'vue'
import {
  DownOutlined,
  CloseOutlined,
  MenuFoldOutlined,
  FullscreenOutlined,
  MenuUnfoldOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons-vue'
import { signOut } from '@/api/api'
import { useFullScreen } from '@/hooks'
import { menuData } from '@/utils/constant'
import { useRouter, useRoute } from 'vue-router'

const username = ref('admin')
const collapsed = ref(false)
const router = useRouter()
const route = useRoute()
const menuItems = reactive([])
const tagsData = ref([])
const { isFullScreen, toggleFullScreen } = useFullScreen()
const state = reactive({
  openKeys: [],
  selectedKeys: [],
  rootSubmenuKeys: [],
})

onMounted(() => {
  handleMenuData(menuData)
})

const onConfirm = async e => {
  // const res = await signOut()
  router.replace('/login')
}

const getItem = (label, key, path, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
    path,
  }
}

const handleMenuData = data => {
  if (!data.length) return
  data.forEach((item, idx) => {
    menuItems[idx] = getItem(
      item.name,
      item.key,
      item.path,
      () => h(item.icon),
      item.child
        ? item.child.map(item => getItem(item.name, item.key, item.path))
        : null
    )
  })
  // 默认展示第一个菜单url
  if (route.name === 'layout')
    if (route.name === 'layout') {
      handleTagsData('首页', '/home')
      state.selectedKeys = ['home']
    } else {
      handleTagsData(route.name, route.path)
      state.selectedKeys = [route.path.replace('/', '')]
    }
}

const onOpenChange = openKeys => {
  const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1)
  if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    state.openKeys = openKeys
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
  // 处理跳转
  if (openKeys.length) {
    let { selectedKeys } = state
    let selectInfo = menuData.filter(v => v.key == openKeys[0])
    let selectMenu = selectInfo[0]['child'][0]
    // 判断当前菜单是否有子菜单被选中
    if (selectInfo.length && state.selectedKeys.length) {
      let isSelected = selectInfo[0]['child'].filter(
        v => v.key === selectedKeys[0]
      )
      if (isSelected?.length) return
    }
    state.selectedKeys = [selectMenu.key]
    router.push(selectMenu.path)
    handleTagsData(selectMenu.name, selectMenu.path)
  }
}

const onClick = menuInfo => {
  let { item, key } = menuInfo
  if (item.path) router.push(item.path)
  // 点击主页收起其他菜单
  if (key === 'home') state.openKeys = []
  // 处理tags标签
  handleTagsData(item.originItemValue.label, item.path)
}

// 处理tags数据
const handleTagsData = (selectLabel, path) => {
  let isExit = false
  tagsData.value.forEach(v => v.label === selectLabel && (isExit = true))
  if (!isExit) {
    tagsData.value = [...tagsData.value, { label: selectLabel, path }]
  }
}

// 关闭菜单
const closeTag = (index, path) => {
  tagsData.value.splice(index, 1)
  // 若当前关闭为选中  则选中最后一个
  if (`/${state.selectedKeys}` === path) {
    router.push(tagsData.value[tagsData.value.length - 1]['path'])
    state.selectedKeys = [
      tagsData.value[tagsData.value.length - 1]['path'].replace('/', ''),
    ]
  }
}

// tans选中
const tagItemClick = path => {
  router.push(path)
  state.selectedKeys = [path.replace('/', '')]
}
</script>

<template>
  <a-layout>
    <div class="left-menu" :style="{ width: collapsed ? '80px' : '220px' }">
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo">
          <img src="@/assets/images/logo.png" style="height: 30px" />
          <span class="title" v-if="!collapsed">智慧看板管理系统</span>
        </div>
        <a-menu mode="inline" theme="dark" :items="menuItems" style="width: 100%" :open-keys="state.openKeys"
          :inline-collapsed="state.collapsed" v-model:selectedKeys="state.selectedKeys" @openChange="onOpenChange"
          @select="onClick"></a-menu>
      </a-layout-sider>
    </div>
    <a-layout class="right-wrap">
      <a-layout-header class="top-header" style="background: #fff; padding: 0">
        <!-- 菜单折叠 -->
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <!-- 登录 -->
        <div class="avatar-wrap">
          <img class="avatar" src="@/assets/images/avatar.png" />
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              {{ username }}
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="onConfirm">退出登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <div class="nav-tags">
        <div class="tags">
          <div :key="item.label" class="tag-item" v-for="(item, index) in tagsData" :class="'/' + state.selectedKeys[0] === item.path ? 'tag-active' : ''
            ">
            <div class="txt" @click="tagItemClick(item.path)">
              {{ item.label }}
            </div>
            <CloseOutlined title="关闭" class="close-btn" v-if="tagsData.length > 1"
              @click="closeTag(index, item.path)" />
          </div>
        </div>
        <div class="screen-btn-wrap" @click="toggleFullScreen">
          <FullscreenOutlined title="全屏" class="screen-btn" v-if="!isFullScreen" />
          <FullscreenExitOutlined title="退出全屏" class="screen-btn" v-if="isFullScreen" />
        </div>
      </div>
      <a-layout-content class="content">
        <!-- 二级路由出口 -->
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang='scss' scoped>
.left-menu {
  height: 100vh;

  aside {
    height: 100%;
    min-width: 100% !important;

    .logo {
      gap: 10px;
      height: vh(36);
      margin: vw(16);
      color: #fff;
      display: flex;
      align-items: center;
    }

    .title {
      opacity: 1;
      font-weight: 600;
      font-size: 16px;
      color: #32b768;
      animation: fade 1s;
      transition: opacity 1s;
    }
  }
}

.right-wrap {
  .top-header {
    .trigger {
      cursor: pointer;
      font-size: vw(18);
      padding: 0 vw(24);
      transition: color 0.3s;
    }

    .trigger:hover {
      color: #1890ff;
    }

    .avatar-wrap {
      display: flex;
      align-items: center;
      float: right;
      margin-right: vw(36);

      .avatar {
        width: vh(36);
        height: vh(36);
        border-radius: 50%;
        margin-right: 5px;
      }

      div {
        display: inline-block;
      }

      .el-dropdown-link {
        color: #fff;
      }

      .el-avatar {
        margin: 0 vw(20);
      }

      .logoutLink {
        text-decoration: none;
      }
    }
  }

  .nav-tags {
    display: flex;
    height: vh(48);
    background: #fff;
    padding: vh(4) vw(16);
    justify-content: space-between;
    border-top: 1px solid #e5e7eb;

    .tags {
      display: flex;

      .tag-item {
        display: flex;
        height: 100%;
        cursor: pointer;
        color: #006be6;
        padding: 0 vw(16);
        min-width: vw(120);
        margin-right: vw(5);
        align-items: center;
        border-radius: 5px;
        justify-content: space-around;
        border: 1px solid #e4e4e7;

        &.tag-active {
          background: #d9e9fb;
        }

        .close-btn {
          margin-left: vw(12);

          &:hover {
            color: #fff;
          }
        }
      }
    }

    .screen-btn-wrap {
      display: flex;
      align-items: center;

      .screen-btn {
        cursor: pointer;
        font-size: vw(32);
      }
    }
  }

  .content {
    padding: vw(24);
    background: #fff;
    min-height: vh(280);
    margin: vh(24) vw(16);
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
