import requests
from bs4 import BeautifulSoup


def scrape_weather():
    print("[오늘의 날씨]")
    url = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EC%84%9C%EC%9A%B8+%EB%82%A0%EC%94%A8"
    res = requests.get(url)
    soup = BeautifulSoup(res.text, "lxml")
    #맑음, 어제보다 0˚ 높아요
    cast = soup.find("p", attrs={"class":"cast_txt"}).get_text()
    
    #현재 00도˚
    curr_temp = soup.find("p", attrs={"class":"info_temperature"}).get_text().replace("도씨", "")
    #"p", attrs={"class":"info_temperature"부분의 글자를 다 긁어오면 너무 기니깐 도씨를 제외하는 방법
    min_temp = soup.find("span", attrs={"class":"min"}).get_text()
    max_temp = soup.find("span", attrs={"class":"max"}).get_text()

    # 오전 강수확률 00% / 오후 강수확률 00%
    morning_rain_rate = soup.find("span", attrs={"class":"point_time morning"}).get_text().strip()  #strip으로 공백제거
    afternoon_rain_rate = soup.find("span", attrs={"class":"point_time afternoon"}).get_text().strip()  #strip으로 공백제거

    #미세먼지, 초미세먼지 => indicate정보를 가지고, dd엘리먼트를 갖고 순차적으로 찍어주는 방식으로 실행해보자
    dust = soup.find("dl", attrs={"class":"indicator"})      #먼지  
    fine_dust = dust.find_all("dd")[0].get_text()            #미세먼지    dust(dl태그, 클래스)에서 dd인것을 다 찾고 거기서 1번째 텍스트
    worse_find_dust = dust.find_all("dd")[1].get_text()      #초미세먼지  dust(dl태그, 클래스)에서 dd인것을 다 찾고 거기서 2번째 텍스트
   

    #출력
    print("cast : ", cast)
    print("현재 {} (최저 {} /  최고 {})".format(curr_temp, min_temp, max_temp))
    print("오전 {} / 오후 {}".format(morning_rain_rate, afternoon_rain_rate))
    print(" ")
    print("미세먼지 {}".format(fine_dust))
    print("현재 {} (최저 {} /  최고 {})".format(curr_temp, min_temp, max_temp))
    print("오전 {} / 오후 {}".format(morning_rain_rate, afternoon_rain_rate))
    print(" ")
    print("미세먼지 {}".format(fine_dust))
    print("초미세먼지 {}".format(worse_find_dust))


if __name__ == "__main__":     #여기서 직접 실행시만 실행되고, 호출시는 실행 안된다.
    scrape_weather()           #오늘의 날씨정보 가져오기