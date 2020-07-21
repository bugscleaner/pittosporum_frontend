<template>

    <div>

        <div class="action-btn">
            <el-button-group>
                <el-button type="primary" disabled>Add Record</el-button>
                <el-button type="primary" disabled>Bulk Record</el-button>
            </el-button-group>
        </div>

        <el-table>
            <el-table-column prop="date" label="No" width="">
            </el-table-column>
            <el-table-column prop="name" label="Profile" width="">
            </el-table-column>
            <el-table-column prop="address" label="Execute SQL">

            </el-table-column>
            <el-table-column prop="name" label="Execute Result" width="">
            </el-table-column>
            <el-table-column prop="name" label="Execute Count" width="">
            </el-table-column>
            <el-table-column prop="name" label="Create By" width="">
            </el-table-column>
            <el-table-column prop="name" label="Create Time" width="">
            </el-table-column>
            <el-table-column prop="name" label="Action" width="">
            </el-table-column>
        </el-table>


        <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left">Prev</el-button>
            <el-button type="primary">Next<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>


    </div>

</template>


<script>
import {receiveStoreData}  from "../api/store";
export default {
    name: 'data-store',
    created(){
        this.receiveData()
    },
    methods:{
        receiveData (){
            receiveStoreData().then(() => {

            }).catch(() => {


            });
        }
    }
}
</script>