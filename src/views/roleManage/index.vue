<script setup>
import { ref, reactive, watch, createVNode } from 'vue'
import { message, Modal } from 'ant-design-vue'
import SearchForm from '@/components/searchForm.vue'
import { roleSearchParams, btnTextMap } from '@/utils/constant'
import RightDrawer from '@/components/rightDrawer.vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const openType = ref('')
const drawerRef = ref()
const formRef = ref();
const labelCol = {
  span: 5,
};
const wrapperCol = {
  span: 13,
};

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

// 授权
const authorize = () => {
  openType.value = 'auth'
  drawerRef.value.showDrawer()
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

const treeData = [
  {
    title: '北京车灯大屏驾驶舱',
    key: '1',
  },
  {
    title: '冲压模具大屏驾驶舱',
    key: '2',
  },
  {
    title: '衡阳车灯大屏驾驶舱',
    key: '3',
  },
  {
    title: '郑州车灯大屏驾驶舱',
    key: '4',
  },
  {
    title: '精密模塑大屏驾驶舱',
    key: '5',
  },
];

const expandedKeys = ref([]);
const selectedKeys = ref(['3']);
const checkedKeys = ref(['3']);

watch(expandedKeys, () => {
  console.log('expandedKeys', expandedKeys);
});

watch(selectedKeys, () => {
  console.log('selectedKeys', selectedKeys);
});

watch(checkedKeys, () => {
  console.log('checkedKeys', checkedKeys);
});
</script>

<template>
  <div class="role_manage">
    <SearchForm :showDelete="false" @onAdd="handleAdd" @onSearch="handleSearch" :searchParams="roleSearchParams" />
    <a-table class="cus-table" :columns="columns" :data-source="tableData" :scroll="{ x: 1300, y: 1000 }">
      <template #bodyCell="{ column, record }">
        <div class="btn-wrap" v-if="column.key === 'operation'">
          <a-button type="primary" class="btn" @click="authorize">授权</a-button>
          <a-button type="primary" class="btn" @click="itemEdit">编辑</a-button>
          <a-button type="primary" @click="itemDelete(record)">删除</a-button>
        </div>
      </template>
    </a-table>
  </div>
  <RightDrawer ref="drawerRef" :title="(`${btnTextMap[openType] + (openType !== 'auth' ? '角色' : '')}`)">
    <template v-if="openType !== 'auth'" v-slot:content>
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
    <template v-if="openType === 'auth'" v-slot:content>
      <a-tree v-model:expandedKeys="expandedKeys" v-model:selectedKeys="selectedKeys" v-model:checkedKeys="checkedKeys"
        checkable :tree-data="treeData">
        <template #title="{ title, key }">
          <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
          <template v-else>{{ title }}</template>
        </template>
      </a-tree>
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