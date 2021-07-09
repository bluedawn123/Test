#날자 선택은 다 되었으니, 지역 선택
###################################'list' object has no attribute 'text' 로 실패 ##############################
#네이버 항공권
#3월 27 ~ 4월 28일 선택
#xpath로 제주도 선택

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait           #엘리먼트 기다릴때 사용
from selenium.webdriver.support import expected_conditions as EC  #엘리먼트 기다릴때 사용
from selenium import webdriver

browser = webdriver.Chrome()
browser.maximize_window()  #창 최대화

url = "https://flight.naver.com/flights/"
browser.get(url)   #url로 이동

#가는날 선택 (글자 기준으로 찾기.)
browser.find_element_by_link_text("가는날 선택").click()

#돌아 오는 날 선택
#주의 => 날짜가 같을 수도 있으니, a태그의 첫번쨰 항목(7월 29일)선택 Or 두번째 항목(8월29일) 이런식

#3월 27일 가는 날, 4월 28일 오는 날 선택
browser.find_elements_by_link_text("27")[0].click() #27 을 갖는 모든 글짜 선택 후 첫번째 가져오기
browser.find_elements_by_link_text("28")[1].click() #27 을 갖는 모든 글짜 선택 후 첫번째 가져오기

#제주도 선택 => xpath
browser.find_element_by_xpath("//*[@id='recommendationList']/ul/li[1]").click()   
# recommd...list의 ""을 문자열이 이상하게 되기 때문에 이것을 ''로 수정 

#항공권 검색 클릭
browser.find_element_by_link_text("항공권 검색").click()  #잘 나온다. 그럼 가격정보를 추출해보자

#첫번째 결과 출력. xpath로. //*[@id="content"]/div[2]/div/div[4]/ul/li[1] 

#elem = browser.find_element_by_xpath("//*[@id='content']/div[2]/div/div[4]/ul/li[1]")
#print(elem.text)  
#Message: no such element: Unable to locate element 오류가 나온다.
#로딩하는 화면 때문에 우리가 원하는 페이지 화면이 안 떠서 => 로딩처리필요

#방법 1. 시간 설정 후 기다리기 => 시간낭비가 아깝다. 
#방법 2. 엘리먼트가 나올때까지만 기다리기 => 유용

#다시 해보자.
#'''
try:   #try를 쓰는 이유 : 에러가 났을때는 그냥 종료 해버리는 게 낫기 때문에.
    elem = WebDriverWait(browser, 10).until(EC.presence_of_all_elements_located((By.XPATH, "//*[@id='content']/div[2]/div/div[4]/ul/li[1]")))  
#어떤 엘리먼트가 위치할 때까지 브라우저에 대해 최대 10초동안 기다린다. 
#괄호 안이 어떤 것에 해당된다. 여기서는, By.XPATH를 기다려준다. 
    for value in elem:
        print(value.text)

finally:
    browser.close()

#정리 : WebDriverWait를 통해서 브라우저를 10초동안 기다린다. 근데 10초 안에, Expected Contidition(여기서는 Xpath라는 조건으로, 
#Xpath라는 값에 해당하는 element가 나올때까지) 에 맞는 조건을 기다린다. 

'''
에어서울
출발지
GMP
06:00
도착지
CJU
07:00
총 소요시간
01시간 00분
할인석
편도 63,200원
편도 62,200원 (네이버페이 1,000원 적립)
성인이벤트혜택
'''



#-------------------------------------------------------------------------------------------------------------------------------------------------------