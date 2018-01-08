import Vue, { CreateElement } from 'vue'

import './assets/css/style.styl'
import store from './stores/store'
import AppComponent from './components/app/app.component'

new Vue({
  el: '#app',
  data: store,
  render(h: CreateElement) {
    return (
      <AppComponent />
    )
  }
})