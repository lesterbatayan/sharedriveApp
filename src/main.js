import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import InputSwitch from 'primevue/inputswitch'
import Dropdown from 'primevue/dropdown'

import App from './App.vue'
import router from './router'

import '@/assets/styles.scss'
import '@/assets/app.css'

const app = createApp(App)

app.use(PrimeVue, { ripple: true })

app.component('Button', Button)
app.component('Checkbox', Checkbox)
app.component('InputText', InputText)
app.component('InputSwitch', InputSwitch)
app.component('Dropdown', Dropdown)

app.use(createPinia())
app.use(router)

app.mount('#app')
