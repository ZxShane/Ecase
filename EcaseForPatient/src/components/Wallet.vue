<template>
<div id="wallet" style="overflow:scroll;">
  <Breadcrumb>
        <BreadcrumbItem to="account">查看病历</BreadcrumbItem>
        <BreadcrumbItem>{{ patientId+id }}</BreadcrumbItem>
    </Breadcrumb>
  <i-form :label-width="80">
    <h2>病人基本信息</h2><br>
    <Form-item label="身份证号">
      <i-input v-model="patientId" readonly="true"></i-input>
    </Form-item>
    <Form-item label="姓名">
      <i-input v-model="patientName" readonly="true"></i-input>
    </Form-item>
    <Form-item label="生日">
      <i-input v-model="birthday" readonly="true"></i-input>
    </Form-item>
    <Form-item label="入院时间">
      <i-input  v-model="createtime" readonly="true"></i-input>
    </Form-item>
    <Form-item label="病史陈述者">
      <i-input v-model="presenter" readonly="true"></i-input>
    </Form-item>
    <h2>病历信息</h2><br>
    <i-form :label-width="80">
      <Form-item label="科室">
        <i-input v-model="department" readonly="true"></i-input>
      </Form-item>
      <Form-item label="疾病类型">
        <i-input v-model="medicalType" readonly="true"></i-input>
      </Form-item>

      <Form-item label="主诉">
        <i-input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="mainSymptoms" readonly="true"></i-input>
      </Form-item>
      <Form-item label="既往史">
        <i-input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="diseasesOnceSuffered" readonly="true"></i-input>
      </Form-item>
      <Form-item label="诊断">
        <i-input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="conclusion" readonly="true"></i-input>
      </Form-item>
      <Form-item>
        <p style="font-size:15px; margin-left:70%;">医生：</p>
        <p style="font-family:sign;font-size:25px; margin-left:79%;">{{ doctorName }}</p>
        <!-- <i-button type="primary" @click="handleSubmit()">转住院</i-button> -->
        <!-- <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px ;color:black;">重置</i-button> -->
      </Form-item>
    </i-form>
  </i-form>
</div>
</template>
<script>
  export default {
    name:'Wallet',
    data () {
      return {
          id:'',
          patientId:'',
          name: '',
          username:'',
          aes:'',
          caseinfo:'',
          patientName:'',
          birthday:'',
          createtime:'',
          presenter:'',
          department:'',
          medicalType:'',
          mainSymptoms:'',
          diseasesOnceSuffered:'',
          conclusion:'',
          createDoctorId:'',
          doctorName:''
      }
    },
    created(){
      this.id = this.$route.params.id
      this.patientId = window.sessionStorage.getItem('patientId')
      this.username = window.sessionStorage.getItem('username')
      this.aes = window.sessionStorage.getItem(this.username+'aes')
      console.log(this.id)
      this.getInfo();
    },
    methods:{
      getInfo:function(){
        var self = this
        this.$axios.post("http://117.78.1.3:8080/queryCaseInfo",{
          patientId: self.patientId,
          complaintid: self.id
        }).then(res=>{
          self.presenter = self.utils.decrypt(res.data.presenter,self.aes)
          self.department = self.utils.decrypt(res.data.department,self.aes)
          self.medicalType = self.utils.decrypt(res.data.medicalType,self.aes)
          self.mainSymptoms = self.utils.decrypt(res.data.mainSymptoms,self.aes)
          self.diseasesOnceSuffered = self.utils.decrypt(res.data.diseasesOnceSuffered,self.aes)
          self.conclusion = self.utils.decrypt(res.data.conclusion,self.aes)
          self.createDoctorId = self.utils.decrypt(res.data.createDoctorId,self.aes)
          self.$axios.post('http://117.78.1.3:8080/queryDoctorInfo',{
            doctorId:self.createDoctorId
          }).then((res)=>{
            self.doctorName = res.data.doctorName
            
          })
         // self.caseinfo = res.data
        })
        this.$axios.post("http://117.78.1.3:8080/queryPatientInfo",{
          patientId: self.patientId
        }).then(Response=>{
          self.patientName = self.utils.decrypt(Response.data.patientName,self.aes)
          self.birthday = self.utils.decrypt(Response.data.birthday,self.aes)
          self.createtime = self.utils.decrypt(Response.data.createtime,self.aes)
           console.log(Response.data)

          //self.patientinfo = Response.data
        })
      },
      
    }
  }
</script>
