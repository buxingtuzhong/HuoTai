<template>
<div>
    <div class="select_box">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="姓名">
              <el-input v-model="selectData.nickName" placeholder="请输入关姓名" />
            </el-form-item>
            <el-form-item label="角色">
                <!-- element选择器 -->
                <el-select v-model="selectData.role" placeholder="请选择" >
                   <!-- if(value===0){label==='全部'} -->
                    <el-option
                    label="全部"
                    :value="0"
                    />


                    <el-option
                      v-for="item in roleList"
                      :key="item.roleId"
                      :label="item.roleName"
                      :value="item.roleId"
                    />


                  </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
    </div>

    <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="nickName" label="姓名" width="180" />

        <!-- role是一个数组 使用element的表格插槽  scope里有row-->
        <el-table-column prop="role" label="角色" >
            <template #default="scope">

                <el-button
                  v-for="item in scope.row.role"
                  :key="item.role"
                  link
                  size="small"
                >
                  {{item.roleName}}
                </el-button>
              </template>
</el-table-column>


<el-table-column prop="role" label="操作">
    <template #default="scope">

                    <el-button
                      link
                      typeof="primary"
                      size="small"
                      @click="changeUser(scope.row)"
                    >
                      编辑
                    </el-button>
                  </template>
</el-table-column>
</el-table>
</div>

<el-dialog v-model="isShow" title="编辑信息">

    <el-form :model="active">

        <el-form-item label="姓名" label-width="50px">
            <el-input v-model="active.nickName" autocomplete="off" />
        </el-form-item>

        <el-form-item label="角色" label-width="50px">
            <el-select multiple v-model="active.role" placeholder="请选择角色">
                <!-- //multiple多选 -->
                <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
            </el-select>

        </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="updateUser">更改</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >取消</el-button
      >
    </span>
  </template>
</el-dialog>


</template>

<script lang="ts">
    import {
        defineComponent,
        onMounted,
        reactive,
        toRefs,
        watch
    } from 'vue';
    import {
        getUserList,
        getRoleList
    } from '../request/api'
    // import {}
    import {
        InitData,
        ListInt
    } from '../type/user'
    export default defineComponent({
        setup() {
            const data = reactive(new InitData())
            onMounted(() => {
                getUser()
                getROle()
            })
            const getUser = () => {
                getUserList().then((res) => {
                    // console.log('####', res)
                    data.list = res.data
                })
            }
            const getROle = () => {
                getRoleList().then((res) => {
                    // console.log('￥￥####', res)
                    data.roleList = res.data
                        // 提供给上面循环使用
                })
            }
            const onSubmit = () => {
                let arr: ListInt[] = [] //定义数据用来接收查询后用于展示的数据
                if (data.selectData.nickName || data.selectData.role) {
                    if (data.selectData.nickName) {
                        arr = data.list.filter((value) => { //将过滤出来的数组
                            return value.nickName.indexOf(data.selectData.nickName) !== -1
                        })
                    }
                    if (data.selectData.role) {
                        arr = (data.selectData.nickName ? arr : data.list).filter((value) => { //将过滤出来的数组
                            return value.role.find((item) => item.role === data.selectData.role)
                        })
                    }
                } else {
                    arr = data.list
                }

                data.list = arr
            }

            //监听输入框的属性
            watch([() => data.selectData.nickName, () => data.selectData.role], () => {
                if (data.selectData.nickName == '' && data.selectData.role === 0) {
                    getUser()
                }
            })
            const changeUser = (row: ListInt) => {
                // console.log("########", row)
                data.isShow = true //弹出弹出框
                data.active = {
                    id: row.id,
                    nickName: row.nickName,
                    userName: row.userName,
                    role: row.role.map((value: any) => value.role || value.roleId)
                }

            }
            const updateUser = () => {
                // console.log(data.active)
                let obj: any = data.list.find((value) => value.id == data.active.id)
                obj.nickName = data.active.nickName
                    // data.active.role-->[1,2] 选中用户和管理员
                console.log('$$##', data.active.role)


                obj.role = data.roleList.filter(value => data.active.role.indexOf(value.roleId) !== -1)
                console.log('$$###', obj.role)

                data.list.forEach((item, i) => {
                    // 渲染到页面
                    if (item.id == obj.id) {
                        data.list[i] = obj
                    }
                })
                data.isShow = false
                    // console.log('#', data.list[i])
            }
            return {...toRefs(data),
                onSubmit,
                changeUser,
                updateUser
            }
        }
    })
</script>
<style lang='scss' scoped>

</style>