
<template>
<div align="center" style='font-family:"微软雅黑"'>
    <img :src="require('@/assets/404not.jpg')" border="0" width="400" height="400" style="margin:10vh 0 0 0"/>
    <br>
    ?迷路了?<br><br>
    <el-button size="large" @click="handleBack">返回引导页</el-button>
    <br><br> &copy; charles.top
</div>
</template>

<script>
export default{
    methods:{
        handleBack() {
            this.$router.push("/")
        }
    }
}
</script>

<style scoped>  
.el-button{
    margin-top: 20px;
    background-color: #67C23A;
    color: #fff;
    border: 1px solid #fff;
    font-size: 30px;
}
</style>