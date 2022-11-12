<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="app-breadcrumb">
      人资管理系统
      <span class="breadBtn">体验版</span>
    </div>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-fiximg="defaultImg" :src="staffPhoto" class="user-avatar">
          <span class="name">管理员</span>
          <i class="el-icon-caret-bottom" style="color:#fff " />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item @click="goBackIndex">
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://gitee.com/linyiqi520/hr-management-back-office">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <!-- 为什么要加native的原因是，在父组件中想要给子组件绑定事件，就必须要加上native修饰，否则无法触发 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  data() {
    return {
      defaultImg: 'https://ts1.cn.mm.bing.net/th/id/R-C.a21c47c9c760efdf19aaa7198f66aa02?rik=nsg4EAMujowt4A&riu=http%3a%2f%2fimg.ewebweb.com%2fuploads%2f20190531%2f23%2f1559315845-wSyIpLAivO.png&ehk=m0ZYm%2faoSqS0XHIUE2wyCXXzKgJpVVGjir5jZTJDyVE%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'staffPhoto'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    // 退出登录
    logout() {
      // this.$store.commit('removeToken')
      // this.$store.commit('removeUserInfo')
      // localStorage.removeItem('backToken')

      this.$store.dispatch('user/logout')
      window.location.reload()
      this.$message.success('退出成功')
    },
    // 跳转回首页
    goBackIndex() {
      this.$router.replace('/dashboard')
    }

    // 头像请求回来出错的情况下，使用默认头像，img标签要加上@error
    // defaultImg(event) {
    //   if (event.type === 'error') {
    //     event.target.src = 'https://ts1.cn.mm.bing.net/th/id/R-C.a21c47c9c760efdf19aaa7198f66aa02?rik=nsg4EAMujowt4A&riu=http%3a%2f%2fimg.ewebweb.com%2fuploads%2f20190531%2f23%2f1559315845-wSyIpLAivO.png&ehk=m0ZYm%2faoSqS0XHIUE2wyCXXzKgJpVVGjir5jZTJDyVE%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    // color:-webkit-linear-gradient(bottom, #3d6df8, #5b8cff);
    // background:  -webkit-linear-gradient(bottom, #3d6df8, #5b8cff);;
    cursor: text;
    .breadBtn {
      background: #84a9fe;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-left: 15px;
      cursor: pointer;
    }
  }
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #4b7cfb;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
        }
        .name {
          color: #fff;
          vertical-align: middle;
          margin-left: 5px;
        }
        .user-dropdown {
          color: #fff;
        }
      }
    }
  }
}
</style>
