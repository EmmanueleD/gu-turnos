import "./assets/main.css"

import { createApp } from "vue"
import { pinia } from './store'
import { useDataStore } from './store/dataStore'
import { supabase } from './utils/supabaseClient'
import router from './router/index'
import App from "./App.vue"

const app = createApp(App)

app.config.globalProperties.$supabase = supabase
app.use(pinia)
app.use(router)

const dataStore = useDataStore()
dataStore.fetchData()

app.mount("#app")
