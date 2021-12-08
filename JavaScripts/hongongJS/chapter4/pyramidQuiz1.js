//중첩 반복문 사용하기
```
  *
  ***
  *****
  ******* 이거
  *********
```

let output =''

for (let i = 0; i < 9; i++){
    output = output + '  '
    for (let j = 0; j < (2 * i + 1); j++) {
        output += '*'
    }

    output =+ '\n'
}
console.log(output)