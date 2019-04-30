<template>
  <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
    <Form-item label="身份证号" prop="id">
      <i-input :value.sync="formValidate.id" placeholder="请输入身份证号"></i-input>
    </Form-item>
    <Form-item label="姓名" prop="name">
      <i-input :value.sync="formValidate.name" placeholder="请输入姓名"></i-input>
    </Form-item>

    <Form-item label="选择日期">
      <Row>
        <i-col span="11">
          <Form-item prop="date">
            <Date-picker type="date" placeholder="选择日期" :value.sync="formValidate.date"></Date-picker>
          </Form-item>
        </i-col>
      </Row>
    </Form-item>
    <Form-item label="性别" prop="sex">
      <i-select :model.sync="formValidate.sex" placeholder="请选择性别">
        <i-option value="man">男</i-option>
        <i-option value="woman">女</i-option>
      </i-select>
    </Form-item>
    <Form-item label="民族" prop="nation">
      <i-input :value.sync="formValidate.nation" placeholder="请输入民族"></i-input>
    </Form-item>
    <Form-item label="家庭住址" prop="address">
      <i-input :value.sync="formValidate.address" placeholder="请输入民族"></i-input>
    </Form-item>
    <Form-item>
      <i-button type="primary" @click="handleSubmit('formValidate')">提交</i-button>
      <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
    </Form-item>
  </i-form>
</template>
<script>
  export default {
    name:'CreateNewCase',
    data () {
      return {
        formValidate: {
          id:'',
          name: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          id: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
