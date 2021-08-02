import numpy as np
import pandas as pd
#%matplotlib inline
import matplotlib.pyplot as plt
import urllib.request
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

urllib.request.urlretrieve("https://raw.githubusercontent.com/mohitgupta-omg/Kaggle-SMS-Spam-Collection-Dataset-/master/spam.csv", filename="spam.csv")
data = pd.read_csv('spam.csv',encoding='latin1')

#전처리---------------------------------------------------------
#3,4,5열 삭제 
del data['Unnamed: 2']
del data['Unnamed: 3']
del data['Unnamed: 4']

#v1 ham, spam을 0, 1 로 변경 후 다시 상위 5개 출력
data['v1'] = data['v1'].replace(['ham','spam'],[0,1])
data[:5]

#중복 샘플 제거
data.drop_duplicates(subset=['v2'], inplace=True)

#데이터 분리. => v2열을 X, v1열을 y로 저장
X_data = data['v2']
y_data = data['v1']


#인코딩---------------------------------------------------------
tokenizer = Tokenizer()               #5169개의 행을 가진 X의 각 행에 토큰화를 수행. 
tokenizer.fit_on_texts(X_data)        #fit_on_texts() 메서드는 문자 데이터를 입력받아서 리스트의 형태로 변환
                                      #fit_on_texts는 입력한 텍스트로부터 단어 빈도수가 높은 순으로 낮은 정수 인덱스를 부여
                                      #정확히 앞서 설명한 정수 인코딩 작업 실행!
sequences = tokenizer.texts_to_sequences(X_data)  #단어를 숫자값, 인덱스로 변환하여 저장

#tokenizer의 word_index 속성은 단어와 숫자의 키-값 쌍을 포함하는 딕셔너리를 반환.  => 빈도수 기준!!! 제일 많이 쓰인 순서
#X_data에 존재하는 모든 단어와 부여된 인덱스를 리턴
word_to_index = tokenizer.word_index


#단어 집합의 크기를 vocab_size에 저장. 주의할 점은 패딩을 위한 토큰인 0번 단어를 고려하며 +1을 해서 저장해야햔다..!! 
#(패딩을 하면 0번부터 하는데 실제로는 그것보다 1개 많은 것이므로!!)
vocab_size = len(word_to_index) + 1  
print('단어 집합의 크기: {}'.format((vocab_size)))         #단어 집합의 크기 : 8921

n_of_train = int(len(sequences) * 0.8)
n_of_test = int(len(sequences) - n_of_train)
print('훈련 데이터의 개수 :',n_of_train)                  #4135
print('테스트 데이터의 개수:',n_of_test)                  #1034


'''주의!
전체 메일의 개수는 5,169개입니다. 
이제 전체 메일 데이터에서 일부는 테스트 데이터로 분리해야한다.. 
전체 데이터의 80%를 훈련용 데이터로, 20%를 테스트 데이터로 사용하려고 한다.. 
숫자를 계산해보았더니 훈련 데이터는 4,135개, 테스트 데이터는 1,034개를 쓰도록 하자. 
아직은 단순히 숫자를 계산만해본 것이고, 실제로 데이터를 나누지는 않았다!!.'''


X_data = sequences
print('메일의 최대 길이 : %d' % max(len(l) for l in X_data))           #메일의 최대 길이 : 189

#전체 데이터셋의 길이는 max_len
#이는 5,169개의 X_data의 길이를 전부 189로. 189보다 길이가 짧은 메일 샘플은 전부 숫자 0이 패딩되어 189의 길이로 변환
max_len = 189

data = pad_sequences(X_data, maxlen = max_len)
print("훈련 데이터의 크기(shape): ", data.shape)  

#드디어 데이터 분리!!!
X_test = data[n_of_train:] #X_data 데이터 중에서 뒤의 1034개의 데이터만 저장
y_test = np.array(y_data[n_of_train:]) #y_data 데이터 중에서 뒤의 1034개의 데이터만 저장
X_train = data[:n_of_train] #X_data 데이터 중에서 앞의 4135개의 데이터만 저장
y_train = np.array(y_data[:n_of_train]) #y_data 데이터 중에서 앞의 4135개의 데이터만 저장

from tensorflow.keras.layers import SimpleRNN, Embedding, Dense
from tensorflow.keras.models import Sequential
model = Sequential()
model.add(Embedding(vocab_size, 32)) # 임베딩 벡터의 차원은 32
model.add(SimpleRNN(32)) # RNN 셀의 hidden_size는 32
model.add(Dense(1, activation='sigmoid'))

model.compile(optimizer='rmsprop', loss='binary_crossentropy', metrics=['acc'])
history = model.fit(X_train, y_train, epochs=4, batch_size=64, validation_split=0.2)

print("\n 테스트 정확도: %.4f" % (model.evaluate(X_test, y_test)[1]))

epochs = range(1, len(history.history['acc']) + 1)
plt.plot(epochs, history.history['loss'])
plt.plot(epochs, history.history['val_loss'])
plt.title('model loss')
plt.ylabel('loss')
plt.xlabel('epoch')
plt.legend(['train', 'val'], loc='upper left')
plt.show()