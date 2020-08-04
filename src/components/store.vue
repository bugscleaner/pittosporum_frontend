<template>
    <div>
    <el-table
            :data="queryList"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}">
            :row-class-name="tableRowClassName">
            <el-table-column
                    type="index"
                    label="No"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="profileId"
                    label="Profile"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="executeSql"
                    label="Execute SQL"
                    sortable
                    >
            </el-table-column>

            <el-table-column
                    prop="executeResult"
                    label="Execute Result"
                    sortable
                    >
            </el-table-column>

            <el-table-column
                    prop="runCount"
                    label="Execute Count"
                    sortable
                    >
            </el-table-column>

            <el-table-column
                    prop="createBy"
                    label="Create By"
                    sortable
                    >
            </el-table-column>

            <el-table-column
                    prop="createDt"
                    label="Create Time"
                    sortable
                    >
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="Action"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">Run</el-button>
                    <el-button type="text" size="small">Edit</el-button>
                    <el-button type="text" size="small">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog
                title="Create"
                :visible.sync="dialogVisible"
                width="80%"
                　　　　:append-to-body="true"
                　　　　:before-close="handleClose"
                :close-on-click-modal="false">

            <span ref="error_msg" style="color: #ff0000"></span>

            <br><br>
            <el-select v-model="options.id" placeholder="select profile">
                <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.profileName"
                        :value="item.id">
                </el-option>
            </el-select>

                <div style="margin: 20px 0;"></div>
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="execute sql"
                        v-model="textarea2">
                </el-input>

            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createRecord()">Create</el-button>
      </span>
        </el-dialog>


        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="this.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.totalCount">
        </el-pagination>

        <el-button-group>
            <el-button type="primary" @click="createSqlForm()">Create</el-button>
        </el-button-group>

    </div>

</template>


<script>
import {receiveStoreData, runSqlById, receiveDataBaseProfile, createStore, createStoreList} from "../api/store";
export default {
    name: 'data-store',
    created(){
        this.receiveData()
    },

    data () {
        return  {
            queryList : null,
            dialogVisible: false,
            textarea2: '',
            options: [{
                id: '',
                profileName: ''
            }],

            totalCount: null,
            pageNo: 1,
            pageSize: 10,
        }
    },

    methods:{
        receiveData (){
            let searchParam = {
                "pageNo": this.pageNo,
                "pageSize": this.pageSize
            }
            receiveStoreData(searchParam).then(res => {
                this.queryList = res.result
                this.totalCount = res.rowCount;
            }).catch(() => {
            });
        },

        formatter(row, column) {
            return row.address;
        },

        handleClick(row){
            runSqlById(row.id);
            this.open2();
        },

        open2() {
            this.$message({
                message: 'Success',
                type: 'success'
            });
        },

        open4() {
            this.$message({
                showClose: true,
                message: 'There was a mistake',
                type: 'error'
            });
        },


        createSqlForm(){
           receiveDataBaseProfile().then(res => {
               this.options = res;
           }).catch(() => {
           });
           this.dialogVisible = true;
        },

        createRecord(){
            let profileId = this.options.id;
            let executeSql = this.textarea2
            createStore({
                profileId: profileId,
                executeSql: executeSql
            }).then(res => {
                this.open2();
                this.closeShadow();
                this.$router.go(0);
            }).catch(rej => {
                this.open4();
                let errorMsg = rej.message;
                this.$refs.error_msg.innerHTML = errorMsg;
            })
        },

        closeShadow(){
            this.dialogVisible = false;
        },

        handleClose(done) {
            this.$confirm('are you want to close？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

        handleSizeChange(val) {
            console.log(` ${val} item`);
            this.pageSize = val;
            this.receiveData()
        },

        handleCurrentChange(val) {
            console.log(`current page: ${val}`);
            this.pageNo = val;
            this.receiveData()
        }

    }
}
</script>