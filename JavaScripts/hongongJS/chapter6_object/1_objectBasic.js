const array = [100, 20, '문자열', true, function () {}]  //=> 요소(element)
console.log(array[0])


//형태
const object = {
    key : value,   //=>속성(property)
    key : value,
    bark: function() {}    //=>객체 내의 함수는 '매서드'
}


//1.this?  ==> 자기 자신의 객체를 나타낸다.
const object2 = {
    name : '구름',
    age : 7,
    bark2 : function() {
        console.log(`${object2.name}이/가 짖습니다.`)   //=> 익명함수. 
        console.log(`${this.name}이가 짖네요`)          //=> 익명함수. this 사용시 자기자신을 나타낸다. 매서드에서 this는 자기자신(object2) =바인딩
        console.log(this)                              //{name: '구름', age: 7, bark2: ƒ, sleep: ƒ}

    },

    sleep : () =>{    //화살표함수에서는 this라는 객체가 연결되지 않는다. 
        console.log(`${object2.name}이/가 잡니다.`)    
        console.log(this)                             //this를 출력하면 이상한 게 출력된다.
    }


}

console.log(object2.name)  //구름
object2.name = '준호'
console.log(object2.name)  //준호. 즉 변경된다.

object2.bark2()