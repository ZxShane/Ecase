<template>
  <div id="load">
    <h1 style="margin-left:20%;margin-bottom:10%;">登录</h1>
    <i-form  inline>
      <Form-item prop="user">
        <h4 style="block:inline;">用户名：</h4>
        <i-input
          type="text"
          placeholder="Username"
          inline
          margin-bottom="10%"
          v-model="username"
        >
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </i-input>
      </Form-item>
      <br />
      <Form-item >
        <h4 style="block:inline;">密码：</h4>
        <i-input type="password" placeholder="Password" inline v-model="password">
          <Icon type="ios-pin-outline" slot="prepend"></Icon>
        </i-input>
      </Form-item>
      <br/>
      <Form-item style="margin-top:3%;">
        <i-button type="primary" @click="handleSubmit()" style="margin-left:130px;">登录</i-button>
        <!-- <i-button type="primary" @click="register()" >注册</i-button> -->
      </Form-item>
    </i-form>
    <div style="font-size:15px;">
      因为医生账号应为医院管理员创建，所以医生无法自己注册。现有三个测试账号
      <p>用户名：zhangsan &nbsp;&nbsp;密码:123</p>
      <p>用户名：lisi &nbsp;&nbsp;密码:123</p>
      <p>用户名：wangwu &nbsp;&nbsp;密码:123</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Load",
  data() {
    return {
     
        username: "",
        password: "",
        doctorId:''
    };
  },
  created()
  {
    this.doctorid = window.sessionStorage.getItem('doctorId')
    if(this.doctorid!=''&&this.doctorid!=undefined)
    {
      this.$router.push({
        path:'/createnewcase'
      })
    }
  },
  methods: {
    handleSubmit(name) {
      let self = this
      this.$axios.post("http://117.78.1.3:8080/invoke",{
        func:'doctorLogin',
        username:self.username,
        password:self.password
      }).then((res)=>{
        self.doctorId = res.data
        console.log(res)
        window.sessionStorage.setItem('doctorId',res.data)
        self.$router.push({
          path:'/createnewcase'
        })
      })
    },
    register() {
      this.$router.push({
        path: "/register"
      });
    }
  }
};
</script>
<style scoped>
#load {
  margin-top: 70px;
  /* border-style: solid;
  border-color: cornflowerblue; */
  border-radius: 10px;
  margin-left: 30%;
  margin-right: 40%;
  padding-left: 5%;
  padding-right: 2%;
}
</style>
