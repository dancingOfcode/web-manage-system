<template>
  <a-layout style="min-height: 100vh; min-width: 256px">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img src="../../assets/images/logo.png" style="height: 30px" />
        <span
          style="
            font-weight: 700;
            font-size: 16px;
            color: #32b768;
            opacity: 1;
            transition: opacity 1s;
            animation: fade 1s;
          "
          v-if="!collapsed"
          >智慧看板管理系统</span
        >
      </div>
      <a-menu
        mode="inline"
        theme="dark"
        :items="menuItems"
        style="width: 100%"
        :open-keys="state.openKeys"
        :inline-collapsed="state.collapsed"
        v-model:selectedKeys="state.selectedKeys"
        @openChange="onOpenChange"
        @select="onClick"
      ></a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <!-- 菜单折叠 -->
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <!-- 登录 -->
        <div class="topAvatar">
          <img class="avatar" src="../../assets/images/avatar.png" />
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              {{ username }}
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item @confirm="onConfirm">退出登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <!-- 二级路由出口(home等等，通常放在main主区域) -->
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import {
  UserOutlined,
  UsergroupAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  DownOutlined,
  FolderAddOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import { signOut } from '@/api/api'
import { h, ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { menuData } from '@/utils/constant'

const username = ref('admin')
const collapsed = ref(false)
const router = useRouter()
const route = useRoute()
const menuItems = reactive([])
const state = reactive({
  openKeys: [],
  selectedKeys: [],
  rootSubmenuKeys: [],
})

onMounted(() => {
  handleMenuData(menuData)
})

const onConfirm = async e => {
  const res = await signOut()
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  message.success(res.data)
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
      () => h(MailOutlined),
      item.child
        ? item.child.map(item => getItem(item.name, item.key, item.path))
        : null
    )
  })
  // 默认展示第一个菜单url
  state.selectedKeys = [route.path.replace('/', '')]
}

const onOpenChange = openKeys => {
  const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1)
  if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    state.openKeys = openKeys
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
  // 处理跳转
  setTimeout(() => {
    if (openKeys.length) {
      let selectMenu = menuData.filter(v => v.key == openKeys[0])[0]['child'][0]
      state.selectedKeys = [selectMenu.key]
      router.push(selectMenu.path)
    }
  })
}

const onClick = menuInfo => {
  let { item, key } = menuInfo
  if (item.path) router.push(item.path)
  // 点击主页收起其他菜单
  if (key === 'home') state.openKeys = []
}
</script>

<style lang='scss' scoped>
aside {
  min-width: 256px !important;
  max-width: 256px !important;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 36px;
  margin: 16px;
  color: #fff;
  display: flex;
  gap: 10px;
  align-items: center;
  padding-left: 10px;
}

.topAvatar {
  display: flex;
  align-items: center;
  float: right;
  margin-right: 40px;
  .avatar {
    width: 36px;
    height: 36px;
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
    margin: 0 20px;
  }
  .logoutLink {
    text-decoration: none;
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
