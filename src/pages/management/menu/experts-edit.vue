<template>
  <div class="experts">
    <div class="page-header">
      <Breadcrumb :menu="menu" :actions="BreacrumbActions" @actionMethod="actionMethod"></Breadcrumb>
      <el-card class="box-card">
        <div class="top-filter">
          <child-forms
            :entity="editEntity"
            ref="result"
            @change="change"
            :state="state1"
            :model="editModel"
          ></child-forms>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import GetBreadcrumb from "./../common/breadcrumbCommon";
import Breadcrumb from "@/components/childhood-breadcrumb/childhood-breadcrumb";
import ChildForms from "@/components/base/childhood-forms.vue";
import ChildBtns from "@/components/base/childhood-btns";
export default {
  components: {
    ChildBtns,
    Breadcrumb,
    ChildForms
  },
  data: () => ({
    // 面包屑导航配置
    menu: [
      GetBreadcrumb,
      { path: "", label: "专家库" },
      { path: "", label: "编辑专家" }
    ],
    BreacrumbActions: [
      {
        label: "返回",
        icon: "el-icon-delete",
        key: "delete"
      },
      {
        label: "保存",
        icon: "el-icon-edit",
        key: "edit"
      }
    ],
    // 编辑表单配置
    editEntity: [
      {
        label: "姓名",
        key: "name",
        type: "text",
        rules: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("姓名不能为空"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      {
        label: "电话号码",
        key: "phone",
        rules: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("电话号码不能为空"));
              } else if (!/^1[345789]\d{9}$/.test(value)) {
                return callback(new Error("电话号码不合法，请核实后重新输入"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      {
        label: "身份证号",
        key: "idNum",
        expression: (model, val) => {
          if (val.length >= 9) {
            const birthYear = val.slice(6, 10);
            model.age = new Date().getFullYear() - birthYear;
          }
          if (model.idNum.length >= 5) {
            const sexNum = val.slice(16, 17);
            model.sex = sexNum % 2 ? "男" : "女";
          }
        }
      },
      { label: "性别", key: "sex", disabled: true, invisible: true },
      { label: "年龄", key: "age", disabled: true },
      {
        label: "状态",
        key: "state",
        type: "select",
        options: "state", //[{ label: "全部", value: "all" }]
        expression: (model, val, entity) => {
          if (val === "nouse") {
            for (let i = 0; i < entity.length; i++) {
              if (
                entity[i].key === "age" ||
                entity[i].key === "sex" ||
                entity[i].key === "idNum"
              ) {
                console.log("key:", entity[i].key);
                entity[i].invisible = true;
              }
            }
          } else {
            for (let i = 0; i < entity.length; i++) {
              if (
                entity[i].key === "age" ||
                entity[i].key === "sex" ||
                entity[i].key === "idNum"
              ) {
                entity[i].invisible = false;
              }
            }
          }
        }
      }
    ],
    editModel: { phone: "1358464586" },
    state1: {
      state: []
    }
  }),
  mounted() {
    // console.log(this.menu);
    this.init();
  },
  methods: {
    init() {
      this.state1.state = [
        { label: "全部", value: "all" },
        { label: "已出库", value: "nouse" },
        { label: "正常", value: "use" }
      ];
    },
    actionMethod(key, action) {
      console.log("actionMethod:", action, key);
      if (action.key === "edit") {
        this.save();
      }
    },
    save() {
      const res = this.$refs.result.getResult();
      console.log(res);
    },
    change(model) {
      console.log("change:", model);
    },
    getExpertAge(data) {
      const birthYear =
        data.idNumer && data.idNumer.length > 9 && data.idNumer.slice(6, 10);
      if (data.idNumer && data.idNumer.length > 9) {
        const nowYear = new Date().getFullYear();
        const age = nowYear / 1 - birthYear / 1;
        return age;
      } else {
        return "";
      }
    }
  }
};
</script>
