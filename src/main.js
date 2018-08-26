/* Twitter Bootstrap JS (this could also be handled in an app.js file) */

/* Vue */
import Vue from 'vue'
import router from './router/router'
import store from './store'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'

Vue.use(Vuetify)
Vue.use(VueResource)

/* App SCSS */
require('./styles/app.scss')

/* App component */
import App from './components/App.vue'

window.localMode = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // Attach the Vue instance to the window,
  // so it's available globally.
  created: function () {
    window.Vue = this
  },
  router,
  store,
  render: h => h(App)
})
