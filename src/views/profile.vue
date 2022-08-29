<template>
  <!-- Page Content  -->
  <div id="content">
    <loading :active.sync="isLoading" 
      :can-cancel="false" 
      :color="color"
      :height="height"
      :width="width"
      :is-full-page="fullPage"></loading>
    <!--  top menu (start) -->
    <navbar></navbar>
    <!--  top menu (end) -->
    
    <div class="row">
      <div class="col-12 col-lg-12 order-12 order-lg-1">
      <!--  tab content (start) -->
        <div class="tab-content pt-4 px-3 mb-3 pb-3" id="pills-tabContent">
          <!-- tab 1  -->
          <div class="tab-pane fade show active" id="basic-info">

            <div class="row">
              <div class="col-12">
                
                <!--  When the user clicks on the edit btn, they will be able to edit the fields -->
                <div class="d-block">
                  <button type="button" @click="activeEdit()" class="btn btn-warning btn-sm mb-2 float-right" v-if="!isEdit">
                    <i class="fa fa-pencil"></i>&nbsp; Edit
                  </button>

                  <!--  When edit btn will be clicked, it will be replaced by Save & Cancel btn. When the user clicks any of the button below, then edit btn will reappear again. (Toggle)  -->
                  <!--  Currently they are hidden  -->
                  <div class="d-block" v-else>
                    <button type="button" @click="deactiveEdit()" class="btn btn-outline-warning btn-sm mb-2 ml-3 float-right">
                      Cancel
                    </button> &nbsp;
                    <button type="button" @click="updateProfile()" class="btn btn-success btn-sm mb-2 float-right">
                      Save
                    </button>
                  </div>
                </div>  <!--  col-12 col-sm-12 col-md-10 offset-md-1  -->

                <div class="clearfix"></div>
                <form>
                  <div class="row mt-3">
                    <div class="col-12 col-sm-6 col-lg-5 offset-lg-1 form-group">
                      <input type="text" :disabled="!isEdit" class="form-control" id="userFirstName" placeholder="First Name" v-model="user.name.first">
                    </div>
                    <div class="col-12 col-sm-6 col-lg-5 form-group">
                      <input type="text" :disabled="!isEdit" class="form-control" id="userLastName" placeholder="Last Name" v-model="user.name.last">
                    </div>
                    
                    <div class="col-12 col-sm-6 col-lg-5 offset-lg-1 form-group">
                      <input type="email" disabled class="form-control" id="userWorkEmail" placeholder="Work Email" v-model="user.email">
                    </div>
                    <div class="col-12 col-sm-6 col-lg-5 form-group">
                      <input type="text" :disabled="!isEdit" class="form-control" onkeypress='return event.charCode >= 46 && event.charCode <= 57 && event.charCode !== 47' maxlength="10" id="userWorkPhone" placeholder="Work Phone" v-model="user.phone">
                    </div>
                    
                    <div class="col-12 col-sm-6 col-lg-5 offset-lg-1 form-group">
                      <select class="form-control" id="userRole" v-model="user.role" :disabled="!isEdit">
                        <option value="" disabled>Select Role</option>
                        <option>Director</option>
                        <option>Manager</option>
                        <option>Employee</option>
                      </select>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-5 form-group">
                      <input type="text" :disabled="!isEdit" class="form-control" id="userPurpose" placeholder="Purpose" v-model="user.purpose">
                    </div>
                    
                    <div class="col-12 col-sm-6 col-lg-5 offset-lg-1 form-group">
                      <input type="text" :disabled="!isEdit" class="form-control" id="userCity" placeholder="User City" v-model="user.location.city">
                    </div>
                    <div class="col-12 col-sm-6 col-lg-5 form-group">
                      <input type="text" :disabled="!isEdit" class="form-control" id="userCountry" placeholder="User Country" v-model="user.location.country">
                    </div>
                    
                    <div class="col-12 col-sm-6 col-lg-5 offset-lg-1 form-group">
                      <input type="text" :disabled="!isEdit" class="form-control" id="userOrganizationName" placeholder="Organization Name" v-model="user.organization.title">
                    </div>
                    <div class="col-12 col-sm-6 col-lg-5 form-group">
                      <!-- <input type="text" class="form-control" id="userOrganizationLogo" placeholder="Organization Logo" v-model="user.organization.logoUrl"> -->
                      <input type="text" :disabled="!isEdit" v-if="!isEdit" class="form-control" id="userOrganizationLogo" placeholder="Organization Logo Url" v-model="user.organization.logoUrl">
                      <!-- <input type="file" :disabled="!isEdit" v-else class="form-control-file" > -->
                      
                      <div class="custom-file" v-else :disabled="!isEdit" >
                        <input type="file" class="custom-file-input" id="uploadLogo" placeholder="Organization Logo" title="Upload Logo" name="Select file" ref="file" @change="handleFileUploadForLogo()">
                        <label class="custom-file-label font-weight-normal" for="customFile">Choose file</label>
                      </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-5 offset-lg-1 form-group">
                      <input type="text" :disabled="!isEdit" class="form-control" id="userOrganizationAddress" placeholder="Organization Address" v-model="user.organization.address">
                    </div>
                    <div class="col-12 col-sm-6 col-lg-5 form-group">
                      <input type="text" :disabled="!isEdit" class="form-control" id="userWebsite" placeholder="Website" v-model="user.website">
                    </div>
                    <!--  Note: an empty div. Do not remove it. -->
                    <!-- <div class="w-100 d-block"></div> -->
                    
                    <!-- <div class="col-12 col-sm-6 form-group">
                      <input type="password" class="form-control" id="userPassword" placeholder="Password" v-model="user.password">
                    </div>
                    <div class="col-12 col-sm-6 form-group mb-1">
                      <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" v-model="confPassword">
                    </div> -->
                  </div>
                </form>
              </div>   <!--  col  -->
            </div>  <!--  row   -->
          </div>   
          <!--  tab-pane  -->
        </div>   <!--  tab-content  -->
      </div>  <!--  col-12 col-lg-7  -->
    </div>  

  </div> 
  <!--  content   -->
</template>
<script>
  import navbar from '@/views/navbar.vue'
  import InputTag from 'vue-input-tag'
  import Loading from 'vue-loading-overlay'
  import moment from "moment"
  import Multiselect from 'vue-multiselect'
  import sweetalert from "sweetalert";
  Vue.component('multiselect', Multiselect)
  import cities from "../cities"
  import 'vue-loading-overlay/dist/vue-loading.css'
  import Vue from "vue"
  export default {
    name: 'Profile',
    components: {
      Multiselect,
      InputTag,
      Loading,
      navbar
    },
    data() {
      return {
        isLoading: true,
        color: '#1b7aa2',
        bgColor: '#ffffff',
        height: 128,
        width: 128,
        fullPage: true,
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
        },
        cities: cities.name,
        isEdit: false,
      }
    },

    created () {
      this.axios.get(`/me`)
      .then(response => {
        this.user = response.data.user
        if (this.user.location === undefined) {
          this.user.location = {
            city: "",
            country: ""
          }
        }
        this.user.organization = {
          title: response.data.user._organization.title,
          logoUrl: response.data.user._organization.logoUrl,
          address: response.data.user._organization.address
        }
        this.isLoading = false
      })
			.catch(err => {
        this.isLoading = false
				console.log(err);
			})
		},

    methods: {
      dateTime(val) {
        if (
          !moment(val).isValid() ||
          moment(val).isSame(new Date("2100-01-01"), "day")
        )
          return "N/A";
        return moment(val).format("lll");
      },
      activeEdit() {
        this.isEdit = true
      },
      deactiveEdit() {
        this.isEdit = false
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
      async updateProfile() {
        if (this.user.email !== "" && this.user.email !== undefined) {
          if (!(/^[a-zA-Z0-9]{1}[a-zA-Z0-9\.\-\+_]+[@]{1}[a-zA-Z0-9\.\-\+_]{2,}[\.]{1}[a-zA-Z0-9\.\-\+_]{2,}$/.test(this.user.email))) {
            sweetalert('Error!', "Please Enter Valid Email Format(format: xxx@xxx.xxx)", 'error');
            return false
          }
        }
        if (this.user.phone.length < 10) {
          sweetalert('Error!', "Please enter 10 digit phone number", 'error');
          return false
        }
        this.isLoading = true
        const args = this.user
        await this.$store.dispatch("profileUpdate", args)
        this.isLoading = false
        if (this.$store.state.error) {
          sweetalert('Error!', this.$store.state.errorMsg, 'error');
        } else {
          this.$forceUpdate()
          this.$toasted.success("Profile successfully Updated", { 
            theme: "bubble", 
            position: "top-right",
            duration : 2500
          });
          this.isEdit = false
        }
      },
    }
  };
</script>
<style scoped>
  .msg-div {
    text-align: left;
  }
  .for-border {
    border-bottom: 1px solid rgba(0,0,0,.125);
  }
  .word-break {
    word-wrap:break-word
  }
  
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
