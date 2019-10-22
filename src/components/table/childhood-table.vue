<template>
  <div class="table-container">
    <h4>菜单列表</h4>

    <el-table
      :data="tableData"
      :show-summary="summary"
      stripe
      style="width: 100%"
      :border="showBorder"
      @select="selection($event)"
      @cell-click="cellClick"
    >
      <!-- 复选框 -->
      <el-table-column type="selection" width="55" v-if="isSelection" align="center"></el-table-column>
      <!-- 序号 -->

      <el-table-column type="index" v-if="showIndex || summary"></el-table-column>
      <!-- 列信息 -->
      <el-table-column
        v-for="(col,index) in tableDataCol"
        :prop="col.data"
        :label="col.name"
        :width="col.width"
        :min-width="col.minWidth"
        :sortable="col.sortable"
        :key="index"
        :fixed="col.fixed"
        :align="col.align"
        :header-align="col.headerAlign ? col.headerAlign : col.align"
        :formatter="col.formatter && amount "
        :class-name="col.link ? 'myLink' : ''"
      >
        <!-- tip消息提示 -->
        <!-- <template slot-scope="scope">
          <div class="myCell" @click="cellClick(col,scope.row)">
            <span :class="{myLink:col.link}">
              <i :class="col.icon" v-if="col.icon"></i>
              {{scope.row[col.data]}}
            </span>
            <span
              class="myTip"
              v-if="col.tip"
              :style="{width:col.tip.width+'px'}"
            >{{scope.row[col.data]}}</span>
          </div>
        </template>-->
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column
        label="操作"
        v-if="tool && tool.show"
        fixed="right"
        :width="tool.width"
        :align="tool.align"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handle(scope.$index, scope.row,btn.name)"
            v-for="btn in tool.btns"
            :key="btn.name"
            :type="btn.type"
          >{{btn.label}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block myPagenation" v-if="!paganations.show">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="paganations.pageSizes"
        :page-size="paganations.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paganations.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tableDataCol: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    isSelection: { type: Boolean },
    summary: { type: Boolean },
    tool: { type: Object },
    paganations: { type: Object },
    showIndex: { type: Boolean },
    showBorder: { type: Boolean }
  },
  data: () => ({
    currentPage4: 1
  }),
  mounted() {
    this.init();
  },
  methods: {
    // 格式化金额
    amount(row, column) {
      // console.log(row[column.property], column);
      return "$" + row[column.property];
    },
    init() {},
    handle(index, row, name) {
      this.$emit("handel", { name, row, index });
    },
    selection(e) {
      this.$emit("selection", e);
    },
    cellClick(row, column, cell) {
      if (cell.className.indexOf("myLink") === -1) return;
      this.handle(undefined, row, "linkTo");
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    }
  }
};
</script>
<style>
.table-container {
  padding: 16px;
  box-shadow: 0 0 5px 0px #ccc;
}
.el-table .cell {
  white-space: pre;
}
.myCell {
  font-size: 0;
  display: flex;
}
.myCell span,
.myCell span i {
  font-size: 14px;
}
.myCell span {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
td.myLink .cell {
  color: #409eff;
  cursor: pointer;
}
td {
  position: relative;
}
td:hover .myCell .myTip {
  display: block;
}
.myCell .myTip {
  position: absolute;
  top: 0;
  left: 105%;
  border: 1px solid #ddd;
  background-color: #fff;
  font-size: 13px;
  line-height: 30px;
  padding: 12px;
  z-index: 500;
  border-radius: 4px;
  display: none;
  overflow: visible;
  background-color: #fff;
  white-space: normal;
}
.myCell .myTip::after {
  content: "";
  width: 8px;
  height: 8px;
  position: absolute;
  top: 25px;
  left: -5px;
  transform: rotate(45deg);
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background: #fff;
  display: block;
}
.myPagenation {
  background-color: #fff;
  text-align: right;
  padding: 20px;
}
h4 {
  margin-top: 0;
}
</style>
