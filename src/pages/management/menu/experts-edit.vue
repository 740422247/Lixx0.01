<template>
  <div class="experts">
    <div class="page-header">
      <Breadcrumb :subMenus="menu"></Breadcrumb>
      <el-card class="box-card">
        <div class="top-filter">
          <child-forms :entity="editEntity" :model="editModel" :rules="editRules"></child-forms>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "./../common/common-breadcrumb";
import ChildForms from "@/components/base/childhood-forms";
import ChildBtns from "@/components/base/childhood-btns";
export default {
  components: {
    ChildBtns,
    Breadcrumb,
    ChildForms
  },
  data: () => ({
    menu: [{ path: "", label: "专家库" }, { path: "", label: "编辑专家" }],
    editEntity: [
      { label: "姓名", key: "name"},
      { label: "电话号码", key: "phone" },
      { label: "身份证号", key: "idNum" },

      {
        label: "状态",
        key: "state",
        type: "select",
        options: [
          { label: "全部", value: "all" },
          { label: "已出库", value: "nouse" },
          { label: "正常", value: "use" }
        ]
      }
    ],
    editModel: {},
    editRules: {
      name: [
        {
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error("姓名不能为空"));
            }
          },
          trigger: "blur"
        }
      ],
      phone: [
        {
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error("电话号码不能为空"));
            } else if (!/^1[345789]\d{9}$/.test(value)) {
              return callback(new Error("电话号码不合法，请核实后重新输入"));
            }
          },
          trigger: "blur"
        }
      ]
    }
  })
};
</script>
