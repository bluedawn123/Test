from travel import *           #travel 패키지에서 thailand, vietnam 모듈 불러오기...=> 분명 에러가 난다.!!
                               #이유? 별을 쓴다는 것은 공개범위를 설정을 해줘야하기 때문이다. 

trip_to = vietnam.VietnamPackage()  #vietnam모듈의 vietnampackage클래스 

trip_to.detail()      #[베트남 패키지 3박 5일] 다낭 효도 여행 60만원

#NameError: name 'vietnam' is not defined 에러가 발생한다. 
#이유?? => 공개범위 설정 문제. => __init__ 으로 가보자.  => __all__ = ["vietnam"] 추가 후 에러가 안 난다.