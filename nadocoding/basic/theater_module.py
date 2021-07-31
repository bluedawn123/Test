#일반 가격
def price(people):
    print("일반 : {0}명 가격은 {1}원 입니다.".format(people, people * 10000))

#조조할인 가격
def price_morning(people):
    print("조조 : {0}명 조조 할인 가격은 {1}원 입니다.".format(people, people * 6000))

#군인 할인 가격
def price_soldier(people):
    print("군인 : {0}명 조조 할인 가격은 {1}원 입니다.".format(people, people * 4000))

#함수가 모이면 모듈이 된다.
#이렇게 만들면 11_1_theater_module.py 라는 파일이 만들어지고 하나의 모듈이 된다. 