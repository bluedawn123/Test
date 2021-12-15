//즉시호출함수 => 함수를 만들고 즉시 호출
            //=> 변수와 상수들이 함수 내부에서만 작동하기 때문에 충돌이 일어나지 않는다. 

//1=2
(function (){

})()

//2
(() => {

})()


//ex const a 함수를 만들고 바로 실행하는 코드인데, a부분에다가 function() {}를 합쳐서 입력한 것과 같다.
const a = function() {}
a()

const a = 
function(){} ()


//ex2) => b가 2개 존재하지만, 함수 내부에 있어서 충돌이 일어나지 않는다.
(function (){
    const b =10
    console.log(b)
})()

(function (){
    const b =30
    console.log(b)
})()