#원핫인코딩
#오늘 날씨는 구름이 많아요 => 오늘:1,0,0, 날씨:0,1,0  구름:0,0,1
from konlpy.tag import Komoran
import numpy as np

komoran = Komoran()
text = "오늘 날씨는 구름이 많아요"

#1. 명사만 추출
nouns = komoran.nouns(text)
print("명사만 추출 : ", nouns)

#2. 단어 사전 구축 및 단어별 인덱스 부여
dics = {}
for i in nouns:
    if i not in dics.keys():
        dics[i] = len(dics)
print("dics : ", dics)

#원핫인코딩
nb_classes = len(dics)
targets = list(dics.values())
one_hot_targets = np.eye(nb_classes)[targets]
print("one_hoe_targets : ", one_hot_targets)