<template>
    <el-table
            :data="queryList"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}">
        :row-class-name="tableRowClassName">
        <el-table-column type="index" prop="id" label="No" width="140">
        </el-table-column>
        <el-table-column prop="profileName" label="Profile" width="120">
        </el-table-column>
    </el-table>
</template>


<script>
import {receiveDataBaseProfile} from "../api/store";
    export default {
        name: 'data-profile',
        created() {
            this.receiveData()
        },

        data(){
            return {
                queryList: null,
            }
        },
        methods:{
            receiveData(){
                receiveDataBaseProfile().then(res => {
                    this.queryList = res
                    console.log(this.queryList)
                }).catch(() => {
                });
            },
        }

    }
</script>