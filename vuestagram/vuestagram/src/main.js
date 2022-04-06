import { createApp } from 'vue'
import App from './App.vue'
import store from './store.js'

import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter; // app.config.globalProperties 이 부분이 모든 컴포넌트에서 사용할 수 있는 변수같은걸 등록할 수 있게 도와주는 일종의 object 자료

// app.mount('#app') 
app.use(store).mount('#app')