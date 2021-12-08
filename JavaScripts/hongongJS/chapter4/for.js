//for (let i = 0; i<5; i++) { console.log(`${i}번째 반복입니다.`)}

const 배열 = ['바나나', '사과', '귤']
for (const 요소 of 배열){
    console.log(요소)
}
//바나나
//사과
//귤

for (const 인덱스 in 배열){
    console.log(인덱스, 배열[인덱스])

//0 바나나
//1 사과
//2 귤
}

//개발자도구에서 찍어보자!

//일반 for문 예시
for (let i = 0; i < 배열.length; i++){
    const index = i
    const element = 배열[i]
}