<template>
  <div class="child-dialog">
    <el-dialog
      :title="edit.title"
      :visible.sync="editDialog"
      :modal="false"
      :width="edit.width ? edit.width : '500px'"
    >

      <el-form :model="edit.editForm" class="demo-form-inline">
        <el-form-item
          :label="item.label"
          :label-width="edit.labelWidth ? edit.labelWidth : '80px'"
          v-for="(item) in editForm"
          :key="item.key"
        >
          <el-select v-model="item.val" v-if="item.type === 'select'">
            <el-option
              :label="opt.label"
              :value="opt.value"
              v-for="opt in item.options"
              :key="opt.value"
            ></el-option>
          </el-select>

          <el-date-picker
            v-else-if="item.type === 'datetime' || item.type === 'date'"
            v-model="item.val"
            :type="item.type"
            :placeholder="item.type === 'date' ? '选择日期':'选择时间'"
          ></el-date-picker>

          <el-input
            v-else
            v-model="item.val"
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
    entity: { type: Array }
  },
  data: () => ({
    editDialog: false,
    editForm: []
  }),
  methods: {
    showDialog(data) {
      if (!data) {
        data = {};
      }
      this.editForm = this.entity.map(item => {
        return {
          ...item,
          val: data[item.key]
        };
      });
      this.editDialog = true;
    },
    ok() {
      let forms = {};
      this.editForm.forEach(item => {
        forms[item.key] = item.val;
      });
      this.$emit("ok", forms);
      this.editDialog = false;
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
</style>
