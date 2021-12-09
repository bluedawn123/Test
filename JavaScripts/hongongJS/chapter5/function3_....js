//나머지 매개변수. const 함수 = funcion(...매개변수) 형태 ===> ...매개변수의 자료형은 무조건 배열이다. 
//1
const test = function(...매개변수){
    console.log(매개변수)
}
test()         //[]
test(1)        //[1]
test(1,2)      //(2) [1,2]
test(2,3,4,5)  //(4) [2,3,4,5]
//배열이 아닌 것으로 들어가서 매개변수의 자료형이 배열이므로 배열 형태로 바뀐다.



//2. 일반적인 매개변수 + 나머지 매개변수 함께
const test = function(a,b,...매개변수){
    console.log(a,b,매개변수)
}
test()             //undefined undefined []        =>일반매개변수에 값이 없으므로 undefined이고 나머지 매개변수는 [] (배열출력)
test(1)            //1 undefined []       => 1들어가고 빈배열
test(1,2)          //1 2 []               => 1 2 들어가고 역시 [] 로 빈배열
test(2,3,4,5)      //2 3 (2) [4, 5]       => 2 3 그리고 남은 2개가 (2) [4, 5]로 배열로 들어가게 된다.






//3. 전개연산자 => 함수를 호출 시 사용 + ...사용
//함수(...배열) 즉! 함수를 호출한다!              ===> 배열을 전달하고 분해해서 (1,2,3)이 출력된다. (원하는대로 가능)
const q = function(a, b, c){
    console.log(a,b,c)
}

const x = [1,2,3]
q(x[0], x[1], x[2])  //함수 a,b,c에 1,2,3이 들어가게 하려면 원래 이렇게 해야한다. 하지만 
                     //전개 연산자를 사용하면, [1,2,3]이 각각의 매개변수로 분리되어 들어가게 된다. 

q(...x)


//최솟값 찾기에서 응용
const min = function(array){
    let output = array[0]
    for (const value of array){
        if (output > value){
            output = value
        }
    }
    return output
}
console.log(min[52, 567, 21, 5, 16])  //배열로 들어가고 

//나머지 매개변수 이용!
const min = function(...array){
    let output = array[0]
    for (const value of array){
        if (output > value){
            output = value
        }
    }
    return output
}
console.log(min(52, 567, 21, 5, 16))  // 배열이 아닌 형태로 들어가 배열로 바뀌므로.

//만약 갖고 있는 녀석이 배열형태이라면 const etc = [52, 234, 11, 25 1235, 22] 이런것이라면 이런것을 호출하기위해
//전개연산자를 사용한다면,            min(...etc)로 사용할 수 있다.










