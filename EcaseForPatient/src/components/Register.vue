<template>
  <div id="register">
    <h1 style="margin-left:40%;margin-bottom:2%;margin-top:1%;">注册</h1>
    <i-form inline style="margin-left:35%;">
      <Form-item prop="user">
        <h4 style="block:inline;">用户名：</h4>
        <i-input type="text" placeholder="Username" v-model="name" inline margin-bottom="10%">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </i-input>
      </Form-item>
      <br />
      <Form-item prop="password">
        <h4 style="block:inline;">密码：</h4>
        <i-input type="password" v-model="pwd" placeholder="Password" inline>
          <Icon type="ios-pin-outline" slot="prepend"></Icon>
        </i-input>
      </Form-item>
      <br />
      <Form-item prop="user">
        <h4 style="block:inline;">身份证号：</h4>
        <i-input
          type="text"
          v-model="patientid"
          placeholder="credit card"
          :v-model="name"
          inline
          margin-bottom="10%"
        >
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </i-input>
      </Form-item>
      <br />
      <Form-item prop="user">
        <h4 style="block:inline;">手机号：</h4>
        <i-input
          type="text"
          v-model="phonenumber"
          placeholder="credit card"
          :v-model="name"
          inline
          margin-bottom="10%"
        >
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </i-input>
      </Form-item>
      <Form-item>
        <h4 style="block:inline;">手机验证码：</h4>
        <i-input type="text" v-model="addcode" placeholder="请填写手机验证码" inline>
          <Icon type="ios-pin-outline" slot="prepend"></Icon>
        </i-input>
        <Button
          v-show="state"
          type="primary"
          @click="send()"
          style="margin-left:103%;margin-top:-40%;"
        >发送短信验证码</Button>
        <Button
          v-show="!state"
          type="primary"
          @click="resend()"
          style="margin-left:103%;margin-top:-40%;"
        >已发送</Button>
        <Modal v-model="modal1" title="重新发送" @on-ok="ok" @on-cancel="cancel">
          <p>是否需要重新发送短信验证码？</p>
        </Modal>
      </Form-item>
      <br />

      <Form-item style="margin-top:3%;">
        <i-button type="primary" @click="handleSubmit()" style="margin-left:130px;">提交</i-button>
        <router-link to="/">
          <i-button type="primary" style="margin-left:20px;">登录</i-button>
        </router-link>
      </Form-item>
    </i-form>
  </div>
</template>
<script>
import keypair from "keypair";
export default {
  name: "Register",
  data() {
    return {
      name: "",
      pwd: "",
      usertype: "患者",
      patientid: "",
      phonenumber: "",
      pubKeyPEM: "",
      prvKeyPEM: "",
      aes: "",
      code: "",
      addcode: "",
      state:true,
      modal1: false
    };
  },
  created() {},
  methods: {
    ok() {
      this.state = true;
    },
    cancel() {},

    send() {
      this.code = "";
      let self = this;
      for (var i = 0; i < 4; i++) {
        var num = Math.floor(Math.random() * 10);
        self.code = self.code + num;
      }

      var finalcode = '{"code":"' + self.code + '"}';
      console.log(self.code);
      self.$axios
        .post("http://117.78.1.3:8080/sendmessage", {
          number: self.phonenumber,
          code: finalcode
        })
        .then(res => {
          console.log(res);
          if (res.data.Code == "OK") {
            alert("验证码已发送，请注意查收");
            self.state = false;
          }
        });
    },
    resend() {
      this.modal1 = true;
    },
    handleSubmit() {
      let self = this;
      var pair = keypair();
      // console.log(pair.public);
      // console.log(pair.private);
      this.pubKeyPEM = pair.public;
      this.prvKeyPEM = pair.private;
      window.localStorage.setItem("priv", this.prvKeyPEM);
      if (self.addcode != self.code) {
        alert("验证码错误！");
      } else {
        this.$axios
          .post("http://117.78.1.3:8080/invoke", {
            func: "patientregister",
            usertype: "患者",
            username: self.name,
            password: self.pwd,
            patientid: self.patientid,
            mobliephone: self.phonenumber,
            rsapublic: self.pubKeyPEM
          })
          .then(res => {
             console.log(res);
            if (res.data == 1) {
              window.localStorage.setItem(self.name + "priv", this.prvKeyPEM);
              window.sessionStorage.setItem("patientId", self.patientid);
              window.sessionStorage.setItem("username", self.name);

              self.$router.push({
                path: "/personalinfo"
              });
              alert("注册成功！");
            } else if (res.data == "this user is already existed !!!!") {
              alert("该用户名已经被注册！");
            } else if (
              res.data ==
              "this idcardnumber already relevanted to another user !!!!"
            ) {
              alert("该身份证号已被关联至其他用户！");
            } else if (
              res.data ==
              "this mobilephone already relevanted to another user !!!!"
            ) {
              alert("该手机号已被关联至其他用户！");
            } else {
              alert("网络错误！");
            }
          });
      }
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
