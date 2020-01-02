<template>
  <div>
    <h3 style="margin-top:20px;">输入身份证号</h3>
    <input placeholder="412726199910192020" class="input" v-model="id" />
    <button id="btn" @click="permission()">搜索</button>
    <hr style="height:1px;border:none;border-top:1px dashed #0066CC;margin-top:30px;" />
    <div v-show="one">
      <h3 style="margin-top:20px;" @click="search()">查找结果</h3>
      <Row>
        <Col v-for="item in info" span="6" style="margin-right:30px;margin-top:30px;">
          <div @click="transfer(item[0])">
            <Card>
              <p slot="title">病历号：{{ id+item[0] }}</p>
              <p>{{ item[4] }}</p>
              <p>{{ item[1] }}</p>
              <p>{{ item[3] }}</p>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  name: "QueryCase",

  data() {
    return {
      one: 0,
      id: "",
      number: "",
      doctorId: "",
      aes: "",
      info: [
        // {
        //   number:"20100223123",
        //   time:"2010-2-23",
        //   diease:"急性阑尾炎",
        //   doctor:"张医生"
        // },
        // {
        //   number:"20120514143",
        //   time:"2012-5-14",
        //   diease:"急性气管炎",
        //   doctor:"李医生"
        // },
        // {
        //   number:"20140423043",
        //   time:"2014-4-23",
        //   diease:"骨折",
        //   doctor:"欧阳医生"
        // },
        // {
        //   number:"20150513063",
        //   time:"2015-5-13",
        //   diease:"软组织挫伤",
        //   doctor:"欧阳医生"
        // },
      ]
    };
  },
  created(){
    this.doctorId = window.sessionStorage.getItem('doctorId')
    if(this.doctorId=='')
    {
      alert("请先登录！")
      this.$router.push({
        path:'/'
      })
    }
  },
  methods: {
    permission() {
      let self = this;
      this.$axios
        .post("http://117.78.1.3:8080/invoke", {
          func: "checkPermission",
          patientId: self.id,
          doctorId: self.doctorId
        })
        .then(res => {
          console.log(res);
          if (res.data != 0) {
            self.aes = res.data;
            self.search();
          }
        });
    },
    transfer: function(caseid) {
      // console.log(caseid)
      this.$router.push({
        name: "Info",
        params: {
          caseid: caseid,
          patientid: this.id,
          aes:this.aes
        }
      });
    },
    search: function() {
      let self = this;
      self.info = [];
      var url = "http://117.78.1.3:8080/queryCase";
      //this.patientId.push(this.id)
      this.$axios
        .post(url, {
          patientId: this.id
        })
        .then(function(response) {
          console.log(response.data);
          self.number = response.data;
          // var flag = response.data.split('{');
          var temp = 1;
          for (temp; temp <= self.number; temp++) {
            self.$axios
              .post("http://117.78.1.3:8080/queryCaseInfo", {
                patientId: self.id,
                complaintid: "0" + temp
              })
              .then(responseinfo => {
                console.log(responseinfo);
                var caseinfo = [];
                var finalconclusion = self.utils.decrypt(
                  responseinfo.data.conclusion,
                  self.aes
                );
                var finalcreateDoctorId = self.utils.decrypt(
                  responseinfo.data.createDoctorId,
                  self.aes
                );
                var finaldepartment = self.utils.decrypt(
                  responseinfo.data.department,
                  self.aes
                );
                var finalcomplaintId = self.utils.decrypt(
                  responseinfo.data.complaintId,
                  self.aes
                );
                var finalmedicalCreate = self.utils.decrypt(
                  responseinfo.data.medicalCreate,
                  self.aes
                );
                caseinfo.push(finalcomplaintId);
                caseinfo.push(finalconclusion);
                caseinfo.push(finalcreateDoctorId);
                caseinfo.push(finaldepartment);
                caseinfo.push(finalmedicalCreate);
                self.info.push(caseinfo);
              });
          }
          console.log(self.info);
          self.one = 1;
          // console.log(flag)
        })
        .catch(function(error) {
          console.log(self.id);
          alert("失败了");
          console.log(error);
        });
    }
  }
};
</script>
<style>
#btn {
  background-color: #2d8cf0; /* Green */
  border: none;
  color: white;
  padding: 7px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  border-radius: 4px;
}
.input {
  /*border:1px;*/
  padding-left: 3px;
  padding-right: 3px;
  height: 27px;
  font-size: 15px;
  width: 250px;
}
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  width: 100%;
  border-collapse: collapse;
}
#customers td,
#customers th {
  font-size: 1.1em;
  border: 1px solid #2d8cf0;
  padding: 3px 7px 2px 7px;
}
#customers th {
  font-size: 1.1em;
  text-align: left;
  padding-top: 5px;
  padding-bottom: 4px;
  background-color: #54a3af;
  color: #ffffff;
}
#customers tr.alt td {
  color: #000000;
  background-color: #eaf2d3;
}
</style>
