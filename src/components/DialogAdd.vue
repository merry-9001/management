<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :rules="form_rules"
          :model="formData"
          label-width="120px"
          style="margin:10px;width:auto"
        >
          <el-form-item label="收支类型">
            <el-select v-model="formData.type" placeholder="收支类型">
              <el-option
                v-for="(formtype,index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="describes" label="收支描述">
            <el-input type="text" v-model="formData.describes"></el-input>
          </el-form-item>

          <el-form-item prop="income" label="收入:">
            <el-input type="income" v-model="formData.income"></el-input>
          </el-form-item>
          <el-form-item prop="expend" label="支出:">
            <el-input type="expend" v-model="formData.expend"></el-input>
          </el-form-item>

          <el-form-item prop="cash" label="账户现金:">
            <el-input type="cash" v-model="formData.cash"></el-input>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialogAdd",
  data() {
    return {
      format_type_list: ["提现", "无敌", "拿明"],
      form_rules: {
        describes: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" }
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" }
        ],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
      }
    };
  },
  props: {
    dialog: Object,
    formData: Object
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const f=this.dialog.option
          var params = new URLSearchParams();
          params.append("type", this.formData.type);
          params.append("describes", this.formData.describes);
          params.append("income", this.formData.income);
          params.append("expend", this.formData.expend);
          params.append("cash", this.formData.cash);
          params.append("remark", this.formData.remark);
          params.append("id", this.formData.id);
          // console.log(this.formData.income);
          if(f==='add')
          {
            this.$axios
              .post("/management_api/productAdd.php", params)
              .then(res => {
                // console.log(res);
                var state = res.data.stauts;
                if (state === "0") {
                  this.$message({
                    message: "添加完成",
                    type: "success"
                  });
                  this.dialog.show = false;
                  this.$emit("update");
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "warning"
                  });
                }
              });
            }
            else{
            this.$axios
              .post("/management_api/productEdit.php", params)
              .then(res => {
                // console.log(res);
                var state = res.data.stauts;
                if (state === "0") {
                  this.$message({
                    message: "修改完成",
                    type: "success"
                  });
                  this.dialog.show = false;
                  this.$emit("update");
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "warning"
                  });
                }
              });              
            }
        } 
        else {
          console.log(this.formData);
          this.$message.error("请填写完整数据");
        }
      });
    }
  }
};
</script>
<style scoped>
</style>