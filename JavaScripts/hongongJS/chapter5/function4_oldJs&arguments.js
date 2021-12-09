//1구 버젼 자바스크립트에서 전개연산자 구현하기 => arguments 를 사용
const old = function(){
    console.log(arguments)
}
console.log(old(1,2,3,4))
// Arguments(4) [1, 2, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ] 이상한것들이 있으므로 forof forin을 사용을 못한다


//2
const max2= function(첫번째요소, ...나머지){
    console.log(arguments)
    let output = arguments[0]     //arguments 이녀석이 가변매개변수 함수처럼 들어온다.
    for(let i = 0; i < arguments.length; i++){
        const 값 = arguments[i];
        
        if(output < value){
            output = value
        }
    }
    return output
}
console.log(max2([4,8,3,4,13,25,17]))    
//...연산자가 없었을땐 매개변수 자체를 입력하지 않는 것이었다.


//3. 
const max2= function(...나머지){
    let output = 내머지[0]     //arguments 이녀석이 가변매개변수 함수처럼 들어온다.
    for(const value of 나머지){
        if(output < value){
            output = value
        }
    }
    return output
}

const input = [1,2,5,7,12]
console.log(max(...input))  
console.log(max.apply(null, input))  ///뭐...그냥 전개 연산자랑 비슷하다고 생각해보자





























