<template>
  <!-- Page Content  -->
  <!-- <div> -->
  <nav class="navbar navbar-expand-md rt-top-menu">
    <!-- sidebar btn. It will appear below 768px -->
    <button type="button" id="sidebarCollapse" class="btn btn-info navbar-btn">
        <i class="fa fa-align-left"></i>
    </button>
    
    <!--  logo  -->
    <a class="navbar-brand" href="#">
        <img :src="$store.state.user._organization.logoUrl" class="" alt="Company logo" height="28">
    </a>
    <!--  toggle btn for small screens  -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon">
        <i class="fa fa-bars"></i>
      </span>
    </button>
    
    <!--  menu options  -->
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <div class="navbar-nav">
        <a class="nav-item nav-link" href="#">
          Welcome, 
          <!--  the below span will hold the name of the user -->
          <span class="user-name">{{$store.state.user.name.first}} {{$store.state.user.name.last}}</span>
        </a>
        
        <a class="nav-item nav-link" href="#/faqs" data-toggle="tooltip" data-placement="bottom" title="FAQs">
          <i class="fa fa-info-circle text-info" style="font-size: 21px; margin-top: 1px;"></i>
          <span>FAQs</span>
        </a>
        <a class="nav-item nav-link" href="" data-toggle="tooltip" data-placement="bottom" title="Logout" @click.prevent="logOut()">
          <i class="fa fa-power-off text-danger"></i>
          <span>Logout</span>
        </a>
      </div>
    </div>  <!--  navbar-collapse   -->
  </nav>
  <!-- </div>  -->
</template>
<script>
  export default {
    name: 'Navbar',
    methods: {
      async logOut () {
        await this.$store.dispatch("logOut")
      }
    }
  };
</script>