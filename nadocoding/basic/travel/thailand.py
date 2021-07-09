class ThailandPackage:
    def detail(self):        #아무것도 받지 않음
        print("[태국 패키지 3박 5일] 방곡, 파타야 여행 (야시장 투어) 50만원")

if __name__ == "__main__":
    print("Thailand 모듈을 직접 실행")   #직접 실행시.
    print("이 문장은 모듈을 직접 실행할 때만 실행된다")

    trip_to = ThailandPackage()
    trip_to.detail()

else:                       #메인이 아닌 경우에는,
    print("Thailand 외부에서 모듈 호출")