#from theater_module import *  
#의미??  모듈에 있는 모든 것을 사용하겠다..

#price(3)                    3명 가격은 30000원 입니다.
#price_morning(3)            3명 조조 할인 가격은 18000원 입니다.
#price_soldier(4)            4명 조조 할인 가격은 16000원 입니다.

from theater_module import price, price_morning  # 위의 *과는 다르게, price, price_morning 함수만 쓰겠다는 의미.

price(3)                   #3명 가격은 30000원 입니다.
price_morning(3)           #3명 조조 할인 가격은 18000원 입니다.
#price_soldier(4)          오류