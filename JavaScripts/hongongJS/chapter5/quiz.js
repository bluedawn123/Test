//확인문제1. A~B까지 범위 지정시 범위 안의 숫자를 모두 곱하는 함수를 만드시오.
const multiplyAll = function(start, end){

    let output = 1
    for (let i = start; i <= end; i++) {
        output *= i
    }
    return output


}

console.log(multiplyAll(1,2))
console.log(multiplyAll(1,5))  //1 * 2 * 3 * 4 * 5 = 120


//2. 최대값 max()를 찾는 함수를 만드시오.
const max = function(...array){   //=> 이 부분이 중요하다!
    let output = array[0]
    for(const value of array){
        if(output < value){
            output = value
        }
    }
    return output
}
console.log(max(4,8,3,4,13,25,17))

//2-1. 위에를 응용해서 단, 매개변수로 max([1,2,3,4])와 max(1,2,3,4)를 모두 입력 받을 수 있는 걸 만드시오
//힌트. 첫번째로 들어오는 것이 숫자 => if(typeof(첫번째요소) === 'number')
//      배열 => if (Array.isArray(첫번째요소). 

const max2= function(첫번째요소, ...나머지){
    if (Array.isArray(첫번째요소)){   
        let output = 첫번째요소[0]
        for(const value of 첫번째요소){
            if(output < value){
                output = value
            }
        }
        return output
    }
    else{
        let output = 첫번째요소      //첫번째요소로 초기화를 하고 나머지 배열로 반복문 실행
        for(const value of 나머지){
            if (output < value){
                output = value
            }
        }
        return output
    }
}

console.log(max2([4,8,3,4,13,25,17]))    //=> 배열로 들어감
console.log(max2(4,8,3,4,13,25,17))      //=> 4만 숫자고, 나머지는 배열로 들어감






