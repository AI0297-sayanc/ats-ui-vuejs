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
                      <input type="text" disabled class="form-control" id="userWorkEmail" placeholder="Work Email" v-model="user.email">
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
                      <input type="text" :disabled="!isEdit" class="form-control" id="userWebsite" placeholder="Website" v-model="user.website">
                    </div>
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
    name: 'UserView',
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
      this.axios.get(`/user/${this.$route.params.id}`)
      .then(response => {
        this.user = response.data.user
        if (this.user.location === undefined) {
          this.user.location = {
            city: "",
            country: ""
          }
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
      updateProfile() {
        if (this.user.name.first === "") {
          sweetalert('Error!', "First name required", 'error')
          // this.$toasted.error("First name required", { 
          //   theme: "bubble", 
          //   position: "top-right",
          //   duration : 3500
          // });
          return false
        }
        if (this.user.email === "") {
          sweetalert('Error!', "Email required", 'error')
          // this.$toasted.error("Email required", { 
          //   theme: "bubble", 
          //   position: "top-right",
          //   duration : 3500
          // });
          return false
        }
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
        this.axios.put(`/user/${this.$route.params.id}`, this.user)
        .then(resp => {
          this.isLoading = false
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error');
          } else {
            this.isEdit = false
            this.$toasted.success("Profile successfully Updated", { 
              theme: "bubble", 
              position: "top-right",
              duration : 2500
            })
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error');
          console.log(err);
        })
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
