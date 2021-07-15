#Zip 사용법
kor = ["사과", "바나나", "오렌지"]
eng = ["apple", "banana", "orange"]

zip(kor, eng)   #=> 리스트 2개를 세로로 합쳐준다
print(list(zip(kor, eng)))  #=> [('사과', 'apple'), ('바나나', 'banana'), ('오렌지', 'orange')]


#Unzip  => *만 붙혀주면 된다.
mixed = [('사과', 'apple'), ('바나나', 'banana'), ('오렌지', 'orange')]
print(list(zip(*mixed)))    #=> [('사과', '바나나', '오렌지'), ('apple', 'banana', 'orange')]


#3
kor2, eng2 = zip(*mixed)
print(kor2)
print(eng2)

'''
('사과', '바나나', '오렌지')
('apple', 'banana', 'orange')
'''