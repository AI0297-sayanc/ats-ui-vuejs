import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import jwtDecode from "jwt-decode"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    error: false,
    errorMsg: "",
    isLoggedIn: !!window.localStorage.getItem("isLoggedIn") || false,
    user: {
      name: {
        full: "",
        first: "",
        last: ""
      },
      _organization: {}
    },
    token: window.localStorage.getItem("token")
  },
  mutations: {
    LOGIN(state, details) {
      state.isLoggedIn = true
      window.localStorage.setItem("isLoggedIn", true)
      window.localStorage.setItem("token", details.token)
    },
    LOGOUT(state) {
      state.isLoggedIn = false
      window.localStorage.removeItem("isLoggedIn")
      window.localStorage.removeItem("token")
    },
    profileUpdate(state, user) {
      state.user = user
    },
    ErrorMsg(state, msg) {
      state.error = true
      if (msg !== undefined) {
        state.errorMsg = msg
      }
    },
    ErrorMsgRemove(state, msg) {
      state.error = false
      if (msg !== undefined) {
        state.errorMsg = msg
      }
    }
  },
  actions: {
    async login({ state, commit }, { email, password }) {
      if (state.isLogin) return
      try {
        const loginData = {
          handle: email,
          password
        }
        const resp = await axios.post("/login", loginData)
        if (resp.data.error) {
          commit("ErrorMsg", resp.data.reason)
        } else {
          commit("ErrorMsgRemove", "")
          const loginUser = jwtDecode(resp.data.token)
          Vue.axios.defaults.headers.common.Authorization = `Bearer ${resp.data.token}`
          const user = await axios.get("/me")
          commit("profileUpdate", user.data.user)
          commit("LOGIN", { token: resp.data.token, userDetails: loginUser })
        }
      } catch (error) {
        commit("ErrorMsg", error.response.data.reason)
      }
    },

    async profileUpdate({ state, commit }, user) {
      try {
        const resp = await axios.put("/me", user)

        if (resp.data.error) {
          commit("ErrorMsg", resp.data.reason)
        } else {
          commit("ErrorMsgRemove", "")
          commit("profileUpdate", user)
        }
      } catch (error) {
        commit("ErrorMsg", error.response.data.reason)
      }
    },

    async profile({ state, commit }) {
      try {
        const resp = await axios.get("/me")
        if (resp.data.error) {
          // commit("ErrorMsg", resp.data.reason)
          console.log("error", resp.data.reason)
        } else {
          commit("profileUpdate", resp.data.user)
          commit("ErrorMsgRemove", "")
        }
      } catch (error) {
        // commit("ErrorMsg", error.response.data.reason)
        console.log("error", error.response.data.reason)
      }
    },

    async logOut({ state, commit }) {
      // if (!state.isLogin) return
      try {
        // const result = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit("LOGOUT")
      } catch (error) {
        console.log(error)
      }
    },

    // async createNew(context, userData) {
    //   try {
    //     console.log("********", userData)
    //     const authUser = await firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
    //     userData.isActive = true
    //     const user = await firebase.firestore().collection("employee").doc(authUser.uid).set(userData)
    //     // const user = await firebase.firestore().collection("employee").add(userData)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  },
})

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     store.commit("LOGIN")
//   } else {
//     store.commit("LOGOUT")
//   }
// })

export default store
