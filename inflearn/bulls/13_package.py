#디렉토리를 이용해서 모듈을 관리할 수 있는데 이때 디렉토리를 패키지라고 한다.  => 단 항상 동등한 위치에 있어야 한다!!! 그렇지 않은 경우는 lib\site-packages\에 추가

#나도코딩에서 본 것처럼, 패기지가 되려면 반드시 __init__.py 가 반드시 필요하다. 

#경로가 다른 경우!!!!!!!!!!!!!!!!!!
import sys
for path in sys.path:
    print(path)

#sys라는 모듈은, 파이썬 system의 전체적인 경로를 관리

#c:\Users\YOONJUNHO\Documents\Test\inflearn\bulls  
#C:\Users\YOONJUNHO\anaconda3\python38.zip
#C:\Users\YOONJUNHO\anaconda3\DLLs        
#C:\Users\YOONJUNHO\anaconda3\lib
#C:\Users\YOONJUNHO\anaconda3
#C:\Users\YOONJUNHO\anaconda3\lib\site-packages      
#=> 중요. 이 경로에 모듈이나 패키지를 둘 수 있다. 두면, site-packages에 들어있는 패키지는 바로바로 쓸 수 있다!!

#C:\Users\YOONJUNHO\anaconda3\lib\site-packages\locket-0.2.1-py3.8.egg
#C:\Users\YOONJUNHO\anaconda3\lib\site-packages\win32
#C:\Users\YOONJUNHO\anaconda3\lib\site-packages\win32\lib
#C:\Users\YOONJUNHO\anaconda3\lib\site-packages\Pythonwin


#C:\Users\YOONJUNHO\anaconda3\lib\site-packages   에 userPackage를 만들고 실습해보자! => __init__, calculater.py 생성완료
from userPackage import calculator

result = calculator.add(3, 10)
print("결과 : {0}".format(result))  #결과 : 13 ㄷㄷ