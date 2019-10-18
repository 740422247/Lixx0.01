<template>
  <div class="top-btns">
    <el-button
      v-for="item in entity"
      :key="item.key"
      :icon="item.icon"
      :type="item.type"
      :disabled="item.disabled"
      @click="clickButton(item.key,item)"
    >{{item.label}}</el-button>
  </div>
</template>
<script>
export default {
  name:'ChildBtns',
  props: {
    entity: { type: Array },
    state: { type: Object }
  },
  methods: {
    clickButton(key, item) {
      this.$emit("action", key, item);
    }
  }
};
</script>
