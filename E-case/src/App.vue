<template>
  <div id="app">
    <Layout>
      <Header class="head">
        <div>
          <h1 style="display:inline;margin-left:35%;">区块链电子病历系统（医生端)</h1>
          <Button type="primary" style="margin-left:350px;" @click="getinfo()">查看个人信息</Button>
          <Button type="primary" style="margin-left:20px;" @click="logout()">logout</Button>
        </div>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}" class="menu">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>就诊
              </template>
              <router-link to="createnewcase">
                <MenuItem name="1-1">添加病历</MenuItem>
              </router-link>
              <router-link to="querycase">
                <MenuItem name="1-2">查询病历</MenuItem>
              </router-link>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>用药管理
              </template>
              <router-link to="Medicine">
                <MenuItem name="2-1">开药</MenuItem>
              </router-link>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>转科管理
              </template>
              <router-link to="inhospital">
                <MenuItem name="3-1">转入转出</MenuItem>
              </router-link>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <div style="height:500px;">
            <Content
              :style="{padding: '24px', minHeight: '650px', background: '#fff',margin: '24px 0'}"
            >
              <router-view />
            </Content>
          </div>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>


<script>
export default {
  name: "App",
  data() {
    return {
      isshow: 1
    };
  },
  methods: {
    logout() {
      window.sessionStorage.setItem("doctorId", "");
      this.$router.push({
        path: "/"
      });
    },
    getinfo() {
      this.$router.push({
        path: "/changeinfo"
      });
    }
  },

  mounted() {
    this.show();
  }
};
</script>

<style scoped>
@import "./common/font/font.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#touxiang {
  display: inline;
  border-radius: 25px;
  margin-left: 33%;
}
.name {
  display: inline;
  font-size: 15px;
  padding: 0;
  margin: 0;
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
  padding: 0;
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
