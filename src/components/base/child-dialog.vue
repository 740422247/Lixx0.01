<template>
  <div class="child-dialog">
    <el-dialog
      :title="edit.title"
      :visible.sync="editDialog"
      :modal="false"
      :width="edit.width ? edit.width : '500px'"
    >
      <el-form :model="model" class="demo-form-inline demo-ruleForm" :rules="rules" ref="model">
        <el-form-item
          :label="item.label"
          :label-width="edit.labelWidth ? edit.labelWidth : '80px'"
          v-for="(item) in entity"
          :key="item.key"
          :prop="item.key"
          :class="item.className"
        >
          <el-select v-model="model[item.key]" v-if="item.type === 'select'">
            <el-option
              :label="opt.label"
              :value="opt.value"
              v-for="opt in item.options"
              :key="opt.value"
            ></el-option>
          </el-select>

          <el-date-picker
            v-else-if="item.type === 'datetime' || item.type === 'date'"
            v-model="model[item.key]"
            :type="item.type"
            :placeholder="item.type === 'date' ? '选择日期':'选择时间'"
          ></el-date-picker>

          <el-input
            v-else
            v-model="model[item.key]"
            auto-complete="off"
            :type="item.type ? item.type : 'text'"
            rows="3"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    edit: { type: Object },
    entity: { type: Array },
    rules: { type: Object }
  },
  data: () => ({
    editDialog: false,
    model: {}
  }),

  methods: {
    showDialog(data) {
      if (!data) {
        data = {};
      }
      this.model = { ...data };

      this.editDialog = true;
    },
    ok() {
      this.$refs["model"].validate(valid => {
        console.log(valid);
        if (valid) {
          this.$emit("ok", this.model);
          this.editDialog = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style>
.child-dialog .demo-form-inline .el-form-item {
  width: 100%;
  display: block;
}
.child-dialog .el-date-editor.el-input,
.child-dialog .el-date-editor.el-input__inner {
  width: 100%;
}
.child-dialog .el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.5);
}
.is-2-1 {
  width: 50% !important;
}
.is-3-1 {
  width: 33% !important;
}
.is-3-2 {
  width: 66% !important;
}
.is-full {
  width: 100% !important;
}
</style>
