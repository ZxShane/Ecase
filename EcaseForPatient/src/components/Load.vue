<template>
  <div id="load">
    <div>
      <h1 style="margin-left:20%;margin-bottom:10%;">登录</h1>
      <i-form inline>
        <Form-item>
          <h4 style="block:inline;">用户名：</h4>
          <i-input type="text" placeholder="请输入用户名" inline v-model="username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-input>
        </Form-item>
        <br />
        <Form-item>
          <h4 style="block:inline;">密码：</h4>
          <i-input type="password" v-model="password" placeholder="请输入密码" inline>
            <Icon type="ios-pin-outline" slot="prepend"></Icon>
          </i-input>
        </Form-item>
        <br />
        <Form-item>
          <h4 style="block:inline;">手机号：</h4>
          <i-input type="text" v-model="phonenumber" placeholder="手机号" inline>
            <Icon type="ios-pin-outline" slot="prepend"></Icon>
          </i-input>
        </Form-item>
        <Form-item>
          <h4 style="block:inline;">手机验证码：</h4>
          <i-input type="text" v-model="addcode" placeholder="请填写手机验证码" inline>
            <Icon type="ios-pin-outline" slot="prepend"></Icon>
          </i-input>
          <Button v-show="state" type="primary" @click="send()" style="margin-left:103%;margin-top:-40%;">发送短信验证码</Button>
          <Button v-show="!state" type="primary" @click="resend()" style="margin-left:103%;margin-top:-40%;">已发送</Button>
          <Modal
            v-model="modal1"
            title="重新发送"
            @on-ok="ok"
            @on-cancel="cancel"
          >
            <p>是否需要重新发送短信验证码？</p>
          </Modal>
        </Form-item>
        <br />
        <Form-item style="margin-left:25%;">
          <i-button type="primary" @click="handleSubmit()">登录</i-button>
          <i-button type="primary" @click="register() ">注册</i-button>
        </Form-item>
      </i-form>
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
      phonenumber: "",
      rsa: "",
      aes: "",
      code: "",
      addcode: "",
      state: true,
      modal1: false
    };
  },
  created() {
    this.patientId = window.sessionStorage.getItem("patientId");
    this.username = window.sessionStorage.getItem("username");
    if(this.patientId!=''&&this.username!=''&&this.patientId!=undefined&&this.username!=undefined)
    {
      this.$router.push({
        path:'/account'
      })
    }
  },
  methods: {
    ok() {
      this.state=true
    },
    cancel() {
      
    },

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
      this.modal1 = true
      
    },
    RSAdecrypt(pass) {
      let jse = new JSEncrypt();
      // 私钥
      self.rsa = window.localStorage.getItem(self.username + "priv");

      jse.setPrivateKey(`-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDfw1/P15GQzGGYvNwVmXIGGxea8Pb2wJcF7ZW7tmFdLSjOItn9
kvUsbQgS5yxx+f2sAv1ocxbPTsFdRc6yUTJdeQolDOkEzNP0B8XKm+Lxy4giwwR5
LJQTANkqe4w/d9u129bRhTu/SUzSUIr65zZ/s6TUGQD6QzKY1Y8xS+FoQQIDAQAB
AoGAbSNg7wHomORm0dWDzvEpwTqjl8nh2tZyksyf1I+PC6BEH8613k04UfPYFUg1
0F2rUaOfr7s6q+BwxaqPtz+NPUotMjeVrEmmYM4rrYkrnd0lRiAxmkQUBlLrCBiF
u+bluDkHXF7+TUfJm4AZAvbtR2wO5DUAOZ244FfJueYyZHECQQD+V5/WrgKkBlYy
XhioQBXff7TLCrmMlUziJcQ295kIn8n1GaKzunJkhreoMbiRe0hpIIgPYb9E57tT
/mP/MoYtAkEA4Ti6XiOXgxzV5gcB+fhJyb8PJCVkgP2wg0OQp2DKPp+5xsmRuUXv
720oExv92jv6X65x631VGjDmfJNb99wq5QJBAMSHUKrBqqizfMdOjh7z5fLc6wY5
M0a91rqoFAWlLErNrXAGbwIRf3LN5fvA76z6ZelViczY6sKDjOxKFVqL38ECQG0S
pxdOT2M9BM45GJjxyPJ+qBuOTGU391Mq1pRpCKlZe4QtPHioyTGAAMd4Z/FX2MKb
3in48c0UX5t3VjPsmY0CQQCc1jmEoB83JmTHYByvDpc8kzsD8+GmiPVrausrjj4p
y2DQpGmUic2zqCxl6qXMpBGtFEhrUbKhOiVOJbRNGvWW
-----END RSA PRIVATE KEY-----`);
      let decrypted = jse.decrypt(pass);
      console.log("解密：" + decrypted);
      return decrypted;
    },
    handleSubmit() {
      let self = this;
      if (self.username == "") {
        alert("用户名不能为空!");
      } else if (self.password == "") {
        alert("密码不能为空!");
      } else if (self.phonenumber == "") {
        alert("手机号不能为空!");
      } else if (self.addcode != self.code) {
        alert("验证码错误!");
      } else {
        self.$axios
          .post("http://117.78.1.3:8080/invoke", {
            func: "patientLogin",
            username: self.username,
            password: self.password,
            mobliephone: self.phonenumber
          })
          .then(result => {
            console.log(result);
            if (result.data == "user is not  exist !!!!") {
              alert("请注册！");
            } else if (
              result.data == "Login failed  !!!! Please check your information"
            ) {
              alert("手机号或密码错误！");
            } else {
              window.sessionStorage.setItem("patientId", result.data);
              window.sessionStorage.setItem("username", self.username);

              self.$axios
                .post("http://117.78.1.3:8080/invoke", {
                  func: "RSAPublicEncryptoAES",
                  username: self.username
                  // flag:'1',
                  // str:"Kpy+GTT7F/+5dOmz30yD7w=="
                })
                .then(res => {
                  console.log(res);
                  self.aes = self.RSAdecrypt(res.data);
                  window.sessionStorage.setItem(
                    self.username + "aes",
                    self.aes
                  );
                });
              this.$router.push({
                path: "/account"
              });
            }
          });
      }
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
  margin-left: 35%;
  margin-right: 40%;
  padding-left: 5%;
  padding-right: 2%;
}
</style>
