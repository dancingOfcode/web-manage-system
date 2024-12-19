<script setup>
import { ref, createVNode } from 'vue'
import { message, Modal } from 'ant-design-vue'
import SearchForm from '@/components/searchForm.vue'
import { roleSearchParams } from '@/utils/constant'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

// 新增
const handleAdd = () => {
  console.log('add')
}

// 批量删除
const handleSearch = () => {
  Modal.confirm({
    title: `确定删掉工号为：${record.workNo} 的用户信息吗?`,
    icon: createVNode(ExclamationCircleOutlined),
    okText: '确定',
    cancelText: '取消',
    onOk() {
      console.log('OK')
    },
    onCancel() {
      console.log('Cancel')
    },
  })
}

// 当前列删除
const itemDelete = record => {
  Modal.confirm({
    title: `确定删掉工号为：${record.workNo} 的用户信息吗?`,
    icon: createVNode(ExclamationCircleOutlined),
    okText: '确定',
    cancelText: '取消',
    onOk() {
      console.log('OK')
    },
    onCancel() {
      console.log('Cancel')
    },
  })
}

const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: '角色编码',
    dataIndex: 'roleCode',
    key: 'roleCode',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    width: 245,
    title: '操作',
    key: 'operation',
    fixed: 'right',
  },
]

const tableData = [
  {
    key: 1,
    id: 13123323,
    roleCode: '12345678',
    roleName: '张三',
    createTime: '2024-12-19',
  },
  {
    key: 2,
    id: 13123323,
    roleCode: '12345678',
    roleName: '张三',
    createTime: '2024-12-19',
  },
]
</script>

<template>
  <div class="role_manage">
    <SearchForm
      :showDelete="false"
      @onAdd="handleAdd"
      @onSearch="handleSearch"
      :searchParams="roleSearchParams"
    />
    <a-table
      class="cus-table"
      :columns="columns"
      :data-source="tableData"
      :scroll="{ x: 1300, y: 1000 }"
    >
      <template #bodyCell="{ column, record }">
        <div class="btn-wrap" v-if="column.key === 'operation'">
          <a-button type="primary" class="btn">授权</a-button>
          <a-button type="primary" class="btn">编辑</a-button>
          <a-button type="primary" @click="itemDelete(record)">删除</a-button>
        </div>
      </template>
    </a-table>
  </div>
</template>

<style lang="scss" scoped>
.cus-table {
  margin-top: vh(24);
}

.btn-wrap {
  display: flex;
  .btn {
    margin-right: vw(12);
  }
}
</style>