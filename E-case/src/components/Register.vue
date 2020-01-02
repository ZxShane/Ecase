<template>
<div id="register">
  <h1 style="margin-left:40%;margin-bottom:2%;margin-top:1%;">注册</h1>
  <i-form  inline style="margin-left:35%;">
    <Form-item prop="user"> 
       <h4 style="block:inline;">用户名：</h4>
       <i-input type="text"  placeholder="Username" v-model="name" inline margin-bottom="10%">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </i-input>
    </Form-item><br>
    <Form-item >
      <h4 style="block:inline;">密码：</h4> 
      <i-input type="password" v-model="pwd" placeholder="Password" inline>
        <Icon type="ios-pin-outline" slot="prepend"></Icon>
      </i-input>
    </Form-item><br>
    <Form-item > 
       <h4 style="block:inline;">医生编号：</h4>
       <i-input type="text" v-model="patientid" placeholder="credit card" :v-model="patientid" inline margin-bottom="10%">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </i-input>
    </Form-item><br>
    <Form-item > 
       <h4 style="block:inline;">手机号：</h4>
       <i-input type="text" v-model="mobliephone" placeholder="credit card" :v-model="patientid" inline margin-bottom="10%">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </i-input>
    </Form-item><br>
    <Form-item style="margin-top:3%;">
      <i-button type="primary" @click="handleSubmit()" style="margin-left:130px;">提交</i-button>
      <router-link to = "/"><i-button type="primary"  style="margin-left:20px;">登录</i-button></router-link>
    </Form-item>
  </i-form>
</div>
</template>
<script>
  export default {
    name:'Register',
    data () {
      return{
        name:'',
        pwd:'',
        //usertype:"患者",
        patientid:'',
        mobliephone:''
      }
    },
    methods: {
      handleSubmit(name) {
        let self = this
        this.$axios.post('http://117.78.1.3:8080/invoke',{
          "func":"patientregister",
          "usertype":"医生",
          "username":self.name,
          "password":self.pwd,
          "patientid":self.patientid,
          "mobliephone":self.mobliephone,
          "rsapublic":''
        }).then((res)=>{
          console.log(res)
          self.$router.push({
              name:"PersonalInfo",
              params:{
                username:self.name,
                doctorId:self.patientid,
              }
            })
        })
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
