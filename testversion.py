import tensorflow
from tensorflow import keras
import pandas
import sklearn
import scipy
import numpy
import matplotlib
from tensorflow.python.client import device_lib
#import pydotplus
#import pydot
import h5py
import platform 
import MeCab

print(platform.architecture())
print('tensorflow ' + tensorflow.__version__)
print('keras ' + keras.__version__)
print('pandas ' + pandas.__version__)
print('sklearn ' + sklearn.__version__)
print('scipy ' + scipy.__version__)
print('numpy ' + numpy.__version__)
print('matplotlib ' + matplotlib.__version__)
print('h5py ' + h5py.__version__)
print(device_lib.list_local_devices())

print("mecab test")
m = MeCab.Tagger()
out = m.parse("미캅 설치 확인중")
print(out)

#mecab_python-0.996_ko_0.9.2_msvc-cp38-cp38-win_amd64.whl

'''
#main 카테고리 정보 가져오기
import requests
from bs4 import BeautifulSoup

res = requests.get('http://corners.gmarket.co.kr/Bestsellers')
soup = BeautifulSoup(res.content, 'html.parser')

categories = soup.select('div.gbest-cafe ul.by-group li a')
for category in categories:  #하나씩 가져와서 출력을 해보자
    print(category['href'], category.get_text())                         #링크 속성 가져오기, 문자데이터 가져오기(카테고리 이름)
    '''
