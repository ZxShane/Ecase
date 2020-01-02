<template>
<div id="guahao">
  <Breadcrumb>
        <BreadcrumbItem to="choosehospital">挂号系统</BreadcrumbItem>
        <BreadcrumbItem to="choosehospital">{{ hospital }}</BreadcrumbItem>
        <BreadcrumbItem> 请选择科室</BreadcrumbItem>
  </Breadcrumb>
   <Row>
        <Col v-for="item in info" span="4" style="margin-left:20px;margin-right:30px;margin-top:30px;">
         <Button type="primary" style="width:100%;height:50px;" @click="toaddinfo(item)"><h3>{{ item }}</h3></Button>
        </Col>
        
    </Row>
</div>
</template>
<script>
  export default {
    name:'guahao',
    data () {
      return {
        info:["口腔科","外科","脑科","妇产科","儿科","皮肤科","内科","耳鼻喉科","心理科"],
        hospital:'',
        patientId:'',
        username:''
      }
    },
    created(){
      this.hospital = this.$route.params.item
      this.patientId = window.sessionStorage.getItem("patientId");
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
      toaddinfo(item){
        let self = this
        this.$router.push({
          name:'choosedoc',
          params:{
            item:item,
            hospital:self.hospital
          }
        })
      }
    }
  }
</script>
