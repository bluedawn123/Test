const object = {
    color : 'red',
    message : '안녕하세요'
}

const string = console.log(JSON.stringify(object))   //=> 실행시 자바스크립트 객체가 json문자열로 바뀐다. 예를들면 작은 따움표가 큰 따움표로 변경되어있다.

const other = JSON.parse(string)

console.log(other.color)     //red
console.log(other.message)   //안녕하세요
