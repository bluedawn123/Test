n, k = map(int, input().split())
result = 0

# N이 K이상이라면 K로 계속 나누기
while n >= k:
    #(나눠질수있도록) 배수만들때까지 -1해주기
    while n % k != 0:
        n = n - 1
        result = result + 1
    
    #(이것을 한다면 배수가 됐을 것이기 때문에) K로 나눠주고 몫만 저장
    n = n // k
    result = result + 1

#위 과정을 하고 남은 것이 있다면 1빼주기
while n > 1:
    n = n - 1
    result = result + 1
