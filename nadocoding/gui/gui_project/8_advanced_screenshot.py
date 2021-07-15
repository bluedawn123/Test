#키보드 모듈 => 사용자가 키 입력시 그 값을 낚아채서 특정 동작을 한다.  
import keyboard
from PIL import ImageGrab
import time

def screenshot():
    #2021년 7월 16일 03시 20분 15초 =====> _20210716_032015
    cur_time = time.strftime("_%Y%m%d_%H%M%S")
    img = ImageGrab.grab()
    img.save("image{}.png".format(cur_time))  #ex) image_20210716_032015 

keyboard.add_hotkey("F9", screenshot)
keyboard.wait("esc")