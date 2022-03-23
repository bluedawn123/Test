<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to = "/"><a class="nav-link active" aria-current="page" href="#">Home</a></router-link>
        </li>
        <li class="nav-item">
          <router-link to = "/list"><a class="nav-link" href="#">List</a></router-link>
        </li>
        <li class="nav-item">
          <router-link to = "/test"><a class="nav-link" href="#">Test</a></router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>


<!-- <router-link to="/list">리스트페이지 가기</router-link> -->


<!------------------------------------------------------ 라우터 -------------------------------------------------->
<!-- /list로 접속하면 이게 <TheList>가 되는 거임. 그래서 아래 주석처리함 -->
<router-view :블로그글="블로그글"></router-view> 
<!-- <TheList :블로그글="블로그글"/> 라우터 써니 그냥 지움-->
<!------------------------------------------------------라우터 끝 -------------------------------------------------->



</template>



























<script>
// import TheList from './components/TheList.vue'
import blog from './assets/blog.js'


export default {
  name: 'App',
  data(){
    return{
      블로그글 : blog,
    }
    
  },
  components: {
    // TheList : TheList,

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
