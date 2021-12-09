setTimeout()    //=> 특정한 시간 후에 한번
setInterval()   //=> 특정시간마다

setTimeout(function(){

    console.log('setTimeout 함수')
}, 2000)

setInterval(function(){

    console.log('setInterval 함수')
}, 2000)


//2
clearTimeout   // setTimeout  호출시 리턴
clearInterval  // setInterval 호출시 리턴

const a = setTimeout(function(){
    console.log('setTimeout 함수')
}, 2000)


const b = setInterval(function(){
    console.log('setInterval 함수')
}, 2000)

console.log(a, b)

clearTimeout(a)   //undefined
clearInterval(b)  //undefined