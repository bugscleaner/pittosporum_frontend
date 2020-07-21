<template>
    <el-main>
        <el-table>
            <el-table-column prop="date" label="No" width="140">
            </el-table-column>
            <el-table-column prop="name" label="Profile" width="120">
            </el-table-column>
            <el-table-column prop="address" label="SQL">
            </el-table-column>
        </el-table>
    </el-main>
</template>


<script>
    export default {
        name: 'common-main'
    }
</script>