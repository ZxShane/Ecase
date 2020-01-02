<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">查看病历</BreadcrumbItem>
    </Breadcrumb>
    <div v-show="isshow" style="margin-top:5%;">当前暂无病历资料</div>
    <Row>
      <Col v-for="item in info" span="6" style="margin-right:30px;margin-top:30px;">
        <div @click="transfer(item.finalcomplaintId)">
          <Card>
            <p slot="title">病历号：{{ patientId+item.finalcomplaintId }}</p>
            <p>{{ item.finalmedicalCreate }}</p>
            <p>{{ item.finalconclusion}}</p>
            <p>{{ item.finaldepartment }}</p>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "Account",
  data() {
    return {
      aes: "",
      one: 1,
      id: "",
      isshow: 0,
      patientId: "1509050119",
      number: "",
      username: "",
      new: {
        number: "20100223123",
        size: "20mg*7片*3盒",
        method: "每次20mg 每日二次 口服",
        setail: "不能饮酒"
      },
      alt: ["alt0", "alt1"],
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
  created() {
    this.getAll();
  },
  methods: {
    transfer: function(id) {
      console.log(id);
      this.$router.push({
        name: "Transfer",
        params: {
          id: id
        }
      });
    },
    getAll: function() {
      let self = this;
      this.patientId = window.sessionStorage.getItem("patientId");
      this.username = window.sessionStorage.getItem("username");
      this.aes = window.sessionStorage.getItem(self.username + "aes");
      console.log(this.aes);
      if (this.username == null || this.username == "") {
        alert("请登录！");
        this.$router.push({
          name: "Load"
        });
      } else if (this.patientId == null || this.patientId == "") {
        alert("请先登录！");
        this.$router.push({
          name: "Load"
        });
      } else {
        var url = "http://117.78.1.3:8080/queryCase";
        //this.patientId.push(this.id)
        this.$axios
          .post(url, {
            patientId: self.patientId
          })
          .then(res => {
            console.log(res.data);
            self.number = res.data;
            if (res.data == 0) {
              self.isshow = 1;
            } else {
              var temp = 1;
              for (temp; temp <= self.number; temp++) {
                self.$axios
                  .post("http://117.78.1.3:8080/queryCaseInfo", {
                    patientId: self.patientId,
                    complaintid: "0" + temp
                  })
                  .then(responseinfo => {
                    console.log(responseinfo);
                    
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
                    self.info.push({finalcomplaintId,finalconclusion,finalcreateDoctorId,finaldepartment,finalmedicalCreate});
                  });
              }
              console.log(self.info);
            }
            // var flag = response.data.split('{');

            // console.log(flag)
          })
          .catch(function(error) {
            console.log(self.id);
            alert("失败了");
            console.log(error);
          });
      }
    }
  }
};
</script>
<style>
#btn {
  background-color: #54a3af; /* Green */
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
#customers tr.alt0 td {
  background-color: #ffffff;
  color: #000000;
}
#customers tr.alt1 td {
  color: #000000;
  background-color: #eaf2d3;
}
</style>
