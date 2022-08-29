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
    
    <!--  breadcrumb  -->
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#/">All Opening</a></li>
            <li class="breadcrumb-item active" aria-current="page" :title="opening.title">{{opening.title | truncate}}</li>
        </ol>
    </nav>
    
    <div class="row mt-3 mb-5">
      <div class="col-12 col-lg-7 order-12 order-lg-1">
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
                    <button type="button" @click="updateOpening()" class="btn btn-success btn-sm mb-2 float-right">
                      Save
                    </button>
                  </div>
                </div>  <!--  col-12 col-sm-12 col-md-10 offset-md-1  -->

                <div class="clearfix"></div>

                <!-- All the fields below are in "read-only" mode. When the user clicks the edit btn, "read-only" will not be there  -->
                <form>
                  <div class="row">
                    <div class="form-group col-12 col-sm-6">
                      <label for="title">Title</label>
                      <input type="text" :disabled="!isEdit" class="form-control" id="title" placeholder="Enter" v-model="opening.title"> 
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="openingNumber">Total Openings</label>
                      <input type="number" :disabled="!isEdit" class="form-control" id="openingNumber" onkeypress='return event.charCode >= 46 && event.charCode <= 57 && event.charCode !== 47' min="1" placeholder="Enter number of Openings" v-model.number="opening.noOfOpenings">
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="openingRemote">
                        Remote Allowed
                      </label>
                      <form>
                        <div class="row">
                          <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                            <div class="custom-checkbox custom-control">
                              <input name="remote" :disabled="!isEdit" type="radio" class="custom-control-input" id="customCheck1" v-model="opening.isRemoteAllowed" value="true">
                              <label class="custom-control-label" for="customCheck1">Yes</label>
                            </div>
                          </div>
                          <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                            <div class="custom-checkbox custom-control">
                              <input name="remote" :disabled="!isEdit" type="radio" class="custom-control-input" id="customCheck2" v-model="opening.isRemoteAllowed" value="false">
                              <label class="custom-control-label" for="customCheck2">No</label>
                            </div>
                          </div>
                        </div>  <!--  row  -->
                      </form>
                    </div>

                    <div class="form-group col-12 col-sm-6" v-if="isEdit">
                      <label for="openinglocation">Location(s)</label>
                      <multiselect v-model="opening.locations" :multiple="true" :close-on-select="false" :clear-on-select="false" placeholder="Locations" :options="cities" class="custom-multi-select">
                        <!-- <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template> -->
                      </multiselect>
                    </div>
                    <div class="form-group col-12 col-sm-6" v-if="!isEdit">
                      <label for="openingLocations">Location(s)</label>
                      <p class="text-truncate fs-14 mb-0">{{opening.locations.join(", ")}}</p>
                    </div>
                    
                    <div class="form-group col-12 col-sm-6">
                      <label for="openingRemote">
                        Allow Direct Application
                      </label>
                      <form>
                        <div class="row">
                          <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                            <div class="custom-checkbox custom-control">
                              <input name="directApplication" :disabled="!isEdit" type="radio" class="custom-control-input" id="customCheck7" v-model="opening.allowDirectApplication" value="true">
                              <label class="custom-control-label" for="customCheck7">Yes</label>
                            </div>
                          </div>
                          <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                            <div class="custom-checkbox custom-control">
                              <input name="directApplication" :disabled="!isEdit" type="radio" class="custom-control-input" id="customCheck8" v-model="opening.allowDirectApplication" value="false">
                              <label class="custom-control-label" for="customCheck8">No</label>
                            </div>
                          </div>
                        </div>  <!--  row  -->
                      </form>
                    </div>

                    <div class="form-group col-12 col-sm-12">
                      <label>
                        Position Type
                      </label>

                      <form>
                        <div class="row">
                          <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                            <div class="custom-checkbox custom-control">
                              <input name="position-type" :disabled="!isEdit" type="radio" v-model="opening.positionType" class="custom-control-input" id="customCheck3" value="fulltime">
                              <label class="custom-control-label" for="customCheck3">Full Time</label>
                            </div>
                          </div>
                          <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                            <div class="custom-checkbox custom-control">
                              <input name="position-type" :disabled="!isEdit" type="radio" v-model="opening.positionType" class="custom-control-input" id="customCheck4" value="contract">
                              <label class="custom-control-label" for="customCheck4">Contract</label>
                            </div>
                          </div>
                          <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                            <div class="custom-checkbox custom-control">
                              <input name="position-type" :disabled="!isEdit" type="radio" v-model="opening.positionType" class="custom-control-input" id="customCheck5" value="freelance">
                              <label class="custom-control-label" for="customCheck5">Freelance</label>
                            </div>
                          </div>
                          <div class="col-6 col-sm-3 col-md-3 col-xl-3">
                            <div class="custom-checkbox custom-control">
                              <input name="position-type" :disabled="!isEdit" type="radio" v-model="opening.positionType" class="custom-control-input" id="customCheck6" value="internship">
                              <label class="custom-control-label" for="customCheck6">Internship</label>
                            </div>
                          </div>
                        </div>  <!--  row  -->
                      </form>
                    </div>

                    <div class="form-group col-12 col-sm-6" v-if="!isEdit">
                      <label for="openingSkills">Required Skills</label>
                      <p class="text-truncate fs-14 mb-0" v-if="opening.skillsRequired.length !== 0">{{opening.skillsRequired.join(", ")}}</p>
                      <p class="text-truncate fs-14 mb-0" v-else>Skill Not Added</p>
                    </div>
                    <div class="form-group col-12 col-sm-12" v-else>
                      <label for="openingSkills">Required Skills</label>
                      <input-tag v-model="opening.skillsRequired" class="form-control custom-tags" id="openingSkills" placeholder="Press enter to add new" ></input-tag>
                    </div>

                    <div class="form-group col-12 col-sm-6" v-if="!isEdit">
                      <label for="openingTags">Tags</label>
                      <p class="text-truncate fs-14 mb-0" v-if="opening.tags.length !== 0">{{opening.tags.join(", ")}}</p>
                      <p class="text-truncate fs-14 mb-0" v-else>Tag Not Added</p>
                    </div>
                    <div class="form-group col-12 col-sm-12" v-else>
                      <label for="openingTags">Tags</label>
                      <input-tag v-model="opening.tags" class="form-control custom-tags" id="openingTags" placeholder="Press enter to add new" ></input-tag>
                    </div>

                    <div class="form-group col-12 col-sm-12">
                      <label>
                        Description
                      </label>
                      <div id="summernote" v-if="isEdit">
                        <wysiwyg v-model="opening.description"/>
                      </div>
                      <div id="summernote" v-else v-html="opening.description">
                      </div>
                      <div id="summernote" v-if="(opening.description === '' || opening.description === undefined) && !isEdit">
                        <p class="fs-14 mb-0">No Description</p>
                      </div>
                    </div>
                  </div>
                  <label v-if="!isEdit">
                    Workflow Stages
                  </label>
                </form>
                <div class=" align-items-center mb-3" v-if="!isEdit">
                  <span class="badge badge-secondary mr-2 mb-2">Candidate Added</span> <i class="fa fa-arrow-right mr-1"></i>
                  <span v-for="stage in opening._workflowStages" :key="stage._id"><span class="badge badge-secondary mr-2 mb-2">{{stage.text}}-{{stage.type}} </span> <i class="fa fa-arrow-right mr-1"></i></span> 
                  <span class="badge badge-secondary">Make Offer</span>
                </div>
              </div>   <!--  col  -->
            </div>  <!--  row   -->
          </div>   
          <!--  tab-pane  -->
        </div>   <!--  tab-content  -->
      </div>  <!--  col-12 col-lg-7  -->
      
      <!--  timeline (start)  -->
      <div class="col-12 col-lg-5 order-1 order-lg-2">
        <!-- <div class="d-flex justify-content-between"> -->
          <div class="row">
            <div class="col-12">
              <h3 data-toggle="collapse" class="mb-3">Candidates
              </h3>
            </div>
            <!-- Processing Candidates -->
            <table class="table table_candidates-list">
              <thead>
                <tr>
                  <th colspan="3" class="">Processing Candidates:</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="candidate in processingCandidates" :key="candidate._id">
                  <td>
                    <span>{{candidate.name.full}}</span>
                  </td>
                  <td><span>{{candidate.email}}</span></td>
                  <td>
                    <button type="button" class="btn btn-outline-info btn-sm" @click="viewCandidate(candidate._id)">
                    View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- end Processing Candidates -->

            <!-- Selected Candidates -->
            <table class="table table_candidates-list">
              <thead>
                <tr>
                  <th colspan="3">Selected Candidates:</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="candidate in selectedCandidates" :key="candidate._id">
                  <td>
                    <span>{{candidate.name.full}}</span>
                  </td>
                  <td>
                    <span>{{candidate.email}}</span>
                  </td>
                  <td>
                    <button type="button" class="btn btn-info btn-sm mb-2 float-right" @click="viewCandidate(candidate._id)">
                      View
                    </button>
                  </td>
                </tr>
                <!-- Show this when there is no data -->
                <tr v-if="selectedCandidates.length === 0">
                  <td colspan="3" class="text-center">
                    0 candidate Selected
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- end Selected Candidates -->

            <!-- Rejected Candidates -->
            <table class="table table_candidates-list">
              <thead>
                <tr>
                  <th colspan="3">Rejected Candidates:</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="candidate in rejectedCandidates" :key="candidate._id">
                  <td>
                    <span>{{candidate.name.full}}</span>
                  </td>
                  <td>
                    <span>{{candidate.email}}</span>
                  </td>
                  <td>
                    <button type="button" class="btn btn-info btn-sm mb-2 float-right" @click="viewCandidate(candidate._id)">
                      View
                    </button>
                  </td>
                </tr>
                <!-- Show this when there is no data -->
                <tr v-if="rejectedCandidates.length === 0">
                  <td colspan="3" class="text-center">
                    0 Candidate Rejected
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- end Rejected Candidates -->
          </div>
        </div>
      <!-- </div>   -->
    
    </div>  

  </div> 
  <!--  content   -->
</template>
<script>
  import navbar from '@/views/navbar.vue'
  import InputTag from 'vue-input-tag'
  import Loading from 'vue-loading-overlay'
  import moment from "moment"
  import sweetalert from "sweetalert"
  import Multiselect from 'vue-multiselect'
  Vue.component('multiselect', Multiselect)
  import cities from "../cities"
  import 'vue-loading-overlay/dist/vue-loading.css'
  import Vue from "vue"
  export default {
    name: 'OpeningDetails',
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
        isEdit: false,
        processingCandidates: [],
        selectedCandidates: [],
        rejectedCandidates: []
      }
    },

    created () {
      this.axios.get(`/opening/${this.$route.params.id}`)
      .then(response => {
        this.isLoading = false
        this.opening = response.data.opening
        this.processingCandidates = response.data.opening._candidates.filter((c) => c.decisionStatus === "pending" || c.decisionStatus === "on-hold")
        this.selectedCandidates = response.data.opening._candidates.filter((c) => c.decisionStatus === "accepted")
        this.rejectedCandidates = response.data.opening._candidates.filter((c) => c.decisionStatus === "rejected")
        this.opening.skillsRequired = response.data.opening._skillsRequired.map(m => m.text)
        this.opening.tags = response.data.opening._tags.map(m => m.text)
      })
			.catch(err => {
        this.isLoading = false
				console.log(err);
			})
		},

    filters: {
      truncate(val) {
        if ( val.length > 15 ) {
          return val.substring(0, 15) + '...'
        } else {
          return val
        }
      }
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
      updateOpening() {
        this.isLoading = true
        if (this.opening.allowDirectApplication === "true") {
          this.opening.allowDirectApplication = true
        } else {
          this.opening.allowDirectApplication = false
        }
        if (this.opening.isRemoteAllowed === "true") {
          this.opening.isRemoteAllowed = true
        } else {
          this.opening.isRemoteAllowed = false
        }
        this.axios.put(`/opening/${this.$route.params.id}`, this.opening)
        .then(resp => {
          this.isLoading = false
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error')
          } else {
            this.$toasted.success("User successfully Updated", { 
              theme: "bubble", 
              position: "top-right",
              duration : 2500
            });
            this.isEdit = false
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error')
          console.log(err);
        })
      },
      viewCandidate(id) {
        this.$router.push(`/candidate/basic/${id}`)
      }
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
  
  .table_candidates-list tbody tr td{
    font-size: 14px;
  }

  .table_candidates-list thead th {
    background: transparent !important; 
    color: #212529 !important; 
    border-color: #dee2e6 !important; 
    border-bottom-width: 1px;
    border-top: 0 !important;
    padding: 0.5rem 0.75rem;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
