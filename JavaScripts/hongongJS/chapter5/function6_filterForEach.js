//자바스크립트 내부적으로 callback 함수를 사용하는 예제. 배열의 callback함수를 사용하는 메서드
//1. forEach => 배열의 요소를 callback함수에 전달해서 반복을 돌며 원하는 걸 뽑는 메서드
const 배열 = [273, 52, 103]
배열.forEach(function (value, index){
    console.log(`${index}번째의 값은 ${value}`)
})


/////////////////////////////////////////////////////////////////////////////////////////
//2. filter 함수 => callback함수로 true Or false 올 것을 예상. 
const 배열 = [273, 52, 103]
console.log(배열.filter(function(value, index){
    return true  
    //(3) [273, 52, 103]      true를 return한 것들은 모든 요소를 다 들어있는 배열
}))
console.log(배열.filter(function(value, index){
    return false
    //[]                      false를 return한 것은 모든 요소가 전혀 없는 배열
})) 



//2-1 filter응용
let 새배열 = [273, 52, 103, 100, 50]
새배열 = 새배열.filter(function(value, index){
    return value % 2 === 0                      //value % 2 === 0 (즉 짝수) 인 것들만 return 한다.
})

console.log(새배열)

/////////////////////////////////////////////////////////////////////////////////////////
//3. map => 기존의 배열요소를 기반으로 새로운 배열을 만들어 return
let array = [273, 52, 103, 100, 50]
array = array.map(function(value, index)  {
    return value + "!!"                      
})
console.log(array)  //(5) ['273!!', '52!!', '103!!', '100!!', '50!!']

















//4. => function 대신 => 사용
                    //=> 함수내부가 return 1개라면, 중괄호와 리턴까지 생략가능

let array = [273, 52, 103, 100, 50]
array = array.filter((value, index) => {
    return value % 2 === 0                      
})
console.log(array)


let array = [273, 52, 103, 100, 50]
array = array.filter((value, index) => 
     value % 2 === 0                      
)
console.log(array)

//3개는 다 같은 코드










