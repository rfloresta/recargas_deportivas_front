import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import router from './router'
import App from './App.vue'

// Importar estilos de Vuetify
import 'vuetify/styles'

// Importar componentes y directivas de Vuetify
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Crear una instancia de Vuetify
const vuetify = createVuetify({
  components,
  directives,
})

// Crear e iniciar la aplicación Vue
createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
