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
      Create a New Opening
    </h3>
    
    <!-- Stepper (steps that indicates user current step) (start)  -->
    <div class="steps-form">
      <div class="steps-row setup-panel">
        <div class="steps-step">
          <!-- Note: the class "step-active" indicates the current step  -->
          <a href="#" @click.prevent="openBasics()" type="button" :class="activeClass('basics')">1</a>
          <p>Basics</p>
        </div>
        <div class="steps-step">
          <a href="#" type="button" @click.prevent="openDetails()" :class="activeClass('details')" disabled="disabled">2</a>
          <p>Details</p>
        </div>
        <div class="steps-step">
            <a href="#" type="button" @click.prevent="openWorkflow()" :class="activeClass('workflow')" disabled="disabled">3</a>
            <p>Workflow</p>
        </div>
        <!-- <div class="steps-step">
            <a href="#" type="button" :class="activeClass('candidate')" disabled="disabled">4</a>
            <p>Candidate</p>
        </div> -->
      </div>   <!--  steps-row  -->
    </div>  <!--  steps-form  -->
    <!-- Stepper (end) -->
    
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2">
        
        <!--  accordion start -->
        <div class="accordion my-4 rt-accordion rt-accordion-width" id="accordion">
          <!-- 1st accordion -->
          <div class="card" v-if="isBasics">
            <!-- <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Basics

              <i class="fa fa-arrow-down rt-accordion-arrow"></i>
            </div> -->
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body"> 

                <form>
                  <div class="row">
                    <div class="form-group col-12 col-sm-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2">
                      <label for="title">Title</label>
                      <input type="text" class="form-control" id="title" placeholder="Enter" v-model="opening.title"> 
                    </div>                 

                    <div class="form-group col-12 col-sm-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2">
                      <label for="openinglocation">Location(s)</label>
                      <multiselect v-model="opening.locations" :multiple="true" :close-on-select="false" :clear-on-select="false" placeholder="Locations" :options="cities" class="custom-multi-select">
                        <!-- <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template> -->
                      </multiselect>
                    </div>

                    <div class="form-group col-12 col-sm-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2">
                      <label for="openingNumber">Total Openings</label>
                      <input type="number" class="form-control" id="openingNumber" onkeypress='return event.charCode >= 46 && event.charCode <= 57 && event.charCode !== 47' min="1" placeholder="Enter number of Openings" v-model.number="opening.noOfOpenings">
                    </div>
                    
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

                <div class="row">
                  <div class="col-12 col-lg-10 offset-lg-1 ">

                    <label>
                      Remote Allowed
                    </label>

                    <form>
                      <div class="row">
                        <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                          <div class="custom-checkbox custom-control">
                            <input name="remote" type="radio" class="custom-control-input" id="customCheck1" v-model="opening.isRemoteAllowed" value="true">
                            <label class="custom-control-label" for="customCheck1">Yes</label>
                          </div>
                        </div>
                        <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                          <div class="custom-checkbox custom-control">
                            <input name="remote" type="radio" class="custom-control-input" id="customCheck2" v-model="opening.isRemoteAllowed" value="false">
                            <label class="custom-control-label" for="customCheck2">No</label>
                          </div>
                        </div>
                      </div>  <!--  row  -->
                    </form>

                    <!-- <label for="openingRemote"></label> -->
                    <label>
                      Allow Direct Application
                    </label>
                    <form>
                      <div class="row">
                        <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                          <div class="custom-checkbox custom-control">
                            <input name="directApplication" type="radio" class="custom-control-input" id="customCheck7" v-model="opening.allowDirectApplication" value="true">
                            <label class="custom-control-label" for="customCheck7">Yes</label>
                          </div>
                        </div>
                        <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                          <div class="custom-checkbox custom-control">
                            <input name="directApplication" type="radio" class="custom-control-input" id="customCheck8" v-model="opening.allowDirectApplication" value="false">
                            <label class="custom-control-label" for="customCheck8">No</label>
                          </div>
                        </div>
                      </div>  <!--  row  -->
                    </form>

                    <label>
                      Position Type
                    </label>
                    <form>
                      <div class="row">
                        <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                          <div class="custom-checkbox custom-control">
                            <input name="position-type" type="radio" v-model="opening.positionType" class="custom-control-input" id="customCheck3" value="fulltime">
                            <label class="custom-control-label" for="customCheck3">Full Time</label>
                          </div>
                        </div>
                        <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                          <div class="custom-checkbox custom-control">
                            <input name="position-type" type="radio" v-model="opening.positionType" class="custom-control-input" id="customCheck4" value="contract">
                            <label class="custom-control-label" for="customCheck4">Contract</label>
                          </div>
                        </div>

                        <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                          <div class="custom-checkbox custom-control">
                            <input name="position-type" type="radio" v-model="opening.positionType" class="custom-control-input" id="customCheck5" value="freelance">
                            <label class="custom-control-label" for="customCheck5">Freelance</label>
                          </div>
                        </div>
                        <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                          <div class="custom-checkbox custom-control">
                            <input name="position-type" type="radio" v-model="opening.positionType" class="custom-control-input" id="customCheck6" value="internship">
                            <label class="custom-control-label" for="customCheck6">Internship</label>
                          </div>
                        </div>
                      </div>  <!--  row  -->
                    </form>

                    <label>
                      Required Skills
                    </label>

                    <input-tag v-model="opening.skillsRequired" class="form-control custom-tags" id="openingSkills" placeholder="Press enter to add new" ></input-tag>

                    <label class="mt-3">
                      Tags
                    </label>
                    <input-tag v-model="opening.tags" class="form-control custom-tags" id="openingTags" placeholder="Press enter to add new" ></input-tag>

                    <label class="mt-3">
                      Description
                    </label>
                    <!-- <wysiwyg v-model="opening.description"/> -->

                  <!--  wysiwyg  editor  -->
                    <div id="summernote">
                      <wysiwyg v-model="opening.description"/>
                    </div>
                    <div class="row mt-2">
                      <button type="button" class="btn btn-outline-secondary bottom-btn" @click="openBasics()">Previous</button>
                      <button type="button" class="btn btn-success bottom-btn" @click="openWorkflow()">Next</button>
                    </div>
                  </div>
                </div>  <!--  row  -->

              </div>   <!--  card-body  -->
            </div>
          </div>  <!--  card  -->

          <!--  3rd accordion -->
          <div class="card" v-if="isWorkflow">
            <!-- <div class="card-header collapsed" id="headingThree" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Workflow

              <i class="fa fa-arrow-down rt-accordion-arrow"></i>
            </div> -->
            <div id="collapseThree" class="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
              <div class="card-body">

                <div class="row">
                  <div class="col-12 col-sm-12 col-md-10 offset-md-1">

                    <!-- on clicking the btn, a popup / modal will appear  -->
                    <!-- <button type="button" class="btn btn-outline-success btn-sm mt-2 mb-3 float-right" data-toggle="modal" data-target=".create-stage">
                      <i class="fa fa-plus"></i>&nbsp; Add Stage
                    </button> -->
                    <div class="modal-body"> 
                      <form>
                        <div class="row">
                          <div class="form-group col-10">
                            <label for="newStageName">Add Stage</label>
                            <!-- <input type="email" class="form-control" id="newStageName" placeholder="Enter"> -->
                            <select class="form-control" id="changeStatus" v-model="selectStage">
                              <option value="">Select</option>
                              <option v-for="stage in workflowStages" :key="stage._id" :value="stage._id">{{stage.text}}</option>
                            </select>
                          </div>
                          <div class="form-group col-2" style="margin-top: 26px;">
                            <button type="button" class="btn btn-success" @click="addStage()">Add</button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div class="clearfix"></div>

                    <!--  below are the stages of workflow  -->
                    <ul class="list-group list-group-flush rt-workflow-wrap">
                      <!-- first row / li will be disabled  -->
                      <!-- <li class="list-group-item">
                        Candidate Added									
                      </li> -->
                      <li class="list-group-item" v-for="(stage, count) in opening._workflowStages" :key="stage._id">
                        {{stage.text}}

                        <!-- below are btns (remove btn, move-down btn & move-up btn) -->
                        <span class="workflow-stage-options">
                          <!--  move up btn (currently the btn is invisible, as it is at the top) -->
                          <button type="button" class="btn btn-link move-up-stage" @click="upWorkflow(stage, count)" v-if="count !== 0">
                            <i class="fa fa-arrow-up"></i>
                          </button>
                          <!--  move down btn  -->
                          <button type="button" class="btn btn-link move-down-stage" @click="downWorkflow(stage, count)" v-if="count !== (opening._workflowStages.length - 1)">
                            <i class="fa fa-arrow-down" ></i>
                          </button>
                          <!--  remove btn -->
                          <button type="button" class="btn btn-link remove-stage" @click="removeWorkflow(stage)">
                            <i class="fa fa-times"></i>
                          </button>
                        </span>
                      </li>
                      
                      <!-- <li class="list-group-item">
                        Make Offer                        
                      </li> -->
                    </ul>
                    <div class="row">
                      <button type="button" class="btn btn-outline-secondary bottom-btn" @click="openDetails()">Previous</button>
                      <button type="button" v-if="opening._workflowStages.length !== 0" class="btn btn-success bottom-btn" @click="saveOpening()">Save</button>
                    </div>
                  </div>
                </div>  <!--   row  -->

              </div>  <!--  card-body  -->
            </div>
          </div>  <!--  card  -->

          <!--  4th accordion -->
          <!-- <div class="card">
            <div class="card-header collapsed" id="headingFour" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              Add Candidate(s)

              <i class="fa fa-arrow-down rt-accordion-arrow"></i>
            </div>
            <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
              <div class="card-body"> 

                <form>
                  <div class="row">
                    <div class="col-12 col-sm-6 col-lg-5 offset-lg-1">
                      <label for="candidateName">Name</label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="candidateName-addon">
                            <i class="fa fa-user"></i>
                          </span>
                        </div>
                        <input type="text" class="form-control" id="candidateName" placeholder="Enter"> 
                      </div>
                    </div>
                    <div class="form-group col-12 col-sm-6 col-lg-5">
                      <label for="uploadCV">Upload CV</label>
                      <input type="file" class="form-control-file" id="uploadCV" style="margin-top:2px;">
                    </div>

                    <div class="col-12 col-sm-6 col-lg-5 offset-lg-1">
                      <label for="candidateEmail">Email</label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="candidateEmail-addon">
                            <i class="fa fa-envelope" style="font-size:13px;"></i>
                          </span>
                        </div>
                        <input type="email" class="form-control" id="candidateEmail" placeholder="Enter"> 
                      </div>
                    </div>

                    
                    <div class="w-100"></div>

                    <div class="col-12 col-sm-6 col-lg-5 offset-lg-1">
                      <label for="candidatePhone">Phone</label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="candidatePhone-addon">
                            <i class="fa fa-mobile" style="font-size:18px;"></i>
                          </span>
                        </div>
                        <input type="text" class="form-control" id="candidatePhone" placeholder="Enter"> 
                      </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-5">
                      <label for="candidateAlternatePhone">Alternate Phone</label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="candidatePhone-addon">
                            <i class="fa fa-mobile" style="font-size:18px;"></i>
                          </span>
                        </div>
                        <input type="text" class="form-control" id="candidateAlternatePhone" placeholder="Enter"> 
                      </div>
                    </div>

                    <div class="col-12 col-sm-6 col-lg-5 offset-lg-1">
                      <label for="candidateCurrentSalary">Current Salary</label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="candidatePhone-addon">
                            <i class="fa fa-rupee"></i>
                          </span>
                        </div>
                        <input type="text" class="form-control" id="candidateCurrentSalary" placeholder="Enter"> 
                      </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-5">
                      <label for="candidateExpectedSalary">Expected Salary</label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="candidatePhone-addon">
                            <i class="fa fa-rupee"></i>
                          </span>
                        </div>
                        <input type="text" class="form-control" id="candidateExpectedSalary" placeholder="Enter"> 
                      </div>
                    </div>

                    <div class="form-group col-12 col-sm-6 col-lg-5 offset-lg-1">
                      <label for="candidateSource">Source</label>
                      <input type="text" value="" data-role="tagsinput" placeholder="Enter">
                    </div>
                    
                    <div class="form-group col-12 col-sm-6 col-lg-5">
                      <label for="candidateNoticePeriod">Notice Period</label>
                      <select class="form-control" id="opening-Location">
                        <option value="" selected disabled>Select</option>
                        <option value="">7 Days</option>
                        <option value="">30 Days</option>
                        <option value="">60 Days</option>
                        <option value="">90 Days</option>
                        <option value="">Already on Notice</option>
                      </select>
                    </div>
                    
                    
                    <div class="w-100"></div>
                    
                    
                    <div class="col-sm-6 offset-sm-6 col-lg-5 offset-lg-6 ">
                      <label for="candidateNoticePeriod">Available From</label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="candidatePhone-addon">
                            <i class="fa fa-calendar-plus-o" style="font-size:14px;"></i>
                          </span>
                        </div>
                        <input type='text' class="form-control datetimepicker1" placeholder="Enter Date"/>
                      </div> 
                    </div>
                    
                    
                    <div class="form-group col-sm-12 col-lg-10 offset-lg-1">
                      <label for="candidateSkills">Skills</label>
                      <input type="text" id="candidateSkills" value="" data-role="tagsinput" placeholder="Enter">
                    </div>
                    
                    <div class="form-group col-12 col-sm-12 col-lg-10 offset-lg-1">
                      <label for="candidateExperience">Experience</label>
                      <textarea class="form-control" id="candidateExperiences" rows="4" placeholder="Enter"></textarea> 
                    </div>
                  </div>   
                </form>

              </div>  
            </div>
          </div>   -->
          <!--  card  -->
        </div>  <!--  accordion  -->        
      </div> <!-- col-12 col-md-10 col-xl-8  -->
    </div>  <!--  row  -->
    
    <!-- <div class="modal fade create-stage" id="create-stage" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">
              Add New Stage
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"> 
              <i class="fa fa-times" aria-hidden="true"></i> 
            </button>
          </div>
          <div class="modal-body"> 
            
            <form>
              <div class="form-group col-12">
                <label for="newStageName">Name</label>
                <select class="form-control" id="changeStatus" v-model="selectStage">
                  <option value="">Select</option>
                  <option v-for="stage in workflowStages" :key="stage._id" :value="stage._id">{{stage.text}}-{{stage.type}}</option>
                </select>
              </div>
            </form>
          
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success w-50" @click="addStage()">Add</button>
            <button type="button" class="btn btn-warning w-50" data-dismiss="modal">Cancel</button>
          </div>
        </div>   
      </div>
    </div> -->
  </div>
  <!--  content   -->
</template>
<script>
  import sweetalert from "sweetalert"
  import navbar from '@/views/navbar.vue'
  import Multiselect from 'vue-multiselect'
  import InputTag from 'vue-input-tag'
  import cities from "../cities"
  import Loading from 'vue-loading-overlay'
  import 'vue-loading-overlay/dist/vue-loading.css'
  Vue.component('multiselect', Multiselect)
  import Vue from "vue";
  export default {
    name: 'CreateOpening',
    components: {
      Multiselect,
      InputTag,
      navbar,
      Loading
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
          skillsRequired: [],
          isRemoteAllowed: true,
          allowDirectApplication: true,
          description: "",
          positionType: "fulltime",
          _workflowStages: [],
          noOfOpenings: null
        },
        cities: cities.name,
        currentStage: "basics",
        isBasics: true,
        isDetails: false,
        isWorkflow: false,
        selectStage: ""

      }
    },
    created () {
			this.axios.get("/workflowStages")
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
        this.isWorkflow = false
        this.currentStage = "basics"
      },
      openDetails() {
        if (this.opening.title === "") {
          sweetalert('Error!', "Opening title required", 'error');
          return false
        }
        this.isBasics = false
        this.isWorkflow = false
        this.isDetails = true
        this.currentStage = "details"
      },
      openWorkflow() {
        if (this.opening.title === "") {
          sweetalert('Error!', "Opening title required", 'error');
          return false
        }
        this.isBasics = false
        this.isDetails = false
        this.isWorkflow = true
        this.currentStage = "workflow"
      },
      addStage() {
        if (this.selectStage !== "") {
          const updatedStage = this.workflowStages.find(b => String(b._id) === String(this.selectStage))
          this.opening._workflowStages.push(updatedStage)
          this.workflowStages.splice(this.workflowStages.indexOf(updatedStage), 1)
          this.selectStage = ""
        }
      },
      saveOpening() {
        if (this.opening._workflowStages.length === 0) {
          sweetalert('Error!', "Please add at least one stage", 'error');
          return false
        }
        this.isLoading = true
        this.opening.workflowStages = this.opening._workflowStages.map(w => w._id)
        this.axios.post(`/opening`, this.opening)
        .then(resp => {
          this.isLoading = false
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error');
          } else {
            this.$router.push(`/`)
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error');
          console.log(err);
        })

      },
      removeWorkflow(stage) {
        this.opening._workflowStages.splice(this.opening._workflowStages.indexOf(stage), 1)
        this.workflowStages.push(stage)
      },
      downWorkflow(stage, indx) {
        const upWorkflow = this.opening._workflowStages[indx + 1]
        this.opening._workflowStages[indx + 1] = stage
        this.opening._workflowStages[indx] = upWorkflow
        this.$forceUpdate()
      },
      upWorkflow(stage, indx) {
        const upWorkflow = this.opening._workflowStages[indx - 1]
        this.opening._workflowStages[indx - 1] = stage
        this.opening._workflowStages[indx] = upWorkflow
        this.$forceUpdate()
      }
    }
  };
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
