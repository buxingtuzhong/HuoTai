<template>
<div class='login_box'>


    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="100px"
    class="demo-ruleForm"
  >
    <h2>后台管理系统</h2>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" autocomplete="off" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
  
    <el-form-item>
      <el-button class="login_btn" type="primary" @click="submitForm(ruleFormRef)"
    >登录</el-button>

      <el-button class="login_btn" @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs,
        ref
    } from 'vue';
    import {
        LoginData
    } from "../type/login";
    import {
        FormInstance
    } from 'element-plus';
    import {
        login,
        loginData
    } from '../request/api'
    import router from '@/router';
    import {
        concat
    } from 'lodash';
    export default defineComponent({
        setup() {
            const data = reactive(new LoginData)
            const rules = {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 10,
                    message: '用户名长度应该是3-10',
                    trigger: 'blur'
                }, ],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 10,
                    message: '密码长度应该是3-10',
                    trigger: 'blur'
                }, ]
            }


            const ruleFormRef = ref < FormInstance > ();
            // 提交
            const submitForm = (formEl: FormInstance | undefined) => {
                if (!formEl) return;
                console.log(111)
                formEl.validate((valid) => {
                    if (valid) {
                        login(data.ruleForm).then((res: any) => {
                                if (res.data.token === "admin_token") {
                                    console.log(22)
                                        // console.log(22)

                                    // 将token进行保存
                                    localStorage.setItem("token", res.data.token)
                                        // 跳转页面
                                    router.push('/')
                                } else {
                                    alert("用户密码输入错误")
                                }
                            })
                            // console.log('submit!')

                    } else {
                        console.log('error submit!')
                        return false
                    }
                })
            }
            const resetForm = () => {
                data.ruleForm.username = ''
                data.ruleForm.password = ''
            }
            return {...toRefs(data),
                rules,
                ruleFormRef,
                submitForm,
                resetForm
            }
        }
    })
</script>
<style lang='scss' scoped>
    .login_box {
        width: 100%;
        height: 100%;
        background: url("../assets/bg.jpg");
        padding-top: 1px;
    }
    
    .demo-ruleForm {
        text-align: center;
        width: 500px;
        margin: 200px auto;
        background-color: #fff;
        border-radius: 15px;
        padding: 20px;
    }
    
    h2 {
        margin-bottom: 10px;
    }
    
    .login_btn {
        width: 48%;
    }
</style>