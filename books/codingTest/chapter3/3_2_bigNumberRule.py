#n, m, k 공백으로 입력받기
n, m, k = map(int, input().split())

#N개의 수를 공백으로 구분하여 입력받기
data = list(map(int, input().split()))
data.sort()  #정렬

#가장 큰 수, 두 번째로 큰 수를 변수에 저장하기
first = data[n - 1]
second = data[n - 2]

result = 0

while True:
    for i in range(k):         #가장 큰 수를 k 번 더하기
        if m == 0:             # m이 0이면 탈출
            break
        result += first
        m -= 1
    
    if m == 0:
        break
    
    result += second
    m -= 1

print(result)