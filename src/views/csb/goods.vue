<template>

    <el-form ref="form" :model="formData" label-width="10px" @submit.prevent="onSubmit"
             style="margin:0px;width:100%;min-width:600px;">
        <el-form-item>
            <!--<ul>-->
            <!--<li>{{ $t('manageBrands.description1') }}</li>-->
            <!--<li>{{ $t('manageBrands.description2') }}</li>-->
            <!--</ul>-->
        </el-form-item>


        <el-form-item>
            <el-row :gutter="20">
                <el-col :span="5">
                    <div class="grid-content bg-purple-light">
                        <el-input placeholder="图片url,点右边按钮上传或者自己填" v-model="formData.picUrl"></el-input>
                    </div>
                </el-col>
                <el-col :span="5">
                    <el-upload
                            action=""
                            class="upload-demo"
                            ref="upload"
                            name="file"
                            :show-file-list="false"
                            :auto-upload="true"
                            :http-request="uploadFile">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-row :gutter="20">
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <el-input placeholder="商品名称" v-model="formData.goodsName"></el-input>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple-light">
                        <el-input placeholder="单价" v-model="formData.price" type="number"></el-input>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple-light">
                        <el-input placeholder="商品类型" v-model="formData.goodsType"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-form-item>



        <el-form-item>
            <el-col :span="15">
                <div class="grid-content bg-purple-light" style="text-align: center">
                    <el-button type="primary" v-on:click="saveOrUpdate">{{buttonValue}}</el-button>
                </div>
            </el-col>
        </el-form-item>


        <el-form-item>
            <el-row :gutter="20">
                <el-col :span="15">
                    <hr>

                </el-col>
            </el-row>
        </el-form-item>


        <!--查询部分-->
        <el-form-item>
            <el-row :gutter="20">
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <el-input placeholder="商品名称(模糊搜索)" v-model="queryData.goodsName"></el-input>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple-light">
                        <el-input placeholder="商品类型(模糊搜索)" v-model="queryData.goodsType"></el-input>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple-light">
                        <el-button type="primary" v-on:click="queryTable">查询</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form-item>



        <el-form-item>
            <el-row :gutter="0">
                <el-col :span="24">
                    <template>
                        <el-table
                                border
                                :data="tableData"
                                style="width: 100%"
                                height="400"
                                :row-class-name="tableRowClassName">
                            <el-table-column
                                    prop="goodsName"
                                    label="商品名称"
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="price"
                                    label="单价"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="goodsType"
                                    label="商品类型"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    label="图片"
                                    width="250">
                                <template slot-scope="scope" >
                                    <img :src="scope.row.picUrl" style="width: 150px;height: 100px;">
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="createTime"
                                    label="创建时间"
                                    :formatter="tableTimeFormat"
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    label="">
                                <template slot-scope="scope">
                                    <el-button @click="handleEdit(scope.row)" type="primary">修改</el-button>
                                    <el-button @click="deleteRow(scope.row)" type="primary">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>

                </el-col>
            </el-row>
        </el-form-item>

        <!--分页-->
        <!--<el-form-item>-->
            <!--<el-row :gutter="20">-->
                <!--<el-col :span="24" style="text-align: right">-->
                    <!--<el-pagination-->
                            <!--background-->
                            <!--layout="prev, pager, next"-->
                            <!--@current-change="handlePageChange"-->
                            <!--:current-page.sync="formData.pageIndex+1"-->
                            <!--:page-size="formData.pageSize"-->
                            <!--:total="formDataTotal">-->
                    <!--</el-pagination>-->
                <!--</el-col>-->
            <!--</el-row>-->
        <!--</el-form-item>-->



        <!--对话框内容-->
        <!--<el-dialog-->
                <!--:title="dialogTitle"-->
                <!--:visible.sync="dialogVisible"-->
                <!--width="50%">-->


        <!--</el-dialog>-->


    </el-form>


</template>

<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }


</style>


<script>

    import moment from 'moment';
    import {deleteGoods,queryGoodsInfosLike,uploadImg, saveOrUpdateGoods,updateGoods,queryGoodsInfo} from '../../api/api';

    export default {

        filters: {

            statusFilter: function (value) {
                if (value == 'CREATED') {
                    return "待处理";
                }
                if (value == "DEALING") {
                    return "处理中";
                }
                if (value == "FINISHED") {
                    return "已完成";
                }
            },

            dateFormat: function (time) {
                if (time == undefined) {
                    return "";
                }
                time = new Date(time);
                return moment(time).format("YYYY-MM-DD");
            },
            timeFormat: function (time) {
                console.log(time);
                if (time == undefined) {
                    return "";
                }
                time = new Date(time);
                return moment(time).format("YYYY-MM-DD HH:mm:ss");
            },



        },

        mounted() {
            this.init()
        },
        data() {
            return {
                buttonValue:'保存',
                formData: {
                    id: '',
                    goodsName: '',
                    price: '',
                    picUrl: '',
                    goodsType: '',
                    createTime: '',
                    updateTime: '',
                },
                queryData: {
                    goodsName: '',
                    goodsType: '',
                },
                dialogData: {
                    id: '',
                    goodsName: '',
                    price: '',
                    picUrl: '',
                    goodsType: '',
                    createTime: '',
                    updateTime: '',
                },
                //表格数据
                tableData: [],
            }
        },
        methods: {
            init() {
                this.loadTable();

            },

            loadTable() {
                // let queryData = "auditStatus=CREATED&ticketType=REGULAR";
                let queryData = this.queryData;
                queryGoodsInfosLike(queryData).then(data => {
                    console.log(data)
                    if (data.status != 0) {
                        this.$alert(data.message);
                    } else {
                        this.tableData = data.data;
                    }
                });
            },


            queryTable(){
                this.formData.pageIndex = 0;
                this.loadTable();
            },


            handlePageChange(val) {
                this.formData.pageIndex = val-1;
                console.log(`当前页: ${val}`);
                this.loadTable();
            },


            uploadFile(param) {
                console.log( param.file);
                console.log(param.file.name);
                let uploadData = new FormData();
                uploadData.append('file', param.file);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                uploadImg(uploadData,config).then(data => {
                    if (data.status != 0) {
                        this.$alert(data.message);
                    } else {
                        console.log(data);
                        this.formData.picUrl = data.data;
                    }
                });
            },


            saveOrUpdate(){
                if(this.buttonValue=='保存'){
                    this.doSaveOrUpdate();
                    return ;
                }

                this.$confirm('此操作将修改原记录数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.doSaveOrUpdate();
                }).catch(() => {
                    for(let key in this.formData){
                        this.formData[key]  = '';
                    }
                    this.buttonValue='保存';
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },

            doSaveOrUpdate(){
                let data = this.formData;
                saveOrUpdateGoods(data).then(data => {
                    console.log(data)
                    if (data.status != 0) {
                        this.$alert(data.message);
                    } else {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        for(let key in this.formData){
                            this.formData[key]  = '';
                        }
                        this.buttonValue='保存';
                        this.init();
                    }
                });
            },


            handleEdit(row) {
                console.log( this.formData);
                console.log( row);
                this.formData=Object.assign({}, row);;
                this.buttonValue='修改';
            },


            deleteRow(row) {
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let queryData = {"id":row.id};
                    deleteGoods(queryData).then(data => {
                        console.log(data)
                        if (data.status != 0) {
                            this.$alert(data.message);
                        } else {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            this.init();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },




            tableRowClassName({row, rowIndex}) {
                //  if (rowIndex %2 ==1) {
                //     return 'success-row';
                // }
                return '';
            },


            tableDateFormat: function (row, column) {
                let date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            tableTimeFormat: function (row, column) {
                let date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },



        }
    }

</script>
