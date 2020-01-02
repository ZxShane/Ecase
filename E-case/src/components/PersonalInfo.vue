<template>
  <div id="personalinfo">
    <i-form :label-width="80">
      <h2>基本信息</h2>
      <br />
      <Form-item label="用户名*">
        <i-input disabled :placeholder="username" ></i-input>
      </Form-item>
      <Form-item label="医生编号*">
        <i-input disabled :placeholder="doctorId" ></i-input>
      </Form-item>
      <Form-item label="姓名*">
        <i-input v-model="name" placeholder="请填写真实姓名"></i-input>
      </Form-item>
      <!-- <Form-item label="性别*">
        <RadioGroup v-model="gender">
          <Radio label="男"></Radio>
          <Radio label="女"></Radio>
        </RadioGroup>
      </Form-item> -->
      <Form-item label="所在医院*">
        <Select v-model="hospitalname" style="width:200px">
          <Option v-for="item in hospitals" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </Form-item>
      <Form-item label="职称*">
        <i-input v-model="role" placeholder="民族"></i-input>
      </Form-item>
      <Form-item label="科室">
       <Select v-model="department" style="width:200px">
          <Option v-for="item in sectorname" :value="item" :key="item" @click="searchdoctor()" >{{ item }}</Option>
        </Select>
      </Form-item>
      <Form-item label="出诊费用">
        <RadioGroup v-model="price">
          <Radio label="20" value="20"></Radio>
          <Radio label="80" value="80"></Radio>
        </RadioGroup>
      </Form-item>
        <Form-item label="出诊时间">
          <CheckboxGroup v-model="doctordate">
        <Checkbox label="周一" value="周一" @click="add(value)">
            <span>周一</span>
        </Checkbox>
        <Checkbox label="周二" value="周二" @click="add(value)">
        
            <span>周二</span>
        </Checkbox>
        <Checkbox label="周三" value="周三" @click="add(value)">
           
            <span>周三</span>
        </Checkbox>
        <Checkbox label="周四" value="周四" @click="add(value)">
            
            <span>周四</span>
        </Checkbox>
        <Checkbox label="周五" value="周五" @click="add(value)">
            
            <span>周五</span>
        </Checkbox>
        <Checkbox label="周六" value="周六" @click="add(value)">
            
            <span>周六</span>
        </Checkbox>
        <Checkbox label="周日" value="周日" @click="add(value)">
            
            <span>周日</span>
        </Checkbox>
    </CheckboxGroup>
        
        <RadioGroup v-model="doctortime">
          <Radio label="上午"></Radio>
          <Radio label="下午"></Radio>
        </RadioGroup>
        </Form-item>
      <Form-item>
        <i-button type="primary" @click="handleSubmit()">保存</i-button>
        <!-- <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px ;color:black;">重置</i-button>  -->
      </Form-item>
    </i-form>
  </div>
</template>
<script>
export default {
  name: "personalinfo",
  data() {
    return {
      username:'',
      doctorId:'',
      name:'',
      hospitalname:'',
      role:'',
      department:'',
      price:'',
      doctordate:[],
      doctortime:'',
      sectorname: [
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
      hospitals: [
        {
          name: "青岛大学附属医院黄岛分院",
          value: "青岛大学附属医院黄岛分院"
        },
        {
          name: "友爱医院",
          value: "友爱医院"
        }
      ],
    };
  },
  created() {
    this.doctorId = this.$route.params.doctorId
    this.username = this.$route.params.username
    //this.getinfo()
  },
  methods: {
   
    handleSubmit(){
      let self = this
      console.log(self.doctortime)
      this.$axios.post('http://117.78.1.3:8080/invoke',{
        func:'createDoctor',
        doctorId:self.doctorId,
        name:self.name,
        hospitalname:self.hospitalname,
        role:self.role,
        department:self.department,
        price:self.price,
        doctordate:self.doctordate,
        doctortime:self.doctortime
      }).then((res)=>{
        alert("创建成功！")
        console.log(res)
      })
    },
    add(info){
      this.doctordate.push(info)
    }
  }
};
</script>
