<template>
  <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
    <Form-item label="疾病类型" prop="type">
      <i-input :value.sync="formValidate.type" placeholder="请输入疾病类型"></i-input>
    </Form-item>

    <Form-item label="主诉" prop="chief">
      <i-input :value.sync="formValidate.chief" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
    </Form-item>
    <Form-item label="患者曾患何种疾病" prop="disease">
      <i-input :value.sync="formValidate.disease" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
    </Form-item>
    <Form-item>
      <i-button type="primary" @click="handleSubmit('formValidate')">提交</i-button>
      <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px ;color:black;">重置</i-button>
    </Form-item>
  </i-form>
</template>
<script>
  export default {
    name:'AddCase',
    data () {
      return {
        formValidate: {

        },
        ruleValidate: {

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
