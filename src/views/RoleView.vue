<template>
    <div>
        <el-form :inline="true" class="search-form">

            <el-form-item>
              <el-button type="text" @click="open()">添加角色</el-button>
            </el-form-item>
          </el-form>
        
        
    
                <el-table :data="list" border style="width: 100%">
                    <el-table-column prop="roleId" label="ID" width="180" />
                    <el-table-column prop="roleName" label="角色名" width="180" />
            
                    <!-- role是一个数组 使用element的表格插槽  scope里有row-->
                    <el-table-column prop="authority" label="操作" >
                        <template #default="scope">
            
                            <el-button
                              link
                              size="small"
                              @click="changeRole(scope.row)"
                            >
                             修改权限
                            </el-button>
                          </template>
</el-table-column>


</el-table>
</div>

</template>

<script lang="ts">
    import {
        defineComponent,
        onMounted,
        reactive,

        toRefs
    } from 'vue';
    import {
        getRoleList
    } from '@/request/api';
    import {
        InitData,
        ListInt
    } from '@/type/role';
    import {
        ElMessage,
        ElMessageBox
    } from 'element-plus'
    import {
        useRouter
    } from 'vue-router';
    export default defineComponent({
        setup() {
            const data = reactive(new InitData())
            const router = useRouter()
            onMounted(() => {
                getRoleList().then((res) => {
                    console.log('##', res)
                    data.list = res.data
                })
            })

            const open = () => {
                ElMessageBox.prompt('Please input your e-mail', 'Tip', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                        inputErrorMessage: 'Invalid Email',
                    })
                    .then(({
                        value
                    }) => {
                        ElMessage({
                            type: 'success',
                            message: `Your email is:${value}`,
                        })
                    })
                    .catch(() => {
                        ElMessage({
                            type: 'info',
                            message: 'Input canceled',
                        })
                    })
            }
            const changeRole = (row: ListInt) => {
                router.push({
                    name: "authority",
                    params: {
                        id: row.roleId,
                        authority: row.authority
                    }
                })
            }
            return {
                ...toRefs(data),
                open,
                changeRole

            };
        }
    })
</script>
<style lang='scss' scoped>

</style>