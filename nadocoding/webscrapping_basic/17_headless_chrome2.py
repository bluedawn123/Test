#헤드리스 크롬 => (브라우저)화면 안 띄우고 진행시키는 것
#16번 파일 가져와서 실행해보기
from selenium import webdriver

options = webdriver.ChromeOptions()
options.headless = True                 #크롬 띄우기 전에 이걸 실행해주면 된다.
options.add_argument("window-size=1920x1080")

browser = webdriver.Chrome(options=options)
browser.maximize_window()

#페이지 이동
url = "https://play.google.com/store/movies/top"
browser.get(url)

import time
interval = 2 #2초에 한번씩 스크롤 내리기

# 현재 문서 높이를 가져와서 저장
prev_height = browser.execute_script("return document.body.scrollHeight")

#반복 수행
while True:
    #스크룰을 가장 아래로 내림
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(interval)

    #현재 문서 높이를 가져와서 저장
    current_height = browser.execute_script("return document.body.scrollHeight")
    if current_height == prev_height:
        break
    prev_height = current_height

print("스크롤 완료")
browser.get_screenshot_as_file("google_movie.png")   #스크롤 됐을 떄 화면을 눈에 보이진 않지만 스크린샷으로 저장 가능

import requests
from bs4 import BeautifulSoup
#스크래핑 작업 시작
soup = BeautifulSoup(browser.page_source, "lxml")
#div, class 정보 활용
movies = soup.find_all("div", attrs={"class":"Vpfmgd"}) #★★ 리스트 활용
                                                        #이렇게 하면 클래스가 list 안에 있는 것과 일치하는 것, 즉 둘 다 가져오는 것 의미
                                                                           
#print("영화의 총 갯수 ? : ", len(movies))  #=> 10으로 출력된다. => 10개 밖에 출력이 안 되는 이유는 이것이 동적페이지 이기 때문이다. 

for movie in movies:
    title = movie.find("div", attrs={"class":"WsMG1c nnK0zc"}).get_text()
    #print("인기 영화 모든 목록 : ", title)

    #할인 전 가격
    original_price = movie.find("span", attrs={"class":"SUZt4c djCuy"})
    if original_price:
        original_price = original_price.get_text()
    else:
        #print(title, " <할인되지 않은 영화 제외> ")
        continue

    #할인 된 가격
    price = movie.find("span", attrs={"class":"VfPpfd ZdBevf i5DZme"}).get_text()
    
    #링크
    link = movie.find("a", attrs={"class":"JC71ub"})["href"]  #~~의 속성으로 href정보를 가져온다. 그리고 play.google.com + 링크가 필요하다. 

    print(f"제목 : {title}")
    print(f"할인 전 금액 : {original_price}")
    print(f"할인 후 금액 : {price}")
    print("링크 : ", "http://play.gogole.com" + link)
    print("-------------------------------------------------------------------------------------------------------------------")

browser.close()
