<script setup>
import { ref, createVNode } from 'vue'
import { message, Modal } from 'ant-design-vue'
import SearchForm from '@/components/searchForm.vue'
import { userSearchParams } from '@/utils/constant'
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
    title: '工号',
    dataIndex: 'workNo',
    key: 'workNo',
  },
  {
    title: '姓名',
    dataIndex: 'realname',
    key: 'realname',
  },
  {
    title: '姓别',
    dataIndex: 'sex_dictText',
    key: 'sex_dictText',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    customRender: data => (Number(data.record.status) === 1 ? '正常' : '冻结'),
  },
  {
    title: '部门',
    dataIndex: 'orgCodeTxt',
    key: 'orgCodeTxt',
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
    status: 1,
    id: 13123323,
    workNo: '12345678',
    realname: '张三',
    sex_dictText: '男',
    phone: '18386258888',
    orgCodeTxt: '第十三事业部',
  },
  {
    key: 2,
    status: 2,
    id: 324344,
    workNo: '12345678',
    realname: '张三',
    sex_dictText: '女',
    phone: '18386258888',
    orgCodeTxt: '第十三事业部',
  },
]
</script>

<template>
  <div class="user_manage">
    <SearchForm
      :showDelete="true"
      @onAdd="handleAdd"
      @onDelete="handleDelete"
      @onSearch="handleSearch"
      :searchParams="userSearchParams"
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