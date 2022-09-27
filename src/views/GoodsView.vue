<template>
<div>
    <div class="select_box">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="标题">
              <el-input v-model="selectData.title" placeholder="请输入关键字" />
            </el-form-item>
            <el-form-item label="详情">
                <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">按钮</el-button>
            </el-form-item>
          </el-form>
    </div>
    <el-table :data="dataList.comList" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="introduce" label="详情" />
            
      </el-table>
      <el-pagination @current-change="currentchange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count*2" />
</div>
</template>

<script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs,
        computed
    } from 'vue';
    import {
        getGoodList
    } from '@/request/api';
    import {
        InitData,
        ListInt
    } from "../type/goods"
    export default defineComponent({
        setup() {
            const data = reactive(new InitData())
            getGoodList().then((res) => {
                // console.log('###', res)
                data.list = res.data
                data.selectData.count = res.data.length
            })
            const currentchange = (page: number) => {
                data.selectData.page = page

                console.log('###', page)
            }
            const sizechange = (pagesize: number) => {
                data.selectData.pagesize = pagesize
                    // console.log('###$$', pagesize)
            }
            const dataList = reactive({
                comList: computed(() => {
                    return data.list.slice(
                        (data.selectData.page - 1) * data.selectData.pagesize,
                        data.selectData.page * data.selectData.pagesize)
                })
            })
            const onSubmit = () => {
                let arr: ListInt[] = []
                if (data.selectData.title || data.selectData.introduce) {
                    if (data.selectData.title) {
                        arr = data.list.filter((value) => {
                            return value.title.indexOf(data.selectData.title) !== -1
                        })
                    }
                    if (data.selectData.introduce) {
                        arr = data.list.filter((value) => {
                            return value.introduce.indexOf(data.selectData.introduce) !== -1
                        })
                    }
                } else {
                    arr = data.list
                }
                data.selectData.count = arr.length
                data.list = arr

            }
            return {
                ...toRefs(data),
                currentchange,
                sizechange,
                dataList,
                onSubmit
            }
        }
    })
</script>
<style lang='scss' scoped>

</style>