<!--
 * @Author: charles
 * @Date: 2023-11-29 10:39:13
 * @LastEditors: charles
 * @LastEditTime: 2022-11-09 10:40:24
 * @FilePath: \blog3.0\src\components\footerView\index.vue
 * @Description: 
 * 
-->

<template>
  <!-- 封装弹框 -->
  <div class="popup">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :width="popupWidth"
      :before-close="handleClose"
      :append-to-body=true
    >
      <slot>
        <p>弹框自定义的内容</p>
      </slot>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="Cancel">取 消</el-button> -->
        <el-button type="primary" @click="Save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'dialogView',
  props: {
    dialogTitle: {
      type: String,
      default: '标题'
    },
    visible: {
      type: Boolean,
      default: false
    },
    popupWidth: {
      type: String,
      default: '550px'
    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.visible
      },
      set (val) {
        // 当visible改变的时候，触发父组件的 updateVisible方法，在该方法中更改传入子组件的 centerDialogVisible的值
        this.$emit('updateVisible', val)
      }
    }
  },
  methods: {
    Cancel () {
      this.$emit('resetPopupData')
    },
    Save () {
      this.$emit('submitPopupData')
    },
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>
