<template>
    <div>
        <el-table
                :data="quartzList"
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
                    prop="jobName"
                    label="Job Name"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="jobGroup"
                    label="Job Group"
            >
            </el-table-column>

            <el-table-column
                    prop="startTime"
                    label="Start Time"
            >
            </el-table-column>

            <el-table-column
                    prop="cronSchedule"
                    label="Cron Schedule"
            >
            </el-table-column>

            <el-table-column
                    prop="invokeParam"
                    label="Invoke Param"
            >
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="Action"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="startJob(scope.row)" type="text" size="small">Start</el-button>
                    <el-button @click="runJob(scope.row)" type="text" size="small">Run</el-button>
                    <el-button type="text" size="small">Edit</el-button>
                    <el-button @click="deleteById(scope.row)" type="text" size="small">Delete</el-button>
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

            <div class="demo-input-suffix">
                <div style="width:300px">
                    <el-input v-model="quartz.jobName" placeholder="Job Name"></el-input>
                </div>
                <br>
                <div style="width:300px">
                    <el-input v-model="quartz.jodGroup" placeholder="Job Group"></el-input>
                </div>
                <br>
                <div style="width:300px">
                    <el-input v-model="quartz.cronExp" placeholder="Cron Schedule"></el-input>
                </div>
            </div>



            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="createRecord()">Create</el-button>
            </span>

        </el-dialog>


        <el-button-group>
            <el-button type="primary" @click="createJob()">Create</el-button>
        </el-button-group>



    </div>
</template>

<script>

import {createQuartz, receiveJobData, startJob, runJob, deleteById} from "../api/quartz.js";
export default {
    name: 'quartz-mgr',

    data(){
      return {
          quartzList: null,
          textarea2: "",
          quartz:{
              id: null,
              jobName: null,
              jodGroup: null,
              startTime: null,
              cronExp: null,
              invokeParam: null
          },

          dialogVisible: false,
          totalCount: null,
          pageNo: 1,
          pageSize: 10
      }
    },

    created(){
        this.receiveData()
    },

    methods: {
        createJob(){
            this.dialogVisible = true;
        },

        startJob(row){
            let id = row.id
            startJob(id)
        },

        runJob(){

        },

        deleteById(row){
            let id = row.id
            deleteById({jobId : id}).then(() => {
            this.$router.go(0);
            }).catch(() => {
                alert("delete has error")
            })
        },

        receiveData (){
            let searchParam = {
                "pageNo": this.pageNo,
                "pageSize": this.pageSize
            }
            receiveJobData(searchParam).then(res => {
                this.quartzList = res.result
                this.totalCount = res.rowCount;
            }).catch(() => {
            });
        },

        createRecord(){
            let jobName = this.quartz.jobName;
            let jobGroup = this.quartz.jodGroup;
            let cronExp = this.quartz.cronExp;
            console.log(jobName)
            createQuartz({
                jobName : jobName,
                jobGroup: jobGroup,
                cronExp: cronExp
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

        handleClose(done) {
            this.$confirm('are you want to close？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

        handleSizeChange(val) {
            console.log(` ${val} item`);
        },

        handleCurrentChange(val) {
            console.log(`current page: ${val}`);
            this.pageNo = val;
            this.receiveData()
        }
    }
}
</script>