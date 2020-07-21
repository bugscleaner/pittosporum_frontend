<template>
    <el-header style="text-align: right; font-size: 12px">
        <span>User</span>
        <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>login out</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</template>

<script>
    export default {
        name: 'common-header'
    }
</script>