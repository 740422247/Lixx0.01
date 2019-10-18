<template>
  <div class="experts">
    <div class="page-header">
      <Breadcrumb :menu="menu"></Breadcrumb>
      <el-card class="box-card">
        <child-btns :entity="btnsEntity" @action="action"></child-btns>
        <div class="top-filter">
          <child-forms :entity="filterEntity" :model="filterModel" showSearch></child-forms>
        </div>
      </el-card>
    </div>
    <div class="page-content">
      <childhood-table
        :tableData="getTestList"
        :tableDataCol="tableDataCol"
        :showBorder="true"
        :paganations="paganations"
        @handel="handelMethod"
      ></childhood-table>
    </div>
  </div>
</template>
<script>
import GetBreadcrumb from "./../common/breadcrumbCommon";
import Breadcrumb from "@/components/childhood-breadcrumb/childhood-breadcrumb";
import ChildForms from "@/components/base/childhood-forms";
import ChildBtns from "@/components/base/childhood-btns";
import ChildhoodTable from "@/components/table/childhood-table";
import { mapGetters } from "vuex";

export default {
  components: {
    ChildBtns,
    Breadcrumb,
    ChildForms,
    ChildhoodTable
  },
  computed: {
    ...mapGetters({
      getTestList: "getTestList"
    })
  },
  data: () => ({
    // 面包屑导航
    menu: [GetBreadcrumb,{ path: "", label: "专家库" }],
    // 按钮实体
    btnsEntity: [
      {
        label: "新增",
        icon: "el-icon-circle-plus-outline",
        key: "add"
      },
      {
        label: "修改",
        icon: "el-icon-edit",
        key: "edit",
        disabled: false
      },
      {
        label: "导出",
        icon: "el-icon-sold-out",
        key: "delete"
      }
    ],
    // 过滤条件
    filterEntity: [
      { label: "姓名", key: "name" },
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
    filterModel: {},
    // 表格实体
    tableDataCol: [
      {
        data: "ieStateName",
        name: "状态",
        width: 200,
        align: "center",
        sortable: false
      },
      {
        data: "expertName",
        name: "姓名",
        width: 200,
        align: "center",
        sortable: false,
        link: true
      },
      {
        data: "unitName",
        name: "所属单位名称",
        minWidth: 200,
        align: "center",
        sortable: false
      },
      {
        data: "idNumer",
        name: "身份证号",
        width: 200,
        align: "center",
        sortable: false
      },
      {
        data: "expertSex",
        name: "性别",
        width: 200,
        align: "center",
        sortable: false
      },
      {
        data: "expertAge",
        name: "年龄",
        width: 200,
        align: "center",
        sortable: false
      },
      {
        data: "educationName",
        name: "学历",
        width: 200,
        align: "center",
        sortable: false
      }
    ],
    tableData: [],
    paganations: {
      // show: true,           //  show 表示是否显示分页信息，false表示显示，true表示掩藏
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      total: 550
    }
  }),
  mounted() {
    this.initTable();
  },
  methods: {
    // 表格点击事件
    handelMethod({ name, row }) {
      console.log("experts table:", row);
      if (name === "linkTo") {
        this.$router.push({ path: "/expertsEdit", params: { id: row.idNumer } });
      }
    },
    initTable() {
      this.$store.dispatch("actTestList");
    },
    action(name) {
      if (name === "add") {
        this.$router.push({ path: "/expertsEdit" });
      }
    }
  }
};
</script>
