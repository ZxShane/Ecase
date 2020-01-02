<template>
  <div id="Addinfo">
    <Breadcrumb>
      <BreadcrumbItem to="choosehospital">挂号系统</BreadcrumbItem>
      <BreadcrumbItem to="choosehospital">{{ hospital }}</BreadcrumbItem>
      <BreadcrumbItem to="guahao">{{ sector }}</BreadcrumbItem>
      <BreadcrumbItem to="choosedoc">{{ doctor }}</BreadcrumbItem>
      <BreadcrumbItem>请填写信息</BreadcrumbItem>
    </Breadcrumb>
    <div class="yuyue">
      <div class="info">
        <h1 style="margin-top:30px;">预约信息</h1>
        <h3 style="margin-top:20px;">预约医生：{{ doctor }}</h3>
        <h3 style="margin-top:20px;">选择日期：</h3>
        <Row>
          <Col span="12">
            <DatePicker type="date" placeholder="Select date" style="width: 200px" v-model="date"></DatePicker>
          </Col>
        </Row>
        <h3 style="margin-top:20px;">选择号源：</h3>
        <Select v-model="time" style="width:200px">
          <Option
            v-for="item in cityList"
            :value="item.label"
            :key="item.value"
          >第{{ item.value }}号 {{ item.label }}</Option>
        </Select>
        <h3 style="margin-top:20px;">就诊人：{{ name }}</h3>
        <h3 style="margin-top:20px;">证件号码：{{ patientid }}</h3>
        <h3 style="margin-top:20px;">性别：{{ gender }}</h3>
      </div>
      <Button
        type="primary"
        @click="submit()"
        style="margin-top:30px;margin-left:80%;margin-bottom:30px;"
      >预约挂号</Button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Addinfo",
  data() {
    return {
      name:'',
      gender:'',
      hospital: "",
      sector: "",
      doctor: "",
      date: "",
      time: "",
      doctorid: "",
      patientid: "",
      reserverstate: "预约成功",
      reserveid: "",
      info: [
        "口腔科",
        "外科",
        "脑科",
        "妇产科",
        "儿科",
        "皮肤科",
        "内科",
        "耳鼻喉科",
        "心理科"
      ],
      cityList: [
        {
          value: "1",
          label: "8:00-8:06"
        },
        {
          value: "2",
          label: "8:06-8:12"
        },
        {
          value: "3",
          label: "8:12-8:18"
        },
        {
          value: "4",
          label: "8:18-8:24"
        },
        {
          value: "5",
          label: "8:24-8:30"
        },
        {
          value: "6",
          label: "8:30-8:36"
        }
      ],
      model1: "",
      number: "",
      username: "",
      aes: ""
    };
  },
  created() {
    this.hospital = this.$route.params.hospital;
    this.sector = this.$route.params.sector;
    this.doctor = this.$route.params.item;
    this.doctorid = this.$route.params.doctorid;
    //this.aesmiyao = window.sessionStorage.getItem(self.username + "aes");
    this.patientid = window.sessionStorage.getItem("patientId");
    this.username = window.sessionStorage.getItem("username");
    this.aes = window.sessionStorage.getItem(this.username+"aes")
    if (this.username == null || this.username == "") {
      alert("请登录！");
      this.$router.push({
        name: "Load"
      });
    } else if (this.patientid == null || this.patientid == "") {
      alert("请先登录！");
      this.$router.push({
        name: "Load"
      });
    }
    this.getinfo()
    this.queryreserve();
  },
  methods: {
    getinfo()
    {
    let self = this
    this.$axios.post('http://117.78.1.3:8080/queryPatientInfo',{
      patientId:self.patientid
    }).then((res)=>{
      console.log(res)
      self.name = self.utils.decrypt(res.data.patientName,self.aes)
      self.gender = self.utils.decrypt(res.data.gender,self.aes)
      //self.name = self.utils.decrypt(res.data.patientName,self.aes)
    })
    },
    queryreserve() {
      var self = this;
      this.$axios
        .post("http://117.78.1.3:8080/queryreserve", {
          patientId: self.patientid
        })
        .then(function(res) {
          console.log(res.data);
          var number = self.utils.decrypt(res.data, self.aesmiyao);
          self.number = number;
        });
    },
    submit: function() {
      let self = this;

      this.aes = window.sessionStorage.getItem(self.username + "aes");
      self.number = self.number + 1;
      self.reserveid = "0" + self.number;
      console.log(self.reserveid);
      console.log(self.date);
      var finalreserveid = self.utils.encrypt(self.reserveid, self.aes);
      var finalhospital = self.utils.encrypt(self.hospital, self.aes);
      var finalsector = self.utils.encrypt(self.sector, self.aes);
      var finaldoctorid = self.utils.encrypt(self.doctorid, self.aes);
      var finaldate = self.utils.encrypt(self.date, self.aes);
      var finaltime = self.utils.encrypt(self.time, self.aes);
      var finalreserverstate = self.utils.encrypt(self.reserverstate, self.aes);
      this.$axios
        .post("http://117.78.1.3:8080/invoke", {
          func: "addReserveInfo",
          patientId: self.patientid,
          reserveid: finalreserveid,
          hospitalname: finalhospital,
          department: finalsector,
          doctorid: finaldoctorid,
          reserverdate: finaldate,
          reservertime: finaltime,
          reserverstate: finalreserverstate
        })
        .then(res => {
          console.log(res);
          alert("挂号成功!");
          this.$router.push({
            path: "/choosehospital"
          });
        });
    }
  }
};
</script>
<style scoped>
.yuyue {
  border-radius: 20px;
  border-style: solid;
  border-color: cornflowerblue;
  width: 35%;
  padding-right: 2%;
  margin-left: 25%;
  margin-top: 2%;
}
.info {
  margin-left: 30%;
}
</style>