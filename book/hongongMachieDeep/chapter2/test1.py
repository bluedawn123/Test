print("hello")

bream_length = [25.4, 26.3, 26.5, 29.0, 29.0, 29.7, 29.7, 30.0, 30.0, 30.7, 31.0, 31.0, 
                31.5, 32.0, 32.0, 32.0, 33.0, 33.0, 33.5, 33.5, 34.0, 34.0, 34.5, 35.0, 
                35.0, 35.0, 35.0, 36.0, 36.0, 37.0, 38.5, 38.5, 39.5, 41.0, 41.0]
bream_weight = [242.0, 290.0, 340.0, 363.0, 430.0, 450.0, 500.0, 390.0, 450.0, 500.0, 475.0, 500.0, 
                500.0, 340.0, 600.0, 600.0, 700.0, 700.0, 610.0, 650.0, 575.0, 685.0, 620.0, 680.0, 
                700.0, 725.0, 720.0, 714.0, 850.0, 1000.0, 920.0, 955.0, 925.0, 975.0, 950.0]

smelt_length = [9.8, 10.5, 10.6, 11.0, 11.2, 11.3, 11.8, 11.8, 12.0, 12.2, 12.4, 13.0, 14.3, 15.0]
smelt_weight = [6.7, 7.5, 7.0, 9.7, 9.8, 8.7, 10.0, 9.9, 9.8, 12.2, 13.4, 12.2, 19.7, 19.9]

fish_length = bream_length + smelt_length
fish_weight = bream_weight + smelt_weight        #아직까진 1차원

##1데이터 병합, 타깃값
fish_data = [[l, w] for l, w in zip(fish_length, fish_weight)]
print("물고기 데이타 : ", fish_data)

fish_target = [1] * 35 + [0] * 14 
print("물고기 타깃 : ", fish_target)

#numpy => 파이썬 리스트로 2차원 리스트는 가능하지만 고차원 리스트는 힘들기 때문!
#파이썬 리스트를 넘파이로 바꾸는 것은 그냥 array()를 쓰면 된다.
import numpy as np

input_arr = np.array(fish_data)      #넘파이를 활용해서 배열 생성
target_arr = np.array(fish_target)   #넘파이를 활용해서 배열 생성

print("인풋(력) 배열 확인 : ", input_arr)
print("입력 배열에서 2번째부터 4번째 : ", input_arr[[1,3,8]])    #입력 배열에서 2번째, 4번째, 9번째 보기
#print(input_arr.shape)  #(49, 2) 49개의 샘플과 2개의 특성

###########중요한 것은 입력과 타깃값이 하나가 돼야한다.################ 특성값과 타깃값이 쌍으로 섞여야한다.

#1. 총 49개의 인덱스준비([0:48])하고 랜덤하게 섞은 인덱스가 필요하다.
np.random.seed(42)
index = np.arange(49)
np.random.shuffle(index)

print(index)
'''
[13 45 47 44 17 27 26 25 31 19 12  4 34  8  3  6 40 41 46 15  9 16 24 33
 30  0 43 32  5 29 11 36  1 21  2 37 35 23 39 10 22 18 48 20  7 42 14 28
 38]
 '''

#2. 전체 데이터를 훈련세트와 테스트 세트로 분류 (참고로, 섞은 인덱스 쌍 지정완료)
train_input = input_arr[index[:35]]
train_target = target_arr[index[:35]]   #이러면 지정된 랜덤 인덱스 때문에 훈련, 타깃값도 쌍을 이룬다.

test_input = input_arr[index[35:]]
test_target = target_arr[index[35:]]   #이러면 지정된 랜덤 인덱스 때문에 훈련, 타깃값도 쌍을 이룬다.

#(번외)그림으로 확인
import matplotlib.pyplot as plt
plt.scatter(train_input[:,0], train_input[:,1])  #훈련데이터 파랑
plt.scatter(test_input[:,0], test_input[:,1])    #테스트 주황
plt.xlabel('length')
plt.xlabel('weight')
plt.show()

#3. 훈련
from sklearn.neighbors import KNeighborsClassifier
kn = KNeighborsClassifier()
kn = kn.fit(train_input, train_target)

#4. 테스트
print("--")
kn.score(test_input, test_target)

#5. 예측
kn.predict(test_input)