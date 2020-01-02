<template>
  <div id="personalinfo">
    <i-form :label-width="80">
      <h2>个人信息</h2>
      <br />
      <Form-item label="医生编号*">
        <i-input disabled :placeholder="doctorId"></i-input>
      </Form-item>
      <Form-item label="姓名*">
        <i-input disabled :placeholder="name"></i-input>
      </Form-item>
      <Form-item label="职称*">
        <i-input disabled :placeholder="role"></i-input>
      </Form-item>
      <Form-item label="医院*">
        <i-input disabled :placeholder="hospitalname"></i-input>
      </Form-item>
      <Form-item label="科室">
        <i-input disabled v-model="department"></i-input>
      </Form-item>
    </i-form>
  </div>
</template>
<script>
export default {
  name: "personalinfo",
  data() {
    return {
      username: "",
      doctorId: "",
      name: "",
      hospitalname: "",
      role: "",
      department: "",
      price: "",
      doctordate: [],
      doctortime: "",
      aes: ""
    };
  },
  created() {
    this.doctorId = window.sessionStorage.getItem("doctorId");
    if (this.doctorId == "" || this.doctorId == undefined) {
      alert("请先登录!");
      this.$router.push({
        path: "/"
      });
    } else {
      this.getinfo();
    }
    //this.getaes();
  },
  methods: {
    RSAdecrypt(pass) {
      let jse = new JSEncrypt();
      // 私钥
      //self.rsa = window.localStorage.getItem(self.username+"priv");

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
    getaes() {
      let self = this;
      this.$axios
        .post("http://117.78.1.3:8080/invoke", {
          func: "RSAPublicEncryptoAES",
          username: self.username
          // flag:'1',
          // str:"Kpy+GTT7F/+5dOmz30yD7w=="
        })
        .then(res => {
          console.log(res);
          self.aes = self.RSAdecrypt(res.data);
          window.sessionStorage.setItem(self.username + "aes", self.aes);
          self.getinfo();
        });
    },

    handleSubmit() {
      let self = this;
      console.log(self.aes);
      this.getTime();
      console.log(self.time);
      if (self.homeAddress == "") {
        alert("家庭地址不能为空");
      } else if (self.marriageCondition == "") {
        alert("婚姻状况不能为空");
      } else {
        var finalhomeAddress = self.utils.encrypt(self.homeAddress, self.aes);
        var finalmarriagecondition = self.utils.encrypt(
          self.marriagecondition,
          self.aes
        );
        this.$axios
          .post("http://117.78.1.3:8080/invoke", {
            func: "changePaientBaseinfo",
            patientId: self.patientId,
            homeAddress: finalhomeAddress,
            marriageCondition: finalmarriagecondition
          })
          .then(res => {
            console.log(res);
            alert("信息保存成功！");
            this.$router.push({
              path: "/account"
            });
          });
      }
    },
    getinfo() {
      let self = this
      this.$axios
        .post("http://117.78.1.3:8080/querydoctorinfo", {
          doctorId: self.doctorId
        })
        .then(res => {
          console.log(res);
          self.department = res.data.department
          self.name = res.data.doctorName
          self.hospitalname = res.data.hospitalname
          self.role = res.data.role
        });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getTime: function() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      this.time =
        year +
        "/" +
        month +
        "/" +
        day +
        "/" +
        hour +
        ":" +
        minute +
        ":" +
        second;
      console.log(this.time);
    }
  }
};
</script>
