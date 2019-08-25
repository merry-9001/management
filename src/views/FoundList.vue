<template>
  <div class="fillContainer">
    <!-- <el-container> -->
      <div>
        <el-form :inline="true" ref="add_data">
          <el-form-item class="btnRight">
            <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table_container">
        <el-table
          v-if="tableData.length>0"
          :data="tableData"
          max-height="450"
          border
          style="width: 100%"
        >
          <el-table-column prop="id" label="序号" align="center"></el-table-column>
          <el-table-column prop="date" label="支付时间" width="220" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" align="center"></el-table-column>
          <el-table-column prop="income" label="收入" align="center">
            <template slot-scope="scope">
              <span style="color:#00d053">{{ scope.row.income }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="expend" label="支出" align="center">
            <template slot-scope="scope">
              <span style="color:#f56767">{{ scope.row.expend }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cash" label="账户现金" align="center">
            <template slot-scope="scope">
              <span style="color:#4db3ff">{{ scope.row.cash }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" align="center"></el-table-column>
          <el-table-column label="操作" align="center" prop="operation">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="small"
                icon="edit"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                icon="delete"
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <DialogAdd :dialog="dialog" :formData="formData" @update='getProfile'></DialogAdd>
    <!-- </el-container> -->
  </div>
</template>
<script>
  import DialogAdd from '@/components/DialogAdd.vue';
export default {
  name: "foundList",
  data() {
    return {
      tableData: [],
      dialog:{
        show:false,
        title:'',
        option:'edit'
      },
       formData: {
        type: '',
        describes: '',
        income:'',
        expend: '',
        cash: '',
        remark: '',
        id:''
      }
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.$axios.get("/management_api/productSelect.php").then(res => {
        // console.log(res);
        var msg = res.data.msg;
        if (msg === "ok") {
          this.tableData = res.data.data.product;
          // console.log(this.tableData);
        }
      });
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialog={
        show:true,
        title:'修改资金信息',
        option:'edit'
      };
      this.formData={
        type: row.type,
        describes: row.describes,
        income:row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id:row.id   
      }
    },
    handleDelete(index, row) {
      console.log(row.id);
      var params = new URLSearchParams();
      params.append("id",row.id);
      this.$axios.post("/management_api/productDelete.php",params).then(res=>{
        var state=res.data.stauts;
        console.log(res);
        if(state==='0')
        {
                            this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                  this.getProfile();
        }
        else
        {
          this.$message.error(res.data.msg);
        }
      })
    },
    handleAdd() {
      this.dialog={
        show:true,
        title:'添加资金信息',
        option:'add'
      };
        this.formData={
        type: '',
        describes: '',
        income:'',
        expend: '',
        cash: '',
        remark: '',
        id:''
      }
    }
  },
  components:{
    DialogAdd
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}

.btnRight {
  float: right;
  padding: 15px 20px 0px 0px;
}

.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>