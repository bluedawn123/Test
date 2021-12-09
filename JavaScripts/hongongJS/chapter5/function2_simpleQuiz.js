//익명함수의 기본 형태
const f = function(매개변수, 매개변수){
    return 리턴값
}


//1.윤년을 구하는 함수
//4로 나누어 떨어지는 해는 윤년이다. (ex444년) , 하지만 100으로 나누어 떨어지는 해는 윤년이 아니다 하지만 400으로 나누어 떨어지면 윤년
```아이디어
    윤년의 조건
        (연도 % 4 === 0)    
        && (연도 % 100 !== 0)  
        || (연도 % 400 === 0) 

```
const isLeapYear = function(year){
    return (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)   
}
console.log(`2020년은 윤년일까? === ${isLeapYear(2020)}`) //=> true
console.log(`2010년은 윤년일까? === ${isLeapYear(2010)}`) 

//
//2. 최솟값을 구하는 함수 => 특정 배열의 최솟값을 찾는 함수를 만들어라
const min = function (배열){
    let output = 배열[0]
    console.log(`처음 실행 때의 output = ${output}`)

    for (const value of 배열){
        console.log(`현재 비교 대상 ${output}과 ${value}중 작은 것은?`)
        if (output > value){
            output = value
        }
        else{
            output = output
        }
        console.log(`= ${output}`)
    }

    //return output

}

console.log(min([23, 45, 55, 102, 8]))  //=> 8이 최소...이런식으로






