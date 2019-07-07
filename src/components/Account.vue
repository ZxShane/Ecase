<template>
    <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="身份证号" prop="type">
            <i-input :value.sync="formValidate.type" placeholder="412726200002202020"></i-input>
        </Form-item>
        <Form-item label="余额" prop="type">
            <i-input :value.sync="formValidate.type" placeholder="200"></i-input>
        </Form-item>

        <Form-item>
            <i-button type="primary" @click="handleSubmit('formValidate')">快速充值</i-button>

        </Form-item>
    </i-form>
</template>
<script>
    export default {
        name:'Account',
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
