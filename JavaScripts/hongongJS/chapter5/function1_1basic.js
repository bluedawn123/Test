//1.
//프로시저 함수 => 매개변수가 없는 함수.
//만드는 방법
const f = function () {
    console.log(`hi + ${x}`)
    
}
const x = 5
f()
// f() 하면, hi + 5



//2. 수학적함수
const f2 = function (x) {
    return x + 5
    
}
console.log(f2(2))   //7출력


//3. 1부터 limit까지의 합을 구하는 함수 
const sum = function () {
    let output = 0
    for (let i = 1; i <= z; i++){
    output += 1
    }
    console.log(output)
}

let z = 10 
sum()


//3-2 더 깔끔하게.
const sum = function (limit) {
    let output = 0
    for (let i = 1; i <= limit; i++) {
        output += i
    }
    return output
    }
    
console.log(sum(20)) //20까지의 합













