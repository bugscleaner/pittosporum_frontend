<template>
    <el-table>
        <el-table-column prop="date" label="No" width="140">
        </el-table-column>
        <el-table-column prop="name" label="Profile" width="120">
        </el-table-column>
        <el-table-column prop="name" label="Create By" width="120">
        </el-table-column>
    </el-table>
</template>


<script>
    export default {
        name: 'data-profile',
        created() {
            console.log("pro")
        }
    }
</script>