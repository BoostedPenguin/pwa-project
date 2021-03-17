import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert.module'
import { authentication } from './authentication.module'
import { users } from './users.module'
import { organization } from './organization.module'
import { images } from './images.module'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    alert,
    authentication,
    users,
    organization,
    images
  }
})
