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
        Openings
        
        <!--  add btn  -->
        <a href="#/createopening" role="button" class="btn btn-secondary btn-sm add-btn" style="margin-right: 200px;">
          <i class="fa fa-plus "></i>
          Create
        </a>
        <a href="" role="button" class="btn btn-outline-secondary btn-sm add-btn" @click.prevent="openModal()" style="margin-right: 100px;">
          <i class="fa fa-upload"></i>
          Import 
        </a>
        <a :href="`${baseUrl}/export/openings/${$store.state.token}`" role="button" class="btn btn-outline-secondary btn-sm add-btn">
          <i class="fa fa-download"></i>
          Export 
        </a>
      </h3>
      
      <!--  filter section (start) -->
      <div class="row mx-0">
        <div class="rt-filter-wrapper">
        
          <!--  filter icon  -->
          <i class="fa fa-filter filter-icon"></i>

          <div class="col-12">
            <div class="row">
              <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <div class="form-group ">
                  <multiselect v-model="selectPositions" :multiple="true" :close-on-select="false" :clear-on-select="false" placeholder="Positions Type" label="name" track-by="name" :options="positions" @input="filter" class="custom-multi-select">
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                  </multiselect>
                </div>
              </div>

              <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <div class="form-group ">
                  <multiselect v-model="selectSkills" :multiple="true" :close-on-select="false" :clear-on-select="false" placeholder="Required Skills" label="name" track-by="name" :options="skills" @input="filter" class="custom-multi-select">
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                  </multiselect>
                </div>
              </div>

              <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <div class="form-group ">
                  <multiselect v-model="selectLocations" :multiple="true" :close-on-select="false" :clear-on-select="false" placeholder="Locations" :options="locations" @input="filter" class="custom-multi-select">
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                  </multiselect>
                </div>
              </div>

              <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <div class="form-group ">
                  <multiselect v-model="selectStatus" select-label="" placeholder="Status" :options="status" @input="filter" class="custom-multi-select"></multiselect>
                </div>
              </div>
            </div>
          </div>

          <!-- clear btn  -->
          <button class="btn btn-warning btn-sm clear-btn" data-toggle="tooltip" data-placement="bottom" title="Clear" @click="clearFilter()">
            <i class="fa fa-eraser"></i>
          </button>
        </div> 
      </div>    <!--  row   -->
      <!--  filter section (end) -->
      
      <!--  table (start)  -->
      <vue-good-table
        title=""
        :columns="columns"
        :rows="filterOpenings"
        :paginate="true"
        :globalSearch="true"
        globalSearchPlaceholder=Search
        :lineNumbers="false" class="custom-table">
        <template slot="table-row" slot-scope="props">
          <td style="width: 30%">
            <span>{{props.row.title}}</span>
            <div>
              <span class="badge badge-secondary" v-for="tag in props.row._tags" :key="tag._id">
                {{tag.text}}
              </span>
            </div>
          </td>
          <td style="width: 30%">
            <span>{{props.row.positionType}}</span>
            <div>
              <span class="badge badge-secondary" v-for="skill in props.row._skillsRequired" :key="skill._id">
                {{skill.text}}
              </span>
            </div>
          </td>
          <td>
            <span>{{props.row.locations.join(", ")}}</span>
          </td>
          <td>
            <span>{{props.row.noOfOpenings}}</span>
          </td>
          <td>
            <p v-if="props.row._candidates === null || props.row._candidates === undefined">
              0
            </p>
            <a v-else href="" @click.prevent="showDetails(props.row)">
              <span class="badge badge-info mr-2 mb-2">{{props.row._candidates.length}}</span>
            </a>
            <a :href="`${baseUrl}/export/candiates/${props.row._id}/${$store.state.token}`" role="button" class="btn btn-outline-secondary btn-sm" download>
                <i class="fa fa-download"></i>&nbsp;
                Export 
              </a>
          </td>
          <td>
            <span class="badge">
              <button v-if="props.row.isActive" class="btn btn-outline-success btn-sm mr-2" @click="changeStatus(props.row._id, false)">Active</button>
              <button v-else class="btn btn-outline-danger btn-sm mr-2" @click="changeStatus(props.row._id, true)">Inactive</button>
              <button class="btn btn-outline-info btn-sm mr-2" @click="viewOpening(props.row._id)">View</button>
              <button class="btn btn-outline-primary btn-sm" @click="openShareModal(props.row)" :disabled="!props.row.allowDirectApplication || !props.row.isActive">Share</button>
            </span>
          </td>
        </template>
      </vue-good-table>
      <!--  table (end)  -->

      <!--  reply to email modal  -->
      <div class="modal fade view-details" id="view-details" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content msg-div">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle1">
                {{selectOpening.title}}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"> 
                <i class="fa fa-times" aria-hidden="true"></i> 
              </button>
            </div>
            <div class="modal-body"> 
              <ul class='list-group list-group-flush mb-3 view-candidates-status-wrap'>
                <li class='list-group-item' v-for="workflow in selectOpening._workflowStages" :key="workflow._id">
                  <span>{{selectOpening._candidates.filter(c => c._currentWorkflowStage === workflow._id).length}}</span> {{workflow.text}}
                  <a href='all_Candidates.html' role='button' class='btn btn-outline-info btn-sm' @click.prevent="showCandidate(selectOpening._id, workflow._id)">See Details</a>
                </li>
              </ul>
            </div> <!--  modal-body  -->
          </div>  <!-- modal-content  -->
        </div>
      </div>  
      <!--  modal  -->
      <!-- Modal -->
      <div id="import-residents-modal" class="modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Import Openings from CSV File</h4>
              <button type="button" data-dismiss="modal" aria-label="Close" class="close">
                <i aria-hidden="true" class="fa fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <label class="font-weight-normal">Choose CSV file to Import</label>	
                <div class="custom-file">
                  <input type="file" ref="csvFile" name="csv-file" accept=".csv" id="csv-file" class="custom-file-input" >
                  <label class="custom-file-label font-weight-normal" for="csv-file">Choose file</label>
                </div>
                
                <input type="submit" class="btn btn-success d-block mx-auto mt-4 mb-1" value="Upload" @click.prevent="uploadCsv()" style="margin-top: 30px;">
              </form>
            </div>
          </div>

        </div>
      </div>
      <!-- /Import Residents modal -->
      <!-- Modal -->
      <div id="share-modal" class="modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Share Opening</h4>
              <button type="button" data-dismiss="modal" aria-label="Close" class="close">
                <i aria-hidden="true" class="fa fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <social-sharing :url="shareUrl" :title="shareTitle" :description="shareDesc"  inline-template>
                <div>
                  <div class="row text-center mt-2">
                    <div class="col-3">
                      <network network="facebook">
                        <i class="pointer fa fa-3x fa-facebook-square"></i>
                      </network>
                    </div>
                    <!-- <div class="col-4">
                      <network network="googleplus">
                        <i class="pointer fa fa-3x fa-fw fa-google-plus-square"></i>
                      </network>
                    </div> -->
                    <div class="col-3">
                      <network network="linkedin">
                        <i class="pointer fa fa-3x fa-fw fa-linkedin-square"></i>
                      </network>
                    </div>
                    <!-- <div class="col-3">
                      <network network="pinterest">
                        <i class="pointer fa fa-3x fa-fw fa-pinterest-square"></i>
                      </network>
                    </div> -->
                    <div class="col-3">
                      <network network="twitter">
                        <i class="pointer fa fa-3x fa-fw fa-twitter-square"></i>
                      </network>
                    </div>
                    <div class="col-3">
                      <network network="skype">
                        <i class="pointer fa fa-3x fa-fw fa-skype"></i>
                      </network>
                    </div>
                  </div> <!-- row -->

                  <div class="row text-center mt-4">
                    <div class="col-3">
                      <network network="email">
                        <i class="pointer fa fa-3x fa-envelope-o"></i>
                      </network>
                      </div>
                    <div class="col-3">
                      <network network="reddit">
                        <i class="pointer fa fa-3x fa-fw fa-reddit-square"></i>
                      </network>
                    </div>
                    <div class="col-3">
                      <network network="whatsapp">
                        <i class="pointer fa fa-3x fa-fw fa-whatsapp"></i>
                      </network>
                    </div>
                    <div class="col-3">
                      <network network="telegram">
                        <i class="pointer fa fa-3x fa-fw fa-telegram"></i>
                      </network>
                    </div>
                  </div>
                </div>
              </social-sharing>

              <div class="text-center mt-5">
                <h6 class="font-italic mb-4">--------- OR ---------</h6>
                <a href="#" class="btn btn-outline-info mb-2" v-clipboard="shareText" @success="copyClipboard">Copy Share Text</a>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!-- /Import Residents modal -->
    </div>  <!--  content  -->
</template>
<script>
  import sweetalert from "sweetalert"
  import navbar from '@/views/navbar.vue'
  import Multiselect from 'vue-multiselect'
  import VueGoodTable from "vue-good-table"
  import VueClipboards from 'vue-clipboards'
  var SocialSharing = require('vue-social-sharing');
  import cities from "../cities"
  import config from "../config"
  import Loading from 'vue-loading-overlay'
  import 'vue-loading-overlay/dist/vue-loading.css'
  Vue.component('multiselect', Multiselect)
  Vue.use(VueGoodTable);
  Vue.use(SocialSharing);
  Vue.use(VueClipboards)
  import Vue from "vue";
  export default {
    name: 'Opening',
    components: {
      Multiselect,
      navbar,
      Loading,
      SocialSharing
    },
    data() {
      return {
        isLoading: true,
        color: '#1b7aa2',
        bgColor: '#ffffff',
        height: 128,
        width: 128,
        fullPage: true,
        baseUrl: config.apiRoot,
        shareUrl: "",
        shareTitle: "",
        shareDesc: "",
        shareText: "",
        selectStatus: null,
        status: ["Active", "Inactive"],
        selectPositions: [],
        positions: [
          { name: 'Full Time', id: 'fulltime' },
          { name: 'Contract', id: 'contract' },
          { name: 'Freelance', id: 'freelance' },
          { name: 'Internship', id: 'internship' }
        ],
        selectSkills: [],
        skills: [],
        selectLocations: [],
        locations: cities.name,
        openings: [],
        filterOpenings: [],
        selectOpening: {
          title: ""
        },
        columns: [
          {
            label: "Title",
            field: "title"
          },
          {
            label: "Position Type & Req Skills",
            field: "positionType"
          },
          {
            label: "Location",
            field: "locations"
          },
          {
            label: 'Openings',
            field: 'noOfOpenings'
          },
          {
            label: "Candidates",
            field: "_candidates"
          },
          {
            label: "Action",
            field: "isActive",
            sortable: false
          }
        ]
      }
    },
    created () {
			this.axios.get("/openings")
			.then(resp => {
        this.openings = resp.data.openings
        this.filterOpenings = resp.data.openings
        return this.axios.get("/tags/skill")
			})
      .then(resps => {
        this.isLoading = false
        this.skills = resps.data.tags.map(o => { return { name: o.text, id: o._id }} )
      })
			.catch(err => {
        this.isLoading = false
				console.log(err);
			})
		},

    methods: {
      showDetails(details) {
        this.selectOpening = details
        $("#view-details").modal("show")
      },
      showCandidate(openingId, currentWorkflowId) {
        $("#view-details").modal("hide")
        this.$router.push(`/candidates/${openingId}/${currentWorkflowId}`)
      },
      filter() {
        if (this.selectPositions.length === 0) {
          this.filterOpenings = this.openings
        } else {
          const positionIds = this.selectPositions.map(p => p.id)
          this.filterOpenings = this.openings.filter(c => positionIds.indexOf(c.positionType) >= 0)
        }

        if (this.selectSkills.length !== 0) {
          const skillIds = this.selectSkills.map(p => p.id)
          this.filterOpenings = this.filterOpenings.filter(c => {
            let flag = false
            c._skillsRequired.forEach(skill => {
              if (skillIds.indexOf(skill._id) >= 0) {
                flag = true 
              }
            })
            if (flag === true) {
              return true
            }
          })
        }
        
        if (this.selectLocations.length !== 0) {
          // const tagIds = this.selectSkills.map(p => p.id)
          this.filterOpenings = this.filterOpenings.filter(c => {
            let flag = false
            c.locations.forEach(loc => {
              if (this.selectLocations.indexOf(loc) >= 0) {
                flag = true 
              }
            })
            if (flag === true) {
              return true
            }
          })
        }
        if (this.selectStatus === "Active") {
          this.filterOpenings = this.filterOpenings.filter(o => o.isActive === true)
        }
        if (this.selectStatus === "Inactive") {
          this.filterOpenings = this.filterOpenings.filter(o => o.isActive === false)
        }
        
      },
      clearFilter() {
        this.selectPositions = []
        this.selectSkills = []
        this.selectLocations = []
        this.selectStatus = null
        this.filterOpenings = this.openings
      },
      changeStatus(id, status) {
        this.isLoading = true
        this.axios.put(`/opening/${id}`, { isActive: status })
        .then(resp => {
          this.isLoading = false
          
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error');
          } else {
            this.$toasted.success("Status successfully changed", { 
              theme: "bubble", 
              position: "top-right",
              duration : 2500
            });
            this.openings.find(o => o._id === id).isActive = status
            this.filterOpenings.find(o => o._id === id).isActive = status
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error');
          console.log(err);
        })
      },
      viewOpening(id) {
        this.$router.push(`/opening/${id}`)
      },
      openModal() {
        $("#import-residents-modal").modal("show")
      },
      uploadCsv() {
        if (this.$refs.csvFile.files[0] === undefined) {
          sweetalert('Error!', "Please select openings csv file", 'error')
          return false
        }
        $("#import-residents-modal").modal("hide")
        const formData = new FormData()
        formData.append('csv-file', this.$refs.csvFile.files[0]);
        this.isLoading = true
        this.axios.post(`/import/openings`, formData)
        .then(resp => {
          this.isLoading = false
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error')
          } else {
            window.location.reload()
            // this.candidates = this.candidates.concat(resp.data.candidates)
            // this.filterCandidates = this.filterCandidates.concat(resp.data.candidates)
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error')
          console.log(err);
        })
      },
      openShareModal(shareOpening) {
        this.shareTitle = shareOpening.title
        this.shareDesc = `Opening for ${shareOpening.title} at ${this.$store.state.user._organization.title}`
        this.shareUrl = shareOpening.shareableUrl
        this.shareText = shareOpening.shareableText
        $("#share-modal").modal("show")
      },
      copyClipboard() {
        $("#share-modal").modal("hide")
        this.shareUrl = ""
        this.shareText = ""
        this.shareTitle = ""
        this.shareDesc = ""
        let toast = this.$toasted.success("Copied to clipboard!", { 
          theme: "bubble", 
          position: "top-right",
          duration : 2500
        });
      },
    }
  };
</script>
<style>
.pointer {
  cursor: pointer;
}
.fa-facebook-square {
  color: #3b5998;
}
.fa-google-plus-square {
  color: #dc4e41;
}
.fa-linkedin-square {
  color: #0077b5;
}
.fa-pinterest-square {
  color: #bd081c;
}
.fa-envelope-o {
  color: #ea4335;
}
.fa-reddit-square {
  color: #ff4500;
}
.fa-twitter-square {
  color: #55acee;
}
.fa-whatsapp {
  color: #43d854;
}
.fa-skype {
  color: #00aff0;
}
.fa-telegram {
  color: #00405d;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>