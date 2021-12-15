기본 자료형
- 숫자, 문자, 불 => 속성과 매서드를 (사용할수)가질 수 없다.

객체 자료형
- 함수, 배열, 객체 등등 => 속성과 매서드를 가질 수 있다


Array.isArray()  => 배열이면 true 아니면 false



///////////////////////////////////////////////////////////////////////////////////////////////////
기본자료형을 객체 자료형으로 선언하는 방법 => new사용
ex
const a = new Number(10)
const b = new String('문자열')
const c = new Boolean(true)    //=> 셋 다 '객체' ==> 즉, 객체이기때문에 속성과 매서드를 추가 할 수 있다.

a.plus = 20  //plus라는 속성추가


///////////////////////////////기본 자료형의 승급. => .을 찍으면 z가 일시적으로 객체로 승급한다. 
const z = '안녕하세요'   //여기까진 기본자료형
z.length  //  .을 찍는 순간 객체로 승급해서 기본자료형이 사용할 수 없는 속성, 메서드를 사용할 수 있게 된다.



//프로토타입을 활용 => 다른 자료형에 속성, 메서드 추가할때 사용
String.prototype.values = 10    //values라는 속성추가
const a = '문자열'
console.log(a.values)    //10출력
console.log(a)           //문자열




//어떠한 문자열 내부에 어떠한 문자열이 포함된지 알기 위해선 indexOf를 쓴다.
//응용 => prototype을 통해 contains라는 매서드 추가
String.prototype.contains = function(다른문자열){
    return this.indexOf(다른문자열) >= 0
}

const b = '문자열있냐'
console.log(`contains의 속성. 즉 상수b에 문자열이 있으면 true, 아니면 false출력.: ${b.contains('문자')}`)





















