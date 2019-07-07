<template>
  <div>
      <table id="customers">
          <tr>
              <th>对方id</th>
              <th>类型</th>
              <th>交易金额</th>
              <th>交易时间</th>
          </tr>
          <tr>
              <td>412726200112252020</td>
              <td>退款</td>
              <td>300</td>
              <td>2019-4-28 12:40:32</td>
          </tr>
          <tr>
              <td>325626200112265320</td>
              <td>支出</td>
              <td>-500</td>
              <td>2019-4-27 18:23:12</td>
          </tr>
          <tr>
              <td>412726200112252020</td>
              <td>充值</td>
              <td>900</td>
              <td>2019-4-20 07:40:00</td>
          </tr>
          <tr>
              <td>412726200112252020</td>
              <td>退款</td>
              <td>300</td>
              <td>2019-4-28 12:40:32</td>
          </tr>
          <tr>
              <td>412726200112252020</td>
              <td>退款</td>
              <td>300</td>
              <td>2019-4-28 12:40:32</td>
          </tr>
          <tr>
              <td>412726200112252020</td>
              <td>退款</td>
              <td>300</td>
              <td>2019-4-28 12:40:32</td>
          </tr>
          <tr>
              <td>325626200112265320</td>
              <td>支出</td>
              <td>-500</td>
              <td>2019-4-27 18:23:12</td>
          </tr>
          <tr>
              <td>412726200112252020</td>
              <td>充值</td>
              <td>900</td>
              <td>2019-4-20 07:40:00</td>
          </tr>
          <tr>
              <td>412726200112252020</td>
              <td>退款</td>
              <td>300</td>
              <td>2019-4-28 12:40:32</td>
          </tr>
          <tr>
              <td>412726200112252020</td>
              <td>退款</td>
              <td>300</td>
              <td>2019-4-28 12:40:32</td>
          </tr>
      </table>
  </div>
</template>

<script>
    export default {
        name: "Record"
    }
</script>

<style scoped>
    #customers
    {
        font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
        width:100%;
        border-collapse:collapse;
    }
    #customers td, #customers th
    {
        font-size:1.1em;
        border:1px solid #2D8Cf0;
        padding:3px 7px 2px 7px;
    }
    #customers th
    {
        font-size:1.1em;
        text-align:left;
        padding-top:5px;
        padding-bottom:4px;
        background-color: #54a3af;
        color:#ffffff;
    }
    #customers tr.alt td
    {
        color:#000000;
        background-color:#EAF2D3;
    }
</style>