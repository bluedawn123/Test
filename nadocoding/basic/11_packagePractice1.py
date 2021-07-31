#thailand package 직접 사용해보기
import travel.thailand                                 #import 사용시, travel._______  (뒷부분) 즉, .뒤의 부분은 module이나 package만 가능하다. 클래싀, 함수는 불가
trip_to = travel.thailand.ThailandPackage()
trip_to.detail()      #[태국 패키지 3박 5일] 방곡, 파타야 여행 (야시장 투어) 50만원

print("----------------------------")

from travel.thailand import ThailandPackage   #travel패키지의 thailand모듈에서 Thailandpackge클래스 불러오기
trip_to =ThailandPackage()
trip_to.detail()

print("----------------------------")


from travel import vietnam
trip_to = vietnam.VietnamPackage()
trip_to.detail()      #[베트남 패키지 3박 5일] 다낭 효도 여행 60만원

#####중요 => travel은 패키지, thailand는 모듈, ThailandPackage()는 클래스