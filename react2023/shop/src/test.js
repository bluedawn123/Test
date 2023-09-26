
function App() {
  let [shoes, setShoes] = useState(data);  

return (
<div className="App">
    <Routes>
      <Route path="/" element=
      {
        <mainpagediv>
          <div className="container">
            <div className="row">

            {shoes.map( (a, i) => {  
               return (
                 <Card shoes정보={shoes[i]} 사진번호={i+1} ></Card> 
                 )
               })
             }
            </div>
          </div>

          <button onClick={()=>{
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then( (결과)=>{
              console.log(결과)
              let copy = [...shoes, ...결과.data];
              setShoes(copy);
            })
            .catch( ()=> {
              console.log('실패함')
            })
          }}>더보기</button>
        </mainpagediv> 
      }/> 
      
      <Route path="/detail/:id" element={ <Detail detail에서쓸shoes데이터 = {shoes} ></Detail> } /></Routes>

</div>);}

//App 컴포넌트의 자식컴포넌트인 Card라는 컴포넌트 생성. shoes데이터가 없으니 props필요
function Card(props) {  
  return(
  <div className="col-md-3 mt-5">
    <img src={'https://codingapple1.github.io/shop/shoes' + props.사진번호 + '.jpg'} width="80%" />
    <h4>{props.shoes정보.title}</h4>
    <p>{props.shoes정보.content}</p>
  </div>
  )
}

export default App;
