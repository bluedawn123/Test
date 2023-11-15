const arr = [5,6,7,8]

//for in?
//처음 파라미터엔 index가 들어간다. 

for (let index in arr){
    console.log(index)        //0,1,2,3
    console.log(arr[index]);  //5,6,7,8
}

//of뒤의 배열의 요소 각 자체를 앞의 변수에 바로 꽂아넣는다.
for (let item of arr){
    console.log(item);
}

// 객체(오브젝트)형 일 경우는 
const jsonArr = {email : "dummy", password :"a123"};
for(let key in jsonArr){
    console.log(key)            //email, password
    console.log(jsonArr[key])   //dummy, a123
}