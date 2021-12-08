let i = 0
while (i<10){
    i++
    console.log(`${i}번째 반복입니다.`)
    break
}


let i = 0
while (i<10){
    i++
    console.log(`${i}번째 반복입니다.`)
    continue
    console.log("이것이 출력될까요?")  //continue가 나오면 아래는 무시하고 위로 올라간다.
}