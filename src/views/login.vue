<template>
  <div class="rt-login-bg-img">
    <loading :active.sync="isLoading" 
      :can-cancel="false" 
      :color="color"
      :height="height"
      :width="width"
      :is-full-page="fullPage"></loading>
    <!--  logo -->
    <div class="rt-logo-wrap">
      <p class="rt-logo">
        LOGO
      </p>
    </div>
    <div class="container-fluid" v-if="loginForm">
      <div class="row">

        <div class="col-12 col-lg-10 offset-lg-1">
          <div class="row">
            <div class="rt-login-pg-wrapper d-flex justify-content-around align-items-center">
            
              <div class="col-12 col-md-6 col-lg-5">
                <div class="card rt-login-form-wrap">
                  <div class="card-header">
                    <h5 class="card-title">Login</h5>
                  </div>
                  <form @submit.prevent="login()">
                    <div class="card-body for-login-form">
                      <!--  Login form  -->
                        <div class="form-group">
                          <label for="loginEmail">Email</label>
                          <input type="email" class="form-control" id="loginEmail" placeholder="Enter" v-model="email">
                        </div>
                        <div class="form-group">
                          <label for="loginPassword">Password</label>
                          <input type="password" class="form-control" id="loginPassword" placeholder="Enter" v-model="password">
                        </div>

                        <a href="" class="btn btn-link forgot-password" @click.prevent="forgotPassForm()">
                          Forgot Password?
                        </a>
                        <!--  forgot password & sign up links -->
                        <!-- <a href="signup.html" class="btn btn-link signup">
                          Sign Up
                        </a> -->
                    </div>  <!--  card-body -->
                        <!-- <div class="form-group"> -->
                        <!-- </div> -->
                    <!--  Login btn  -->
                    <div class="card-footer text-center">
                      <input type="submit" class="btn login-btn" value="Login">
                    </div>
                  </form>
                </div>  <!--  rt-login-form-wrap  -->
                <!-- <div class="text-center text-white my-1">
                  Open Account? 
                  <a href="" @click.prevent="showSignup()" class="text-white ml-1">Click Here</a>
                </div> -->
              </div> <!--  col-12 col-md-6 col-lg-5 offset-lg-1  -->

              <!--  What's New section  -->
          <!--  the below section will not be visible under 768px (smaller screens)   -->
              <div class="col-12 col-md-5 offset-md-1 col-lg-5 offset-lg-1 d-none d-md-block">
                <div class="card rt-whats-new-wrap">
                  <div class="card-body pb-2">
                    <h4 class="card-title">What's New</h4>
                    <h6 class="card-subtitle mt-2">List of Features </h6>
                  </div>
                  <!--  list of features -->
                  <ul class="list-group list-group-flush rt-whats-new--features">
                    <li class="list-group-item">Curabitur dapibus lorem vel elementum</li>
                    <li class="list-group-item">Aliquam condimentum eu erat ut</li>
                    <li class="list-group-item">Praesent ante nunc blandit nec tellus</li>
                  </ul>
                  <div class="card-body py-3">
                    <a href="#" class="card-link">
                      Learn More &nbsp;
                      <i class="fa fa-arrow-right"></i>
                    </a> onsubmit
                  </div>
                </div>  <!--  rt-whats-new-wrap  -->
              </div> <!--  col-12 col-md-6 col-lg-5 -->
            
            </div>  <!--  rt-login-pg-wrapper  -->

          </div>  <!--  row  -->
        </div>  <!--  col-12 col-lg-10 offset-lg-1  -->

      </div>  <!--  row   -->
    </div>  <!--  container-fluid  -->

    <div class="container-fluid" v-if="!loginForm && !forgotpass" style="padding-top: 29px;">
      <div class="row">

        <div class="col-12 col-lg-10 offset-lg-1">
          <div class="row rt-login-pg-wrapper d-flex justify-content-center align-items-center">

            <div class="col-12 col-md-8">
              <div class="card rt-login-form-wrap rt-signup-form-wrap">
                <div class="card-header">
                  <h5 class="card-title">Sign up</h5>
                </div>
                <div class="card-body">
                  <!--  sign up form  -->
                  <form>
                    <div class="row">
                      <div class="col-12 col-sm-6 form-group">
                        <input type="text" class="form-control" id="userFirstName" placeholder="First Name" v-model="user.name.first">
                      </div>
                      <div class="col-12 col-sm-6 form-group">
                        <input type="text" class="form-control" id="userLastName" placeholder="Last Name" v-model="user.name.last">
                      </div>
                      
                      <div class="col-12 col-sm-6 form-group">
                        <input type="email" class="form-control" id="userWorkEmail" placeholder="Work Email" v-model="user.email">
                      </div>
                      <div class="col-12 col-sm-6 form-group">
                        <input type="text" class="form-control" id="userWorkPhone" placeholder="Work Phone" v-model="user.phone">
                      </div>
                      
                      <div class="col-12 col-sm-6 form-group">
                        <select class="form-control" id="userRole" v-model="user.role">
                          <option value="" disabled>Select Role</option>
                          <option>Director</option>
                          <option>Manager</option>
                          <option>Employee</option>
                        </select>
                      </div>
                      <div class="col-12 col-sm-6 form-group">
                        <input type="text" class="form-control" id="userPurpose" placeholder="Purpose" v-model="user.purpose">
                      </div>
                      
                      <div class="col-12 col-sm-6 form-group">
                        <input type="text" class="form-control" id="userCity" placeholder="User City" v-model="user.location.city">
                      </div>
                      <div class="col-12 col-sm-6 form-group">
                        <input type="text" class="form-control" id="userCountry" placeholder="User Country" v-model="user.location.country">
                      </div>
                      
                      <div class="col-12 col-sm-6 form-group">
                        <input type="text" class="form-control" id="userOrganizationName" placeholder="Organization Name" v-model="user.organization.title">
                      </div>
                      <div class="col-12 col-sm-6 form-group">
                        <!-- <input type="text" class="form-control" id="userOrganizationLogo" placeholder="Organization Logo" v-model="user.organization.logoUrl"> -->
                        <input type="file" class="form-control-file" id="uploadLogo" placeholder="Organization Logo" style="margin-top:2px;" title="Upload Logo" name="Select file" ref="file" @change="handleFileUploadForLogo()">
                        <!-- <label for="files">Select file</label> -->
                      </div>
                      <div class="col-12 col-sm-6 form-group">
                        <input type="text" class="form-control" id="userOrganizationAddress" placeholder="Organization Address" v-model="user.organization.address">
                      </div>
                      <div class="col-12 col-sm-6 form-group">
                        <input type="text" class="form-control" id="userWebsite" placeholder="Website" v-model="user.website">
                      </div>
                      <!--  Note: an empty div. Do not remove it. -->
                      <div class="w-100 d-block"></div>
                      
                      <div class="col-12 col-sm-6 form-group">
                        <input type="password" class="form-control" id="userPassword" placeholder="Password" v-model="user.password">
                      </div>
                      <div class="col-12 col-sm-6 form-group mb-1">
                        <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" v-model="confPassword">
                      </div>
                    </div>
                  </form>
                </div>  <!--  card-body -->
                <div class="card-footer text-center">
                  <a @click="saveUser()" role="button" class="btn login-btn">Get Started</a>
                </div>
              </div>  <!--  rt-login-form-wrap  -->
              <div class="text-center text-white my-1">
                Already have an account? 
                <a href="" @click.prevent="showLogin()" class="text-white ml-1">Login</a>
              </div>
            </div> <!--  col-12 col-md-8   -->

          </div>  <!--  rt-login-pg-wrapper  -->
        </div>  <!--  col-12 col-lg-10 offset-lg-1  -->

      </div>  <!--  row   -->
    </div>  <!--  container-fluid  -->

    <div class="container-fluid" v-if="forgotpass">
      <div class="row">

        <div class="col-12 col-lg-10 offset-lg-1">
          <div class="row rt-login-pg-wrapper d-flex justify-content-center align-items-center">

            <div class="col-12 col-md-6">
              <div class="card rt-login-form-wrap">
                <div class="card-header">
                  <h5 class="card-title">Forgot Password ?</h5>
                </div>
                <div class="card-body">
                  
                  <h6 class="rt-enter-email-used-txt">Enter the email address you used to sign up</h6>
                  <!--   forgot password  -->
                  <form>
                    <div class="form-group">
                      <input type="email" class="form-control" id="userEmail" placeholder="Email ID" v-model="resetEmail">
                    </div>
                  </form>
                </div>  <!--  card-body -->
                <!--  Send btn  -->
                <div class="card-footer text-center">
                  <a href="" role="button" class="btn login-btn" @click.prevent="forgotPassMail()">Send</a>
                </div>
              </div>  <!--  rt-login-form-wrap  -->
              <div class="text-center text-white my-1">
                 Back to
                <a href="" @click.prevent="showLogin()" class="text-white ml-1">Login</a>
              </div>
            </div> <!--  col-12 col-md-6   -->

          </div>  <!--  rt-login-pg-wrapper  -->
        </div>  <!--  col-12 col-lg-10 offset-lg-1  -->

      </div>  <!--  row   -->
    </div> 

    <!--  footer / copyright section -->
    <footer>
      © 2018 <a href="http://logic-square.com" target="_blank">Logic Square Technologies</a>. 
      All rights reserved. 
    </footer>
  </div>  <!--  rt-login-bg-img  -->
</template>

<script>
import sweetalert from "sweetalert"
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  name: 'home',
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      color: '#1b7aa2',
      bgColor: '#ffffff',
      height: 128,
      width: 128,
      fullPage: true,
      email: "",
      password: "",
      loginForm: true,
      forgotpass: false,
      resetEmail: "",
      confPassword: "",
      user: {
        name: {
          first: "",
          last: "",
        },
        organization: {
          title: "",
          logoUrl: "",
          address: ""
        },
        email: "",
        password: "",
        phone: "",
        website: "",
        role: "",
        purpose: "",
        location: {
          city: "",
          country: ""
        }
      }
    }
  },
  methods: {
    async login() {
      const args = {
        email: this.email,
        password: this.password
      }
      await this.$store.dispatch("login", args)
      if (this.$store.state.error) {
        sweetalert('Error!', this.$store.state.errorMsg, 'error');
      }
    },
    showLogin() {
      this.loginForm = true
      this.forgotpass = false
    },
    showSignup() {
      this.loginForm = false
      this.forgotpass = false
    },
    forgotPassForm() {
      this.resetEmail = this.email
      this.loginForm = false
      this.forgotpass = true
    },
    forgotPassMail() {
      this.isLoading = true
      this.axios.post(`/forgotpassword`, { handle: this.resetEmail })
      .then(resp => {
        this.isLoading = false
        if (resp.data.error) {
          sweetalert('Error!', resp.data.reason, 'error')
        } else {
          this.$toasted.success("Reset Link successfully send to your email", { 
            theme: "bubble", 
            position: "top-right",
            duration : 2500
          });
          this.resetEmail = ""
          this.loginForm = true
          this.forgotpass = false
        }
      })
      .catch(err => {
        this.isLoading = false
        sweetalert('Error!', err.response.data.reason, 'error')
        console.log(err);
      })
    },
    handleFileUploadForLogo() {
      this.isLoading = true
      const formData = new FormData()
      formData.append('file', this.$refs.file.files[0]);
      formData.append('upload_preset', 'yu5mntw0');
      formData.append('tags', 'gs-vue,gs-vue-uploaded');
      fetch("https://api.cloudinary.com/v1_1/www-logic-square-com/upload", { method: 'POST', body: formData })
      .then(res => {
        return res.json()
      })
      .then((responseData) => {
        this.user.organization.logoUrl = responseData.secure_url
        this.isLoading = false
      })
      .catch(error => {
        this.isLoading = false
        console.log(error)
      });
    },
    // saveUser() {
    //   this.axios.post(`/signup`, this.user)
    //     .then(resp => {
    //       this.isLoading = false
          
    //       if (resp.data.error) {
    //         sweetalert('Error!', resp.data.reason, 'error');
    //       } else {
    //         this.loginForm = true
    //       }
    //     })
    // }
  }
};
</script>
<style>
  .for-login-form {
    padding: 2.25rem;
    padding-bottom: 50px !important;
  }
</style>

