<template>
  <div @contextmenu.prevent="rightClik()">
    <div class="wrapper" v-if="$store.state.isLoggedIn">
      <!-- Sidebar  -->
      <nav id="sidebar">
        <ul class="list-unstyled components">
          <li id="stages" :class="isActive('stages')">
            <router-link to="/stages">
              <i class="fa fa-cubes"></i> Stages
            </router-link>
          </li>
          <li id="opening" :class="isActive('opening')">
            <router-link to="/">
              <i class="fa fa-black-tie"></i> Openings
            </router-link>
          </li>
          <li id="candidates" :class="isActive('candidates')">
            <router-link to="/candidates">
              <i class="fa fa-users"></i> Candidates
            </router-link>
          </li>
          <li id="users" :class="isActive('users')">
            <router-link to="/users">
              <i class="fa fa-user-plus"></i> Users 
            </router-link>
          </li>
          <li id="profile" :class="isActive('profile')">
            <router-link to="/profile">
              <i class="fa fa-user"></i> Profile  
            </router-link>
          </li>
          <!-- <li>
            <a href="assessment.html"> <i class="fa fa-file-code-o"></i> Assessments</a>
          </li> -->
        </ul>
      </nav>
      <router-view/>
      <!--   footer / copyright section  -->
      <footer>
        © 2018 <a href="http://logic-square.com" target="_blank">Logic Square Technologies</a>. 
        All rights reserved. 
      </footer>
    </div>
    <login v-else></login>
  </div>
</template>
<script>
// @ is an alias to /src
import login from '@/views/login.vue'
import sweetalert from "sweetalert"
export default {
  name: 'home',
  components: {
    login
  },
  created () {
    if (this.$store.state.isLoggedIn) {
      this.$store.dispatch("profile")
    }
  },
  methods: {
    isActive(id) {
      if (this.$route.name === id) {
        return "active"
      } else {
        return ""
      }
    },
    rightClik() {
      sweetalert('Recruitech', "Right Click functionality is not allowed on our site!", 'info');
    },
  }
};
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
