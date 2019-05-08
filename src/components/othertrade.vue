<template>
  <div class="othertrade">
    <Button type="primary" icon="ios-search">搜索交易</Button>
     <Table border :columns="columns1" :data="data1"></Table>
  </div>
 
</template>

<script>
export default {
  name: 'OtherTrade',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      columns1: [
                    {
                        title: '对方id',
                        key: 'id'
                    },
                    {
                        title: '操作',
                        key: 'make'
                    }
                ],
      data1: [
        {
          id:201905052475638,
          make:"查看"
        }
      ]
      
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

</style>
