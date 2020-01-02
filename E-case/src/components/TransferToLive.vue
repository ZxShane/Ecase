<template>
  <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
    <h2>病人基本信息</h2><br>
    <Form-item label="身份证号" prop="id">
      <i-input :value.sync="formValidate.id" placeholder="412726199910192020" readonly="true"></i-input>
    </Form-item>
    <Form-item label="姓名" prop="name">
      <i-input :value.sync="formValidate.name" placeholder="张小明" readonly="true"></i-input>
    </Form-item>
   <!--<Form-item label="登记日期">-->
      <!--<Row>-->
        <!--<i-col span="11">-->
          <!--<Form-item prop="date">-->
            <!--<Date-picker type="date" placeholder="选择日期" :value.sync="formValidate.date"></Date-picker>-->
          <!--</Form-item>-->
        <!--</i-col>-->
      <!--</Row>-->
    <!--</Form-item>-->
    <!--<Form-item label="性别" prop="sex">-->
      <!--<i-select :model.sync="formValidate.sex" placeholder="请选择性别">-->
        <!--<i-option value="man">男</i-option>-->
        <!--<i-option value="woman">女</i-option>-->
      <!--</i-select>-->
    <!--</Form-item>-->
    <!--<Form-item label="婚姻状况" prop="sex">-->
      <!--<i-select :model.sync="formValidate.sex" placeholder="请选择婚姻状况">-->
        <!--<i-option value="y">已婚</i-option>-->
        <!--<i-option value="n">未婚</i-option>-->
      <!--</i-select>-->
    <!--</Form-item>-->
    <Form-item label="性别" prop="sex">
      <i-input :value.sync="formValidate.sex" placeholder="男" readonly="true"></i-input>
    </Form-item>
    <Form-item label="婚姻状况" prop="name">
      <i-input :value.sync="formValidate.name" placeholder="未婚" readonly="true"></i-input>
    </Form-item>
    <Form-item label="民族" prop="nation">
      <i-input :value.sync="formValidate.nation" placeholder="汉族" readonly="true"></i-input>
    </Form-item>
    <Form-item label="家庭住址" prop="address">
      <i-input :value.sync="formValidate.address" placeholder="浙江省温州市" readonly="true"></i-input>
    </Form-item>
    <Form-item label="入院时间" prop="sex">
      <i-input :value.sync="formValidate.sex" placeholder="2019-7-1 18:23" readonly="true"></i-input>
    </Form-item>
    <Form-item label="病史陈述者" prop="sex">
      <i-input :value.sync="formValidate.sex" placeholder="张建国" readonly="true"></i-input>
    </Form-item>
    <h2>病历信息</h2><br>
    <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
      <Form-item label="科室" prop="type">
        <i-input :value.sync="formValidate.type" placeholder="肠胃外科" readonly="true"></i-input>
      </Form-item>
      <Form-item label="疾病类型" prop="type">
        <i-input :value.sync="formValidate.type" placeholder="急性肠胃炎" readonly="true"></i-input>
      </Form-item>

      <Form-item label="主诉" prop="chief">
        <i-input :value.sync="formValidate.chief" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="反复腹胀，腹痛半年，加重1周" readonly="true"></i-input>
      </Form-item>
      <Form-item label="既往史" prop="disease">
        <i-input :value.sync="formValidate.disease" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="无外伤手术，输血，药物及食物过敏史" readonly="true"></i-input>
      </Form-item>
      <Form-item label="现病史" prop="disease">
        <i-input :value.sync="formValidate.disease" type="textarea" :autosize="{minRows: 2,maxRows: 5}" readonly="true" placeholder="患者于半年前，无明显诱因腹胀，腹痛，多于饭后半小时发作，伴恶心，呕吐，呕吐物为胃内容物，无发热，腹泻，胸闷，胸痛，呼吸困难等，一周来上症逐渐加重，在家自服消炎药（具体不详），症状未减轻，逐来我院门诊求治。门诊以慢性胃炎收住院治疗"></i-input>
      </Form-item>
      <Form-item>
        <i-button type="primary" @click="handleSubmit()">转住院</i-button>
        <!-- <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px ;color:black;">重置</i-button> -->
      </Form-item>
    </i-form>
  </i-form>

</template>
<script>
  export default {
    name:'Wallet',
    data () {
      return {
        formValidate: {
          id:'',
          name: ''
        },
        ruleValidate: {
          name1: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          id1: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit () {
        alert("转住院成功！")
        
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
