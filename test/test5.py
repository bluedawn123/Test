#안되므로 User_agent 사용후.... 
#1
#첫번째 제품의 이름만 알아내기

import requests
import re       #정규식 쓰려고
from bs4 import BeautifulSoup

url = "https://www.coupang.com/np/search?q=%EB%85%B8%ED%8A%B8%EB%B6%81&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=36&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=1&rocketAll=false&searchIndexingToken=1=4&backgroundColor="

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36"}
res = requests.get(url, headers=headers)  #괄호안에 headers가 추가!
res.raise_for_status()

soup = BeautifulSoup(res.text, "lxml")

#노트북에 대한 정보
items = soup.find_all("li", attrs={"class":re.compile("^search-product")})  
#정규식을 쓰는 이유? search-product로 시작하는 것을 의미하기 위해서
#=> 자동으로 li태그중 class정보가 search-product로 시작하는 모든 element를 가져온다.

#에시로 첫번째 노트북의 이름만 찾기
print("첫 제품 이름 : ", items[0].find("div", attrs={"class":"name"}).get_text()) 
#div태그의 class정보가 name인 것의 첫번째.의 text(이름만)가 필요하므로.  (get.text())사용