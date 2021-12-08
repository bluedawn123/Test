`while(bool_표현식){
    
    본문

}

1.불 표현식 확인
2. true라면 본문 실행 후 1번으로
3. false라면 종료

`

let i = 0
while(i < 10 ){
    alert(`${i}번째 반복입니다.`)
    i++
}

alert(`총 ${i}만큼 반복했습니다.`)