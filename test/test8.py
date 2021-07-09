import csv
import requests
from bs4 import BeautifulSoup

url = "https://finance.naver.com/sise/sise_market_sum.nhn?sosok=0&page="

for page in range(1, 5): #1페이지부터 4페이지
    res = requests.get(url + str(page))
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "lxml")

    data_rows = soup.find("table", attrs={"class":"type_2"}).find("tbody").find_all("tr")
                                       #테이블 가져오기      #tbdby가져오기    #tr가져오기

    for row in data_rows:
        columns = row.find_all("td")   #td정보 가져오기 => 우리가 필요한 정보는 현재가, 시가총액, 종목명 등등 이므로 get_text()를 사용해 가져올 수 있다.
        if len(columns) <= 1: #=> 줄바꿈의 경우, 하나의 tr이 하나의 td를 갖는 경우 스킵을 하면 된다.. 의미없는 줄바꿈은 생략
            continue
        data = [column.get_text().strip() for column in columns]  #=> columns에 있는 것들을 가져와서 column이라고 하고 그것의 get_text()를 뽑아 td들이 가지고 있는 정보를 저장한다. 
        print(data)
    
        #=> 출력해서 보면, '\n\n\t\t\t\t105\n\t\t\t\t\n', '\n\n\t\t\t\t+0.62%\n\t\t\t\t\n', [''][''][''] 등과 같이 줄바꿈, 빈공간이 있기 때문에 이것을 없애야 한다.
        #=> 줄바꿈의 경우, 하나의 tr이 하나의 td를 갖는 경우 스킵을 하면 된다.
        #=> strip() => 문자열 양쪽에 있는 한 칸 이상의 연속된 공백을 모두 지운다.