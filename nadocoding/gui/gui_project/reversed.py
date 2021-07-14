#리버스와 리버스드의 차이

lst = [1,2,3,4,5]
print(lst)       #[1, 2, 3, 4, 5]

lst.reverse()
print(lst)       #[5, 4, 3, 2, 1]

lst2 = [1,2,3,4,5,6]
print(lst2)

lst3 = reversed(lst2)
print("lst2 뒤집은 후 : ", lst2)
print("lst3 : ", list(lst3))

#reversed는 실제값에는 영향을 미치지 않는다. 대신 변수로 저장시 활용 가능