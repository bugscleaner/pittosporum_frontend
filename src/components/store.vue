<template>
    <div>
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-date-picker
                        v-model="startDate"
                        type="date"
                        placeholder="Create Date"
                        :picker-options="pickerOptions0"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>

        <br><br>

        <el-button-group>
            <el-button type="primary" @click="doSearch()">Search</el-button>
            <el-button type="primary" @click="createSqlForm()">Create</el-button>
        </el-button-group>

        <br><br>
    <el-table
            :data="queryList"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"

            :row-class-name="tableRowClassName">
            >

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
                    width="250">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">Run</el-button>
                    <el-button type="text" @click="updateSqlForm(scope.row)" size="small">Edit</el-button>
                    <el-button type="text" @click="deleteStoreById(scope.row)" size="small">Delete</el-button>
                    <el-button @click="viewCause(scope.row)" type="text" size="small">View Cause</el-button>
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

        <el-dialog
                title="Update"
                :visible.sync="dialogVisible2"
                width="80%"
                　　　　:append-to-body="true"
                　　　　:before-close="handleClose"
                :close-on-click-modal="false">

            <span ref="error_msg" style="color: #ff0000"></span>

            <br><br>
            <!--<el-select v-model="options.id" placeholder="select profile">
                <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.profileName"
                        :value="item.id">
                </el-option>
            </el-select>-->

            <div style="margin: 20px 0;"></div>
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="execute sql"
                    v-model="textarea2">
            </el-input>

            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">Cancel</el-button>
        <el-button type="primary" @click="updateRecord()">Update</el-button>
      </span>
        </el-dialog>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.totalCount">
        </el-pagination>
    </div>

</template>


<style>

</style>

<style>
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}

.el-table .failure-row {
    background: #ff0000;
}
</style>
<script>
import {receiveStoreData, runSqlById, receiveDataBaseProfile, createStore, updateStore, deleteStoreById} from "../api/store";


const searchParam = {
        pageNo: 1,
        pageSize: 10,
    }

export default {
    name: 'data-store',
    created(){
        this.receiveData()
    },

    data () {
        return  {
            queryList : null,
            currentEnt : null,
            dialogVisible: false,
            dialogVisible2: false,
            textarea2: '',
            options: [{
                id: '',
                profileName: ''
            }],

            startDate : undefined,
            endDate : undefined,
            totalCount: null,
            pageNo: 1,
            pageSize: 10,

            pickerOptions0: {
                disabledDate: (time) => {
                    if (this.endDate != undefined || this.endDate != '') {
                        return time.getTime() > Date.now() || time.getTime() > this.endDate;
                    } else {
                        return time.getTime() > Date.now() - 8.64e6
                    }
                }
            },

            pickerOptions1: {
                disabledDate: (time) => {
                    return time.getTime() < this.startDate || time.getTime() > Date.now();
                }
            },
        }
    },

    methods: {
        tableRowClassName({row, rowIndex}) {
            let executeResult = row.executeResult;
            if ("PE0003" === executeResult) {
                return 'failure-row';
            } else if ("PE0002" === executeResult) {
                return 'success-row';
            }
            return '';
        },

        doSearch(){
            if (this.startDate != null){
                searchParam.filterParams = {
                    "create_dt" : this.startDate,
                }
            }else {
                searchParam.filterParams = null
            }

            this.receiveData ()
        },

        viewCause(row){
            this.$alert(row.cause, 'Cause', {
                confirmButtonText: 'Confirm',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                    });
                }
            });
        },

        receiveData (){
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

        updateSqlForm(row){
           receiveDataBaseProfile().then(res => {
               this.options = res;
           }).catch(() => {
           });
           this.dialogVisible2 = true;
           this.textarea2 = row.executeSql;
           this.options.id = row.profileId;
           this.currentEnt = row;
        },

        updateRecord(){
            this.currentEnt.executeSql = this.textarea2;
            updateStore(this.currentEnt).then(res => {
                this.open2();
                this.closeShadow();
                this.$router.go(0);
            }).catch(rej => {
                this.open4();
                let errorMsg = rej.message;
                this.$refs.error_msg.innerHTML = errorMsg;
            })
        },

        deleteStoreById(row){
                this.$confirm('are you sure to do delete?', 'Tip', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    deleteStoreById(row).then(res => {
                    }).catch(rej => {

                    })

                    this.$message({
                        type: 'success',
                        message: 'delete success!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'cancel delete'
                    });
                });
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
            searchParam.pageSize = val;
            this.receiveData()
        },

        handleCurrentChange(val) {
            console.log(`current page: ${val}`);
            searchParam.pageNo = val;
            this.receiveData()
        },
    }
}
</script>
