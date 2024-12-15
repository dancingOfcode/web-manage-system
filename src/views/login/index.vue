<script setup>
import { reactive, onMounted } from 'vue'
import { signIn } from '@/api/api'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { accountReg, passwordReg } from '@/utils/constant'
import loginSvg from '@/assets/svg/loginSvg.svg'

const router = useRouter()

const formState = reactive({
  username: '',
  password: '',
  remember: true,
})

onMounted(() => {
  let form_state
  if (localStorage.getItem('form_state')) {
    form_state = JSON.parse(localStorage.getItem('form_state'))
  } else {
    return
  }
  if (form_state.remember) {
    formState.remember = true
    formState.username = form_state.username
    formState.password = form_state.password
  } else {
    formState.username = ''
    formState.password = ''
    formState.remember = false
  }
})

const onFinish = async values => {
  let params = {
    username: values.username,
    password: values.password,
  }
  let res = await signIn(params)
  message.info(res.message)
  if (res.code === 200) {
    const { token, userInfo } = res.result
    router.push({ path: '/home' })
    // 存储token
    localStorage.setItem('token', token)
    // 存储用户信息
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    // 持久化登录状态
    let formInfo = {
      username: values.username,
      password: values.password,
      remember: values.remember,
    }
    localStorage.setItem('form_state', JSON.stringify(formInfo))
  }
}
</script>

<template>
  <div class="login-wrap">
    <div class="header">
      <img src="@/assets/images/logo.png" alt="logo" />
      <div class="title">第十三事业部</div>
    </div>
    <div class="svg-wrap">
      <object class="svg animate-float" :data="loginSvg" type="image/svg+xml">
        当前浏览器不支持 SVG！请使用最新版本谷歌浏览器打开。
      </object>
      <div class="text">26号厂房指挥中心</div>
    </div>
    <div class="login-form">
      <div class="title">账号登录</div>
      <a-form
        class="form-wrap"
        :model="formState"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item
          name="username"
          :rules="[
            {
              required: true,
              message: '请输入账号！',
            },
            {
              pattern: accountReg,
              message:
                '账号格式错误，支持4到16位，由（字母，数字，下划线，减号）组成 。',
            },
          ]"
        >
          <a-input
            class="form-item"
            placeholder="账号"
            v-model:value="formState.username"
          />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[
            {
              required: true,
              message: '请输入密码！',
            },
            {
              pattern: passwordReg,
              message: '密码格式错误',
            },
          ]"
        >
          <a-input-password
            class="form-item"
            placeholder="密码"
            v-model:value="formState.password"
          />
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox class="remember" v-model:checked="formState.remember"
            >记住我</a-checkbox
          >
        </a-form-item>

        <a-form-item>
          <a-button class="form-item button" html-type="submit" type="primary"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.login-wrap {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  background: #f0f2f5;

  .header {
    display: flex;
    align-items: center;
    position: absolute;
    top: vw(24);
    left: vw(24);
    img {
      width: vw(100);
    }
    .title {
      font-size: vw(26);
      margin-left: vw(24);
    }
  }

  .svg-wrap {
    width: 61.8%;
    height: 25rem;
    text-align: center;

    .svg {
      width: 100%;
      height: 100%;
    }

    .text {
      color: #3361a9;
      font-size: vw(48);
      margin-top: vh(24);
      letter-spacing: 5px;
      font-weight: bold;
    }
  }

  .login-form {
    display: flex;
    position: absolute;
    right: vw(168);
    width: vw(500);
    height: vh(500);
    align-items: center;
    border-radius: 15px;
    box-sizing: border-box;
    justify-content: center;
    flex-direction: column;
    background: #fff;

    .title {
      color: #1677ff;
      font-size: vw(32);
      font-weight: bold;
      letter-spacing: 2px;
      margin-bottom: vh(36);
    }

    .form-wrap {
      width: 75%;
      .form-item {
        height: vh(52);
      }
      .remember {
        color: #1677ff;
      }
      .button {
        width: 100%;
        font-size: vw(22);
      }
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0); /* 动画开始时元素在原位置 */
    }
    25% {
      transform: translateY(-15px); /* 动画中间时元素向上移动 */
    }
    50% {
      transform: translateY(0px); /* 动画中间时元素向上移动 */
    }
    75% {
      transform: translateY(15px); /* 动画中间时元素向上移动 */
    }
    100% {
      transform: translateY(0px); /* 动画结束时元素向下移动 */
    }
  }

  .animate-float {
    animation: float 5s linear 0s infinite;
  }
}
</style>