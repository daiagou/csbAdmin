<template>

    <el-form ref="form" :model="formData" label-width="10px" @submit.prevent="onSubmit"
             style="margin:0px;width:100%;min-width:600px;">
        <el-form-item>
            <!--<ul>-->
            <!--<li>{{ $t('manageBrands.description1') }}</li>-->
            <!--<li>{{ $t('manageBrands.description2') }}</li>-->
            <!--</ul>-->
        </el-form-item>


        <!--查询部分-->
        <el-form-item>
            <el-row :gutter="20">
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <el-input placeholder="订单号(模糊搜索)" v-model="queryData.orderNo"></el-input>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <el-input placeholder="客户名称(模糊搜索)" v-model="queryData.customer"></el-input>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple-light">
                        <el-input placeholder="手机号码(模糊搜索)" v-model="queryData.phone"></el-input>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple-light">
                        <el-select v-model="queryData.orderStatus" placeholder="订单状态"  style="width: 100%">
                            <el-option
                                    v-for="item in orderStatus"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="4">
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
                                    prop="orderNo"
                                    label="订单号"
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="totalAmount"
                                    label="总金额"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="customer"
                                    label="客户名称"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="phone"
                                    label="手机号码"
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="orderStatus"
                                    label="订单状态"
                                    :formatter="statusFormat"
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="地址"
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="comment"
                                    label="备注"
                                    width="200">
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
                                    <el-button @click="handleEdit(scope.row)" type="primary">明细</el-button>
                                    <el-button v-if="scope.row.orderStatus=='FINISHED'" type="success">已完成</el-button>
                                    <el-button v-else-if="scope.row.orderStatus=='CANCEL'" type="info">已取消</el-button>
                                    <el-button v-else-if="scope.row.orderStatus=='DEALING'" @click="editStatus(scope.row)" type="warning">完成</el-button>
                                    <el-button v-else-if="scope.row.orderStatus=='CREATED'" @click="editStatus(scope.row)" type="primary">处理</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>

                </el-col>
            </el-row>
        </el-form-item>


        <!--对话框内容-->
        <el-dialog
                title="订单明细"
                :visible.sync="dialogVisible"
                width="50%">

            <el-form-item>
                <el-row :gutter="20">
                    <el-col :span="5">
                        <div class="grid-content bg-purple">
                            订单号：{{dialogData.order.orderNo}}
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content bg-purple">
                            订单金额：￥{{dialogData.order.orderNo}}
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content bg-purple">
                            订单状态：{{dialogData.order.orderStatus}}
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="5">
                        <div class="grid-content bg-purple">
                            收货人：{{dialogData.order.customer}}
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content bg-purple">
                            手机号码：{{dialogData.order.phone}}
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <div class="grid-content bg-purple">
                            地址：{{dialogData.order.address}}
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            备注：{{dialogData.order.comment}}
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
                                    :data="dialogData.orderGoodsInfo"
                                    style="width: 100%"
                                    height="400"
                                    :row-class-name="tableRowClassName">
                                <el-table-column
                                        prop="goodsName"
                                        label="商品名称"
                                        width="200">
                                </el-table-column>
                                <el-table-column
                                        prop="goodsCount"
                                        label="数量"
                                        width="100">
                                </el-table-column>
                                <el-table-column
                                        prop="price"
                                        label="单价"
                                        width="100">
                                </el-table-column>
                                <el-table-column
                                        prop="goodsType"
                                        label="商品类型"
                                        width="200">
                                </el-table-column>
                                <el-table-column
                                        prop="createTime"
                                        label="创建时间"
                                        :formatter="tableTimeFormat"
                                        width="200">
                                </el-table-column>
                            </el-table>
                        </template>

                    </el-col>
                </el-row>
            </el-form-item>


        </el-dialog>


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
    import {updateOrder, queryOrders, queryOrderInfos,queryOrdersLike,queryOrderAndInfosByOrderNo} from '../../api/api';

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
                if (value == "CANCEL") {
                    return "已取消";
                }
            },

        },
        computed: {

        },
        mounted() {
            this.init()
        },
        data() {
            return {
                dialogVisible: false,

                orderStatus:[
                    {"key":"","value":""},
                    {"key":"CREATED","value":"待处理"},
                    {"key":"DEALING","value":"处理中"},
                    {"key":"FINISHED","value":"已完成"},
                    {"key":"CANCEL","value":"已取消"},
                ],


                formData: {
                    id: '',
                    orderNo: '',
                    totalAmount: '',
                    customer: '',
                    openid: '',
                    phone: '',
                    address: '',
                    comment: '',
                    orderStatus: '',
                    createTime: '',
                    updateTime: '',
                },
                queryData: {
                    orderNo: '',
                    customer: '',
                    phone: '',
                    orderStatus: '',
                },
                dialogData: {
                    order:{
                        id: '',
                        orderNo: '',
                        totalAmount: '',
                        customer: '',
                        openid: '',
                        phone: '',
                        address: '',
                        comment: '',
                        orderStatus: '',
                        createTime: '',
                        updateTime: '',
                    },
                    orderGoodsInfo:[]
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
                let queryData = this.queryData;
                queryOrdersLike(queryData).then(data => {
                    console.log(data)
                    if (data.status != 0) {
                        this.$alert(data.message);
                    } else {
                        this.tableData = data.data;
                    }
                });
            },

            handleEdit(row) {
                // this.dialogData = row;
                this.dialogVisible = true;
                let queryData ={"orderNo":row.orderNo};
                queryOrderAndInfosByOrderNo(queryData).then(data => {
                    console.log(data)
                    if (data.status != 0) {
                        this.$alert(data.message);
                    } else {
                        this.dialogData = data.data;
                    }
                });
            },
            editStatus(row) {
                // this.dialogData = row;
                var orderStatus = '';
                var str = '';
                if(row.orderStatus=='CREATED'){
                    str = '确定将状态变更为"处理中"?';
                    orderStatus = 'DEALING';
                }else if(row.orderStatus=='DEALING'){
                    str = '确定将状态变更为"已完成"?';
                    orderStatus = 'FINISHED';
                }
                this.$confirm(str, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let queryData ={"id":row.id,"orderStatus":orderStatus};
                    updateOrder(queryData).then(data => {
                        console.log(data)
                        if (data.status != 0) {
                            this.$alert(data.message);
                        } else {
                            this.loadTable();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });



            },
            doEditStatus(queryData){
                updateOrder(queryData).then(data => {
                    console.log(data)
                    if (data.status != 0) {
                        this.$alert(data.message);
                    } else {
                        this.loadTable();
                    }
                });
            },

            queryTable() {
                // this.formData.pageIndex = 0;
                this.loadTable();
            },


            tableRowClassName({row, rowIndex}) {
                // if (rowIndex %2 ==1) {
                //     return 'success-row';
                // }
                return '';
            },


            statusFormat: function (row, column) {
                let value = row[column.property];
                if (value == 'CREATED') {
                    return "待处理";
                }
                if (value == "DEALING") {
                    return "处理中";
                }
                if (value == "FINISHED") {
                    return "已完成";
                }
                if (value == "CANCEL") {
                    return "已取消";
                }
            },
            tableDateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            tableTimeFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },


        }
    }

</script>
