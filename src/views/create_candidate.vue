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
      Create a New Candidate
    </h3>
    
    <!-- Stepper (steps that indicates user current step) (start)  -->
    <div class="steps-form">
      <div class="steps-row setup-panel">
        <div class="steps-step">
          <!-- Note: the class "step-active" indicates the current step  -->
          <a href="#" @click.prevent="openBasics()" type="button" :class="activeClass('basics')">1</a>
          <p>Start</p>
        </div>
        <div class="steps-step">
          <a href="#" type="button" @click.prevent="openDetails()" :class="activeClass('details')" disabled="disabled">2</a>
          <!-- <a type="button" :class="activeClass('details')" disabled="disabled">2</a> -->
          <p>Details</p>
        </div>
        <!-- <div class="steps-step">
            <a href="#" type="button" @click.prevent="openWorkflow()" :class="activeClass('workflow')" disabled="disabled">3</a>
            <p>Workflow</p>
        </div> -->
        <!-- <div class="steps-step">
            <a href="#" type="button" :class="activeClass('candidate')" disabled="disabled">4</a>
            <p>Candidate</p>
        </div> -->
      </div>   <!--  steps-row  -->
    </div>  <!--  steps-form  -->
    <!-- Stepper (end) -->
    
    <div class="row" v-if="showMain">
      <div class="col-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2">
        
        <!--  accordion start -->
        <div class="accordion my-4 rt-accordion rt-accordion-width" id="accordion">
          <!-- 1st accordion -->
          <div class="card" v-if="isBasics">
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body"> 

                <form>
                  <div class="row">
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateName">Name</label>
                      <input type="text" class="form-control" id="candidateName" placeholder="Enter" v-model="fullName" @blur="splitName()"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="opening">Opening</label>
                      <select class="form-control" id="opening-id" v-model="candidate.openingId">
                        <option value="" selected disabled>Select</option>
                        <option v-for="open in openings" :key="open._id" :value="open._id">{{open.title}}</option>
                      </select>
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateEmail">Email</label>
                      <input type="email" class="form-control" id="candidateEmail" placeholder="Enter" v-model="candidate.email"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidatePhone">Phone</label>
                      <input type="text" class="form-control" id="candidatePhone" placeholder="Enter" onkeypress='return event.charCode >= 46 && event.charCode <= 57 && event.charCode !== 47' maxlength="10" v-model="candidate.phone"> 
                    </div>

                    <!-- <div class="form-group col-12 col-sm-6">
                      <label for="candidateAlternateEmail">Alternate Email</label>
                      <input type="text" class="form-control" id="candidateAlternateEmail" placeholder="Enter" v-model="candidate.altEmail"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidatecurrentLocation">Current Location</label>
                      <input type="text" class="form-control" id="candidatecurrentLocation" placeholder="Enter" v-model="candidate.currentLocation"> 
                    </div> -->
                  </div>
                </form>
                <button type="button" class="btn btn-success bottom-btn" @click="openDetails()">Next</button>

              </div> <!--  card-body  -->
            </div>
          </div>  <!--  card  -->

          <!--  2nd accordion -->
          <div class="card" v-if="isDetails">
            <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
              <div class="card-body"> 

                <form>
                  <div class="row">
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateName">Name</label>
                      <input type="text" class="form-control" id="candidateName" placeholder="Enter" v-model="fullName" @blur="splitName()"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="opening">Opening</label>
                      <select class="form-control" id="opening-id" v-model="candidate.openingId" :disabled="isEdit">
                        <option value="" selected disabled>Select</option>
                        <option v-for="open in openings" :key="open._id" :value="open._id">{{open.title}}</option>
                      </select>
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateEmail">Email</label>
                      <input type="text" class="form-control" id="candidateEmail" placeholder="Enter" v-model="candidate.email"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidatePhone">Phone</label>
                      <input type="text" class="form-control" id="candidatePhone" placeholder="Enter" onkeypress='return event.charCode >= 46 && event.charCode <= 57 && event.charCode !== 47' maxlength="10" v-model="candidate.phone"> 
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateAlternateEmail">Alternate Email</label>
                      <input type="text" class="form-control" id="candidateAlternateEmail" placeholder="Enter" v-model="candidate.altEmail"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidatecurrentLocation">Current Location</label>
                      <input type="text" class="form-control" id="candidatecurrentLocation" placeholder="Enter" v-model="candidate.currentLocation"> 
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidatecurrentEmployer">Current Employer</label>
                      <input type="text" class="form-control" id="candidatecurrentEmployer" placeholder="Enter" v-model="candidate.currentEmployer"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidatecurrentPosition">Current Position</label>
                      <input type="text" class="form-control" id="candidatecurrentPosition" placeholder="Enter" v-model="candidate.currentPosition"> 
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateCurrentSalary">Current Salary</label>
                      <input type="text" class="form-control" id="candidateCurrentSalary" placeholder="Enter" v-model="candidate.currentSalary"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateExpectedSalary">Expected Salary</label>
                      <input type="text" class="form-control" id="candidateExpectedSalary" placeholder="Enter" v-model="candidate.expectedSalary"> 
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateyearsOfExperience">Years Of Experience</label>
                      <input type="number" class="form-control" onkeypress='return event.charCode >= 46 && event.charCode <= 57 && event.charCode !== 47' min="0" id="candidateyearsOfExperience" placeholder="Enter" v-model.number="candidate.yearsOfExperience"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateHighestQualification">Highest Qualification</label>
                      <input type="text" class="form-control" id="candidateHighestQualification" placeholder="Enter" v-model="candidate.highestEducationalQualification"> 
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidatePortfolio">Portfolio</label>
                      <input type="text" class="form-control" id="candidatePortfolio" placeholder="Enter" v-model="candidate.portfolio"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateExpectedSource">Source</label>
                      <input type="text" value="" class="form-control" id="candidateExpectedSource" placeholder="Enter" v-model="candidate.source">
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateSkills">Skills</label>
                      <input-tag v-model="candidate.skills" placeholder="Enter" class="form-control custom-tags"></input-tag>
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateTags">Tags</label>
                      <input-tag v-model="candidate.tags" placeholder="Enter tags" class="form-control custom-tags"></input-tag>
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="uploadCV">Upload CV</label>
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="uploadCV" ref="file" @change="handleFileUploadForFond()">
                        <label class="custom-file-label font-weight-normal" for="uploadCV">Choose file</label>
                      </div>
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="uploadCV">Uploaded CV Link</label>
                      <p class="text-truncate fs-14 mb-0" :title="candidate.cvLink" v-if="candidate.cvLink !== ''">{{candidate.cvLink}}</p>
                      <p class="text-truncate fs-14 mb-0" v-else>Not Uploaded</p>
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateCurrentNoticePeriod">Notice Period</label>
                      <select class="form-control" id="opening-Location" v-model="candidate.noticePeriod">
                        <option value="" selected disabled>Select</option>
                        <option value="7 Days">7 Days</option>
                        <option value="30 Days">30 Days</option>
                        <option value="45 Days">45 Days</option>
                        <option value="60 Days">60 Days</option>
                        <option value="90 Days">90 Days</option>
                        <option value="Already on Notice">Already on Notice</option>
                      </select>
                    </div>
                    <div class="form-group col-12 col-sm-6" v-if="candidate.noticePeriod === 'Already on Notice'">
                      <label for="candidateAvailableFrom">Available From</label>
                      <!-- <input type="date" class="form-control" id="candidateAvailableFrom" placeholder="Enter" v-model="candidate.availableFrom"> -->
                      <datetime v-model="candidate.availableFrom"  value-zone="local"></datetime>
                    </div>
                    
                    <div class="form-group col-12 col-sm-12">
                      <label for="candidateExperience">Experience</label>
                      <textarea class="form-control" id="candidateExperiences" rows="4" placeholder="Enter" v-model="candidate.experienceSummary"></textarea> 
                    </div>
                  </div>  <!--  row  -->
                </form>

                <div class="row">
                  <button type="button" class="btn btn-outline-secondary bottom-btn" @click="openBasics()">Previous</button>
                  <button type="button" v-if="isEdit" class="btn btn-success bottom-btn" @click="updateCandidate()">Update</button>
                  <button type="button" v-else class="btn btn-success bottom-btn" @click="saveCandidate()">Save</button>
                </div>

              </div>   <!--  card-body  -->
            </div>
          </div>  <!--  card  -->
        </div>  <!--  accordion  -->
        
      </div> <!-- col-12 col-md-10 col-xl-8  -->
    </div>  <!--  row  -->
    <div class="row mt-3" v-else>
      <div class="form-group col-12 col-sm-6 col-md-4" v-for="candidate in duplicateCandidates" :key="candidate._id">
        <div class="card info-card">
          <div class="card-body p-3">
            <!-- email sender name -->
            <h5 class="email-from mb-3 pb-2 font-weight-bold" style="font-size: 15px; border-bottom: 1px solid #ebebeb">
              {{candidate.name.full}}
            </h5> 
            <!--  email receiver name -->
            <p class="fs-14 font-weight-bold">Email: <span class="font-weight-normal">{{candidate.email}}</span></p>
            <p class="fs-14 font-weight-bold">Phone: <span class="font-weight-normal">{{candidate.phone}}</span></p>
            <p class="fs-14 font-weight-bold">Alternate Email: <span class="font-weight-normal">{{candidate.altEmail}}</span></p>
            <p class="fs-14 font-weight-bold">Opening: <span class="font-weight-normal">{{candidate._opening.title}}</span></p>
          </div>   <!--  card-body  -->
          <div class="card-footer text-right">
            <button type="button" class="btn btn-outline-warning btn-sm bottom-btn btn-new" @click="clone(candidate._id)">Clone</button>
            <button type="button" class="btn btn-outline-info btn-sm bottom-btn btn-new" @click="edit(candidate._id)">Edit</button>
            <button type="button" class="btn btn-success btn-sm bottom-btn btn-new" @click="fresh()">New</button>
          </div>
        </div>
      </div>
    </div>  <!--  row  -->  
  </div>
  <!--  content   -->
</template>
<script>
  import sweetalert from "sweetalert"
  import Datetime from 'vue-datetime'
  import navbar from '@/views/navbar.vue'
  import InputTag from 'vue-input-tag'
  import Loading from 'vue-loading-overlay'
  import moment from "moment"
  import 'vue-loading-overlay/dist/vue-loading.css'
  import 'vue-datetime/dist/vue-datetime.css'
  import Vue from "vue"
  export default {
    name: 'CreateOpening',
    components: {
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
        workflowStages: [],
        opening: {
          title: "",
          locations: [],
          tags: [],
          isRemoteAllowed: "true",
          description: "",
          positionType: "fulltime",
          _workflowStages: []
        },
        fullName: "",
        candidate: {
          name: {
            first: "",
            middle: "",
            last: ""
          },
          openingId: "",
          email: "",
          altEmail: "",
          phone: "",
          cvLink: "",
          currentEmployer: "",
          currentPosition: "",
          currentSalary: "",
          currentLocation: "",
          noticePeriod: "",
          availableFrom: "",
          yearsOfExperience: null,
          highestEducationalQualification: "",
          experienceSummary: "",
          portfolio: "",
          source: "",
          expectedSalary: "",
          skills: [],
          tags: []
        },
        currentStage: "basics",
        isBasics: true,
        isDetails: false,
        selectStage: "",
        openings: [],
        showMain: true,
        isEdit: false,
        editId: "",
        duplicateCandidates: []
      }
    },

    created () {
			this.axios.get("/openings")
			.then(resp => {
        this.openings = resp.data.openings.filter(o => o.isActive)
        return this.axios.get("/workflowStages")
			})
      .then(resp => {
        this.isLoading = false
        this.workflowStages = resp.data.workflowStages
			})
			.catch(err => {
        this.isLoading = false
				console.log(err);
			})
		},

    methods: {
      activeClass(stage) {
        if (stage === this.currentStage) {
          return "btn step-active btn-circle"
        } else {
          return "btn step-inactive btn-circle"
        }
      },
      openBasics() {
        this.isBasics = true
        this.isDetails = false
        this.currentStage = "basics"
      },
      openDetails() {
        if (this.candidate.email === "" && this.candidate.phone === "") {
          swal('Empty Field!', "Either email or phone required", 'error')
          return false
        }
        this.isLoading = true
        const sendData = {
          // email: this.candidate.email,
          phone: this.candidate.phone
        }
        if (this.candidate.email !== "") {
          sendData.email = this.candidate.email
        }
        this.axios.post(`/candidates`, sendData)
        .then(resp => {
          this.isLoading = false
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error');
          } else {
            console.log("holo thik")
            if (resp.data.candidates.length === 0) {
              this.isBasics = false
              this.isDetails = true
              this.currentStage = "details"
              this.showMain = true
            } else {
              this.duplicateCandidates = resp.data.candidates
              return swal("Similar candidates found", "Continue with new candidate or view the existing candidates?", {
                buttons: {
                  cancel: "Create New",
                  catch: {
                    text: "View",
                    value: "view",
                  }
                },
                icon: "info",
              })
            }
          }
        })
        .then(value => {
          if (value === "view") {
            this.showMain = false
          } else {
            this.isEdit = false
            this.isBasics = false
            this.isDetails = true
            this.currentStage = "details"
            this.showMain = true
            this.candidate.altEmail = ""
            this.candidate.cvLink = ""
            this.candidate.currentEmployer = ""
            this.candidate.currentPosition = ""
            this.candidate.currentSalary = ""
            this.candidate.currentLocation = ""
            this.candidate.noticePeriod = ""
            this.candidate.availableFrom = ""
            this.candidate.yearsOfExperience = null
            this.candidate.highestEducationalQualification = ""
            this.candidate.experienceSummary = ""
            this.candidate.portfolio = ""
            this.candidate.source = ""
            this.candidate.expectedSalary = ""
            this.candidate.skills = []
            this.candidate.tags = []
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error');
          console.log(err);
        })
      },
      splitName() {
        const arr = this.fullName.split(" ").filter(c => c !== "")
        this.candidate.name.first = arr.shift()
        this.candidate.name.last = arr.pop()
        this.candidate.name.middle = arr.join(" ") || undefined
      },
      handleFileUploadForFond() {
        $('#add-new-candidate').modal('hide')
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
          this.candidate.cvLink = responseData.secure_url
          this.isLoading = false
          $('#add-new-candidate').modal('show')
        })
        .catch(error => {
          this.isLoading = false
          $('#add-new-candidate').modal('show')
          console.log(error)
        });
      },
      saveCandidate() {
        if (this.candidate.name.last === undefined || this.candidate.name.last === "") {
          sweetalert('Error!', "Please enter full name (with last name)", 'error');
          return false
        }
        if (this.candidate.openingId === "") {
          sweetalert('Error!', "Please select opening", 'error');
          return false
        }
        if (this.candidate.email === "") {
          sweetalert('Error!', "Please Enter Email", 'error');
          return false
        }
        if (this.candidate.email !== "" && this.candidate.email !== undefined) {
          if (!(/^[a-zA-Z0-9]{1}[a-zA-Z0-9\.\-\+_]+[@]{1}[a-zA-Z0-9\.\-\+_]{2,}[\.]{1}[a-zA-Z0-9\.\-\+_]{2,}$/.test(this.candidate.email))) {
            sweetalert('Error!', "Please Enter Valid Email Format(format: xxx@xxx.xxx)", 'error');
            return false
          }
        }
        if (this.candidate.altEmail !== "" && this.candidate.altEmail !== undefined) {
          if (!(/^[a-zA-Z0-9]{1}[a-zA-Z0-9\.\-\+_]+[@]{1}[a-zA-Z0-9\.\-\+_]{2,}[\.]{1}[a-zA-Z0-9\.\-\+_]{2,}$/.test(this.candidate.altEmail))) {
            sweetalert('Error!', "Please Enter Valid Email Format(format: xxx@xxx.xxx)", 'error');
            return false
          }
        }
        if (this.candidate.phone.length < 10) {
          sweetalert('Error!', "Please enter 10 digit phone number", 'error');
          return false
        }
        if (this.candidate.noticePeriod !== "Already on Notice") {
          this.candidate.availableFrom = null
        }
        this.isLoading = true
        this.axios.post(`/candidate`, this.candidate)
        .then(resp => {
          this.isLoading = false
          
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error')
          } else {
            console.log("holo thik")
            $('#add-new-candidate').modal('hide')
            this.fullName = "",
            this.candidate = {
              name: {
                first: "",
                middle: "",
                last: ""
              },
              openingId: "",
              email: "",
              altEmail: "",
              phone: "",
              cvLink: "",
              currentEmployer: "",
              currentPosition: "",
              currentSalary: "",
              currentLocation: "",
              noticePeriod: "",
              availableFrom: "",
              yearsOfExperience: null,
              highestEducationalQualification: "",
              experienceSummary: "",
              portfolio: "",
              source: "",
              expectedSalary: "",
              skills: []
            }
            this.$router.push(`/candidates`)
            // window.location.reload()
            // console.log("99999999")
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error')
          console.log(err);
        })
      },
      updateCandidate() {
        if (this.candidate.name.last === undefined || this.candidate.name.last === "") {
          sweetalert('Error!', "Please enter full name (with last name)", 'error');
          return false
        }
        if (this.candidate.phone.length < 10) {
          sweetalert('Error!', "Please enter 10 digit phone number", 'error');
          return false
        }
        if (this.candidate.noticePeriod !== "Already on Notice") {
          this.candidate.availableFrom = null
        }
        this.isLoading = true
        this.axios.put(`/candidate/${this.editId}`, this.candidate)
        .then(resp => {
          this.isLoading = false
          
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error')
          } else {
            console.log("holo thik")
            $('#add-new-candidate').modal('hide')
            this.fullName = "",
            this.candidate = {
              name: {
                first: "",
                middle: "",
                last: ""
              },
              openingId: "",
              email: "",
              altEmail: "",
              phone: "",
              cvLink: "",
              currentEmployer: "",
              currentPosition: "",
              currentSalary: "",
              currentLocation: "",
              noticePeriod: "",
              availableFrom: "",
              yearsOfExperience: null,
              highestEducationalQualification: "",
              experienceSummary: "",
              portfolio: "",
              source: "",
              expectedSalary: "",
              skills: []
            }
            this.$router.push(`/candidates`)
            // window.location.reload()
            // console.log("99999999")
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error')
          console.log(err);
        })
      },
      fresh() {
        this.isBasics = false
        this.isDetails = true
        this.currentStage = "details"
        this.showMain = true
        this.isEdit = false
        this.candidate.altEmail = ""
        this.candidate.cvLink = ""
        this.candidate.currentEmployer = ""
        this.candidate.currentPosition = ""
        this.candidate.currentSalary = ""
        this.candidate.currentLocation = ""
        this.candidate.noticePeriod = ""
        this.candidate.availableFrom = ""
        this.candidate.yearsOfExperience = null
        this.candidate.highestEducationalQualification = ""
        this.candidate.experienceSummary = ""
        this.candidate.portfolio = ""
        this.candidate.source = ""
        this.candidate.expectedSalary = ""
        this.candidate.skills = []
        this.candidate.tags = []
      },
      edit(id) {
        this.isEdit = true
        this.editId = id
        const selectCandidate = this.duplicateCandidates.find(c => c._id === id)
        this.fullName = selectCandidate.name.full
        this.candidate.name = {
          first: selectCandidate.name.first,
          middle: selectCandidate.name.middle,
          last: selectCandidate.name.last
        }
        this.candidate.openingId = selectCandidate._opening._id
        this.candidate.email = selectCandidate.email
        this.candidate.phone = selectCandidate.phone
        this.candidate.altEmail = selectCandidate.altEmail
        this.candidate.cvLink = selectCandidate.cvLink
        this.candidate.currentEmployer = selectCandidate.currentEmployer
        this.candidate.currentPosition = selectCandidate.currentPosition
        this.candidate.currentSalary = selectCandidate.currentSalary
        this.candidate.currentLocation = selectCandidate.currentLocation
        this.candidate.noticePeriod = selectCandidate.noticePeriod
        this.candidate.availableFrom = moment(selectCandidate.availableFrom).format("YYYY-MM-DD")
        this.candidate.yearsOfExperience = selectCandidate.yearsOfExperience
        this.candidate.highestEducationalQualification = selectCandidate.highestEducationalQualification
        this.candidate.experienceSummary = selectCandidate.experienceSummary
        this.candidate.portfolio = selectCandidate.portfolio
        this.candidate.source = selectCandidate.source
        this.candidate.expectedSalary = selectCandidate.expectedSalary
        this.candidate.skills = selectCandidate._skills.map(s => s.text)
        this.candidate.tags = selectCandidate._tags.map(s => s.text)
        this.isBasics = false
        this.isDetails = true
        this.currentStage = "details"
        this.showMain = true
      },
      clone(id) {
        this.isEdit = false
        const selectCandidate = this.duplicateCandidates.find(c => c._id === id)
        this.fullName = selectCandidate.name.full
        this.candidate.name = {
          first: selectCandidate.name.first,
          middle: selectCandidate.name.middle,
          last: selectCandidate.name.last
        }
        this.candidate.altEmail = selectCandidate.altEmail
        this.candidate.email = selectCandidate.email
        this.candidate.phone = selectCandidate.phone
        this.candidate.cvLink = selectCandidate.cvLink
        this.candidate.currentEmployer = selectCandidate.currentEmployer
        this.candidate.currentPosition = selectCandidate.currentPosition
        this.candidate.currentSalary = selectCandidate.currentSalary
        this.candidate.currentLocation = selectCandidate.currentLocation
        this.candidate.noticePeriod = selectCandidate.noticePeriod
        this.candidate.availableFrom = moment(selectCandidate.availableFrom).format("YYYY-MM-DD")
        this.candidate.yearsOfExperience = selectCandidate.yearsOfExperience
        this.candidate.highestEducationalQualification = selectCandidate.highestEducationalQualification
        this.candidate.experienceSummary = selectCandidate.experienceSummary
        this.candidate.portfolio = selectCandidate.portfolio
        this.candidate.source = selectCandidate.source
        this.candidate.expectedSalary = selectCandidate.expectedSalary
        this.candidate.skills = selectCandidate._skills.map(s => s.text)
        this.isBasics = false
        this.isDetails = true
        this.currentStage = "details"
        this.showMain = true
      }
    }
  };
</script>
<style scoped>
  .steps-form .steps-row .steps-step {
    display: table-cell;
    text-align: center;
    position: relative;
    width: 50%;
  }
  .text-left {
    text-align: left;
  }
  .btn-new {
    margin: 0 0 0 12px;
  }
  .text-overflow {
    white-space: nowrap; 
    width: 100%; 
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .info-card {
    background: #fff;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border: 0;
  }

  .info-card .card-footer:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 11px 12px;
  }
</style>