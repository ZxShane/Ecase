<template>
  <div id="guahao">
    <Breadcrumb>
      <BreadcrumbItem to="choosehospital">挂号系统</BreadcrumbItem>
      <BreadcrumbItem>请选择医院</BreadcrumbItem>
    </Breadcrumb>
    <Row>
      <Col
        v-for="item in info"
        span="6"
        style="margin-left:20px;margin-right:30px;margin-top:30px;"
      >
        <Button type="primary" style="width:100%;height:50px;" @click="tochoosehospital(item)">
          <h3>{{ item }}</h3>
        </Button>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "guahao",
  data() {
    return {
      patientId:'',
      username:'',
      info: [
        "青岛大学附属医院黄岛分院",
        "开发区第一人民医院",
        "开发区中心医院",
        "友爱医院",
        "开发区人民附属医院黄岛分院",
        "香江医院"
      ]
    };
  },
  created(){
    this.auth()
  }
  ,
  methods: {
    auth(){
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
    tochoosehospital(item) {
      
      
        this.$router.push({
          name: "guahao",
          params: {
            item: item
          }
        });
      
    }
  }
};
</script>
