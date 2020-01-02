<template>
  <div id="app">
    <Layout>
      <Header class="head">
        <div>
          <h1 style="display:inline;margin-left:35%;">区块链电子病历系统（患者端)</h1>
          <!-- <img v-show="isshow" src="./assets/touxaing.jpeg" style="margin-top:3px" width="45" height="45"  id="touxiang"> -->
          <!-- <p class="name">lavender</p> -->

          <Button
            type="primary"
            style="margin-left:350px;"
            v-show="isshow"
            @click="personalinfo()"
          >查看个人信息</Button>
          <Button type="primary" style="margin-left:20px;" v-show="isshow" @click="logout()">logout</Button>
        </div>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}" class="menu">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <MenuGroup title>
              <router-link to="account">
                <MenuItem name="1">
                  <Icon type="md-document" />查看病历
                </MenuItem>
              </router-link>
              <router-link to="choosehospital">
                <MenuItem name="2">
                  <Icon type="md-chatbubbles" />预约挂号
                </MenuItem>
              </router-link>
              <router-link to="myhao">
                <MenuItem name="3">
                  <Icon type="md-chatbubbles" />我的预约
                </MenuItem>
              </router-link>
            </MenuGroup>
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
      patientId: "1509050119",
      username: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      window.sessionStorage.setItem("username", "");
      this.$router.push({
        path: "/"
      });
    },
    personalinfo() {
      this.patientId = window.sessionStorage.getItem("patientId");
      this.username = window.sessionStorage.getItem("username");
      if (this.username == null || this.username == "") {
        alert("请登录！");
        this.$router.push({
          name: "Load"
        });
      } else if (this.patientId == null || this.patientId == "") {
        alert("请先登录！");
        this.$router.push({
          name: "Load"
        });
      } else {
        this.$router.push({
          path: "/changeinfo"
        });
      }
    }
  },
  data() {
    return {
      isshow: 1,
      patientId: "",
      username: ""
    };
  },
  created() {
    this.username = window.sessionStorage.getItem("username");
  }
};
</script>

<style scoped>
@import './common/font/font.css';
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
