from tensorflow import keras
from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_validate
from sklearn.linear_model import SGDClassifier

(train_input, train_target), (test_input, test_target) = keras.datasets.fashion_mnist.load_data()

train_scaled = train_input / 255.0
train_scaled = train_scaled.reshape(-1, 28*28)
train_scaled, val_scaled, train_target, val_target = train_test_split(train_scaled, train_target, test_size=0.2, random_state=42)

#2개의 층
dense1 = keras.layers.Dense(100, activation='sigmoid', input_shape=(28*28, ))  #첫 히든 레이어
dense2 = keras.layers.Dense(10, activation='softmax')                    #출력층

#심층 신경만 만들기 => 객체 만들기 변수를 리스트 형태로 전달
model = keras.Sequential([dense1, dense2])   
model.summary()

#층 추가 다른 방법 => Sequential클래스에 층을 추가하는 방법
model = keras.Sequential([keras.layers.Dense(100, activation='sigmoid', input_shape=(784, ), name='hidden'), \
keras.layers.Dense(10, activation='softmax', name='output')])
model.summary()

#######뭐 편한 거 골라서 하자.
#모델 훈련 시키기
model.compile(loss='sparse_categorical_crossentropy', metrics='accuracy')
model.fit(train_scaled, train_target, epochs=5)