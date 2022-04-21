export default[
    {
      id : 0,
      title : "White and Black",
      content : "Born in France",
      price : 120000,
      inform : "ddddddddddddddddddd"
    },
  
    {
      id : 1,
      title : "Red Knit",
      content : "Born in Seoul",
      price : 110000,
      inform : "dd"
    },
  
    {
      id : 2,
      title : "Grey Yordan",
      content : "Born in the States",
      price : 130000,
      inform : "dd"
    }
  ] 

// 아래는 예시
// var name = 'kim';
// export dafault name하고, app.js에서 import ??? from '~' 하면 name을 {name} 이런식으로 하면 쓸수 있다.
// 하지만 export default는 1번밖에 쓰지 못한다. 
// var name2 = 'yoon'; 이 너무 유용해서 2번 쓰고 싶다면,
// export {name, name2} 로 쓰고, app.js에서 import {name, name2} from '~'로 해야 사용할 수 있다.