<template>
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
      Workflow Stages

      <!--  add btn  -->
      <a href="" role="button" class="btn btn-outline-secondary btn-sm add-btn" @click.prevent="OpenModel()">
        <i class="fa fa-plus "></i>
        New Stage
      </a>
    </h3>

    <!--  filter section (start) -->
    <div class="row mx-0" v-if="workflowStages.length > 0">
      <div class="rt-filter-wrapper">
        <div class="d-flex align-items-center mb-3">
          <span class="badge badge-secondary mr-1" style="font-size: 14px;" v-for="stage in workflowStages" :key="stage._id">{{stage.text}}</span>
        </div>
      </div> <!-- rt-filter-wrapper  -->
    </div> <!--  row   -->
    <!--  filter section (end) -->
    <div class="modal fade create-stage" id="create-stage" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                <div class="row">
                  <div class="form-group col-12">
                    <label for="newStageName">Name</label>
                    <input type="text" class="form-control" id="newStageName" v-model="newWorkflow.text" placeholder="Enter Name">
                  </div>
                  <!-- <div class="form-group col-12">
                    <label for="newStageName">Type</label>
                    <select class="form-control" v-model="newWorkflow.type">
                      <option value="" selected>Select Type</option>
                      <option value="screening">Screening</option>
                      <option value="remote">Remote</option>
                      <option value="onsite">Onsite</option>
                    </select>
                  </div> -->
                </div>
              </form>
            
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success w-50" @click="createNew()">Create</button>
              <button type="button" class="btn btn-warning w-50" data-dismiss="modal">Cancel</button>
            </div>
          </div>   <!--  modal-content  -->
        </div>
      </div>
  </div> <!--  content  -->
</template>
<script>
  import navbar from '@/views/navbar.vue'
  import Toasted from 'vue-toasted'
  import sweetalert from "sweetalert"
  import Loading from 'vue-loading-overlay'
  import 'vue-loading-overlay/dist/vue-loading.css'
  Vue.use(Toasted)
  import Vue from "vue";
  export default {
    name: 'Stage',
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
        workflowStages: [],
        newWorkflow: {
          text: "",
          // type: ""
        }
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
      OpenModel() {
        $('#create-stage').modal('show')
      },
      createNew() {
        if (this.newWorkflow.text === "") {
          sweetalert('Error!', "Stage name required", 'error');
          return false
        }
        // if (this.newWorkflow.type === "") {
        //   sweetalert('Error!', "Please select type", 'error');
        //   return false
        // }
        $("#create-stage").modal("hide")
        this.isLoading = true
        this.axios.post(`/workflowStage`, this.newWorkflow)
        .then(resp => {
          this.isLoading = false
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error');
          }
          let toast = this.$toasted.success("Stage Added successfully", {
            theme: "bubble", 
            position: "top-right",
            duration : 2500
          });
          this.workflowStages.push(resp.data.workflowStage)
          newWorkflow.text = ""
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error');
          console.log(err);
        })
      }
    }
  };
</script>