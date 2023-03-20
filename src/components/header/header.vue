<template>
  <div class="header">
    <el-button @click="toHome">Home</el-button>
    <div
      class="user-info"
      @click="handleClick"
      flex
      items-center
      cursor-pointer
    >
      <el-avatar :size="32">
        <el-icon><Avatar /></el-icon>
      </el-avatar>
      <div text-2xl p-xy color-gray-5>{{ userText }}</div>
    </div>
    <!-- 登录框 -->
    <el-dialog
      v-model="dialogVisible"
      title="登录"
      v-if="dialogVisible && !isLogin"
    >
      <!-- 登录框表单 -->
      <el-form
        :model="ruleForm"
        label-width="10%"
        ref="loginFormRef"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
            size="large"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            type="password"
            maxlength="16"
            size="large"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="primary" @click="loginFn(loginFormRef)">
          登录
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { loginAPI } from '@/api/user'

const router = useRouter()
const userStore = useUserStore()
const loginFormRef = ref<FormInstance>()

const userText = computed(() =>
  userStore.isLogin ? userStore.username : '请登录'
)
const isLogin = computed(() => userStore.isLogin)
const dialogVisible = ref(false)
const ruleForm = reactive({
  username: '',
  password: ''
})

const validateUsername = (rule: unknown, value: unknown, callback: any) => {
  if (ruleForm.username === '') {
    callback(new Error('用户名不能为空'))
  } else {
    callback()
  }
}

const validatePassword = (rule: unknown, value: unknown, callback: any) => {
  if (ruleForm.password === '') {
    callback(new Error('密码不能为空'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }]
})

const handleClick = () => {
  dialogVisible.value = true
}

const loginFn = (formEl: FormInstance | undefined) => {
  // 得加undefined 不然报类型错误
  if (!formEl) {
    ElMessage.error('无法查询到表单元素')
    dialogVisible.value = false
    return
  }
  formEl.validate((valid) => {
    if (valid) {
      loginAPI(ruleForm.username, ruleForm.password).then((res) => {
        console.log(res)
      })
    } else {
      ElMessage.error('用户名或密码不能为空')
      return false
    }
  })
}

const toHome = () => {
  router.push('/')
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
}
</style>
