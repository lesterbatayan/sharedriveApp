import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import InputSwitch from 'primevue/inputswitch'
import Dropdown from 'primevue/dropdown'
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'

import ToastService from 'primevue/toastservice'

import 'primeflex/primeflex.css'

import App from './App.vue'
import router from './router'

import '@/assets/styles.scss'
import '@/assets/app.css'

const app = createApp(App)

app.use(ToastService);
app.use(PrimeVue, { ripple: true })

app.component('Button', Button)
app.component('Checkbox', Checkbox)
app.component('InputText', InputText)
app.component('InputSwitch', InputSwitch)
app.component('Dropdown', Dropdown)
app.component('Dialog', Dialog)
app.component('Textarea', Textarea)
app.component('Toast', Toast)

app.use(createPinia())
app.use(router)

app.mount('#app')
