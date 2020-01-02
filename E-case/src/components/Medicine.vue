<template>
  <div>
    <div style="font-size:15px;">
      身份证:
      <input class="input" v-model="patientId" disabled/>
      姓名:
      <input class="input" v-model="name" disabled/>
      病历号:
      <input class="input" v-model="complainid" disabled/>
    </div>
    <div style="font-size:15px;">
      药品名称:
      <input class="input" v-model="medicinename" />
      规格数量:
      <input class="input" v-model="medicinenumber" />
      用法用量:
      <input class="input" v-model="medicineamount" />
      备注:
      <input class="input" v-model="details" />
      <button id="btn" @click="add()">添加</button>
    </div>

    <hr style="height:1px;border:none;border-top:1px dashed #0066CC;margin-top:30px;" />
    <div v-show="one">
      <h3 style="margin-top:20px;" @click="search()">药品清单</h3>
      <table id="customers">
        <tr>
          <th>药品名称</th>
          <th>规格数量</th>
          <th>详细用法</th>
          <th>备注</th>
        </tr>
        <tr v-for="(item,index) in info" :class="alt[index%2]">
          <td>{{ item.medicineName }}</td>
          <td>{{ item.specification }}</td>
          <td>{{ item.directions }}</td>
          <td>{{ item.remark }}</td>
        </tr>
        <!-- <tr>
          <th>药品名称</th>
          <th>规格数量</th>
          <th>详细用法</th>
          <th>备注</th>
        </tr>
        <tr>
          <td>安斯菲</td>
          <td>20mg*7片*3盒</td>
          <td>每次20mg 每日二次 口服</td>
          <td>不能饮酒</td>
        </tr>
        <tr class="alt">
          <td>胶体酒石酸铋胶囊</td>
          <td>55mg*24粒*4盒</td>
          <td>每次165mg 每日四次 口服</td>
          <td></td>
        </tr>
        <tr>
          <td>枸茴酸莫沙比利片<加斯清></td>
          <td>5mg*10片*3盒</td>
          <td>每次5mg 每日四次 口服</td>
          <td></td>
        </tr>
        <tr class="alt">
          <td>克拉霉素缓释片<诺邦></td>
          <td>0.5g*7片*3盒</td>
          <td>每次0.5g 每日二次 口服</td>
          <td></td>
        </tr>-->
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "Account",
  data() {
    return {
      one: 1,
      id: "",
      aes: "",
      patientId: "",
      name: "",
      complainid: "",
      doctorid:'',
      medicinename: "",
      medicinenumber: "",
      medicineamount: "",
      details: "",
      new: {
        name: "阿莫西林胶囊",
        size: "20mg*7片*3盒",
        method: "每次20mg 每日二次 口服",
        setail: "不能饮酒"
      },
      alt: ["alt0", "alt1"],
      info: [],
      number: 0,
      medicineid: ""
    };
  },
  created() {
    this.patientId = this.$route.params.patientId;
    this.name = this.$route.params.patientname;
    this.complainid = this.$route.params.complainid;
    if (this.complainid == undefined) {
      this.complainid = window.sessionStorage.getItem("complainid");
      //cosole.log(this.complainid)
    }
    if (this.patientId == undefined) {
      this.patientId = window.sessionStorage.getItem("patientId");
    }
    if (this.name == undefined) {
      this.name = window.sessionStorage.getItem("patientname");
    }
    //console.log(this.complainid)
    this.aes = this.$route.params.aes;
    if (this.aes == undefined) {
      this.aes = window.sessionStorage.getItem("aes");
    }
    this.doctorid = window.sessionStorage.getItem('doctorId')
    if(this.doctorid=='')
    {
      alert("请先登录！")
      this.$router.push({
        path:'/'
      })
    }
    this.getallmedicine()
  },
  methods: {
    getallmedicine()
    {
        let self = this
        this.$axios.post('http://117.78.1.3:8080/queryCaseInfo',{
          patientId:self.patientId,
          complaintid:self.complainid
        }).then((res)=>{
          var medicinecontent = res.data.medicineIDContent
          self.number = res.data.medicineNum
          //console.log(medicinecontent)
          for(var i=0;i<self.number;i++)
          {
           self.$axios.post('http://117.78.1.3:8080/querymedicine',{
            patientId:self.patientId,
            medicineid:medicinecontent[i]
          }).then((response)=>{
            var directions = self.utils.decrypt(response.data.directions,self.aes)
            var medicineName = self.utils.decrypt(response.data.medicineName,self.aes)
            var remark = self.utils.decrypt(response.data.remark,self.aes)
            var specification = self.utils.decrypt(response.data.specification,self.aes)
            self.info.push({directions,medicineName,remark,specification})
            console.log(response.data)
          })
          }
          
          console.log(res.data)
        })
    },
    add() {
      let self = this;
      this.medicineid = self.patientId + self.complainid + self.number;
      console.log(self.medicineid);
      self.number++;
      var finalmedicineid = self.utils.encrypt(self.medicineid, self.aes);
      var finalmedicinename = self.utils.encrypt(self.medicinename, self.aes);
      var finalmedicinenumber = self.utils.encrypt(
        self.medicinenumber,
        self.aes
      );
      var finalmedicineamount = self.utils.encrypt(
        self.medicineamount,
        self.aes
      );
      var finaldetails = self.utils.encrypt(self.details, self.aes);
      this.$axios
        .post("http://117.78.1.3:8080/invoke", {
          func: "doctorPrescribe",
          patientId: self.patientId,
          complainid: self.complainid,
          medicineid: finalmedicineid,
          medicinename: finalmedicinename,
          specification: finalmedicinenumber,
          directions: finalmedicineamount,
          remark: finaldetails
        })
        .then(result => {
          if (result.data == 1) {
            alert("开药成功！");
            location.reload()
          }
        });
    },
    change() {
      this.one = 1;
      this.info.push(this.new);
    },
    search: function() {
      let self = this;
      var url = "http://117.78.1.3:8080/queryMER";
      //this.patientId.push(this.id)
      this.$axios
        .post(url, {
          patientId: self.id
        })
        .then(function(response) {
          console.log(response);
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
  margin-right: 2%;
  width: 150px;
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
