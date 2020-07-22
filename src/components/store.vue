<template>
    <div>
    <el-table
            :data="queryList"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}">
            :row-class-name="tableRowClassName">
            <el-table-column
                    prop="id"
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
                    >
            </el-table-column>

            <el-table-column
                    prop="executeResult"
                    label="Execute Result"
                    >
            </el-table-column>

            <el-table-column
                    prop="runCount"
                    label="Execute Count"
                    >
            </el-table-column>

            <el-table-column
                    prop="createBy"
                    label="Create By"
                    >
            </el-table-column>

            <el-table-column
                    prop="createDt"
                    label="Create Time"
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

        <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left">Prev</el-button>
            <el-button type="primary" @click="createSqlForm()">Create</el-button>
            <el-button type="primary">Bulk Create</el-button>
            <el-button type="primary">Next<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>

    </div>

</template>


<script>
import {receiveStoreData, runSqlById, receiveDataBaseProfile} from "../api/store";
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
            }]
        }
    },

    methods:{
        receiveData (){
            receiveStoreData().then(res => {
                this.queryList = res;
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
                message: 'execute success',
                type: 'success'
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

            if (profileId == undefined || profileId == ''){
                alert("create sql error");
            }
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
        }



    }
}
</script>