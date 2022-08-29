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
      FAQs
    </h3>
    
    <!--  faq (start)   -->
    <div class="row" style="padding:0 16px;">
      <div class="col-12 rt-faq-wrap mt-3 mb-4">

        <!--  accordion (start)  -->
        <div class="accordion rt-accordion" id="accordion">
          <!--  1st accordion  -->
          <div class="card">
            <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Vestibulum ante ipsum primis in faucibus orci luctus et
              
              <i class="fa fa-arrow-down rt-accordion-arrow"></i>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                
                <h5 class="rt-faq-title">Lorem ipsum dolor sit amet</h5> 
                
                <p class="rt-faq-para">Mauris quis suscipit sem. Donec ac eros sit amet ligula pharetra volutpat. Integer lectus dui, molestie sed molestie convallis, bibendum sit amet lacus. Etiam semper, eros at consequat venenatis, sapien massa ultrices risus, at dictum libero ligula ut nulla.</p>
                
                <ul class="list-group list-group-flush faq-list-points">
                  <li class="list-group-item">
                    Cras justo odio
                  </li>
                  <li class="list-group-item">
                    Dapibus ac facilisis in
                  </li>
                  <li class="list-group-item">
                    Morbi leo risus
                  </li>
                  <li class="list-group-item">
                    Porta ac consectetur ac
                  </li>
                </ul>
              
              </div>  <!--  card-body  -->
            </div>
          </div>  <!--  card  -->
          
          <!--  2nd accordion -->
          <div class="card">
            <div class="card-header collapsed" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Suspendisse tempor hendrerit magna at luctus purus
              
              <i class="fa fa-arrow-down rt-accordion-arrow"></i>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
              <div class="card-body">
                
                <div class="rt-faq-para">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Wolf moon officia aute, non cupidatat skateboard dolor brunch.
                  <ul class="list-group list-group-flush faq-list-points">
                    <li class="list-group-item">
                      Cras justo odio
                    </li>
                    <li class="list-group-item">
                      Dapibus ac facilisis in
                    </li>
                    <li class="list-group-item">
                      Morbi leo risus
                    </li>
                    <li class="list-group-item">
                      Porta ac consectetur ac
                    </li>
                  </ul>
                </div>  <!--  rt-faq-para  -->
              
              </div>  <!--  card-body  -->
            </div>
          </div>  <!--  card  -->
          
          <!--  3rd accordion  -->
          <div class="card">
            <div class="card-header collapsed" id="headingThree" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Pellentesque et velit sed nisi sodales viverra ac ut mi
              
              <i class="fa fa-arrow-down rt-accordion-arrow"></i>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
              <div class="card-body"> 
                
                <p class="rt-faq-para">Nunc sed accumsan urna, non tempor augue. Vivamus tristique lorem ex, quis sodales elit sodales quis. Quisque rutrum elit sollicitudin egestas scelerisque.</p> 
                
                <p class="rt-faq-para">Maecenas facilisis vehicula auctor. Quisque cursus elementum turpis, at ullamcorper nibh elementum a. Nulla rutrum vehicula porta.</p> 
              
              </div>  <!--  card-body  -->
            </div>
          </div>  <!--   card   -->
        </div>  <!--  rt-accordion  -->
        
      </div>  <!--  col-12  -->
    </div>  <!--  row  -->
    
    <!--  contact us (start)  -->
    <div class="row">
      <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-3 mb-4">
        
        <h3 class="text-center mb-3">
          Need Help?
        </h3>
        
        <!-- Note: clicking the below button will open a collapsible div that has a contact form  -->
        <button class="btn btn-primary mx-auto d-block my-4" type="button" data-toggle="collapse" data-target="#contactForm" aria-expanded="false" aria-controls="contactForm">
            Contact us
        </button>
        
        <!--  collapsible div (start) -->
        <div class="collapse rt-contact-us-wrap mt-1 mb-5" id="contactForm">
          <form>
            <div class="form-group">
              <label for="filterTopic">Topic</label>
              <select class="form-control" id="filterTopic" v-model="support.topic">
                <option value="" disabled>Select</option>
                <option value="Account Related">Account Related</option>
                <option value="Broken Links">Broken Links</option>
                <option value="Performance Issue">Performance Issue</option>
                <option value="Website Crashing">Website Related</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-group" v-if="support.topic === 'Other'">
              <label for="otherTopic">Other</label>
              <input class="form-control" id="otherTopic" placeholder="Enter Your Topic" v-model="otherTopic">
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea class="form-control" id="message" rows="5" placeholder="Enter Message" v-model="support.message"></textarea>
            </div>
            <!-- Note: clicking this btn should send the message. Also it should close the collapsible div  -->
            <button type="button" class="btn btn-success mx-auto d-block mt-4 mb-2" @click="sendSupportMail()">
              Send Message
            </button>
          </form>
        </div>  <!--  collapse  -->
        <!--  collapsible div (end) -->
        
      </div>  <!--  col-12 col-sm-10 offset-sm-1  -->
    </div>  <!--  row   -->
  </div>
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
    name: 'FAQ',
    components: {
      navbar,
      Loading
    },
    data() {
      return {
        isLoading: false,
        color: '#1b7aa2',
        bgColor: '#ffffff',
        height: 128,
        width: 128,
        fullPage: true,
        support: {
          topic: "",
          message: ""
        },
        otherTopic: ""
      }
    },
    methods: {
      sendSupportMail() {
        if (this.support.topic === "") {
          sweetalert('Error!', "Please Select Topic", 'error');
          return false
        }
        if (this.support.message === "") {
          sweetalert('Error!', "Empty message found", 'error');
          return false
        }
        this.isLoading = true
        const mailData = {
          topic: this.support.topic,
          message: this.support.message
        }
        if (this.support.topic === "Other") {
          mailData.topic = this.otherTopic
        }
        this.axios.post(`/support`, mailData)
        .then(resp => {
          this.isLoading = false
          if (resp.data.error) {
            sweetalert('Error!', resp.data.reason, 'error')
          } else {
            this.$toasted.success("Message successfully send", { 
              theme: "bubble", 
              position: "top-right",
              duration : 2500
            });
            this.support.topic = ""
            this.support.message = ""
            this.otherTopic = ""
          }
        })
        .catch(err => {
          this.isLoading = false
          sweetalert('Error!', err.response.data.reason, 'error')
          console.log(err);
        })
      },
    }
  };
</script>