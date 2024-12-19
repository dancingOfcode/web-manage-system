<script setup>
import { ref, createVNode } from 'vue'
import { message, Modal } from 'ant-design-vue'
import SearchForm from '@/components/searchForm.vue'
import { menuSearchParams } from '@/utils/constant'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const selectedData = ref([])
const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys, selectedRows) => {
    selectedData.value = selectedRows
  },
  onSelect: (record, selected, selectedRows) => {
    selectedData.value = selectedRows
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    selectedData.value = selectedRows
  },
})

// 新增
const handleAdd = () => {
  console.log('add')
}

// 删除
const handleDelete = () => {
  if (!selectedData.value.length) return message.info('请至少选择一条数据!')
  Modal.confirm({
    title: `确定删除?`,
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
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    key: 'menuType',
    customRender: data =>
      Number(data.record.menuType) === 0 ? '一级菜单' : '二级菜单',
  },
  {
    title: '排序',
    dataIndex: 'sortNo',
    key: 'sortNo',
  },
  {
    width: 185,
    title: '操作',
    key: 'operation',
    fixed: 'right',
  },
]

const tableData = [
  {
    key: 1,
    id: 13123323,
    name: '张三',
    sortNo: 1,
  },
  {
    key: 2,
    id: 131232323,
    name: '张三',
    sortNo: 12,
  },
]
</script>

<template>
  <div class="menu_manage">
    <SearchForm
      :showDelete="true"
      @onAdd="handleAdd"
      @onDelete="handleDelete"
      @onSearch="handleSearch"
      :searchParams="menuSearchParams"
    />
    <a-table
      class="cus-table"
      :columns="columns"
      :data-source="tableData"
      :row-selection="rowSelection"
      :scroll="{ x: 1300, y: 1000 }"
    >
      <template #bodyCell="{ column, record }">
        <div class="btn-wrap" v-if="column.key === 'operation'">
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