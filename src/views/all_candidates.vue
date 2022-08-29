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
      All Candidates
      
      <!--  on clicking the btn, a modal / popup ill appear  -->
      <a href="#/createcandidate" role="button" class="btn btn-outline-secondary btn-sm add-btn" style="margin-right: 170px;">
        <i class="fa fa-plus"></i>
        New 
      </a>
      <a href="" role="button" class="btn btn-outline-secondary btn-sm add-btn" @click.prevent="openModal()">
        <i class="fa fa-upload"></i>
        Import Candidates 
      </a>
      <!-- <a href="javascript:" role="button" class="btn btn-outline-secondary btn-sm add-btn" data-toggle="modal" data-target=".add-new-candidate">
        <i class="fa fa-plus"></i>
        New 
      </a> -->
    </h3>
    
    <!--  filter section (start) -->
    <div class="row mx-0">
      <div class="rt-filter-wrapper">
        <!--  filter icon  -->
        <i class="fa fa-filter filter-icon"></i>

        <div class="col-12 col-sm-4 col-md-4">
          <div class="form-group">
            <multiselect v-model="selectTags" :multiple="true" :close-on-select="false" :clear-on-select="false" placeholder="Select Tags" :options="tags" label="name" track-by="name" @input="filter" class="custom-multi-select">
              <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
            </multiselect>
          </div>
        </div>

        <div class="col-12 col-sm-4 col-md-4">
          <div class="form-group">
            <multiselect v-model="selectPositions" :multiple="true" :close-on-select="false" :clear-on-select="false" placeholder="Select Positions" label="name" track-by="name" :options="positions" @input="filter" class="custom-multi-select">
              <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
            </multiselect>
          </div>
        </div>

        <div class="col-12 col-sm-4 col-md-4">
          <div class="form-group">
            <multiselect v-model="selectStatus" :multiple="true" :close-on-select="false" :clear-on-select="false" placeholder="Select Status" label="name" track-by="name" :options="status" @input="filter" class="custom-multi-select">
              <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
            </multiselect>
          </div>
        </div>

        <!-- clear btn  -->
        <button class="btn btn-warning btn-sm clear-btn" data-toggle="tooltip" data-placement="bottom" title="Clear" @click="clearFilter()">
          <i class="fa fa-eraser"></i>
        </button>
      </div>  <!--  rt-filter-wrapper  -->
    </div>   <!-- row  -->
    <!--  filter section (end) -->
    <vue-good-table
      title=""
      :columns="columns"
      :rows="filterCandidates"
      :paginate="true"
      :globalSearch="true"
      globalSearchPlaceholder=Search
      :lineNumbers="false" class="custom-table">
      <template slot="table-row" slot-scope="props">
        <td>
          <span><a @click.prevent="openCandidateDetails(props.row._id, 'basic')" href="" class="text-info">{{props.row.name.full}}</a></span>
          <div>
            <span class="badge badge-secondary" v-for="tag in props.row._tags" :key="tag._id">
              {{tag.text}}
            </span>
          </div>
        </td>
        <td>
          <span><a @click.prevent="openOpening(props.row._opening._id)" href="" class="text-info">{{props.row._opening.title}}</a></span>
          <!-- <span>{{props.row._opening.title}}</span> -->
          <!-- <div>
            <span class="badge badge-secondary" v-for="oTag in props._opening._tags" :key="oTag._id">
              {{oTag.text}}
            </span>
          </div> -->
        </td>
        <td>
          <span v-if="props.row._currentWorkflowStage === undefined">Candidate Added</span>
          <span v-else>{{props.row._currentWorkflowStage.text}}</span>
        </td>
        <td>
          <a @click.prevent="openCandidateDetails(props.row._id, 'messages')" href="" class="text-info">{{props.row.messageCount}}</a>
        </td>
        <td>
          <a :href="`${baseUrl}/downloadcv/${props.row._id}/${$store.state.token}`" download class="text-info">
            <i class="fa fa-paperclip"></i> Download
          </a>
        </td>
        <td>
          <span>{{changeDate(props.row.lastModifiedAt)}}</span>
        </td>
        <td>
          <a @click.prevent="openCandidateDetails(props.row._id, 'notes')" href="" class="text-info">{{props.row.noteCount}}</a>
        </td>  
      </template>
    </vue-good-table>
    <!--  table (end)  -->

    <!-- Modal -->
    <div id="import-residents-modal" class="modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Import Candidates from CSV File</h4>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <i aria-hidden="true" class="fa fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <label class="font-weight-normal">Choose CSV file to Import</label>	
              <div class="custom-file mb-3">
                <input type="file" ref="csvFile" name="csv-file" accept=".csv" id="csv-file" class="custom-file-input" >
                <label class="custom-file-label font-weight-normal" for="csv-file">Choose file</label>
              </div>
              
              <label for="filterTopic" class="font-weight-normal">Opening</label>
              <select class="form-control" id="filterTopic" v-model="openingId">
                <option value="" disabled>Select</option>
                <option v-for="opening in positions" :key="opening.id" :value="opening.id">{{opening.name}}</option>
              </select>

              <input type="submit" class="btn btn-success d-block mx-auto mt-4 mb-1" value="Upload" @click.prevent="uploadCsv()" style="margin-top: 30px;">
            </form>
          </div>
        </div>

      </div>
    </div>
    <!-- /Import Residents modal -->
  </div>  <!--  content  -->
</template>
<script>
  import navbar from '@/views/navbar.vue'
  import VueGoodTable from "vue-good-table"
  import Multiselect from 'vue-multiselect'
  import InputTag from 'vue-input-tag'
  import Loading from 'vue-loading-overlay'
  import moment from "moment"
  import sweetalert from "sweetalert"
  import config from "../config"
  import 'vue-loading-overlay/dist/vue-loading.css'
  Vue.use(VueGoodTable)
  Vue.component('multiselect', Multiselect)
  import Vue from "vue"
  export default {
    name: 'Candidates',
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
        baseUrl: config.apiRoot,
        selectTags: [],
        tags: [],
        selectPositions: [],
        positions: [],
        selectStatus: [],
        status: [],
        openingId: "",
        candidates: [],
        filterCandidates: [],
        allTags: [],
        columns: [
          {
            label: "Name",
            field: "name.full"
          },
          {
            label: "Opening",
            field: "_opening.title"
          },
          {
            label: 'Status',
            field: '_currentWorkflowStage.text'
          },
          {
            label: "Messages",
            field: ""
          },
          {
            label: "CV",
            field: "cvLink"
          },
          {
            label: "Last Update",
            field: "lastModifiedAt"
          },
          {
            label: "Notes",
            field: ""
          }
        ]
      }
    },

    created () {
		  this.axios.post("/candidates")
      .then(resp => {
        this.candidates = resp.data.candidates
        this.filterCandidates = resp.data.candidates
        return this.axios.get("/openings")
			})
			.then(response => {
        this.positions = response.data.openings.map(o => { return { name: o.title, id: o._id }} )
        if (this.$route.params.openingId !== undefined) {
          const filterOpening = this.positions.find(p => p.id === this.$route.params.openingId)
          this.selectPositions.push(filterOpening)
          this.filterCandidates = this.filterCandidates.filter(c => c._opening._id === this.$route.params.openingId)
        }
        return this.axios.get("/workflowStages")
			})
			.then(respn => {
        this.status = respn.data.workflowStages.map(o => { return { name: o.text, id: o._id }} )
        if (this.$route.params.workflowId !== undefined) {
          const filterWorkflow = this.status.find(p => p.id === this.$route.params.workflowId)
          this.selectStatus.push(filterWorkflow)
          this.filterCandidates = this.filterCandidates.filter(c => c._currentWorkflowStage._id === this.$route.params.workflowId)
        }
        return this.axios.get("/tags/candidate")
			})
      .then(resps => {
        this.isLoading = false
        this.tags = resps.data.tags.map(o => { return { name: o.text, id: o._id }} )
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
      openCandidateDetails(id, msg) {
        this.$router.push(`/candidate/${msg}/${id}`)
      },
      openOpening(id) {
        this.$router.push(`/opening/${id}`)
      },
      filter() {
        if (this.selectPositions.length === 0) {
          this.filterCandidates = this.candidates
        } else {
          const positionIds = this.selectPositions.map(p => p.id)
          this.filterCandidates = this.candidates.filter(c => positionIds.indexOf(c._opening._id) >= 0)
        }
        
        if (this.selectStatus.length !== 0) {
          const statusIds = this.selectStatus.map(p => p.id)
          this.filterCandidates = this.filterCandidates.filter(c => statusIds.indexOf(c._currentWorkflowStage._id) >= 0)
        }
        
        if (this.selectTags.length !== 0) {
          const tagIds = this.selectTags.map(p => p.id)
          this.filterCandidates = this.filterCandidates.filter(c => {
            let flag = false
            c._tags.forEach(tag => {
              if (tagIds.indexOf(tag._id) >= 0) {
                flag = true 
              }
            })
            if (flag === true) {
              return true
            }
          })
        }
      },
      clearFilter() {
        this.selectPositions = []
        this.selectStatus = []
        this.selectTags = []
        this.filterCandidates = this.candidates
      },
      openModal() {
        $("#import-residents-modal").modal("show")
      },
      uploadCsv() {
        if (this.$refs.csvFile.files[0] === undefined) {
          sweetalert('Error!', "Please select candidate csv file", 'error')
          return false
        }
        if (this.openingId === "") {
          sweetalert('Empty Opening!', "Please select opening", 'error')
          return false
        }
        $("#import-residents-modal").modal("hide")
        const formData = new FormData()
        formData.append('csv-file', this.$refs.csvFile.files[0]);
        formData.append('openingId', this.openingId);
        this.isLoading = true
        this.axios.post(`/import/candidates`, formData)
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
      }
    }
  };
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>