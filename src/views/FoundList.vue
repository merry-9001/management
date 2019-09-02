<template>
  <div class="fillContainer">
    <!-- <el-container> -->
    <div>
      <!-- <el-form :inline="true" ref="add_data"> -->
      <el-form :inline="true" v-model="search_data">
        <el-form-item label="时间筛选"  class="left">
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
          <el-form-item>
            <el-button type="primary" size="small" icon="search" @click="handleSearch()">筛选</el-button>
          </el-form-item>

          <el-form-item  label="备注">
            <el-input type="text" v-model="search_data.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" icon="search" @click="handleSearch2()">搜索</el-button>
          </el-form-item>
        </el-form-item>

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
      <div class="table_container">
        <el-row>
          <el-col :span="24">
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="paginations.page_index"
                :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size"
                :layout="paginations.layout"
                :total="paginations.total"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <DialogAdd :dialog="dialog" :formData="formData" @update="getProfile" @func="getMsgFormSon"></DialogAdd>
    <!-- </el-container> -->
  </div>
</template>
<script>
import DialogAdd from "@/components/DialogAdd.vue";
export default {
  name: "foundList",
  data() {
    return {
      search_data: {
        startTime: "",
        endTime: "",
        content:""
      },
      filterTableData:[],
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      formData: {
        type: "",
        describes: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: "",
        src:""
      },
      paginations: {
        page_index: 1,
        total: 0,
        page_size: 5,
        page_sizes: [5, 10, 15],
        layout: "total,sizes,prev,pager,next,jumper"
      },
      allTableData: []
    };
  },
          computed: {
            user() {
                return this.$store.state.user.name;
            },
            // ismanage() {
            //     if (this.user.identity == 'manager') {
            //         return true;
            //     }
            //     return false;
            // },
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
          this.allTableData = res.data.data.product;
          this.filterTableData= res.data.data.product;
          this.setPageinations();
        }
      });
    },
    setPageinations() {
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        describes: row.describes,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row.id,
        src:row.src
      };
    },
    handleDelete(index, row) {
      console.log(row.id);
      var params = new URLSearchParams();
      params.append("id", row.id);
      this.$axios
        .post("/management_api/productDelete.php", params)
        .then(res => {
          var state = res.data.stauts;
          console.log(res);
          if (state === "0") {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getProfile();
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.formData = {
        type: "",
        describes: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: "",
        src:""
      };
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      let index = this.paginations.page_size * (page - 1);
      let nums = this.paginations.page_size * page;
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    handleSearch() {
      // 筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        console.log(this.search_data.startTime,this.search_data.endTime);
          this.getProfile();
          return;
      }

      const sTime=this.search_data.startTime;
      const eTime=this.search_data.endTime;
// Date.parse(sTime);
// var i=0;
// var f=0;
      this.allTableData=this.filterTableData.filter(item=>{
        let dateStart=new Date(sTime);
        let timeStart=dateStart.getTime();
        let dateEnd=new Date(eTime);
        let timeEnd=dateEnd.getTime();
        let date = new Date(item.date);
        let time = date.getTime();
        if(time=>timeStart && time<=timeEnd)
        {
          var s=time-timeStart;
          var q=time-timeEnd;
        }
        return time>timeStart && time<timeEnd;
      })
      // console.log(f);
      this.setPageinations();
    },
    handleSearch2(){
      // console.log(this.search_data.content);
      if(this.search_data.content!="")
      {
        this.allTableData=this.filterTableData.filter(item=>{
          var s=item.remark;
          // console.log(s);
          return s.search(this.search_data.content) != -1;
        })
      }
       this.setPageinations();
    },
    getMsgFormSon(data){
      console.log(this.formData.src);
        this.formData.src='http://120.27.1.3/management_api/upload/'+data;
        console.log(this.formData.src);
    }
  },
  components: {
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
.left {
  float: left;
  padding: 15px 20px 0px 10px;
}


.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>