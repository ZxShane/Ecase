<template>
  <div id="app">
    <Layout>
      <Header class="head">
        <div>
          <h1 style="display:inline;margin-left:35%;">区块链电子病历系统</h1>
           <img v-show="isshow" src="./assets/touxaing.jpg" width="50" height="50" id="touxiang">
          <!-- <p class="name">lavender</p> -->
          <Dropdown v-show="isshow">
            <a href="javascript:void(0)" class="name">
              admin 
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list" style="display:inline;margin-top:-50px;">
              <DropdownItem>个人信息</DropdownItem>
              <DropdownItem>查看密钥</DropdownItem>
              <DropdownItem>帮助</DropdownItem>
              <DropdownItem>切换账户</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button type="primary" style="margin-left:20px;" v-show="isshow">logout</Button>
        </div>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}" class="menu">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>病例管理
              </template>
              <router-link to="createnewcase">
                <MenuItem name="1-1">添加患者</MenuItem>
              </router-link>
              <router-link to="querycase">
                <MenuItem name="1-2">查询患者病历</MenuItem>
              </router-link>
              <router-link to="addcase">
                <MenuItem name="1-3">添加患者病例</MenuItem>
              </router-link>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>钱包管理
              </template>
              <MenuItem name="2-1">余额</MenuItem>
              <MenuItem name="2-2">收支记录</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>交易管理
              </template>
              <router-link to="mytrade">
                <MenuItem name="3-1">我的交易</MenuItem>
              </router-link>
              <router-link to="othertrade">
                <MenuItem name="3-2">别人发起的</MenuItem>
              </router-link>
            </Submenu>
            <MenuItem name="4">
              <Icon type="ios-analytics"></Icon>
              <span>密钥上传</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Content
            :style="{padding: '24px', minHeight: '280px', background: '#fff',margin: '24px 0'}"
          >
            <router-view/>
          </Content>
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
  },
  data() {
    return {
      isshow: 1
    };
  },
  mounted(){
    this.show()
  },
  methods:{
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#touxiang {
  display: inline;
  border-radius: 25px;
  margin-left:33%;
}
.name {
  display: inline;
  font-size: 15px;
  padding:0;
  margin:0;
}
.head {
  background-color: white;
  width: 100%;
}
.menu {
  height: 700px;
  font-size: 18px;
}
a {
  text-decoration: none;
  color: black;
  padding:0;
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
