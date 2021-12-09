//자바스크립트에선 함수도 하나의 값이므로 함수의 매개변수로 전달 할 수 있다.
const test = function(a){
    console.log(a)
}

const fx = function(){
    console.log('hi')
}
test(fx)   //함수를 매개변수로 전달
`
ƒ (){
    console.log('hi')
}                              ===> 함수 자체도 출력된다.
`

/////////////////////////////////////////////////////////////////////////////////////////////
//매개변수로 전달되는 함수를 "콜백함수"라고 한다.
const test2 = function(a){   //=>해당 매개변수를 함수로 전달 할 것이 확실하므로 숫자, 문자는 오류가 난다. 여기서 (a)매개변수로 전달되는 함수는 콜백함수
   a()
}

const fx2 = function(){
    console.log('하아 피곤하다')  
}
test2(fx2)
`
하아 피곤하다      ===> test2안 a에 함수 fx2가 들어오고 a()가 함수이기 때문에 글자를 출력하는 것
                  ===> test2(10), test2(ㄹㄴㄹ) 같은 것은 함수가 아니므로 오류가 발생한다.
`

//////////////////////////////////////////////////////
//콜백함수 예1
const 테스트 = function(콜백함수){
    콜백함수(10)
}

const 함수 = function(콜백함수의매개변수){
    console.log(`${콜백함수의매개변수} 번째 안녕하세요`)
}
테스트(함수)

/////////////////////////////////////////////////
//콜백함수 예2
const 테스트2 = function(콜백함수2){
    for (let i = 0; i < 5; i++){
        콜백함수2(i)
    }
}

const 함수2 = function(콜백함수의매개변수2){
    console.log(`${콜백함수의매개변수2} 번째 안녕하세요`)
}
테스트2(함수2)


///////////////////////////////////////////////////////////
//콜백함수의 예3
const Test = function (array, callback){
    for (const value of array){
        callback(value)
    }
}

const fx3 = function(callback_parameter){
    console.log(`${callback_parameter}th hello`)
}

Test([52, 273, 103, 32], fx3)














