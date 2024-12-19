<script setup>
import { reactive, ref } from 'vue'
import { UpOutlined, DownOutlined } from '@ant-design/icons-vue'

const formRef = ref()
const expand = ref(false)
const formState = reactive({})
const props = defineProps(['showDelete', 'searchParams'])
const emit = defineEmits(['onAdd', 'onDelete', 'onSearch'])

// 新增
const handleAdd = () => {
  emit('onAdd')
}

// 删除
const handleDelete = () => {
  emit('onDelete')
}

// 查询
const onFinish = values => {
  emit('onSearch', values)
}
</script>

<template>
  <div class="user-manage">
    <a-form
      ref="formRef"
      name="advanced_search"
      class="ant-advanced-search-form"
      :model="formState"
      @finish="onFinish"
    >
      <a-row :gutter="24">
        <template v-for="(item, index) in searchParams" :key="item.key">
          <a-col v-show="expand || index <= 6" :span="8">
            <a-form-item
              :name="item.key"
              :label="item.label"
              :rules="[
                {
                  required: item.isRequired,
                  message: `请输入${
                    item.type === 'input' ? '请输入' : '请选择' + item.label
                  }`,
                },
              ]"
            >
              <a-input
                placeholder="请输入"
                v-if="item.type === 'input'"
                v-model:value="formState[`${item.key}`]"
              ></a-input>
              <a-select
                placeholder="请选择"
                v-if="item.type === 'select'"
                v-model:value="formState[`${item.key}`]"
              >
                <a-select-option
                  :key="v.label"
                  :value="v.value"
                  v-for="v in item.options"
                  >{{ v.label }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
      <a-row>
        <a-col :span="24" class="btn-wrap">
          <div class="left">
            <a-button type="primary" class="btn" @click="handleAdd"
              >新增</a-button
            >
            <a-button
              class="btn"
              type="primary"
              v-if="showDelete"
              @click="handleDelete"
              >删除</a-button
            >
          </div>
          <div class="right">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin: 0 8px" @click="() => formRef.resetFields()"
              >重置</a-button
            >
            <a
              style="font-size: 12px"
              @click="expand = !expand"
              v-if="searchParams.length > 6"
            >
              <template v-if="expand">
                <UpOutlined />
              </template>
              <template v-else>
                <DownOutlined />
              </template>
            </a>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
#components-form-demo-advanced-search .ant-form {
  max-width: none;
}

#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

[data-theme='dark'] .ant-advanced-search-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}

[data-theme='dark'] #components-form-demo-advanced-search .search-result-list {
  border: 1px dashed #434343;
  background: rgba(255, 255, 255, 0.04);
}

.btn-wrap {
  display: flex;
  justify-content: space-between;
  .left {
    .btn {
      margin-right: vw(12);
    }
  }
}
</style>