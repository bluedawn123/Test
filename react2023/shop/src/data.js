
let data =
[
    {
      id : 0,
      title : "White and Black",
      content : "Born in France",
      price : 120000,
      saleprice : 95000,
      saleterm : '2023-08-05 00:05 ~ 2028-12-31 23:55'
    },
  
    {
      id : 1,
      title : "Red Knit",
      content : "Born in Seoul",
      price : 110000,
      saleprice : 95000,
      saleterm : '2023-08-05 00:05 ~ 2028-12-31 23:55'
    },
  
    {
      id : 2,
      title : "Grey Yordan",
      content : "Born in the States",
      saleprice : 95000,
      price : 130000,
      saleterm : '2023-08-05 00:05 ~ 2028-12-31 23:55'
    },

] 

export default data //보낼 데이터가 1개이므로 export default 사용

  //[array자료]에 상품정보가 3개 들어있을 뿐입 그래서 축약하면 [ { }, { }, { } ] 이렇게 생김 
  //상품정보가 너무 길고 복잡해서 {object자료} 에 넣어뒀을 뿐