<template>
  <div class="menu-manager">
    <div class="page-header">
      <Breadcrumb :menu="menu"></Breadcrumb>
      <el-card class="box-card">
        <child-btns :entity="btnsEntity" @action="action"></child-btns>
        <div class="top-filter">
          <child-forms
            :entity="filterEntity"
            :model="filterModel"
            @change="filterChange"
            @search="search"
            showSearch
          ></child-forms>
        </div>
      </el-card>
    </div>
    <div class="page-content has-tree">
      <el-card class="left-tree o-visiable">
        <el-tree
          :data="treeData"
          :props="defaultProps"
          node-key="id"
          accordion
          highlight-current
          :expand-on-click-node="false"
          :render-content="renderContent"
        ></el-tree>
      </el-card>
      <div class="right-table">
        <childhood-table
          :tableData="tableData"
          :tableDataCol="tableDataCol"
          :tool="tool"
          :showBorder="true"
          summary
          :paganations="paganations"
          @handel="handelMethod"
        ></childhood-table>
      </div>
    </div>

    <!-- 编辑提示 -->
    <child-dialog :edit="edit" :rules="editRules" ref="edit" :entity="editEntity" @ok="saveEdit"></child-dialog>
    <!-- 编辑提示 -->
  </div>
</template>
<script>
import GetBreadcrumb from "./../common/breadcrumbCommon";
import Breadcrumb from "@/components/childhood-breadcrumb/childhood-breadcrumb";
import ChildhoodTable from "@/components/table/childhood-table";
import ChildDialog from "@/components/base/child-dialog";
import ChildForms from "@/components/base/childhood-forms";
import ChildBtns from "@/components/base/childhood-btns";
import { MessageBox, Message } from "element-ui";
export default {
  components: {
    ChildBtns,
    Breadcrumb,
    ChildhoodTable,
    ChildDialog,
    ChildForms
  },
  data: () => ({
    btnsEntity: [
      {
        label: "添加顶级菜单",
        icon: "el-icon-circle-plus",
        key: "addParent"
      },
      {
        label: "添加子级菜单",
        icon: "el-icon-circle-plus-outline",
        key: "addChild"
      },
      {
        label: "删除",
        icon: "el-icon-delete",
        key: "delete"
      },
      {
        label: "修改",
        icon: "el-icon-edit",
        key: "edit"
      }
    ],

    // 过滤开始
    filterEntity: [
      { label: "名称", key: "name" },
      {
        label: "状态",
        key: "state",
        type: "select",
        options: [
          { label: "全部", value: "all" },
          { label: "未", value: "nouse" },
          { label: "已", value: "use" }
        ]
      },
      { label: "操作时间", key: "date", type: "date" }
    ],
    filterModel: { name: "积分多少了", state: "use" },
    // 过滤结束

    node: {},
    isDelete: false,
    edit: {
      title: "编辑菜单",
      labelWidth: "120px",
      width: "1000px"
    },
    editRules: {
      cost: [
        {
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error("请输入菜单编码"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ],
      name: [
        {
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error("请输入菜单名称"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ]
    },
    editEntity: [
      { label: "上级菜单", key: "address", className: "is-2-1" },
      { label: "菜单编码", key: "cost", className: "is-2-1" },
      { label: "日期", key: "date", type: "datetime", className: "is-2-1" },
      { label: "菜单名称", key: "name", className: "is-2-1" },
      {
        label: "状态",
        key: "state",
        className: "is-2-1",
        type: "select",
        options: [
          { label: "全部", value: "all" },
          { label: "未", value: "nouse" },
          { label: "已", value: "use" }
        ]
      },
      { label: "备注", key: "remark", type: "textarea", className: "is-3" }
    ],
    menu: [GetBreadcrumb, { path: "", label: "菜单管理" }],

    // 表格设置
    tableDataCol: [
      {
        data: "cost",
        name: "编码",
        width: 200,
        align: "center",
        sortable: false,
        formatter: "cost"
      },
      {
        data: "address",
        name: "名称",
        icon: "el-icon-location",
        align: "center"
      },
      {
        data: "name",
        name: "状态",
        width: 200,
        link: true,
        sortable: true,
        // fixed: "right",
        align: "center"
        // headerAlign: "left"
      },
      {
        data: "date",
        name: "创建时间",
        width: 200,
        align: "center",
        sortable: false
      }
    ],
    // 表格工具列
    tool: {
      show: true,
      width: 180,
      align: "center",
      btns: [
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
        date: "2016-05-04",
        name: "王小虎2",
        address: "上海市普陀区金沙江路 1517 ",
        cost: "7500.25"
      },
      {
        date: "2016-05-04",
        name: "王小虎2",
        address: "上海市普陀区金沙江路 1517 ",
        cost: "7500.25"
      },
      {
        date: "2016-05-01",
        name: "王小虎3",
        address: "上海市普陀区金沙江路 1519 弄",
        cost: "6825.15"
      },
      {
        date: "2016-05-03",
        name: "王小虎4",
        address: "上海市普陀区金沙江路 1516 弄",
        cost: "6500.22"
      }
    ],
    // 树形结构
    treeData: [
      {
        id: 1,
        label: "基础管理",
        children: [
          {
            id: 4,
            label: "系统参数管理",
            children: [
              {
                id: 9,
                label: "新增"
              },
              {
                id: 10,
                label: "编辑"
              },
              {
                id: 101,
                label: "删除"
              }
            ]
          },
          {
            id: 5,
            label: "字典信息"
          },
          {
            id: 51,
            label: "字典维护"
          },
          {
            id: 52,
            label: "字典关系管理"
          }
        ]
      },
      {
        id: 2,
        label: "权限管理",
        children: [
          {
            id: 53,
            label: "用户管理"
          },
          {
            id: 6,
            label: "组织架构管理"
          },
          {
            id: 61,
            label: "菜单功能管理"
          },
          {
            id: 62,
            label: "功能角色管理"
          }
        ]
      },
      {
        id: 3,
        label: "流程中心",
        children: [
          {
            id: 7,
            label: "模板分类管理"
          },
          {
            id: 8,
            label: "流程模板管理"
          }
        ]
      }
    ],
    defaultProps: {
      children: "children",
      label: "label"
    }
  }),
  methods: {
    // 按钮管理

    action(name) {
      console.log("action", name);
    },
    // 过滤改变
    filterChange(forms) {
      console.log("filterforms change:", forms);
    },
    // 过滤查询
    search(forms) {
      console.log("filterforms search:", forms);
    },
    //删除
    onDelete() {
      alert("delete");
    },
    handelMethod(opt) {
      switch (opt.name) {
        case "edit":
          this.editNode(opt.row);
          break;
        default:
          console.log("manage-menu  handelMethod  error");
          break;
      }
    },
    addParentMenu() {
      this.editNode();
    },
    saveEdit(model) {
      // console.log("save:", model);
    },
    addNode(data) {
      console.log(data);
    },
    editNode(data) {
      this.$refs.edit.showDialog(data);
    },
    showDeleteNode(node, data) {
      this.node = { node, data };
      // this.isDelete = true;
      MessageBox.confirm("此操将会注销卡片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          alert(666);
        })
        .catch(() => {
          alert(123);
        });
    },
    deleteNode() {
      const parent = this.node.node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === this.node.data.id);
      children.splice(index, 1);
      this.isDelete = false;
    },

    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button style="font-size: 12px;" type="text">
              <i class="el-icon-more">
                <div class="tree-handle">
                  <div on-click={() => this.addNode(data)}>
                    <i class="el-icon-plus"></i>
                    新增
                  </div>
                  <div on-click={() => this.editNode(data)}>
                    <i class="el-icon-edit"></i>
                    编辑
                  </div>
                  <div on-click={() => this.showDeleteNode(node, data)}>
                    <i class="el-icon-delete"></i>
                    删除
                  </div>
                </div>
              </i>
            </el-button>
          </span>
        </span>
      );
    }
  }
};
</script>
<style scoped>
.menu-manager {
  display: flex;
  flex-direction: column;
}
</style>
