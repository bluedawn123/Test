import requests
from bs4 import BeautifulSoup

res = requests.get("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=2019%EB%85%84%EC%98%81%ED%99%94%EC%88%9C%EC%9C%84")
res.raise_for_status
soup = BeautifulSoup(res.text, "lxml")

#사진을 갖고온다. img태크의 a클래스
images = soup.find_all("img", attrs={"class":"thumb_img"})

for idx, image in enumerate(images): # 바꾼이유? => 파일쓰기에서 format을 좀 더 편하게 쓰기 위해서.
    #print(image["src"])             # 잘 이해가 안 된다....
                                     # 이 경우 http가 있는 것도 있고 http가 없는 것도 있어서 주석처리하고 http를 다 붙여주는 걸로 해본다.
    image_url = image["src"]
    if image_url.startswith("//"):
        image_url = "https:" + image_url
        print("http확인 : ", image_url)           # => http가 다 붙어서 나온다.and

    image_res = requests.get(image_url) #페이지에 접속해서 정보를 파일로 저장하기 위해서 request를 다시 한번 접속하는것  위의 res = requests.get("___") 와 같다.
    image_res.raise_for_status()         #접근확인

    #파일쓰기
    with open("movie{}.jpg".format(idx+1), "wb") as f:
        f.write(image_res.content)      #_______.content => 해당 리소스가 갖고 있는 정보를 파일로 바로 끈다. 