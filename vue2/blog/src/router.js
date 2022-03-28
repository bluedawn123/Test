import { createWebHistory, createRouter } from "vue-router";
import TheList from './components/TheList.vue'
import TheTest from './components/TheTest.vue'
import TheHome from './components/TheHome.vue'


const routes = [
  { //path경로로 접속하면, 다른 컴포넌트를 보여준다.
    path: "/list",            
    component: TheList,
  },

  { 
    path: "/test",            
    component: TheTest,
  },

  { 
    path: "/",            
    component: TheHome,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 