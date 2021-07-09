#1 2019년 영화순위. 
import requests
from bs4 import BeautifulSoup

res = requests.get("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=2019%EB%85%84%EC%98%81%ED%99%94%EC%88%9C%EC%9C%84")
res.raise_for_status
soup = BeautifulSoup(res.text, "lxml")

#극한직업을 보면, a href 아래에 img class = thumb_img 인 게 있다. 이걸 활용해보자
images = soup.find_all("img", attrs={"class":"thumb_img"})

for image in images:
    #print(image["src"])             # 이 경우 http가 있는 것도 있고 http가 없는 것도 있어서 주석처리하고 http를 다 붙여주는 걸로 해본다.
    image_url = image["src"]
    if image_url.startswith("//"):
        image_url = "https:" + image_url    
    
    print(image_url)