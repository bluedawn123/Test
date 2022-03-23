<template>
<div class="post">

    <div class="post-header">
      <div class="profile" :style="{ backgroundImage : `url(${게시물.userImage})`}"></div> <!--여기 프로필 사진-->
      <span class="profile-name">{{게시물.name}}</span>
    </div>

    <div class="post-body" :style="{ backgroundImage : `url(${게시물.postImage})`}"></div> <!--여기 콘텐츠 사진-->
    <!--style안은 자바스크립트를 써야한다. 글자 중간에 변수를 집어넣고 싶다면 백틱과 $을 쓴다.-->

    <div class="post-content">
      <p>{{게시물.likes}}</p>
      <p><strong>{{게시물.name}}</strong> {{게시물.content}}</p>
      <p class="date">{{게시물.date}}</p>
    </div>
</div> 

</template>







<script>


export default {
  name: 'ThePost',
    data(){
    return{
      
    }

  },
  components: {

  },
  props :{ 
  //<!--app.vue에서 받아온 게시물(아래props 게시물)을 위에서 게시물[0]으로 저장하고, 
  //이걸다시 게시물이란 이름으로 저장해서 ThePost로 보냄. 다시말해 즉 여기서 게시물은 container의 게시물[0]을 게시물이라고 저장한것.-->
    게시물 : Object,  //즉, Thecontainer의 게시물[0]이다.
    
  }
}
</script>





<style>
.post {
  width: 100%;
}
.profile {
  background-image: url("https://placeimg.com/100/100/arch");
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  background-image: url("https://placeimg.com/640/480/animals");
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
}
</style>
