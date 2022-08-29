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
    
    <!--  page title  -->
    <h3 class="rt-page-title">
      All Users
      
      <!--  on clicking the btn, a modal / popup ill appear  -->
      <a href="" role="button" class="btn btn-outline-secondary btn-sm add-btn" @click.prevent="openModal()">
        <i class="fa fa-plus"></i>
        New 
      </a>
    </h3>
    <vue-good-table
      title=""
      :columns="columns"
      :rows="users"
      :paginate="true"
      :globalSearch="true"
      globalSearchPlaceholder=Search
      :lineNumbers="false" class="custom-table mt-4">
      <template slot="table-row" slot-scope="props">
        <td>
          {{props.row.name.full}}
        </td>
        <td>
          {{props.row.email}}
        </td>
        <td>
          <span v-if="props.row.location === undefined || props.row.location.city === undefined">Not Added</span>
          <span v-else>{{props.row.location.city}}</span>
        </td>
        <!-- <td>
          {{props.row._organization.title}}
        </td> -->
        <td>
          <span>{{changeDate(props.row.lastModifiedAt)}}</span>
        </td>
        <td>
          <span class="badge">
            <button v-if="props.row.isActive" class="btn btn-success btn-sm" @click="changeStatus(props.row._id, false)">Active</button>
            <button v-else class="btn btn-danger btn-sm" @click="changeStatus(props.row._id, true)">Inactive</button>
            <button class="btn btn-info btn-sm" @click="userDetails(props.row._id)" style="margin-left: 10px;">View</button>
          </span>
        </td>  
      </template>
    </vue-good-table>
    <!--  table (end)  -->

    <!-- Modal -->
    <div id="user-add-modal" class="modal fade" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add User</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"> 
              <i class="fa fa-times" aria-hidden="true"></i> 
            </button>
          </div>
          <div class="modal-body">    
            <div class="card-body">
              <!--  sign up form  -->
              <form>
                <div class="row mt-2 mb-3">
                  <div class="col-12 col-sm-6 form-group">
                    <input type="text" class="form-control" id="userFirstName" placeholder="First Name" v-model="user.name.first">
                  </div>
                  <div class="col-12 col-sm-6 form-group">
                    <input type="text" class="form-control" id="userLastName" placeholder="Last Name" v-model="user.name.last">
                  </div>
                  
                  <div class="col-12 col-sm-6 form-group">
                    <input type="text" class="form-control" id="userWorkEmail" placeholder="Work Email" v-model="user.email">
                  </div>
                  <div class="col-12 col-sm-6 form-group">
                    <input type="text" class="form-control" id="userWorkPhone" onkeypress='return event.charCode >= 46 && event.charCode <= 57 && event.charCode !== 47' maxlength="10" placeholder="Work Phone" v-model="user.phone">
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
                <button @click.prevent="saveUser()" type="submit" class="btn btn-success d-block mx-auto mb-2">Create</button>
              </form>
            </div>
          </div>

        </div>
      </div>
      <!-- /Import Residents modal -->  
    </div>
  </div>  <!--  content  -->
</template>
<script>
  import navbar from '@/views/navbar.vue'
  import VueGoodTable from "vue-good-table"
  import Loading from 'vue-loading-overlay'
  import moment from "moment"
  import sweetalert from "sweetalert"
  import jwtDecode from "jwt-decode"
  import config from "../config"
  import 'vue-loading-overlay/dist/vue-loading.css'
  Vue.use(VueGoodTable)
  import Vue from "vue"
  export default {
    name: 'Users',
    components: {
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
        users: [],
        confPassword: "",
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
        columns: [
          {
            label: "Name",
            field: "name.full"
          },
          {
            label: "Email",
            field: "_opening.title"
          },
          {
            label: 'City',
            field: 'location.city'
          },
          // {
          //   label: "Organization",
          //   field: "_organization"
          // },
          {
            label: "Last Update",
            field: "lastModifiedAt"
          },
          {
            label: "Status",
            field: 'isActive'
          }
        ]
      }
    },

    created () {
      const loginUser = jwtDecode(window.localStorage.getItem("token"))
		  this.axios.get("/users")
      .then(resp => {
        this.users = resp.data.users.filter(u => u._id !== loginUser._id)
        this.isLoading = false
			})
			.catch(err => {
        this.isLoading = false
        sweetalert('Error!', err.response.data.reason, 'error')
				console.log(err);
			})
		},

    methods: {
      changeDate(val) {
        if (
          !moment(val).isValid() ||
          moment(val).isSame(new Date("2100-01-01"), "day")
        )
          return "N/A";
        return moment(val).format("lll");
      },
      userDetails(id) {
        this.$router.push(`/user/${id}`)
      },
      changeStatus(id, status) {
        this.isLoading = true
        this.axios.put(`/user/${id}`, { isActive: status })
        .then(resp => {
          this.isLoading = false
          
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error');
          } else {
            this.$toasted.success("Status successfully changed", { 
              theme: "bubble", 
              position: "top-right",
              duration : 2500
            })
            this.users.find(o => o._id === id).isActive = status
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error');
          console.log(err);
        })
      },
      openModal() {
        $("#user-add-modal").modal("show")
      },
      saveUser() {
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
        if (this.user.password === "") {
          // sweetalert('Error!', "Password required", 'error')
          this.$toasted.error("Password required", { 
            theme: "bubble", 
            position: "top-right",
            duration : 3500
          });
          return false
        }
        if (this.user.password !== this.confPassword) {
          // sweetalert('Error!', "Password Missmatch", 'error')
          this.$toasted.error("Password Missmatch", { 
            theme: "bubble", 
            position: "top-right",
            duration : 3500
          });
          return false
        }
        this.isLoading = true
        this.axios.post(`/user`, this.user)
        .then(resp => {
          this.isLoading = false
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error')
          } else {
            $('#user-add-modal').modal('hide')
            let toast = this.$toasted.success("User Successfully Created", { 
              theme: "bubble", 
              position: "top-right",
              duration : 2500
            });
            this.confPassword = "",
            this.user = {
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
            }
            this.users.splice(0, 0, resp.data.user)
          }
        })
        .catch(err => {
          this.isLoading = false
          if (err.response.data.reason.includes("email_1 dup key")) {
            sweetalert('Error!', "Email already exists", 'error')
          } else {
            sweetalert('Error!', err.response.data.reason, 'error')
          }
          console.log(err);
        })
      }
    }
  };
</script>