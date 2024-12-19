<script setup>
import { reactive, ref, toRaw, createVNode } from 'vue';
import { message, Modal } from 'ant-design-vue'
import SearchForm from '@/components/searchForm.vue'
import { userSearchParams, btnTextMap } from '@/utils/constant'
import RightDrawer from '@/components/rightDrawer.vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const openType = ref('')
const drawerRef = ref()
const selectedData = ref([])
const formRef = ref();
const labelCol = {
  span: 5,
};
const wrapperCol = {
  span: 13,
};
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
  openType.value = 'add'
  drawerRef.value.showDrawer()
}

// 编辑 itemEdit
const itemEdit = () => {
  openType.value = 'edit'
  drawerRef.value.showDrawer()
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

const formState = reactive({
  workNo: '',
  phone: '',
  sex: undefined,
  status: undefined,
  orgCode: undefined,
  realname: undefined,
});

const rules = {
  workNo: [
    {
      required: true,
      message: '请输入工号',
      trigger: 'change',
    },
  ],
  realname: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'change',
    },
    {
      min: 3,
      max: 5,
      message: '长度3~5之间',
      trigger: 'blur',
    },
  ],
};

const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', formState, toRaw(formState));
    })
    .catch(error => {
      console.log('error', error);
    });
};
</script>

<template>
  <div class="user_manage">
    <SearchForm :showDelete="true" @onAdd="handleAdd" @onDelete="handleDelete" @onSearch="handleSearch"
      :searchParams="userSearchParams" />
    <a-table class="cus-table" :columns="columns" :data-source="tableData" :row-selection="rowSelection"
      :scroll="{ x: 1300, y: 1000 }">
      <template #bodyCell="{ column, record }">
        <div class="btn-wrap" v-if="column.key === 'operation'">
          <a-button type="primary" class="btn" @click="itemEdit">编辑</a-button>
          <a-button type="primary" @click="itemDelete(record)">删除</a-button>
        </div>
      </template>
    </a-table>
  </div>
  <RightDrawer ref="drawerRef" :title="(`${btnTextMap[openType]}用户`)">
    <template v-slot:content>
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item ref="name" label="工号" name="workNo">
          <a-input v-model:value="formState.workNo" />
        </a-form-item>
        <a-form-item ref="name" label="姓名" name="realname">
          <a-input v-model:value="formState.realname" />
        </a-form-item>
        <a-form-item ref="name" label="手机号" name="phone">
          <a-input v-model:value="formState.phone" />
        </a-form-item>
        <a-form-item ref="name" label="部门" name="orgCode">
          <a-input v-model:value="formState.orgCode" />
        </a-form-item>
        <a-form-item label="性别" name="sex">
          <a-select v-model:value="formState.sex" placeholder="请选择性别">
            <a-select-option value="1">男</a-select-option>
            <a-select-option value="2">女</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-select v-model:value="formState.status" placeholder="请选择状态">
            <a-select-option value="1">正常</a-select-option>
            <a-select-option value="2">冻结</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </template>
    <template v-slot:footer>
      <a-button style="margin-right:12px" @click="drawerRef.closeDrawer()">取消</a-button>
      <a-button type="primary" @click="onSubmit">确定</a-button>
    </template>
  </RightDrawer>
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