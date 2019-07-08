<!--<template xmlns="http://www.w3.org/1999/html">-->
  <!--<i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">-->
    <!--<Form-item label="身份证号" prop="">-->
      <!--<i-input :value.sync="formValidate.name" placeholder="请输入患者身份证号"></i-input>-->
    <!--</Form-item>-->
    <!--<Form-item>-->
      <!--<i-button type="primary" @click="change">搜索</i-button>-->
    <!--</Form-item>-->
    <!--<hr style="height:1px;border:none;border-top:1px dashed #0066CC;margin-top:30px;" />-->
    <!--<div v-show="one">-->
      <!--<h3 style="margin-top:20px;">查找结果</h3>-->
    <!--</div>-->
  <!--</i-form>-->

<!--</template>-->
<template>
  <div>
    <h3 style="margin-top:20px;">输入身份证号</h3>
    <input placeholder="412726200002202020" class="input" />
    <button id="btn" @click="search()">搜索</button>
    <hr style="height:1px;border:none;border-top:1px dashed #0066CC;margin-top:30px;" />
    <div v-show="one">
      <h3 style="margin-top:20px;" @click="search()">查找结果</h3>
      <table id="customers">
        <tr>
          <th>问题描述</th>
          <th>病人情况</th>
        </tr>
        <tr>
          <td>身份证号</td>
          <td>412726200020202020</td>
        </tr>
        <tr class="alt">
          <td>姓名</td>
          <td>周显</td>
        </tr>
        <tr>
          <td>出生日期</td>
          <td>2000/02/20</td>
        </tr>
        <tr class="alt">
          <td>性别</td>
          <td>男</td>
        </tr>
        <tr>
          <td>民族</td>

          <td>汉</td>
        </tr>
        <tr class="alt">
          <td>家庭住址</td>
          <td>青岛市黄岛区</td>
        </tr>
        <tr>
          <td>疾病类型</td>
          <td>发烧</td>
        </tr>
        <tr>
          <td>主诉</td>
          <td>困，没有食欲，浑身无力</td>
        </tr>
        <tr class="alt">
          <td>患者曾患何种疾病</td>
          <td>阑尾炎</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "QueryCase",

  data() {
    return {
      one: 0
    };
  },
  methods: {
    change() {
      this.one = 1;
    },
    search: function() {
      var url = 'http://localhost:8080/queryCar'
      this.$axios.post(url, {
          car:"CAR1"
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          alert("失败了")
          console.log(error);
        });
    }
  }
};
</script>
<style>
#btn {
  background-color: #2d8cf0; /* Green */
  border: none;
  color: white;
  padding: 7px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  border-radius: 4px;
}
.input {
  /*border:1px;*/
  padding-left: 3px;
  padding-right: 3px;
  height: 27px;
  font-size: 15px;
  width: 250px;
}
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  width: 100%;
  border-collapse: collapse;
}
#customers td,
#customers th {
  font-size: 1.1em;
  border: 1px solid #2d8cf0;
  padding: 3px 7px 2px 7px;
}
#customers th {
  font-size: 1.1em;
  text-align: left;
  padding-top: 5px;
  padding-bottom: 4px;
  background-color: #54a3af;
  color: #ffffff;
}
#customers tr.alt td {
  color: #000000;
  background-color: #eaf2d3;
}
</style>