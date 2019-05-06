<template>
  <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
    <Form-item label="身份证号" prop="">
      <i-input :value.sync="formValidate.name" placeholder="请输入患者身份证号"></i-input>
    </Form-item>
    <Form-item>
      <i-button type="primary" @click="handleSubmit('formValidate')">搜索</i-button>
      <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px;color:black;">重置</i-button>
    </Form-item>
  </i-form>
</template>
<script>
  export default {
    name:'QueryCase',

    data () {
      return {
        formValidate: {

        },
        ruleValidate: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],

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
