<template>
  <!-- Page Content  -->
  <div id="content">
    <!--  top menu (start) -->
    <navbar></navbar>
    <!--  top menu (end) -->
    
    <!--  page title  -->
    <h3 class="rt-page-title">
      Question Bank
      
      <!--  add btn  -->
      <a href="create_Question.html" role="button" class="btn btn-outline-secondary btn-sm add-btn">
        <i class="fa fa-plus "></i>
        Create 
      </a>
    </h3>
    
    <!--  filter section (start) -->
    <div class="row mx-0">
      <div class="rt-filter-wrapper">
        <!--  filter icon  -->
        <i class="fa fa-filter filter-icon"></i>

        <div class="col-12 col-sm-6 col-md-3">
          <div class="form-group">
            <multiselect v-model="selectDifficulty" :multiple="true" :close-on-select="false" :clear-on-select="false" placeholder="Select Difficulty" label="name" track-by="name" :options="difficulty">
              <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
            </multiselect>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <div class="form-group">
            <multiselect v-model="selectTopic" :multiple="true" :close-on-select="false" :clear-on-select="false" placeholder="Select Topic" label="name" track-by="name" :options="topic">
              <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
            </multiselect>
            <label class="sr-only" for="filterTopic">Topic</label>
            <!--  here select 2 has been used   -->
            <select class="js-example-basic-multiple--topic" name="topic[]" multiple="multiple" id="filterTopic" style="width:100%">
              <option value="Html">Html</option>
              <option value="CSS">CSS</option>
              <option value="Angular">Angular</option>
              <option value="Ionic">Ionic</option>
            </select>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <div class="form-group">
            <label for="filterOwner" class="sr-only">Owner</label>
            <!--  here select 2 has been used   -->
            <select class="js-example-basic-multiple--owner" name="owner[]" multiple="multiple" id="filterOwner" style="width:100%">
              <option value="Me">Me</option>
              <option value="Company">Company</option>
              <option value="System">System</option>
            </select>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <div class="form-group">
            <label for="filterType" class="sr-only">Type</label>
            <!--  here select 2 has been used   -->
            <select class="js-example-basic-multiple--type" name="type[]" multiple="multiple" id="filterType" style="width:100%">
              <option value="Subjective">Subjective</option>
              <option value="Objective">Objective</option>
              <option value="Code">Code</option>
              <option value="I/O">I/O</option>
            </select>
          </div>
        </div>

        <!-- clear btn  -->
        <button class="btn btn-warning btn-sm clear-btn" data-toggle="tooltip" data-placement="bottom" title="Clear">
          <i class="fa fa-eraser"></i>
        </button>
      </div>  <!--  rt-filter-wrapper -->
    </div>   <!-- row   -->
    <!--  filter section (end) -->
    
    <!--  table (start)  -->
    <table class="table rt-table rt-opening-table dt-responsive" id="table-openings" style="width:100%;">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Question</th>
          <th>Type</th>
          <th>Added By</th>
          <th>Used</th>
          <th>Success Rate</th>
          <th>Difficulty</th>
          <th>Added On</th>
          <th>Assessment</th>
          <th>Topic</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="custom-control custom-checkbox rt-table-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1"></label>
            </div>
          </td>
          <td>
            <span>Lorem ipsum dolor sit amet</span>
          </td>
          <td>
            <span>Objective</span>
          </td>
          <td>
            <span>Me</span>
          </td>
          <td>
            <span>10</span>
          </td>
          <td>
            <span>8/10</span>
          </td>
          <td>
            <span>Easy</span>
          </td>
          <td>
            <span>12/5/18</span>
          </td>
          <td>
            <span>Screening</span>
          </td>
          <td>
            <span>Html</span>
          </td>
        </tr>
        <tr>
          <td>
            <div class="custom-control custom-checkbox rt-table-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck2">
                <label class="custom-control-label" for="customCheck2"></label>
            </div>
          </td>
          <td>
            <span>Lorem ipsum dolor sit amet</span>
          </td>
          <td>
            <span>Subjective</span>
          </td>
          <td>
            <span>Company</span>
          </td>
          <td>
            <span>10</span>
          </td>
          <td>
            <span>4/10</span>
          </td>
          <td>
            <span>Hard</span>
          </td>
          <td>
            <span>11/2/18</span>
          </td>
          <td>
            <span>Screening</span>
          </td>
          <td>
            <span>CSS</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!--  table (end)  -->

    <!--  Note: below there is an action btn that shows 4 options - 1)Delete 2)Assign Difficulty 3)Add to Assessment 4)Assign Topic     -->
    <!--  floating btn (start)  -->
    <div class="btn-group-sm action-btn-wrap d-none" id="mini-fab">
      <!--   assign to topic (tags)  -->
      <a href="#" class="btn btn-fab" id="fourth-option"> 
        <div class="form-group mb-0 mr-1" data-toggle="tooltip" data-placement="top" title="Assign to Topic">
          <label class="sr-only" for="assignToTopic">Assign to Topic</label>
          <!-- here, user can add existing topics from available options or create new topic & add -->
          <!--  below is a tags input  -->
          <input type="text" class="form-control" value="" id="assignToTopic" placeholder="Add Topic" data-role="tagsinput">
        </div> 
      <!-- this btn will let the user add any changes -->
        <button type="button" class="btn btn-light add-btn--action">
          <i class="fa fa-plus"></i>
        </button>
      </a>
      <!--  add to assessment dropdown -->
      <a href="#" class="btn btn-fab" id="third-option"> 
        <div class="form-group mb-0 mr-1" data-toggle="tooltip" data-placement="left" title="Add to Assessment">
          <label for="addToAssessment" class="sr-only">Add to Assessment</label>
          <select class="form-control" id="addToAssessment">
            <option>Add to Assessment</option>
            <option>Screening</option>
            <option>Telephone Interview</option>
            <option>Face to Face Interview</option>
          </select>
        </div> 
      <!-- this btn will let the user add any changes -->
        <button type="button" class="btn btn-light add-btn--action">
          <i class="fa fa-plus"></i>
        </button>
      </a>
      <!--  assign to difficulty dropdown -->
      <a href="#" class="btn btn-fab" id="second-option"> 
        <div class="form-group mb-0 mr-1" data-toggle="tooltip" data-placement="left" title="Assign Difficulty" >
          <label for="assignDifficulty" class="sr-only">Assign Difficulty</label>
          <select class="form-control" id="assignDifficulty">
            <option>Assign Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div> 
      <!-- this btn will let the user add any changes -->
        <button type="button" class="btn btn-light add-btn--action">
          <i class="fa fa-plus"></i>
        </button>
      </a>
      <!--  delete btn  -->
      <a href="#" class="btn btn-fab circle-btn" data-toggle="tooltip" data-placement="left" data-original-title="Delete" title="" id="first-option"> 
        <i class="fa fa-trash-o"></i> 
      </a>
    </div>  <!--  btn-group-sm   -->

    <!--  floating action btn (on clicking it the options can be seen)  -->
    <div class="btn-group">
      <a href="javascript:void(0)" class="btn action-btn" id="main"> 
        <i class="fa fa-bars"></i> 
      </a>
    </div>
    <!--  floating btn (end)  -->
  </div>  <!--  content  -->
</template>
<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue';
  import navbar from '@/views/navbar.vue'
  import Multiselect from 'vue-multiselect'
  Vue.component('multiselect', Multiselect)
  import Vue from "vue";
  export default {
    name: 'Questions',
    components: {
      Multiselect,
      navbar
    },
    data() {
      return {
        selectDifficulty: [],
        difficulty: [
          { name: 'Hard', difficul: 'hard' },
          { name: 'Medium', difficul: 'medium' },
          { name: 'Easy', difficul: 'easy' }
        ],
        selectLocations: [],
        locations: [
          { name: 'Kolkata', position: 'Kolkata' },
          { name: 'Bangalore', position: 'Bangalore' },
          { name: 'Chennai', position: 'Chennai' }
        ]
      }
    },

    created () {
		// 	this.axios.post("/books")
		// 	.then(resp => {
    //     this.isLoading = false
    //     this.books = resp.data.books
    //     this.filterBooks = resp.data.books
		// 	})
		// 	.catch(err => {
    //     this.isLoading = false
		// 		console.log(err);
		// 	})
		},

    methods: {
      async logOut () {
        await this.$store.dispatch("logOut")
      }
    }
  };
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>