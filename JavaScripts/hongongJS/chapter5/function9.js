//선언적 함수 => 위에서 아래로 차례대로 실행되지 않는다.
function 함수() {
    console.log('김이다')
}

function 함수() {
    console.log('윤이다')
}

function 함수() {
    console.log('황이다')
}

함수()   //




//익명 함수 => 변수와 같기 때문에 위에서 아래로 읽어진다.
let func = function(){
    console.log('a이다')
}

func = function(){
    console.log('B이다')
}

func = function(){
    console.log('C이다')
}

func()  //C이다   만 출력