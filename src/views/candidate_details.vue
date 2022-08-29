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
            <li class="breadcrumb-item"><a href="#/candidates">All Candidates</a></li>
            <li class="breadcrumb-item"><a :href="`#/candidates/${candidate._opening._id}`">{{candidate._opening.title}}</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{candidate.name.full}}</li>
        </ol>
    </nav>
    
    <div class="row mt-3 mb-5">
      <div class="col-12 col-lg-7 order-12 order-lg-1">
        
        <!--  tab (start) -->
        <ul class="nav nav-pills mt-2 mb-3 rt-nav-tabs-wrap" id="pills-tab" role="tablist">
          <li class="nav-item">
            <a :class="this.$route.params.for === 'basic' ? 'nav-link active show' : 'nav-link'" id="basic-info-tab" data-toggle="pill" href="#basic-info" role="tab" :aria-selected="this.$route.params.for === 'basic' ? true : false">Basic Info</a>
          </li>
          <li class="nav-item">
            <a :class="this.$route.params.for === 'messages' ? 'nav-link active show' : 'nav-link'" id="messages-tab" data-toggle="pill" href="#messages" role="tab" :aria-selected="this.$route.params.for === 'messages' ? true: false">Messages</a>
          </li>
          <li class="nav-item">
            <a :class="this.$route.params.for === 'notes' ? 'nav-link active show' : 'nav-link'" id="notes-tab" data-toggle="pill" href="#notes" role="tab" :aria-selected="this.$route.params.for === 'notes' ? true : false">Notes</a>
          </li>
        </ul>
        
        <!--  tab content (start) -->
        <div class="tab-content pt-4 px-3 mb-3 pb-3" id="pills-tabContent">
          <!-- tab 1  -->
          <div :class="this.$route.params.for === 'basic' ? 'tab-pane fade show active' : 'tab-pane fade'" id="basic-info" role="tabpanel" aria-labelledby="basic-info-tab">

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
                    </button>
                    <button type="button" @click="updateCandidate()" class="btn btn-success btn-sm mb-2 float-right">
                      Save
                    </button>
                  </div>
                </div>  <!--  col-12 col-sm-12 col-md-10 offset-md-1  -->

                <div class="clearfix"></div>

                <!-- All the fields below are in "read-only" mode. When the user clicks the edit btn, "read-only" will not be there  -->
                <form>
                  <div class="row">
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateName">Name</label>
                      <input type="text" :disabled="!isEdit" class="form-control" id="candidateName" placeholder="Enter" v-model="fullName" @blur="splitName()"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateEmail">Email</label>
                      <input type="text" :disabled="!isEdit" class="form-control" id="candidateEmail" placeholder="Enter" v-model="candidate.email"> 
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidatePhone">Phone</label>
                      <input type="text" :disabled="!isEdit" class="form-control" onkeypress='return event.charCode >= 46 && event.charCode <= 57 && event.charCode !== 47' maxlength="10" id="candidatePhone" placeholder="Enter" v-model="candidate.phone"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateAlternateEmail">Alternate Email</label>
                      <input type="text" :disabled="!isEdit" class="form-control" id="candidateAlternateEmail" placeholder="Enter" v-model="candidate.altEmail"> 
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidatecurrentLocation">Current Location</label>
                      <input type="text" :disabled="!isEdit" class="form-control" id="candidatecurrentLocation" placeholder="Enter" v-model="candidate.currentLocation"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidatecurrentEmployer">Current Employer</label>
                      <input type="text" :disabled="!isEdit" class="form-control" id="candidatecurrentEmployer" placeholder="Enter" v-model="candidate.currentEmployer"> 
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidatecurrentPosition">Current Position</label>
                      <input type="text" :disabled="!isEdit" class="form-control" id="candidatecurrentPosition" placeholder="Enter" v-model="candidate.currentPosition"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateCurrentSalary">Current Salary</label>
                      <input type="text" :disabled="!isEdit" class="form-control" id="candidateCurrentSalary" placeholder="Enter" v-model="candidate.currentSalary"> 
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateExpectedSalary">Expected Salary</label>
                      <input type="text" :disabled="!isEdit" class="form-control" id="candidateExpectedSalary" placeholder="Enter" v-model="candidate.expectedSalary"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateyearsOfExperience">Years Of Experience</label>
                      <input type="number" :disabled="!isEdit" class="form-control" onkeypress='return event.charCode >= 46 && event.charCode <= 57 && event.charCode !== 47' min="0" id="candidateyearsOfExperience" placeholder="Enter" v-model.number="candidate.yearsOfExperience"> 
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateHighestQualification">Highest Qualification</label>
                      <input type="text" :disabled="!isEdit" class="form-control" id="candidateHighestQualification" placeholder="Enter" v-model="candidate.highestEducationalQualification"> 
                    </div>
                    <div class="form-group col-12 col-sm-6">
                      <label for="candidatePortfolio">Portfolio</label>
                      <input type="text" :disabled="!isEdit" class="form-control" id="candidatePortfolio" placeholder="Enter" v-model="candidate.portfolio"> 
                    </div>

                    <div class="form-group col-12 col-sm-6" v-if="isEdit">
                      <label for="candidateSkills">Skills</label>
                      <input-tag class="form-control custom-tags"  v-model="candidate.skills" placeholder="Enter"></input-tag>
                    </div>
                    <div class="form-group col-12 col-sm-6" v-if="!isEdit">
                      <label for="candidateSkills">Skills</label>
                      <p class="text-truncate fs-14 mb-0">{{candidate.skills.join(", ")}}</p>
                    </div>
                    
                    <div class="form-group col-12 col-sm-6" v-if="isEdit">
                      <label for="candidateTags">Tags</label>
                      <input-tag class="form-control custom-tags"  v-model="candidate.tags" placeholder="Enter" ></input-tag>
                    </div>
                    <div class="form-group col-12 col-sm-6" v-if="!isEdit">
                      <label for="candidateTags">Tags</label>
                      <p class="text-truncate fs-14 mb-0">{{candidate.tags.join(", ")}}</p>
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateExpectedSource">Source</label>
                      <input type="text" :disabled="!isEdit" value="" class="form-control" id="candidateExpectedSource" placeholder="Enter" v-model="candidate.source">
                    </div>
                    
                    <div class="form-group col-12 col-sm-6" v-if="isEdit">
                      <label for="uploadCV">Upload New CV</label>
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="uploadCV" ref="file" @change="handleFileUploadForFond()">
                        <label class="custom-file-label font-weight-normal" for="customFile">Choose file</label>
                      </div>
                    </div>
                    <div class="form-group col-12 col-sm-6" v-if="!isEdit">
                      <label for="uploadCV">Old CV Link</label>
                      <p class="text-truncate fs-14 mb-0" :title="candidate.cvLink">{{candidate.cvLink}}</p>
                    </div>

                    <div class="form-group col-12 col-sm-6">
                      <label for="candidateCurrentNoticePeriod">Notice Period</label>
                      <select class="form-control" id="opening-Location" v-model="candidate.noticePeriod" :disabled="!isEdit">
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
                      <!-- <input type="date" class="form-control" id="candidateAvailableFrom" placeholder="Enter" v-model="candidate.availableFrom" :disabled="!isEdit"> -->
                      <datetime v-model="candidate.availableFrom" :disabled="!isEdit" value-zone="local"></datetime>
                    </div>
                    
                    <div class="form-group col-12 col-sm-12">
                      <label for="candidateExperience">Experience</label>
                      <textarea class="form-control" :disabled="!isEdit" id="candidateExperiences" rows="5" placeholder="Enter" v-model="candidate.experienceSummary"></textarea> 
                    </div>                    
                  </div>  <!--  row  -->
                </form>
                
              </div>   <!--  col  -->
            </div>  <!--  row   -->
          </div>   <!--  tab-pane  -->

          <!-- tab 2  -->
          <div :class="this.$route.params.for === 'messages' ? 'tab-pane fade show active' : 'tab-pane fade'" id="messages" role="tabpanel" aria-labelledby="messages-tab">

            <div class="row">
              <div class="col-12">
                <div class="d-block">
                  <button type="button" @click="openEditer()" class="btn btn-info btn-sm mb-2 float-right">
                    <i class="fa fa-plus"></i>&nbsp; Compose
                  </button>
                </div>  <!--  col-12 col-sm-12 col-md-10 offset-md-1  -->

                <div class="clearfix"></div>
                
                <div class="accordion email-accordion mb-4" id="accordion">
                  <!--  1st accordion  -->
                  <div class="card msg-div"  v-for="(thread, index) in allThreads" :key="thread._id">
                    <div class="card-header .card-body" :id="`headingOne${index}`" data-toggle="collapse" :data-target="`#collapseOne${index}`" aria-expanded="true" :aria-controls="`collapseOne${index}`">
                      <!-- email sender name -->
                      <h5 class="email-from">
                        Sub: <span style="font-weight: 600;">{{thread.messages[0].subject}}</span>
                      </h5> 
                      <!--  email receiver name -->
                      <p class="email-to">From: <span :title="thread.messages[0].fromEmail">{{thread.messages[0].fromName}}</span></p>
                      <p class="email-to">To: <span :title="thread.messages[0].toEmail">{{thread.messages[0].toName}}</span></p>

                      <!--  email date & time  -->
                      <div class="email-date-time">
                        <span class="email-date">{{dateTime(thread.messages[0].createdAt)}}</span>
                        <p class="email-to">Total Messages: <span>{{thread.messages.length}}</span></p>
                        <span style="text" >
                          <i class="fa fa-check mr-1" :style="thread.messages[0].isOpened === true ? 'color: #17a2b8;' : ''"></i>
                          <i class="fa fa-check" :style="thread.messages[0].isOpened === true ?'color: #17a2b8;' : ''" v-if="thread.messages[0].isDelivered === true"></i>
                        </span>
                      </div>
                    </div>   <!--  card-header   -->

                    <!-- First level accordion -->
                    <div :id="`collapseOne${index}`" class="collapse" :aria-labelledby="`headingOne${index}`" data-parent="#accordion">
                      <div class="card-body for-border">
                        <!--  email subject  -->
                        <!-- <p><b>Subject: </b> 
                          <span>Opportunity at Logic Square Technologies - Senior UI Developer</span>
                        </p> -->
                        <div v-html="thread.messages[0].html">
                        </div>
                        <!-- if more than one threads then show this accordion -->
                        <div class="accordion email-accordion mt-3 mb-2" v-if="thread.messages.length > 1" id="accordionTwo">
                          <!--  1st accordion  -->
                          <div class="card msg-div" v-for="(message, indx) in thread.messages.slice(1)" :key="message._id">
                            <div class="card-header .card-body" :id="`nextHeadingOne${index}${indx}`" data-toggle="collapse" :data-target="`#nextCollapseOne${index}${indx}`" aria-expanded="true" :aria-controls="`nextCollapseOne${index}${indx}`">
                              <h5 class="email-from" :title="message.fromEmail">
                                {{message.fromName}}
                              </h5> 
                              <!--  email receiver name -->
                              <p class="email-to">To: <span :title="message.toEmail">{{message.toName}}</span></p>

                              <!--  email date & time  -->
                              <div class="email-date-time">
                                <span class="email-date">{{dateTime(message.createdAt)}}</span>
                                <p style="text" v-if="message.isQueuedWithMg !== undefined">
                                  <i class="fa fa-check mr-1" :style="message.isOpened === true ? 'color: #17a2b8;' : ''"></i>
                                  <i class="fa fa-check" :style="message.isOpened === true ?'color: #17a2b8;' : ''" v-if="message.isDelivered === true"></i>
                                </p>
                              </div>
                            </div>   <!--  card-header   -->
                            <div :id="`nextCollapseOne${index}${indx}`" class="collapse for-border" :aria-labelledby="`nextHeadingOne${index}${indx}`" data-parent="#accordionTwo">
                              <div class="card-body" v-html="message.html">
                            
                              </div>  <!--  card-body  -->
                            </div>
                          </div>  <!--  card  -->
                        </div>
                        <!-- end next level accordion -->
                        
                      </div>  <!--  card-body  -->
                      <div class="card-footer" v-if="thread.messages.length > 1">
                        <!--  reply button  -->
                        <!-- Note: on clicking the below btn, a modal will appear. There user can reply to an email -->
                        <button type="button" class="btn btn-link reply-btn" @click="replayModal(thread.messages[thread.messages.length -1].mgMsgId)">
                          <i class="fa fa-mail-reply"></i> Reply
                        </button>
                      </div>
                    </div>
                    <!-- end first level accordion -->
                  </div>
                </div>  <!--  email-accordion  -->
                
              </div>  <!--  col  -->
            </div>  <!-- row  -->

          </div>  <!--  tab-pane  -->

          <!-- tab 3  -->
          <div :class="this.$route.params.for === 'notes' ? 'tab-pane fade show active' : 'tab-pane fade'" id="notes" role="tabpanel" aria-labelledby="notes-tab">

            <div class="row rt-notes-wrap">

              <div class="col-12 col-sm-12" v-for="note in allNote" :key="note._id">
                <!--  the below card will show the note  -->
                <div class="card notes-content">
                  <div class="card-body">
                    <!--   btn to delete the note  -->
                    <button type="button" class="delete" @click="deleteNote(note._id)">
                        <i class="fa fa-times"></i>
                    </button>
                    <!--  note   -->
                    <p>{{note.text}}</p>
                  </div>
                  <div class="card-footer text-muted">
                    <div class="row">
                      <div class="col-6 msg-div">
                        Added By: <span>{{note._createdBy.name.full}}</span>
                      </div>
                      <div class="col-6 text-right">
                        Added On: <span>{{dateTime(note.createdAt)}}</span>
                      </div>
                    </div>
                  </div>
                </div>  <!--  notes-content  -->
              </div>  <!--  col-12 col-sm-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2  -->

              <!--  on clicking this btn, textarea & a btn will appear for the user to add a note -->
              <div class="w-100 text-center">
                <button class="btn btn-primary mt-2 mb-4" type="button" data-toggle="collapse" data-target="#addNewNote" aria-expanded="false" aria-controls="addNewNote">
                  Add a new note
                </button>
              </div>

              <!--  below there is a textarea & btn for adding a new note. It will remain hidden unless the user clicks the above btn -->
              <div class="collapse col-12 col-sm-10 offset-sm-1 mt-2 mb-3" id="addNewNote">
                <!--  write a new note -->
                <div class="form-group">
                  <textarea class="form-control text-left" id="" v-model="noteText" rows="5" placeholder="Enter Note">
                  </textarea>
                </div>  <!--  rt-write-note-wrap  -->
                <!-- on clicking the below btn, the new note will be added. Also the textarea & the btn will be made hidden. -->
                <button type="button" class="btn btn-success btn-sm mt-4 d-block mx-auto" @click="addNewNote()">Add note</button>
              </div>

            </div>  <!--  rt-notes-wrap  -->

          </div> <!--  tab-pane  -->
        </div>   <!--  tab-content  -->
      </div>  <!--  col-12 col-lg-7  -->
      
      <!--  timeline (start)  -->
      <div class="col-12 col-lg-5 order-1 order-lg-2">
        <div class="d-flex justify-content-between mt-3 mb-2">
          <!-- action btn with options -->
          <div class="btn-group timeline-btn-group">
            <!-- <button type="button" class="btn btn-secondary btn-sm">Reject</button>
            <button type="button" class="btn btn-secondary btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="border-left: 1px solid #9e9e9e;">
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="#" @click.prevent="selectReject('rejected', null)">Reject</a>
              <a class="dropdown-item" href="#" @click.prevent="selectReject('accepted', null)">Offered</a>
              <a class="dropdown-item" href="#" @click.prevent="selectReject('on-hold', null)">Put on Hold</a>
              <a class="dropdown-item" href="#" @click.prevent="selectReject('pending', null)">Unhold</a>
              <a class="dropdown-item" href="#" @click.prevent="selectReject('rejected', 'Candidate Withdrew')">Candidate Withdrew</a>
              <a class="dropdown-item" href="#" @click.prevent="selectReject('rejected', 'Candidate declined Offer')">Candidate declined Offer</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click.prevent="">Archive</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click.prevent="">Mark as SPAM</a>
            </div> -->
          </div> 
          <!--  timeline options  -->
          <button type="button" class="btn btn-primary schedule-interview-btn" @click="openScheduleModal()" title="Schedule Interview">
              <i class="fa fa-calendar-plus-o"></i>
          </button>
        </div>
        
        <ul class="timeline mt-2 mb-4">
          <!-- <li class="event">
            
            <h3 data-toggle="collapse" data-target="#candidateAdded" aria-expanded="true" aria-controls="candidateAdded">Candidate Added

              <span class="timeline-event-date">{{dateTime(candidate.createdAt)}}</span>
            </h3>

            <div :class="candidate._currentWorkflowStage !== undefined || candidate.decisionStatus !== 'pending' ? 'collapse' : 'collapse show'" id="candidateAdded">
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-success move-to-stage-btn mb-3" v-if="candidate._currentWorkflowStage !== undefined">
                  Stage Completed
                </button>

                <div class="btn-group timeline-btn-group" v-else>
                  <button type="button" class="btn btn-info btn-sm" @click="nextStage()">Move to next stage</button>
                  <button type="button" class="btn btn-info btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="border-left: 1px solid #80cbc4;">
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>

                  <div class="dropdown-menu dropdown-menu-right" v-if="candidate.decisionStatus === 'pending'">
                    <a class="dropdown-item" href="#" v-for="workflow in candidate._opening._workflowStages" :key="workflow._id" @click.prevent="moveStage(workflow)">{{workflow.text}}</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" @click.prevent="selectReject('accepted', null)">Offered</a>
                    <a class="dropdown-item" href="#" @click.prevent="selectReject('rejected', null)">Reject</a>
                  </div>
                </div>  
              </div>   

              <p class="mb-1">
                <a class="btn btn-link btn-sm see-activity-btn" data-toggle="collapse" href="#collapseActivityDetails" role="button" aria-expanded="false" aria-controls="collapseActivityDetails">
                  <span>{{candidate.activities.filter(a => a._workflowStage === undefined).length}}</span> Activities
                </a>
              </p>
              <div class="collapse activity-details-wrap mt-0 mb-3" id="collapseActivityDetails" v-if="candidate.activities.filter(a => a._workflowStage === undefined).length !== 0">
                <ul class="list-group list-group-flush activity-details">
                  <li class="list-group-item" v-for="activitie in candidate.activities.filter(a => a._workflowStage === undefined)" :key="activitie._id">
                    {{activitie.text}}
                    <span>{{dateTime(activitie.when)}}</span>
                  </li>
                </ul>
              </div>
              
            </div>
          </li> -->
          <li class="event" v-for="(workflowList, count) in candidate._opening._workflowStages" :key="workflowList._id">
            
            <!--  title -->
            <h3 data-toggle="collapse" :data-target="`#${workflowList._id}`" aria-expanded="false" :aria-controls="`${workflowList._id}`">{{workflowList.text}}
              
              <!--  timeline date  -->
              <span class="timeline-event-date" v-if="candidate.activities.filter(a => a._workflowStage === workflowList._id).length !== 0">{{dateTime(candidate.activities.find(a => a._workflowStage === workflowList._id).when)}}</span>
            </h3>
            <!--  collapsible content  -->
            <div :class="(candidate._currentWorkflowStage !== undefined) && (workflowList._id === candidate._currentWorkflowStage._id) && (candidate.decisionStatus === 'pending')? 'collapse show' : 'collapse'" :id="`${workflowList._id}`">
              <div class="d-flex justify-content-between">
                <!-- <button type="button" class="btn btn-success move-to-stage-btn mb-3" v-if="(candidate.decisionStatus !== 'pending') || ((candidate._currentWorkflowStage !== undefined) && (workflowList._id !== candidate._currentWorkflowStage._id) && (candidate._opening._workflowStages.indexOf(workflowList) < candidate._opening._workflowStages.indexOf(candidate._opening._workflowStages.find(w => w._id === candidate._currentWorkflowStage._id))))">
                  Stage Completed
                </button> -->
                <button type="button" class="btn btn-primary move-to-stage-btn mb-3" v-if="(candidate.decisionStatus === 'pending') && ((candidate._currentWorkflowStage === undefined) || ((candidate._currentWorkflowStage !== undefined) && (workflowList._id !== candidate._currentWorkflowStage._id)))" @click.prevent="moveStage(workflowList)">
                  Move to this stage
                </button>
                <!--  move to next stage btn with options  -->
                <div class="btn-group timeline-btn-group" v-if="candidate.decisionStatus === 'pending' && (candidate._currentWorkflowStage !== undefined) && (workflowList._id === candidate._currentWorkflowStage._id)">
                  <button type="button" class="btn btn-info btn-sm" @click="nextStage()" :disabled="count === candidate._opening._workflowStages.length - 1">Move to next stage</button>
                  <button type="button" class="btn btn-info btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="border-left: 1px solid #80cbc4;">
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <!--  dropdown  -->
                  <div class="dropdown-menu dropdown-menu-right">
                    <span v-for="workflow in candidate._opening._workflowStages" :key="workflow._id">
                      <a class="dropdown-item" href="#" @click.prevent="moveStage(workflow)" v-if="(candidate._currentWorkflowStage === undefined) || ((candidate._currentWorkflowStage !== undefined) && (workflow._id !== candidate._currentWorkflowStage._id))">{{workflow.text}}</a>
                    </span>
                    <!-- <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" @click.prevent="selectReject('accepted', null)">Offered</a>
                    <a class="dropdown-item" href="#" @click.prevent="selectReject('rejected', null)">Reject</a> -->
                    <!-- <a class="dropdown-item" href="#">Mark as Hired</a> -->
                  </div>
                </div>  <!-- timeline-btn-group  -->
              </div>   <!-- d-flex justify-content-between -->
              
              <!--  details of the activities happened in this timeline -->
              <p class="mb-1">
                <a class="btn btn-link btn-sm see-activity-btn" data-toggle="collapse" :href="`#collapseActivity${workflowList._id}`" role="button" aria-expanded="false" :aria-controls="`collapseActivity${workflowList._id}`">
                  <span>{{candidate.activities.filter(a => a._workflowStage === workflowList._id).length}}</span> Activities
                </a>
              </p>
              <div class="collapse activity-details-wrap mt-0 mb-3" :id="`collapseActivity${workflowList._id}`" v-if="candidate.activities.filter(a => a._workflowStage === workflowList._id).length !== 0">
                <ul class="list-group list-group-flush activity-details">
                  <li class="list-group-item" v-for="activitie in candidate.activities.filter(a => a._workflowStage === workflowList._id)" :key="activitie._id">
                    {{activitie.text}}
                    <span>{{dateTime(activitie.when)}}</span>
                  </li>
                </ul>
              </div>
            </div>  <!--  collapse  -->
          </li>
          <!-- <li class="event">
            <h3 v-if="candidate.decisionStatus === 'pending'">
              Final Decision
            </h3>
            <h3 v-else>
              {{candidate.decisionStatus}}
            </h3>
          </li> -->
        </ul>
      
      </div>  <!--  col-12 col-md-lg-5 col-xl-4  -->
    
    </div>  <!--  row  -->

    <!--  reply to email modal  -->
		<div class="modal fade reply-email" id="reply-email" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content msg-div">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalCenterTitle1">
							Reply to Email
						</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"> 
							<i class="fa fa-times" aria-hidden="true"></i> 
						</button>
					</div>
					<div class="modal-body"> 
						<div class="row my-2">
							<div class="col-12">
							  
								<h5 class="mb-3" style="font-size:15px;">
									To: 
								  <!--  name of the person to whom the user is replying.  -->
									<span style="font-weight:600;">{{fullName}}</span>
								</h5>
								
								<!--  wysiwyg editor to reply   -->
									<div id="summernote1">
                    <wysiwyg v-model="msgRplyBody"/>
                  </div>
								
							</div> <!--  col-12 -->
						</div> <!--  row  -->
					</div> <!--  modal-body  -->
					<div class="modal-footer">
						<button type="button" class="btn btn-success w-50" @click="rplyMsg()">Send</button>
						<button type="button" class="btn btn-warning w-50" data-dismiss="modal">Cancel</button>
					</div>
				</div>  <!-- modal-content  -->
			</div>
		</div>  
		<!--  modal  -->

    <!--  new email modal  -->
		<div class="modal fade new-email" id="new-email" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content msg-div">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalCenterTitle2">
							New Message
						</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"> 
							<i class="fa fa-times" aria-hidden="true"></i> 
						</button>
					</div>
					<div class="modal-body"> 
						<div class="row my-2">
							<div class="col-12">
							  
								<h6 class="mb-3">
									To: 
								  <!--  name of the person to whom the user is replying.  -->
									<span style="font-weight:600;">{{fullName}}</span>
								</h6>
								<div class="form-group">
									<label for="candidatePortfolio">Subject</label>
								  <!--  name of the person to whom the user is replying.  -->
									<input type="text" class="form-control" id="subject" placeholder="Enter" v-model="subject">
								</div>
								
								<!--  wysiwyg editor to reply   -->
                <div id="summernote2" class="mb-2">
                  <wysiwyg v-model="msgBody"/>
                </div>
								
							</div> <!--  col-12 -->
						</div> <!--  row  -->
					</div> <!--  modal-body  -->
					<div class="modal-footer">
						<button type="button" class="btn btn-success w-50" @click="sendNew()">Send</button>
						<button type="button" class="btn btn-warning w-50" data-dismiss="modal">Cancel</button>
					</div>
				</div>  <!-- modal-content  -->
			</div>
		</div>  
		<!--  modal  -->

    <!--  Schedule Interview modal  -->
		<div class="modal fade scheduleInterview" id="scheduleInterview" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content msg-div">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalCenterTitle3">
							Schedule Interview
						</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"> 
							<i class="fa fa-times" aria-hidden="true"></i> 
						</button>
					</div>
					<div class="modal-body"> 
						<div class="row my-2">
							<div class="col-12">
							  
								<h6 class="mb-3">
									To: 
								  <!--  name of the person to whom the user is replying.  -->
									<span style="font-weight:600;">{{fullName}}</span>
								</h6>

								<div class="form-group">
                  <label for="candidatePortfolio">Subject</label>
								  <!--  name of the person to whom the user is replying.  -->
									<input type="text" class="form-control" id="subject" placeholder="Enter Subject" v-model="scheduleData.title">
								</div>
								<div class="form-group">
                  <label for="candidatePortfolio">Interview Location</label>
								  <!--  name of the person to whom the user is replying.  -->
									<input type="text" class="form-control" id="subject" placeholder="Enter Location" v-model="scheduleData.location">
								</div>
                <div class="row">
                  <div class="form-group col-12 col-sm-6">
                    <label for="candidatePortfolio">Start</label>
                    <datetime class="new-date-time" type="datetime" v-model="scheduleData.start" :max-datetime="scheduleData.end"></datetime>
                  </div>
                  <div class="form-group col-12 col-sm-6">
                    <label for="candidatePortfolio">End</label>
                    <datetime type="datetime" v-model="scheduleData.end" :min-datetime="scheduleData.start"></datetime> 
                  </div>

                  <div class="col-12 col-sm-12" >
                    <label for="candidatePortfolio">Extra Interviewer</label>
										<div class="row" v-for="(attende, counter) in scheduleData.extraAttendees" :key="attende.counter">
											<div class="col-5">
												<div class="form-group">
													<input type="text" class="form-control" placeholder="Enter Name" v-model="attende.name">
												</div>
											</div>
											<div class="col-5">
												<div class="form-group">
													<input type="text" class="form-control" placeholder="Enter Email" v-model.number="attende.email">
												</div>
											</div>
                      <div class="col-2" v-if="counter !== 0">
                        <button type="button" class="btn btn-outline-warning" style="padding: 4px 12px;" @click="removeNewRow(counter)">
                          <i class="fa fa-minus"></i>
                        </button>
                      </div>
                      <div class="col-2" v-else>
                        <button type="button" class="btn btn-success" style="padding: 4px 12px;" @click="addRow()">
                          <i class="fa fa-plus"></i>
                        </button>
                      </div>
										</div>
									</div> <!-- d-flex -->
                </div>
								
								<!--  wysiwyg editor to reply   -->
                <label for="candidatePortfolio">Description</label>
                <div id="summernote3" class="mb-2">
                  <wysiwyg v-model="scheduleData.description"/>
                </div>
								
							</div> <!--  col-12 -->
						</div> <!--  row  -->
					</div> <!--  modal-body  -->
					<div class="modal-footer">
						<button type="button" class="btn btn-success w-50" @click="sendScheduleInterview()">Send</button>
						<button type="button" class="btn btn-warning w-50" data-dismiss="modal">Cancel</button>
					</div>
				</div>  <!-- modal-content  -->
			</div>
		</div>  
		<!--  modal  -->
  
  </div> 
  <!--  content   -->
</template>
<script>
  import Vue from "vue"
  import navbar from '@/views/navbar.vue'
  import InputTag from 'vue-input-tag'
  import Loading from 'vue-loading-overlay'
  import Datetime from 'vue-datetime'
  import moment from "moment"
  import sweetalert from "sweetalert"
  import 'vue-loading-overlay/dist/vue-loading.css'
  import 'vue-datetime/dist/vue-datetime.css'
  Vue.use(Datetime)
  export default {
    name: 'CandidateDetails',
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
        fullName: "",
        candidate: {
          name: {
            first: "",
            middle: "",
            last: "",
            full: ""
          },
          _opening: {
            _id: "",
            title: ""
          },
          email: "",
          altEmail: "",
          phone: "",
          cvLink: "",
          currentEmployer: "",
          currentPosition: "",
          currentSalary: "",
          currentLocation: "",
          noticePeriod: "",
          availableFrom: null,
          createdAt: "",
          yearsOfExperience: null,
          highestEducationalQualification: "",
          experienceSummary: "",
          portfolio: "",
          source: "",
          expectedSalary: "",
          skills: [],
          tags: [],
          activities: []
        },
        msgBody: "",
        isEdit: false,
        subject: "",
        allThreads: [],
        allNote: [],
        noteText: "",
        replyMsgId: "",
        msgRplyBody: "",
        scheduleData: {
          title: "",
          description: "",
          start: "",
          end	: "",
          candidateId: "",
          extraAttendees: [{
            index: 0,
            name: "",
            email: ""
          }],
          location: ""
        }
      }
    },

    created () {
      this.axios.post(`/messages`, { candidateId: this.$route.params.id })
      .then(response => {
        this.allThreads = response.data.threads
        return this.axios.get(`/notes/${this.$route.params.id}`)
      })
      .then(response => {
        this.allNote = response.data.notes
        return this.axios.get(`/candidate/${this.$route.params.id}`)
      })
      .then(resp => {
        this.isLoading = false
        this.candidate = resp.data.candidate
        this.candidate.skills = resp.data.candidate._skills.map(s => s.text)
        this.candidate.tags = resp.data.candidate._tags.map(s => s.text)
        this.candidate.availableFrom = moment(resp.data.candidate.availableFrom).format("YYYY-MM-DD")
        this.fullName = resp.data.candidate.name.full
			})
			.catch(err => {
        this.isLoading = false
        sweetalert('Error!', err.response.data.reason, 'error');
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
      activeClass(stage) {
        if (stage === this.currentStage) {
          return "btn step-active btn-circle"
        } else {
          return "btn step-inactive btn-circle"
        }
      },
      handleFileUploadForFond() {
        this.isLoading = true
        $('#add-new-candidate').modal('hide')
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
      splitName() {
        const arr = this.fullName.split(" ").filter(c => c !== "")
        this.candidate.name.first = arr.shift()
        this.candidate.name.last = arr.pop()
        this.candidate.name.middle = arr.join(" ") || undefined
      },
      activeEdit() {
        this.isEdit = true
      },
      deactiveEdit() {
        this.isEdit = false
      },
      updateCandidate() {
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
        if (this.candidate.noticePeriod !== "Already on Notice") {
          this.candidate.availableFrom = null
        }
        // if (this.candidate.availableFrom !== "" && this.candidate.availableFrom !== null) {
        //   this.candidate.availableFrom = this.candidate.availableFrom.split("T")[0]
        // }
        this.isLoading = true
        this.axios.put(`/candidate/${this.$route.params.id}`, this.candidate)
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
      openEditer() {
        $("#new-email").modal("show")
      },
      sendNew() {
        if (this.subject === "") {
          sweetalert('Error!', "Subject required", 'error');
          return false
        }
        if (this.msgBody === "") {
          sweetalert('Empty Message!', "Please Enter Message", 'error');
          return false
        }
        this.isLoading = true
        const msgData = {
          subject: this.subject,
          html: this.msgBody,
          candidateId: this.$route.params.id
        }
        this.axios.post(`/message/send`, msgData)
        .then(resp => {
          this.isLoading = false
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error')
          } else {
            $("#new-email").modal("hide")
            this.$toasted.success("Message successfully send", { 
              theme: "bubble", 
              position: "top-right",
              duration : 2500
            });
            this.msgBody = ""
            this.subject = ""
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error');
          console.log(err);
        })
      },
      addNewNote() {
        this.isLoading = true
        const noteData = {
          text: this.noteText,
          candidateId: this.$route.params.id
        }
        this.axios.post(`/note`, noteData)
        .then(resp => {
          this.isLoading = false
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error')
          } else {
            this.$toasted.success("Note successfully added", { 
              theme: "bubble", 
              position: "top-right",
              duration : 2500
            });
            this.noteText = ""
            this.allNote.push(resp.data.note)
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error')
          console.log(err);
        })
      },
      deleteNote(id) {
        this.isLoading = true
        this.axios.delete(`/note/${id}`)
        .then(resp => {
          this.isLoading = false
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error')
          } else {
            this.$toasted.success("Note successfully deleted", { 
              theme: "bubble", 
              position: "top-right",
              duration : 2500
            });
            const updatedNote = this.allNote.find(b => String(b._id) === String(id))
            this.allNote.splice(this.allNote.indexOf(updatedNote), 1)
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error');
          console.log(err);
        })
      },
      replayModal(msgId) {
        this.replyMsgId = msgId
        $("#reply-email").modal("show")
      },
      rplyMsg() {
        if (this.msgRplyBody === "") {
          sweetalert('Empty Message!', "Please Enter Message", 'error');
          return false
        }
        this.isLoading = true
        const msgData = {
          subject: "",
          html: this.msgRplyBody,
          candidateId: this.$route.params.id,
          replyToMsgId: this.replyMsgId
        }
        this.axios.post(`/message/send`, msgData)
        .then(resp => {
          this.isLoading = false
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error')
          } else {
            $("#reply-email").modal("hide")
            this.$toasted.success("Message successfully send", { 
              theme: "bubble", 
              position: "top-right",
              duration : 2500
            });
            this.msgRplyBody = ""
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error')
          console.log(err);
        })
      },
      nextStage() {
        this.isLoading = true
        this.axios.put(`/candidate/nextstage/${this.$route.params.id}`)
        .then(resp => {
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error')
          }
          this.$toasted.success("Move successfully", { 
            theme: "bubble", 
            position: "top-right",
            duration : 2500
          });
          return this.axios.get(`/candidate/${this.$route.params.id}`)
        })
        .then(resp => {
          this.isLoading = false
          this.candidate = resp.data.candidate
          this.candidate.skills = resp.data.candidate._skills.map(s => s.text)
          this.candidate.tags = resp.data.candidate._tags.map(s => s.text)
          this.candidate.availableFrom = moment(resp.data.candidate.availableFrom).format("YYYY-MM-DD")
          this.fullName = resp.data.candidate.name.full
          this.$forceUpdate()
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error')
          console.log(err);
        })
      },
      moveStage(allData) {
        this.isLoading = true
        this.axios.put(`/candidate/movetostage/${this.$route.params.id}`, { stageId: allData._id })
        .then(resp => {
          console.log("dataaaa11111111", resp)
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error')
          }
          this.candidate._currentWorkflowStage = allData
          this.$forceUpdate()
          this.$toasted.success("Move successfully", { 
            theme: "bubble", 
            position: "top-right",
            duration : 2500
          });
          return this.axios.get(`/candidate/${this.$route.params.id}`)
        })
        .then(resp => {
          this.isLoading = false
          this.candidate = resp.data.candidate
          this.candidate.skills = resp.data.candidate._skills.map(s => s.text)
          this.candidate.tags = resp.data.candidate._tags.map(s => s.text)
          this.candidate.availableFrom = moment(resp.data.candidate.availableFrom).format("YYYY-MM-DD")
          this.fullName = resp.data.candidate.name.full
          this.$forceUpdate()
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error')
          console.log(err);
        })
      },
      openScheduleModal() {
        $("#scheduleInterview").modal("show")
      },
      sendScheduleInterview() {
        if (this.scheduleData.title === "") {
          sweetalert('Error!', "Please Enter Title", 'error');
          return false
        }
        if (this.scheduleData.start === "" || this.scheduleData.end === "") {
          sweetalert('Error!', "Please select start and end date time", 'error');
          return false
        }
        if (this.scheduleData.extraAttendees.find( u => u.email !== "") !== undefined) {
          let flag = false
          this.scheduleData.extraAttendees.forEach((user) => {
            if (!(/^[a-zA-Z0-9]{1}[a-zA-Z0-9\.\-\+_]+[@]{1}[a-zA-Z0-9\.\-\+_]{2,}[\.]{1}[a-zA-Z0-9\.\-\+_]{2,}$/.test(user.email))) {
              flag = true
            }
          })
          if (flag) {
            sweetalert('Error!', "Please Enter Valid Email Format(format: xxx@xxx.xxx)", 'error');
            return false
          }
        }
        this.isLoading = true
        this.scheduleData.candidateId = this.$route.params.id
        this.axios.post(`/event`, this.scheduleData)
        .then(response => {
          if (response.data.error) {
            sweetalert('Error!', response.data.reason, 'error')
          }
          $("#scheduleInterview").modal("hide")
          this.scheduleData = {
            title: "",
            description: "",
            start: "",
            end	: "",
            candidateId: "",
            extraAttendees: [{
              index: 0,
              name: "",
              email: ""
            }],
            location: ""
          }
          this.$toasted.success("Interview schedule successfully send", { 
            theme: "bubble", 
            position: "top-right",
            duration : 2500
          });
          return this.axios.get(`/candidate/${this.$route.params.id}`)
        })
        .then(resp => {
          this.isLoading = false
          this.candidate = resp.data.candidate
          this.candidate.skills = resp.data.candidate._skills.map(s => s.text)
          this.candidate.tags = resp.data.candidate._tags.map(s => s.text)
          this.candidate.availableFrom = moment(resp.data.candidate.availableFrom).format("YYYY-MM-DD")
          this.fullName = resp.data.candidate.name.full
          this.$forceUpdate()
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error')
          console.log(err);
        })
      },
      addRow() {
        const obj = {
          name: "",
          email: ""
        }
        obj.index = this.scheduleData.extraAttendees.length
        this.scheduleData.extraAttendees.push(obj)
      },
      removeNewRow(indx) {
        this.scheduleData.extraAttendees.splice(indx, 1)
      },
      selectReject(descn, resn) {
        this.isLoading = true
        const sendData = {
          decisionStatus: descn
        }
        if (resn !== null) {
          sendData.rejectionReason = resn
        }
        if (descn === "rejected") {
          sendData.rejectionReason = `Rejected by ${this.$store.state.user.fullName}`
        }
        this.axios.put(`/candidate/decision/${this.$route.params.id}`, sendData)
        .then(response => {
          if (response.data.error) {
            sweetalert('Error!', response.data.reason, 'error')
          }
          this.$toasted.success("Status successfully updated", {
            theme: "bubble", 
            position: "top-right",
            duration : 2500
          });
          return this.axios.get(`/candidate/${this.$route.params.id}`)
        })
        .then(resp => {
          this.isLoading = false
          this.candidate = resp.data.candidate
          this.candidate.skills = resp.data.candidate._skills.map(s => s.text)
          this.candidate.tags = resp.data.candidate._tags.map(s => s.text)
          this.candidate.availableFrom = moment(resp.data.candidate.availableFrom).format("YYYY-MM-DD")
          this.fullName = resp.data.candidate.name.full
          this.$forceUpdate()
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
<style scoped>
  .text-truncate {
    white-space: nowrap; 
    width: 100%; 
    overflow: hidden;
    text-truncate: ellipsis;
  }
  .msg-div {
    text-align: left;
  }
  /* .for-border {
    border-bottom: 1px solid rgba(0,0,0,.125);
  } */
  
  .accordion .card:first-of-type, .accordion .card:not(:first-of-type):not(:last-of-type), .accordion .card:last-of-type  {
    border: 1px solid rgba(0,0,0,.125) !important;
    border-radius: .25rem !important;
  }
  .card  {
    border: 1px solid rgba(0,0,0,.125);
    margin-top: 10px;
  }

  .email-accordion .card-header {
    padding: 10px 160px 8px 12px;
  }

  .email-accordion .card-header .email-to {
    margin-bottom: 2px;
  }

  .email-accordion .card-header .email-date-time {
    top: 10px;
  }
</style>

