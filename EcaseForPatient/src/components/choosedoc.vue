<template>
  <div id="choosedoc">
    <Breadcrumb>
       <BreadcrumbItem to="choosehospital">挂号系统</BreadcrumbItem>
        <BreadcrumbItem to="choosehospital">{{ hospital }}</BreadcrumbItem>
      <BreadcrumbItem to="guahao">{{ sector }}</BreadcrumbItem>
      <BreadcrumbItem>请选择医师</BreadcrumbItem>
    </Breadcrumb>
    <Row>
      <Col v-for="item in info" span="6" style="margin-right:30px;margin-top:30px;">
        <Card>
          <p slot="title">{{ item.doctorName }}</p>
          <p>{{ item.role }}</p>
          <p>¥{{ item.price }}</p>
          <p>{{ item.doctorTime }}</p>
          <router-link to="addinfo">
            <Button type="primary" style="margin-left:80%;" @click="toaddinfo(item.doctorName,item.doctorId)">预约</Button>
          </router-link>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "choosedoc",
  data() {
    return {
      hospital:'',
      sector:'',
      patientId:'',
      doctor:[],
      username:'',
      info: [
      ],
    }
  },
  created(){
    this.querydoc()
    this.patientId = window.sessionStorage.getItem('patientId')
    this.username = window.sessionStorage.getItem('username')
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
    }
  },
  methods:{
    querydoc(){
      let self = this
      this.sector = this.$route.params.item
    this.hospital = this.$route.params.hospital
    this.$axios.post("http://117.78.1.3:8080/querydoc",{
      "hospitalname":self.hospital,
      "department":self.sector
    }).then(res=>{
      console.log(res)
      self.doctor = res.data
      for(var i=0;i<self.doctor.length;i++){
        console.log(self.doctor[i].DoctorID)
       this.$axios.post('http://117.78.1.3:8080/querydoctorinfo',{
        "doctorId":self.doctor[i].DoctorID
      }).then(result=>{
        console.log(result)
         self.info.push(result.data)
      })
      }
    })
    console.log(self.info)
    },
    toaddinfo(item,id){
      let self = this
      this.$router.push({
        name:'Addinfo',
        params:{
          item:item,
          hospital:self.hospital,
          sector:self.sector,
          doctorid:id
        }
      })
    }
  }
};
</script>
