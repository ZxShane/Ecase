<template>
  <div style="font-size:15px;">
    请输入患者身份证号
    <input v-model="id" />
    <i-button type="primary" @click="getaes()">创建病历</i-button>
    <i-button type="primary" @click="getmedicine()" style="margin-left:40%;">开药</i-button>
    <i-button type="primary" @click="transfer()">转科</i-button>

    <i-form :label-width="80" style="overflow:scroll;">
      <h2>病人基本信息</h2>
      <br />
      <Form-item label="身份证号">
        <i-input disabled v-model="patientinfo[3]"></i-input>
      </Form-item>
      <Form-item label="姓名">
        <i-input disabled v-model="patientinfo[6]"></i-input>
      </Form-item>
      <Form-item label="性别">
        <i-input disabled v-model="patientinfo[1]"></i-input>
      </Form-item>
      <Form-item label="婚姻状况">
        <i-input v-model="patientinfo[4]"></i-input>
      </Form-item>
      <Form-item label="民族">
        <i-input disabled v-model="patientinfo[5]"></i-input>
      </Form-item>
      <Form-item label="家庭住址">
        <i-input v-model="patientinfo[2]"></i-input>
      </Form-item>
      <Form-item label="病史陈述者">
        <i-input v-model="presenter"></i-input>
      </Form-item>
      <h2>添加病历信息</h2>
      <br />
      <i-form :label-width="80">
        <Form-item label="科室">
          <i-input v-model="department"></i-input>
        </Form-item>
        <Form-item label="疾病类型">
          <i-input placeholder="请输入疾病类型" v-model="medicalType"></i-input>
        </Form-item>

        <Form-item label="主诉">
          <i-input
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="反复腹胀，腹痛半年，加重1周"
            v-model="symptoms"
          ></i-input>
        </Form-item>
        <Form-item label="既往史">
          <i-input
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="无外伤手术，输血，药物及食物过敏史"
            v-model="diseasesOnceSuffered"
          ></i-input>
        </Form-item>
        <Form-item label="诊断">
          <i-input
            type="textarea"
            v-model="conclusion"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="急性肠胃炎"
          ></i-input>
        </Form-item>
        <Form-item>
          <i-button type="primary" @click="handleSubmit()">提交</i-button>
          <!-- <i-button type="ghost" style="margin-left: 8px ;color:black;">重置</i-button> -->
        </Form-item>
      </i-form>
    </i-form>
  </div>
</template>
<script>
export default {
  name: "CreateNewCase",
  data() {
    return {
      id: "",
      aes: "",
      number: "",
      patientid: "",
      name: "",
      doctorid: "",
      patientinfo: "",
      department: "肠胃外科",
      time: "",
      medicalType: "",
      symptoms: "",
      diseasesOnceSuffered: "",
      conclusion: "",
      medicalinfo: [],
      time: "",
      presenter: ""
    };
  },
  created() {
    //this.getPatientInfo();
    this.doctorid = window.sessionStorage.getItem('doctorId')
    if(this.doctorid=='')
    {
      alert("请先登录！")
      this.$router.push({
        path:'/'
      })
    }
    this.getTime();
    //this.getcaseNum();
  },
  methods: {
    getaes() {
      this.getcaseNum();
      let self = this;
      this.$axios
        .post("http://117.78.1.3:8080/invoke", {
          func: "checkPermission",
          patientId: self.id,
          doctorId: self.doctorid
        })
        .then(response => {
          if (response.data == 0) {
            alert("抱歉，请先挂号！");
          } else {
            this.getcaseNum();
            self.aes = response.data;
            window.sessionStorage.setItem("aes", self.aes);
            window.sessionStorage.setItem("patientId", self.id);
            this.getPatientInfo(response.data);
          }
          console.log(response);
        });
      
    },
    getmedicine() {
      let self = this;
      if (self.patientinfo == "" || self.number == "") {
        alert("请先创建病历");
      } else {
        console.log(self.patientinfo[3]);
        self.$router.push({
          name: "Medicine",
          params: {
            patientId: self.patientinfo[3],
            patientname: self.patientinfo[6],
            complainid: self.number,
            aes: self.aes
          }
        });
      }
    },
    transfer() {
      let self = this;
      if (self.patientinfo == "" || self.number == "") {
        alert("请先创建病历");
      } else {
        //console.log(self.patientinfo[3]);
        self.$router.push({
          name: "Inhospital",
        });
      }
    },
    getcaseNum: function() {
      let self = this;
      var url = "http://117.78.1.3:8080/queryCase";
      //this.patientId.push(this.id)
      this.$axios
        .post(url, {
          patientId: this.id
        })
        .then((res) => {
        //  console.log(res)
          self.number = res.data
          var num = self.number + 1;
      self.number = "0" + num;
      console.log(self.number);
      window.sessionStorage.setItem("complainid", self.number);
        });
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
    },
    getPatientInfo: function(aes) {
      let self = this;
      this.$axios
        .post("http://117.78.1.3:8080/queryPatientInfo", {
          patientId: self.id
        })
        .then(res => {
          console.log(res.data);
          var painfo = [];
          var finalbirthday = self.utils.decrypt(res.data.birthday, aes);
          //  var finalbirthday = this.utils.decrypt(res.data.birthday,self.aes)
          var finalgender = self.utils.decrypt(res.data.gender, aes);
          var finalhomeAddress = self.utils.decrypt(res.data.homeAddress, aes);
          var finalpatientId = self.utils.decrypt(res.data.idcardnumber, aes);
          var finalmarriageCondition = self.utils.decrypt(
            res.data.marriageCondition,
            aes
          );
          var finalnation = self.utils.decrypt(res.data.nation, aes);
          var finalpatientName = self.utils.decrypt(res.data.patientName, aes);
          painfo.push(finalbirthday);
          painfo.push(finalgender);
          painfo.push(finalhomeAddress);
          painfo.push(finalpatientId);
          painfo.push(finalmarriageCondition);
          painfo.push(finalnation);
          painfo.push(finalpatientName);

          self.patientinfo = painfo;
          window.sessionStorage.setItem("patientname", finalpatientName);
          //console.log(self.patientinfo);
        });
    },
    changepatient() {
      let self = this;
      var sendmarriageCondition = this.utils.encrypt(
        this.patientinfo[4],
        this.aes
      );
      var sendhomeAddress = this.utils.encrypt(this.patientinfo[2], this.aes);
      this.$axios
        .post("http://117.78.1.3:8080/invoke", {
          func: "changePaientBaseinfo",
          patientId: self.id,
          homeAddress: sendhomeAddress,
          marriageCondition: sendmarriageCondition
        })
        .then(res => {
          console.log(res);
          if (res.data == 1) {
            alert("添加成功！");
          }
        });
    },
    handleSubmit() {
      
      let self = this;
      this.medicalinfo = [];
      //console.log(this.number);
      
      var finalcomplainid = self.utils.encrypt(self.number, self.aes);
      var finaldepartment = self.utils.encrypt(self.department, self.aes);
      var finaltime = self.utils.encrypt(self.time, self.aes);
      var finalmedicalType = self.utils.encrypt(self.medicalType, self.aes);
      var finalsymptoms = self.utils.encrypt(self.symptoms, self.aes);
      var finalconclusion = self.utils.encrypt(self.conclusion, self.aes);
      var finalpresenter = self.utils.encrypt(self.presenter, self.aes);
      var finaldiseasesOnceSuffered = self.utils.encrypt(
        self.diseasesOnceSuffered,
        self.aes
      );

      this.$axios
        .post("http://117.78.1.3:8080/create", {
          patientid: self.id,
          complainid: finalcomplainid,
          createdoctorid: self.doctorid,
          department: finaldepartment,
          time: finaltime,
          medicalType: finalmedicalType,
          symptoms: finalsymptoms,
          conclusion: finalconclusion,
          presenter: finalpresenter,
          diseasesOnceSuffered: finaldiseasesOnceSuffered
        })
        .then(response => {
          console.log(response);

          if (response.data == 1) {
            window.sessionStorage.setItem('sector',self.department)
            self.changepatient();
          }
        });
      //alert("添加成功！");
      //location.reload();
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
