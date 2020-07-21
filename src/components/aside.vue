<template>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu  :router="true"  :default-openeds="['1']">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-s-goods" tabindex="1"></i>Resource</template>
                <el-menu-item-group>
                    <el-menu-item index="" ><router-link to="/mgr/profile">Profile List</router-link></el-menu-item>
                    <el-menu-item index="" ><router-link to="/mgr/store">Store Management</router-link></el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-s-goods" tabindex="1"></i>Job Configuration</template>
                <el-menu-item-group>
                    <el-menu-item index="" ><router-link to="/mgr/profile">Job Management</router-link></el-menu-item>
                    <el-menu-item index="" ><router-link to="/mgr/store">Trigger Log</router-link></el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: 'common-aside'
    }
</script>