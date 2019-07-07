<template>
  <div class="mytrade">
    <Steps :current="step">
        <Step title="新建交易" content="新建交易"></Step>
        <Step title="设置费用" content="设置费用"></Step>
        <Step title="缴纳费用" content="缴纳费用"></Step>
        <Step title="发送密钥" content="发送密钥"></Step>
        <Step title="费用状态" content="缴费成功"></Step>
        <Step title="交易完成" content="交易完成"></Step>
    </Steps>
    <button id="btn" @click="change1()">新建费用</button>
    <button id="btn" @click="change2()">支付费用</button>
    <button id="btn" @click="change3()">发送密钥</button>
    <button id="btn" @click="change4()">密钥获取</button>
    <button id="btn" @click="change5()">完成交易</button>
    <button id="btn" @click="change6()">退款</button>
  <hr style="height:1px;border:none;border-top:1px dashed #0066CC;margin-top:30px;" />
  <div v-show="one">
  <h3 style="margin-top:20px;">新建费用</h3>
    <Poptip trigger="focus">
        <Input v-model="fee" prefix="logo-usd" placeholder="输入费用" style="width: 120px;margin-left:10px;" />
        <div slot="content">{{ formatNumber }}</div>
    </Poptip>
    <Button type="info" style="margin-top:120px;" @click="tishi()">设置</Button>
  </div>
  <div v-show="two">
  <h3 style="margin-top:20px;">支付费用</h3>
  <h3 style="margin-top:30px;">交易金额为：{{ fee }}比特币</h3>
    <Button type="info" style="margin-top:100px;" @click="zhifu()">支付</Button>
  </div>
  <div v-show="three">
  <h3 style="margin-top:20px;">发送密钥</h3>
  <p style="margin-top:30px;">私钥为</p>
  <Input v-model="value6" type="textarea" :rows="4" placeholder="Enter something..." style="width:400px;margin-top:20px;"/>
  <p style="margin-top:20px;">AES口令为</p>
  <Input v-model="value6" type="textarea" :rows="4" placeholder="Enter something..." style="width:400px;"/>
    <Button type="info" style="margin-top:120px;" @click="fasong()">发送</Button>
  </div>
  </div>
 
</template>

<script>
export default {
  name: 'MyTrade',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      step: 1,
      fee:'3',
      one:0,
      two:0,
      three:0,
      four:0,
      five:0,
      six:0,
      
    }
  },
  computed: {
            formatNumber () {
                if (this.fee === '') return '请输入金额';
                function parseNumber(str) {
                    const re = /(?=(?!)(d{3})+$)/g;
                    return str.replace(re, ',');
                }
                return parseNumber(this.fee);
            }
        },
        methods:{
          tishi(){
            alert("设置成功！")
            this.step=2
          },
          zhifu(){
            alert("支付成功!")
            this.step=3
          },
          fasong(){
            alert("发送成功！")
            this.step=5
          },
          change1()
          {
            this.one=1;
            this.two=0;
            this.three=0;
          },
          change2()
          {
            this.one=0;
            this.two=1;
            this.three=0;
          },
          change3()
          {
            this.one=0;
            this.two=0;
            this.three=1;
          }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#btn{
  margin-right:110px;
  padding:0.5% 1%;
  border-radius: 10px;
  background-color: ghostwhite;
  margin-top:30px;
  text-decoration: none;
  outline: none;
}
</style>
