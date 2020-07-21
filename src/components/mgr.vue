<template>
    <el-container style="height: 100%">
        <el-header>
            <common-header></common-header>
        </el-header>

        <el-container>
            <el-aside width="auto">
                <common-aside></common-aside>
            </el-aside>

            <el-main style="width: auto">
                <router-view></router-view>
            </el-main>
        </el-container>

    </el-container>
</template>

<script>
import commonAside from '../components/aside'
import commonHeader from '../components/header';
import commonMainFrame from '../components/mainFrame';
import dataProfile from './profile'
import dataStore from './store'
export default {
    name: 'mgr',
    components: {
        commonAside,
        commonHeader,
        commonMainFrame,
        dataProfile,
        dataStore
    }
};
</script>