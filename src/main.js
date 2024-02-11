import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import axios from 'axios'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          blue: '#373ae6',
          lightBlue: '#0cb8f1',
          white: '#FFFEFC',
          black: '#040406',
          darkSilver: '#C0C0C0',
          lightSilver: '#D9D9D9'
        }
      },
    },
  },
})

/* API Despliegue */
axios.defaults.baseURL= 'http://149.50.135.56:8000'

/* API Local */
// axios.defaults.baseURL= 'http://172.22.112.1:8000'
// axios.defaults.baseURL= 'http://localhost:8000'
axios.defaults.xsrfCookieName = 'csrftoken'; // Name of the cookie that stores the CSRF token
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
createApp(App)
.use(store)
.use(router,axios)
.use(vuetify)
.mount('#app')
