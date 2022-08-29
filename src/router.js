import Vue from "vue"
import Router from "vue-router"
import Opening from "./views/opening.vue"
import CreateOpening from "./views/create_opening.vue"
import Candidates from "./views/all_candidates.vue"
import CreateCandidate from "./views/create_candidate.vue"
import CandidateDetails from "./views/candidate_details.vue"
import Stages from "./views/workflow_stages.vue"
import Faqs from "./views/faq.vue"
import OpeningDetails from "./views/opening_details.vue"
import Profile from "./views/profile.vue"
import Users from "./views/users.vue"
import UserView from "./views/user_view.vue"
// import Questions from "./views/questions.vue"

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "opening",
      component: Opening
    },
    {
      path: "/opening/:id",
      name: "openingdetails",
      component: OpeningDetails
    },
    {
      path: "/candidates/:openingId?/:workflowId?",
      name: "candidates",
      component: Candidates
    },
    {
      path: "/createopening",
      name: "createopening",
      component: CreateOpening
    },
    {
      path: "/createcandidate",
      name: "createcandidate",
      component: CreateCandidate
    },
    {
      path: "/candidate/:for/:id",
      name: "candidatedetails",
      component: CandidateDetails
    },
    {
      path: "/stages",
      name: "stages",
      component: Stages
    },
    {
      path: "/faqs",
      name: "faqs",
      component: Faqs
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/users",
      name: "users",
      component: Users
    },
    {
      path: "/user/:id",
      name: "userview",
      component: UserView
    },
    // {
    //   path: "/questions",
    //   name: "questions",
    //   component: Questions,
    // },
    // {
    //   path: '/',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
