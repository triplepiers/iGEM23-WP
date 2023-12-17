
<template>
  <div class="home">
    <div class="coverBox">
      <div class="centerBox">
        <!-- 头像 -->
        <el-avatar
          :src="require('@/assets/portrait.jpg')"
          :size="150"
          class="picT"
        ></el-avatar>
        <!-- 作者 -->
        <div class="ahtuorName">charles</div>
        <el-divider class="divider"></el-divider>
        <!-- 内容 -->
        <div class="title" v-for="(v, k) in content" :key="k">
          <typewriter class="str" :str="v"></typewriter>
        </div>
        <!-- 引导按钮 -->
        <div class="btnBox">
          <el-button round @click="clickHome" class="btnStyle">首页</el-button>
          <el-button round class="btnStyle">Blog</el-button>
        </div>
        <!-- 链接图标模块 -->
        <div class="continueBox">
          <img src="@/assets/QQ.png" alt="" class="logoimg" @click="goQQ" />
        </div>
        <!-- 弹窗组件 -->
        <Popup
          :dialogTitle="dialogTitle"
          :visible.sync="dialogVisible"
          @updateVisible="updateVisible"
          @resetPopupData="resetPopupData"
          @submitPopupData="submitPopupData"
          @handleClose="handleClose"
          :popupWidth="'250px'"
        >
        </Popup>
      </div>
      <!-- 页脚 -->
      <div class="footerBox">
        &copy; 2023 charles 版权所有<br />
        <a href="https://beian.miit.gov.cn/" style="color: #fff" target="_blank">have a good day</a>
      </div>
    </div>
  </div>
</template>


<script>
import Popup from "@/components/dialogView/index.vue"; //弹窗组件
import typewriter from "./components/typewriter.vue";
import "./css/HomeView.scss";

export default {
  name: "HomeView",
  components: { Popup, typewriter },
  data() {
    return {
      content: [],
      str: "我是文字",
      //文章内容
      words: [
        "hello！ 你好！",
        "第一次尝试搭建自己的主页，欢迎来访！	",
        "兴趣有很多，愿望是 世界和平 :)",
      ],
      dialogVisible: false, // 弹框的出现与否
    };
  },
  mounted() {
    this.setTime();
  },
  methods: {
    setTime() {
      var arr = this.words;
      var that = this;
      arr.forEach(function (v, k) {
        setTimeout(function () {
          that.content.push(v);
        }, k * 2500);
      });
    },
    updateVisible(val) {
      this.dialogVisible = val;
    },
    // 点击取消的事件
    resetPopupData() {
      //  这里可重置数据
      this.dialogVisible = false;
    },
    // 点击确定的按钮
    async submitPopupData() {
      this.dialogVisible = false;
    },
    // 关闭弹框（头部的X）
    handleClose() {
      this.dialogVisible = false;
    },
    clickHome() {
      this.$router.push("/about");
    },
    goQQ() {
      //qq弹窗内容
      this.$alert("charles：554564895", "QQ", {
        confirmButtonText: "确定",
      });
    },
  },
};
</script>