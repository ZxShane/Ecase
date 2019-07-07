<template>
<div id="load">
  <h1 style="margin-left:20%;margin-bottom:10%;">登录</h1>
  <i-form v-ref:form-inline :model="formInline" :rules="ruleInline" inline>
    <Form-item prop="user"> 
       <h4 style="block:inline;">用户名：</h4>
       <i-input type="text" :value.sync="formInline.user" placeholder="Username" inline margin-bottom="10%">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </i-input>
    </Form-item><br>
    <Form-item prop="password">
      <h4 style="block:inline;">密码：</h4> 
      <i-input type="password" :value.sync="formInline.password" placeholder="Password" inline>
        <Icon type="ios-pin-outline" slot="prepend"></Icon>
      </i-input>
    </Form-item><br>
    <Form-item>
      <i-button type="primary" @click="handleSubmit('formInline')" style="margin-left:130px;">登录</i-button>
    </Form-item>
  </i-form>
</div>
</template>
<script>
  export default {
    name:'Load',
    data () {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
          
          ],
          password: [
           
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('欢迎登录');
          } else {
            this.$Message.error('验证失败!');
          }
        })
        localStorage.setItem('isshow',1)
      }
    }
  }
</script>
<style scoped>
#load{
  margin-top: 70px;
  /* border-style: solid;
  border-color: cornflowerblue; */
  border-radius: 10px;
  margin-left: 30%;
  margin-right:40%;
  padding-left: 5%;
  padding-right: 2%;
}
</style>
