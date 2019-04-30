<template>
  <div id="app">
    <Layout>
      <Header class="head">
        <div >
        <h1>区块链电子病历系统</h1>
        </div>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}" class="menu">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>病例管理
              </template>
              <MenuItem name="1-1">创建新病历</MenuItem>
              <MenuItem name="1-2">查询患者病历</MenuItem>
              <MenuItem name="1-3">添加患者病历</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-calculator"></Icon>钱包管理
              </template>
              <MenuItem name="2-1">查询钱包余额</MenuItem>
              <MenuItem name="2-2">查询收入、支出记录</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-people"></Icon>交易管理
              </template>
              <MenuItem name="3-1">查看发起的交易状态</MenuItem>
              <MenuItem name="3-2">查看别人发起的交易状态</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-infinite"></Icon>密钥上传
              </template>
              <MenuItem name="4-1">Option 1</MenuItem>
              <MenuItem name="4-2">Option 2</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">Content</Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>


<script>
export default {
  name: "App",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.head{
  text-align: center;
  background-color:white;
  width: 100%;
}
.menu{
  height: 700px;
  font-size: 18px;
}
.content {
  margin-top: 40px;
  font-size: 18px;
  margin-left: 250px;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>





