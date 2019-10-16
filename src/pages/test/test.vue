<template>
  <div class="test">
    <childhood-table
      :tableData="tableData"
      :tableDataCol="tableDataCol"
      :isSelection="true"
      :showIndex="false"
      :tool="tool"
      :showBorder="true"
      :paganations="paganations"
      @handel="handelMethod"
      @selection="selection"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></childhood-table>
  </div>
</template>
<script>
import ChildhoodTable from "@/components/table/childhood-table";

export default {
  data: () => ({
    // 表格表头列
    tableDataCol: [
      {
        data: "date",
        name: "时间",
        width: 200,
        align: "center",
        sortable: false
      },
      {
        data: "address",
        name: "地址",
        icon: "el-icon-location",
        align: "center"
        // 信息提示  暂时不用
        // tip: {
        //   show: true,
        //   width: 300
        // }
      },
      {
        data: "name",
        name: "姓名",
        width: 200,
        link: true,
        sortable: true,
        // fixed: "right",
        align: "center"
        // headerAlign: "left"
      },
      {
        data: "cost",
        name: "收入",
        width: 200,
        align: "center",
        sortable: false
      }
    ],
    // 表格工具列
    tool: {
      show: true,
      width: 270,
      align: "center",
      btns: [
        { name: "add", label: "新增", type: "success" },
        { name: "delete", label: "删除", type: "danger" },
        { name: "edit", label: "修改", type: "primary" }
      ]
    },
    paganations: {
      // show: true,           //  show 表示是否显示分页信息，false表示显示，true表示掩藏
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      total: 550
    },
    tableData: [
      {
        date: "2016-05-02",
        name: "王小虎1",
        address: "上海市普陀区金沙江路 1518 弄",
        cost: 6500.23
      },
      {
        date: "2016-05-04",
        name: "王小虎2",
        address: "上海市普陀区金沙江路 1517 ",
        cost: 7500.25
      },
      {
        date: "2016-05-01",
        name: "王小虎3",
        address: "上海市普陀区金沙江路 1519 弄",
        cost: 6825.15
      },
      {
        date: "2016-05-03",
        name: "王小虎4",
        address: "上海市普陀区金沙江路 1516 弄",
        cost: 6500.22
      }
    ]
  }),
  components: { ChildhoodTable },
  methods: {
    // 表格操作方法
    // 工具按钮管理
    handelMethod(options) {
      console.log("handleMethod:", options);
    },
    // 表格选择框
    selection(e) {
      console.log("selection:", e);
    },
    // 每页显示数量
    handleSizeChange(num) {
      console.log(`每页 ${num} 条`);
    },
    // 当前页码
    handleCurrentChange(num) {
      console.log(`当前页: ${num}`);
    }
  }
};
</script>
<style scoped>
</style>

