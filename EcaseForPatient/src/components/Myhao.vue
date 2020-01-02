<template>
  <div id="myhao">
    <Col v-for="item in info" span="11" style="margin-right:30px;margin-top:30px;">
      <Card>
        <p slot="title">{{ item[5] }}</p>
        <p>{{ item[2] }}</p>
        <p>{{ item[0] }}</p>
        <p>{{ item[4][3] }}&nbsp;{{ item[4][1] }}&nbsp;{{ item[4][2] }}&nbsp;&nbsp;&nbsp;{{ item[6] }}</p>
        <Button
          type="primary"
          @click="changecondition(item[3],item[1])"
          style="margin-left:80%;"
        >{{ item[1] }}</Button>
      </Card>
    </Col>
  </div>
</template>
<script>
export default {
  name: "myhao",
  data() {
    return {
      patientId: "1509050119",
      state: "",
      info: [
        // {
        //   state: "挂号成功",
        //   hospital: "青岛大学附属医院黄岛院区",
        //   keshi: "西海岸关节外科门诊",
        //   time: "2019-06-08 上午",
        //   zhuangtai: "再次预约"
        // },
        // {
        //   state: "挂号成功",
        //   hospital: "青岛大学附属医院黄岛院区",
        //   keshi: "内科",
        //   time: "2019-07-29 上午",
        //   zhuangtai: "取消预约"
        // }
      ],
      aesmiyao:'',
      username:''
    };
  },
  created() {
   
    this.auth()
  },
  methods: {
    auth(){
       this.patientId = window.sessionStorage.getItem('patientId')
      this.username = window.sessionStorage.getItem('username')
      if (this.username == null || this.username == "") {
      alert("请登录！");
      this.$router.push({
        path: "/"
      });
    } else if (this.patientId == null || this.patientId == "") {
      alert("请先登录！");
      this.$router.push({
        path: "/"
      });
    }else{
       this.queryreserve();
    }
    },
    queryreserve() {
      let self = this;
      this.aesmiyao = window.sessionStorage.getItem(self.username+'aes')
      console.log(self.aesmiyao);
      this.$axios
        .post("http://117.78.1.3:8080/queryreserve", {
          patientId: self.patientId
        })
        .then(function(res) {
          var number = self.utils.decrypt(res.data,self.aesmiyao)
          var str = 1;
          for (var str; str <= number; str++) {
            console.log("0" + str)
            self.$axios
              .post("http://117.78.1.3:8080/queryreserveinfo", {
                patientId: self.patientId,
                reserveid: "0" + str
              })
              .then(function(response) {
                console.log(response.data)
                // var result = self.utils.decrypt(response.data,self.aesmiyao)
                // console.log(result)
                var infostr = []
                var department = self.utils.decrypt(response.data.department,self.aesmiyao)
                var hospitalName = self.utils.decrypt(response.data.hospitalName,self.aesmiyao)
                var reserveID = self.utils.decrypt(response.data.reserveID,self.aesmiyao)
                var reserverDate = self.utils.decrypt(response.data.reserverDate,self.aesmiyao)
                var reserverState = self.utils.decrypt(response.data.reserverState,self.aesmiyao)
                var reserverTime = self.utils.decrypt(response.data.reserverTime,self.aesmiyao)
                reserverDate = reserverDate.split(' ');
                //var temp = response.data.reserverDate.split("T");
                //response.data.reserverDate = temp[0];
                if (reserverState == "预约成功") {
                  //如果状态是“预约成功”，按钮就是“取消预约”

                  response.data.doctorId = "取消预约";
                } else {
                  response.data.doctorId = "重新预约"; //如果状态是“已取消预约”，那么按钮就是重新预约
                }
                infostr.push(department,response.data.doctorId,hospitalName,reserveID,reserverDate,reserverState,reserverTime)
                self.info.push(infostr);
              });
          }
        });
    },
    changecondition(reserveid, state) {
      let self = this;
      if (state == "取消预约") {
        this.$axios
          .post("http://117.78.1.3:8080/invoke", {
            func: "changeReserverState",
            patientId: self.patientId,
            reserveid: reserveid
          })
          .then(function(res) {
            alert("取消预约成功！");
            location.reload();
          });
        
      }else{
        this.$router.push({
          path:'choosehospital'
        })
      }
    }
  }
};
</script>
